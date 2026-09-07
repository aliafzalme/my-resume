import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import generateResumePdf from './generateResumePdf';
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
import './MyResume.css';

const ICON_SIZE = 12;

const ContactItem = ({ icon: Icon, children }) => (
  <span className="r2-contact-item">
    <Icon className="r2-icon" size={ICON_SIZE} strokeWidth={1.75} aria-hidden="true" />
    {children}
  </span>
);

const Separator = () => <span className="r2-sep" aria-hidden="true">·</span>;

const MyResume = () => {
  const [pdfError, setPdfError] = useState(null);

  /*
   * Builds the PDF in-page rather than going through window.print(). A printed
   * PDF depends on the destination driver, and "Microsoft Print to PDF" writes
   * glyphs as vector outlines with no text layer — the file looks right but
   * every ATS and text extractor reads it as blank.
   */
  const handleDownload = () => {
    setPdfError(null);
    try {
      generateResumePdf();
    } catch (err) {
      setPdfError('PDF generation failed. Use Print instead and pick "Save as PDF".');
      // eslint-disable-next-line no-console
      console.error('Resume PDF generation failed:', err);
    }
  };

  return (
    <div className="r2-page">
      <div className="r2-actions">
        <button type="button" className="r2-print-action" onClick={handleDownload}>
          Download PDF
        </button>
        <button
          type="button"
          className="r2-print-action r2-print-action--secondary"
          onClick={() => window.print()}
          title='Browser print — choose "Save as PDF", not "Microsoft Print to PDF"'
        >
          Print
        </button>
        {pdfError && <span className="r2-actions-error" role="alert">{pdfError}</span>}
      </div>

      <main className="r2-doc">
        <header className="r2-header">
          <h1 className="r2-name">{header.name}</h1>
          <p className="r2-role">{header.title}</p>
          <div className="r2-contact">
            <ContactItem icon={Mail}>
              <a href={`mailto:${header.email}`}>{header.email}</a>
            </ContactItem>
            <Separator />
            <ContactItem icon={Phone}>
              <a href={`tel:${header.phone.replace(/\s/g, '')}`}>{header.phone}</a>
            </ContactItem>
            <Separator />
            <ContactItem icon={MapPin}>{header.location}</ContactItem>
            <Separator />
            <ContactItem icon={Linkedin}>
              <a href={header.linkedin.url} target="_blank" rel="noopener noreferrer">
                {header.linkedin.label}
              </a>
            </ContactItem>
            <Separator />
            <ContactItem icon={Github}>
              <a href={header.github.url} target="_blank" rel="noopener noreferrer">
                {header.github.label}
              </a>
            </ContactItem>
          </div>
        </header>

        <section className="r2-section">
          <h2 className="r2-section-title">Professional Summary</h2>
          <p className="r2-summary">{summary}</p>
        </section>

        <section className="r2-section">
          <h2 className="r2-section-title">Professional Experience</h2>
          {experience.map((role, idx) => (
            <article key={`${role.company}-${idx}`} className="r2-experience-entry">
              <div className="r2-role-line">
                <div className="r2-role-line-left">
                  <span className="r2-role-title">{role.title}</span>
                  {', '}
                  <span className="r2-role-company">{role.company}</span>
                </div>
                <div className="r2-role-line-right">{role.dates}</div>
              </div>
              <div className="r2-role-sub">
                {role.location}
                {role.workMode ? ` · ${role.workMode}` : ''}
              </div>
              <ul className="r2-bullets">
                {role.achievements.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="r2-section r2-section--projects">
          <h2 className="r2-section-title">Key Projects</h2>
          {projects.map((p) => (
            <article key={p.title} className="r2-project">
              <h3 className="r2-project-title">{p.title}</h3>
              <p className="r2-project-tech">{p.tech}</p>
              <p className="r2-project-desc">{p.description}</p>
            </article>
          ))}
        </section>

        <section className="r2-section">
          <h2 className="r2-section-title">Enterprise Platforms</h2>
          <p className="r2-inline-list">{enterprisePlatforms.join(' · ')}</p>
        </section>

        <section className="r2-section">
          <h2 className="r2-section-title">Technical Skills</h2>
          <div className="r2-inline-list">
            {Object.entries(skills).map(([group, list]) => (
              <div key={group} className="r2-skill-group">
                <span className="r2-skill-group-label">{group}:</span>{' '}
                <span>{list.join(' · ')}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="r2-section">
          <h2 className="r2-section-title">Education</h2>
          <div className="r2-edu-line">
            <div className="r2-edu-left">
              <span className="r2-edu-degree">{education.degree}</span>
              {', '}
              {education.institution}
              {education.field ? ` — ${education.field}` : ''}
            </div>
            <div className="r2-edu-right">
              {education.dates}
              {education.grade ? ` · ${education.grade}` : ''}
            </div>
          </div>
        </section>

        <section className="r2-section">
          <h2 className="r2-section-title">Technical Expertise &amp; Specializations</h2>
          <ul className="r2-spec-list">
            {specializations.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default MyResume;
