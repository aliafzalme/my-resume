import jsPDF from 'jspdf';
import {
  header,
  summary,
  skills,
  enterprisePlatforms,
  experience,
  projects,
  education,
  specializations,
} from '../../data/resume';

/*
 * Text-layer PDF generator for the v2 resume.
 *
 * Why this exists instead of relying on window.print(): the print dialog hands
 * the job to whatever destination the user picks, and "Microsoft Print to PDF"
 * outlines every glyph into vector paths. The file *looks* correct but has no
 * fonts and no text operators at all, so ATS parsers — and anything else that
 * extracts text — read it as a blank document. jsPDF writes real text runs in
 * the standard Helvetica font, so the output is selectable, searchable and
 * parseable regardless of the machine it was generated on.
 */

// CSS px -> PDF points. Browsers print 1 CSS px as 1/96in, so this keeps the
// PDF metrics identical to what MyResume.css specifies on screen.
const PX = 0.75;
const px = (v) => v * PX;

const PAGE = { w: 612, h: 792 }; // US Letter, in points
const MARGIN = { top: 43.2, right: 46.8, bottom: 43.2, left: 46.8 }; // 0.6in / 0.65in

const INK = [0, 0, 0];
const BODY = [51, 51, 51];
const MUTED = [102, 102, 102];

// Helvetica's ascender, used to turn a line-box top into a text baseline.
const ASCENT = 0.75;

const setFont = (doc, { size, style = 'normal', color = BODY }) => {
  doc.setFont('helvetica', style);
  doc.setFontSize(size);
  doc.setTextColor(color[0], color[1], color[2]);
};

class Layout {
  constructor(doc) {
    this.doc = doc;
    this.y = MARGIN.top;
  }

  get contentW() {
    return PAGE.w - MARGIN.left - MARGIN.right;
  }

  get maxY() {
    return PAGE.h - MARGIN.bottom;
  }

  get right() {
    return PAGE.w - MARGIN.right;
  }

  space(h) {
    this.y += h;
  }

  // Break to a new page when `h` points of content will not fit.
  ensure(h) {
    if (this.y + h > this.maxY) {
      this.doc.addPage();
      this.y = MARGIN.top;
      return true;
    }
    return false;
  }
}

const baselineIn = (top, size, lh) => top + (lh - size) / 2 + size * ASCENT;

/** Wrapped single-style paragraph. */
const paragraph = (L, str, opts) => {
  const { size, style = 'normal', color = BODY, lh, x = MARGIN.left, width = L.contentW, charSpace = 0 } = opts;
  setFont(L.doc, { size, style, color });
  L.doc.splitTextToSize(str, width).forEach((line) => {
    L.ensure(lh);
    setFont(L.doc, { size, style, color }); // re-assert: addPage() can reset state
    L.doc.text(line, x, baselineIn(L.y, size, lh), { charSpace });
    L.y += lh;
  });
};

/**
 * Wrapped mixed-style text. `parts` is a list of { text, size, style, color }
 * runs laid out inline, the way a browser flows <span>s inside a block.
 */
const runs = (L, parts, opts) => {
  const { lh, x = MARGIN.left, width = L.contentW } = opts;
  const doc = L.doc;

  const tokens = [];
  parts.forEach((part) => {
    part.text.split(/(\s+)/).forEach((t) => {
      if (t !== '') tokens.push({ ...part, text: t });
    });
  });

  let line = [];
  let lineW = 0;

  const sameStyle = (a, b) =>
    a.size === b.size && a.style === b.style && String(a.color) === String(b.color);

  const flush = () => {
    // No stray whitespace run hanging off the end of a line.
    while (line.length && /^\s+$/.test(line[line.length - 1].text)) line.pop();
    if (line.length) {
      L.ensure(lh);
      /*
       * Merge neighbouring same-style tokens into one text run. Emitting a
       * separate positioned run per word renders identically but makes text
       * extractors drop the spaces between them ("ETL/ELT·"), which defeats
       * the point of generating a parseable PDF in the first place.
       */
      const segments = [];
      line.forEach((t) => {
        const prev = segments[segments.length - 1];
        if (prev && sameStyle(prev, t)) prev.text += t.text;
        else segments.push({ ...t });
      });
      let cx = x;
      segments.forEach((seg) => {
        setFont(doc, seg);
        doc.text(seg.text, cx, baselineIn(L.y, seg.size, lh));
        cx += doc.getTextWidth(seg.text);
      });
      L.y += lh;
    }
    line = [];
    lineW = 0;
  };

  tokens.forEach((t) => {
    setFont(doc, t);
    const w = doc.getTextWidth(t.text);
    const blank = /^\s+$/.test(t.text);
    if (line.length && lineW + w > width) {
      flush();
      if (blank) return; // the wrap consumes the space
    }
    if (blank && !line.length) return; // no leading space on a fresh line
    line.push(t);
    lineW += w;
  });

  flush();
};

/** Disc bullet list, matching .r2-bullets / .r2-spec-list. */
const bulletList = (L, items, opts) => {
  const { size, lh, gap = 0, indent = px(18), color = BODY } = opts;
  const doc = L.doc;

  items.forEach((item, i) => {
    setFont(doc, { size, color });
    const lines = doc.splitTextToSize(item, L.contentW - indent);
    lines.forEach((line, li) => {
      L.ensure(lh);
      setFont(doc, { size, color });
      const baseline = baselineIn(L.y, size, lh);
      if (li === 0) doc.text('•', MARGIN.left + indent - px(11), baseline);
      doc.text(line, MARGIN.left + indent, baseline);
      L.y += lh;
    });
    if (i < items.length - 1) L.y += gap;
  });
};

/** Height a bullet list will occupy, for keep-together decisions. */
const bulletHeight = (L, items, { size, lh, gap = 0, indent = px(18) }) => {
  setFont(L.doc, { size });
  return items.reduce((h, item, i) => {
    const lines = L.doc.splitTextToSize(item, L.contentW - indent).length;
    return h + lines * lh + (i < items.length - 1 ? gap : 0);
  }, 0);
};

/** Left-flowing content with a right-aligned, non-wrapping trailer. */
const splitLine = (L, leftParts, right, { lh, rightSize, rightColor = BODY }) => {
  const doc = L.doc;
  L.ensure(lh);
  let reserved = 0;
  if (right) {
    setFont(doc, { size: rightSize, color: rightColor });
    reserved = doc.getTextWidth(right) + px(12);
    doc.text(right, L.right, baselineIn(L.y, rightSize, lh), { align: 'right' });
  }
  runs(L, leftParts, { lh, width: L.contentW - reserved });
};

/** Uppercase tracked heading with the hairline rule under it. */
const sectionTitle = (L, label, { size = px(12.5), tracking = 0.12, keepWith = px(28) } = {}) => {
  const lh = size * 1.2;
  const rule = px(1);
  // Never leave a heading stranded at the foot of a page.
  L.ensure(lh + px(4) + rule + px(10) + keepWith);
  setFont(L.doc, { size, style: 'bold', color: INK });
  L.doc.text(label.toUpperCase(), MARGIN.left, baselineIn(L.y, size, lh), { charSpace: size * tracking });
  L.y += lh + px(4);
  L.doc.setDrawColor(0, 0, 0);
  L.doc.setLineWidth(rule);
  L.doc.line(MARGIN.left, L.y, L.right, L.y);
  L.y += rule + px(10);
};

/** Contact row: separated items, underlined + hyperlinked where they have a URL. */
const contactRow = (L, items) => {
  const doc = L.doc;
  const size = px(11.5);
  const lh = size * 1.4;
  const sep = '  ·  ';

  L.ensure(lh);
  let cx = MARGIN.left;

  items.forEach((item, i) => {
    setFont(doc, { size, color: MUTED });
    const sepW = i === 0 ? 0 : doc.getTextWidth(sep);
    setFont(doc, { size, color: item.url ? INK : BODY });
    const w = doc.getTextWidth(item.text);

    if (cx + sepW + w > MARGIN.left + L.contentW) {
      L.y += lh;
      L.ensure(lh);
      cx = MARGIN.left;
    } else if (i > 0) {
      setFont(doc, { size, color: MUTED });
      doc.text(sep, cx, baselineIn(L.y, size, lh));
      cx += sepW;
    }

    const baseline = baselineIn(L.y, size, lh);
    setFont(doc, { size, color: item.url ? INK : BODY });
    doc.text(item.text, cx, baseline);

    if (item.url) {
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.4);
      doc.line(cx, baseline + px(2), cx + w, baseline + px(2));
      doc.link(cx, baseline - size * ASCENT, w, size, { url: item.url });
    }

    cx += w;
  });

  L.y += lh;
};

const fileName = () =>
  `${header.name.replace(/\s+/g, '_')}_${(header.title.split('|')[0] || 'Resume').trim().replace(/\s+/g, '_')}.pdf`;

export default function generateResumePdf() {
  const doc = new jsPDF({ unit: 'pt', format: 'letter', compress: true });
  doc.setProperties({
    title: `${header.name} — ${header.title}`,
    subject: 'Resume',
    author: header.name,
    keywords: [
      ...Object.values(skills).flat(),
      ...enterprisePlatforms,
    ].join(', '),
    creator: header.name,
  });

  const L = new Layout(doc);

  // ---- Header --------------------------------------------------------------
  paragraph(L, header.name, { size: px(26), style: 'bold', color: INK, lh: px(26) * 1.15 });
  L.space(px(4));
  paragraph(L, header.title, { size: px(13), color: BODY, lh: px(13) * 1.3 });
  L.space(px(6));
  contactRow(L, [
    { text: header.email, url: `mailto:${header.email}` },
    { text: header.phone, url: `tel:${header.phone.replace(/\s/g, '')}` },
    { text: header.location },
    { text: header.linkedin.label, url: header.linkedin.url },
    { text: header.github.label, url: header.github.url },
  ]);
  L.space(px(24));

  // ---- Professional Summary ------------------------------------------------
  sectionTitle(L, 'Professional Summary');
  paragraph(L, summary, { size: px(11.5), lh: px(11.5) * 1.55 });
  L.space(px(24));

  // ---- Professional Experience ---------------------------------------------
  sectionTitle(L, 'Professional Experience');
  experience.forEach((role, idx) => {
    const roleLh = px(13) * 1.35;
    const subLh = px(11.5) * 1.35;
    const bulletOpts = { size: px(11.5), lh: px(11.5) * 1.5, gap: px(3) };

    // Keep the role heading with at least the opening of its first bullet.
    setFont(doc, { size: bulletOpts.size });
    const firstBulletLines = Math.min(
      2,
      doc.splitTextToSize(role.achievements[0] || '', L.contentW - px(18)).length
    );
    L.ensure(roleLh + subLh + px(6) + firstBulletLines * bulletOpts.lh);

    splitLine(
      L,
      [
        { text: role.title, size: px(13), style: 'bold', color: INK },
        { text: `, ${role.company}`, size: px(13), style: 'normal', color: INK },
      ],
      role.dates,
      { lh: roleLh, rightSize: px(11.5), rightColor: BODY }
    );
    paragraph(L, `${role.location}${role.workMode ? ` · ${role.workMode}` : ''}`, {
      size: px(11.5),
      color: MUTED,
      lh: subLh,
    });
    L.space(px(6));
    bulletList(L, role.achievements, bulletOpts);
    if (idx < experience.length - 1) L.space(px(14));
  });
  L.space(px(32));

  // ---- Key Projects (emphasised block, 2px rule above) ---------------------
  L.ensure(px(2) + px(16) + px(14) * 1.2 + px(60));
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(px(2));
  doc.line(MARGIN.left, L.y, L.right, L.y);
  L.space(px(2) + px(16));
  sectionTitle(L, 'Key Projects', { size: px(14), tracking: 0.14 });

  projects.forEach((project, idx) => {
    const titleLh = px(12.5) * 1.3;
    const techLh = px(11) * 1.35;
    const descLh = px(11.5) * 1.5;

    // break-inside: avoid — measure the whole block, then place it.
    setFont(doc, { size: px(11), style: 'italic' });
    const techLines = doc.splitTextToSize(project.tech, L.contentW).length;
    setFont(doc, { size: px(11.5) });
    const descLines = doc.splitTextToSize(project.description, L.contentW).length;
    L.ensure(titleLh + px(2) + techLines * techLh + px(3) + descLines * descLh);

    paragraph(L, project.title, { size: px(12.5), style: 'bold', color: INK, lh: titleLh });
    L.space(px(2));
    paragraph(L, project.tech, { size: px(11), style: 'italic', color: MUTED, lh: techLh });
    L.space(px(3));
    paragraph(L, project.description, { size: px(11.5), lh: descLh });
    if (idx < projects.length - 1) L.space(px(12));
  });
  L.space(px(24));

  // ---- Enterprise Platforms ------------------------------------------------
  sectionTitle(L, 'Enterprise Platforms');
  paragraph(L, enterprisePlatforms.join(' · '), { size: px(11.5), lh: px(11.5) * 1.6 });
  L.space(px(24));

  // ---- Technical Skills ----------------------------------------------------
  sectionTitle(L, 'Technical Skills');
  Object.entries(skills).forEach(([group, list], idx, all) => {
    runs(
      L,
      [
        { text: `${group}: `, size: px(11.5), style: 'bold', color: INK },
        { text: list.join(' · '), size: px(11.5), style: 'normal', color: BODY },
      ],
      { lh: px(11.5) * 1.6 }
    );
    if (idx < all.length - 1) L.space(px(6));
  });
  L.space(px(24));

  // ---- Education -----------------------------------------------------------
  sectionTitle(L, 'Education', { keepWith: px(18) });
  splitLine(
    L,
    [
      { text: education.degree, size: px(11.5), style: 'bold', color: INK },
      {
        text: `, ${education.institution}${education.field ? ` — ${education.field}` : ''}`,
        size: px(11.5),
        style: 'normal',
        color: BODY,
      },
    ],
    `${education.dates}${education.grade ? ` · ${education.grade}` : ''}`,
    { lh: px(11.5) * 1.5, rightSize: px(11.5), rightColor: MUTED }
  );
  L.space(px(24));

  // ---- Technical Expertise & Specializations -------------------------------
  const specOpts = { size: px(11.5), lh: px(11.5) * 1.5, gap: px(2) };
  sectionTitle(L, 'Technical Expertise & Specializations', {
    keepWith: Math.min(bulletHeight(L, specializations, specOpts), px(40)),
  });
  bulletList(L, specializations, specOpts);

  doc.save(fileName());
}
