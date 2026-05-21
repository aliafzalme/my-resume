import React, { useState, useRef } from 'react';
import { Mail, Phone, Linkedin, Github, MapPin, Calendar, ExternalLink, Moon, Sun } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import profileImage from '../../assets/images/profile.png';
import {
  header,
  summary,
  skills,
  enterprisePlatforms,
  experience,
  projects,
  education,
  specializations,
  footer,
} from '../../data/resume';
import '../../Resume.css';

// v1 keeps its decorative palette as a local visual concern.
const skillColors = ['blue', 'green', 'purple', 'orange', 'teal'];
const projectColors = ['blue', 'green', 'orange', 'dark-green'];

const skillsDataWithPlatforms = {
  ...skills,
  'Enterprise Platforms': enterprisePlatforms,
};

const MyResume = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const resumeRef = useRef(null);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const element = resumeRef.current;

      const originalPadding = element.style.padding;
      const originalMargin = element.style.margin;

      const darkToggle = element.querySelector('.dark-toggle');
      if (darkToggle) darkToggle.style.display = 'none';

      element.style.padding = '0';
      element.style.margin = '0';

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: darkMode ? '#1a202c' : '#f7fafc',
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        scrollY: -window.scrollY,
        scrollX: -window.scrollX,
      });

      element.style.padding = originalPadding;
      element.style.margin = originalMargin;
      if (darkToggle) darkToggle.style.display = 'block';

      const pdfWidth = 210;
      const pdfHeight = 297;
      const margin = 10;
      const contentWidth = pdfWidth - (margin * 2);

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgWidth / imgHeight;

      const scaledWidth = contentWidth;
      const scaledHeight = scaledWidth / ratio;

      const pdf = new jsPDF('p', 'mm', 'a4', true);

      let heightLeft = scaledHeight;
      let pageCount = 0;

      while (heightLeft > 0) {
        if (pageCount > 0) {
          pdf.addPage();
        }

        const pageContentHeight = pdfHeight - (margin * 2);
        const sourceY = pageCount * pageContentHeight * (imgHeight / scaledHeight);
        const sourceHeight = Math.min(
          pageContentHeight * (imgHeight / scaledHeight),
          imgHeight - sourceY
        );

        if (sourceHeight > 0) {
          const croppedCanvas = document.createElement('canvas');
          croppedCanvas.width = imgWidth;
          croppedCanvas.height = sourceHeight;
          const ctx = croppedCanvas.getContext('2d');

          ctx.drawImage(
            canvas,
            0, sourceY,
            imgWidth, sourceHeight,
            0, 0,
            imgWidth, sourceHeight
          );

          const croppedImgData = croppedCanvas.toDataURL('image/png', 1.0);
          const croppedScaledHeight = (sourceHeight / imgHeight) * scaledHeight;

          pdf.addImage(
            croppedImgData,
            'PNG',
            margin,
            margin,
            contentWidth,
            croppedScaledHeight,
            '',
            'FAST'
          );
        }

        heightLeft -= pageContentHeight;
        pageCount++;

        if (pageCount > 10) break;
      }

      pdf.save('Ali_Afzal_Resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating the PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const themeClass = darkMode ? 'dark' : 'light';
  const exp = experience[0];

  return (
    <div className={`container ${themeClass}`}>
      <div style={{ maxWidth: '64rem', margin: '0 auto 1rem', textAlign: 'right' }}>
        <button onClick={() => setDarkMode(!darkMode)} className={`dark-toggle ${themeClass}`}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div ref={resumeRef} className={`resume-card ${themeClass}`}>
        <div className={`header ${themeClass}`}>
          <div className="header-content">
            <div className="profile-image">
              <img src={profileImage} alt={header.name} />
            </div>

            <div className="header-text">
              <h1>{header.name}</h1>
              <h2>{header.title}</h2>
              <div className="contact-links">
                <a href={`mailto:${header.email}`} className="contact-link">
                  <Mail size={16} /> {header.email}
                </a>
                <a href={`tel:${header.phone.replace(/\s/g, '')}`} className="contact-link">
                  <Phone size={16} /> {header.phone}
                </a>
                <span className="contact-link">
                  <MapPin size={16} /> {header.location}
                </span>
                <a href={header.linkedin.url} target="_blank" rel="noopener noreferrer" className="contact-link">
                  <Linkedin size={16} /> {header.linkedin.label}
                </a>
                <a href={header.github.url} target="_blank" rel="noopener noreferrer" className="contact-link">
                  <Github size={16} /> {header.github.label}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={`section ${themeClass}`}>
          <h3 className={`section-title ${themeClass}`}>Professional Summary</h3>
          <p className={`text ${themeClass}`}>{summary}</p>
        </div>

        <div className={`section ${themeClass}`}>
          <h3 className={`section-title ${themeClass}`}>Technical Skills</h3>
          <div className="skills-grid">
            {Object.entries(skillsDataWithPlatforms).map(([category, list], index) => (
              <div key={category} className="skills-category">
                <h4 className={themeClass}>{category}</h4>
                <div>
                  {list.map(skill => (
                    <span key={skill} className={`skill skill-${skillColors[index % skillColors.length]} ${themeClass}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`section ${themeClass}`}>
          <h3 className={`section-title ${themeClass}`}>Professional Experience</h3>
          <div>
            <div className="experience-header">
              <div className="experience-title">
                <h4 className={themeClass}>{exp.title}</h4>
                <p className={`experience-company ${themeClass}`}>{exp.company}</p>
              </div>
              <div className="experience-date">
                <p className={`date ${themeClass}`}>
                  <Calendar size={16} /> {exp.dates}
                </p>
                <p className="location">{exp.location} | {exp.workMode}</p>
              </div>
            </div>

            <div className="achievements">
              <p className={themeClass}>Key Achievements:</p>
              <ul className={themeClass}>
                {exp.achievements.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={`section ${themeClass}`}>
          <h3 className={`section-title ${themeClass}`}>Key Projects</h3>
          <div>
            {projects.map((project, index) => (
              <div key={project.title} className={`project-card ${projectColors[index % projectColors.length]} ${themeClass}`}>
                <h4 className={themeClass}>{project.title}</h4>
                <p className={`project-tech ${themeClass}`}>{project.tech}</p>
                <p className={`text ${themeClass}`}>{project.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`section ${themeClass}`}>
          <h3 className={`section-title ${themeClass}`}>Education</h3>
          <div className="education-header">
            <div className="education-info">
              <h4 className={themeClass}>{education.degree}</h4>
              <p className={themeClass}>{education.institution}</p>
              <p className={themeClass}>{education.field}</p>
            </div>
            <div className="education-dates">
              <p className={`year ${themeClass}`}>{education.dates}</p>
              <p className="grade">{education.grade}</p>
            </div>
          </div>
        </div>

        <div className={`section ${themeClass}`}>
          <h3 className={`section-title ${themeClass}`}>Technical Expertise & Specializations</h3>
          <div className="achievements">
            <ul className={themeClass}>
              {specializations.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`footer ${themeClass}`}>
          <p>{footer}</p>
        </div>
      </div>

      <div className="action-buttons">
        <button
          onClick={handleDownloadPDF}
          className={`button download-button ${themeClass}`}
          disabled={isGenerating}
        >
          <ExternalLink size={18} />
          {isGenerating ? 'Generating PDF...' : 'Download as PDF'}
        </button>
        <a href={`mailto:${header.email}`} className={`button contact-button ${themeClass}`}>
          <Mail size={18} /> Contact Me
        </a>
      </div>
    </div>
  );
};

export default MyResume;
