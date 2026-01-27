import React, { useState, useRef } from 'react';
import { Mail, Phone, Linkedin, Github, MapPin, Calendar, ExternalLink, Moon, Sun } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import profileImage from './assets/images/profile.png'; // Import your profile image
import './Resume.css';

const Resume = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const resumeRef = useRef(null);

  const skillsData = {
    'Languages & Frameworks': ['JavaScript', 'Python', 'Node.js', 'React.js', 'PHP', 'Laravel', 'Google Apps Script', 'MS Power Automate', 'MS Power Apps'],
    'Cloud & DevOps': ['Google Cloud Platform', 'Cloud Functions Gen1/Gen2', 'Cloud Run', 'Pub/Sub', 'Bitbucket'],
    'Databases & APIs': ['PostgreSQL', 'REST APIs', 'Webhooks', 'OAuth 2.0', 'JSON', 'Postman', 'API Development'],
    'Enterprise Platforms': ['Salesforce', 'HubSpot', 'NetSuite', 'Microsoft 365', 'AWS S3', 'Zoho', 'Pipedrive', 'Xero', 'Google Calendar', 'Zendesk', 'Slack', 'Monday.com', 'ClickUp', 'JobNimbus', 'Archibus', 'Zapier', 'Google Drive',
      'QuickBooks', 'Quickbase', 'Insightly', 'Motive', 'Nimble', 'Tape', 'SubcontractorHub'
    ]
  };

  const skillColors = ['blue', 'green', 'purple', 'orange'];

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const element = resumeRef.current;

      // Store original styles
      const originalPadding = element.style.padding;
      const originalMargin = element.style.margin;

      // Temporarily hide the dark mode toggle for PDF
      const darkToggle = element.querySelector('.dark-toggle');
      if (darkToggle) darkToggle.style.display = 'none';

      // Optimize element for PDF capture
      element.style.padding = '0';
      element.style.margin = '0';

      // Configure html2canvas for high quality
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

      // Restore original styles
      element.style.padding = originalPadding;
      element.style.margin = originalMargin;
      if (darkToggle) darkToggle.style.display = 'block';

      const imgData = canvas.toDataURL('image/png', 1.0);

      // PDF dimensions (A4)
      const pdfWidth = 210; // mm
      const pdfHeight = 297; // mm
      const margin = 10; // mm
      const contentWidth = pdfWidth - (margin * 2);

      // Calculate scaling
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgWidth / imgHeight;

      const scaledWidth = contentWidth;
      const scaledHeight = scaledWidth / ratio;

      const pdf = new jsPDF('p', 'mm', 'a4', true);

      let heightLeft = scaledHeight;
      let position = margin;
      let pageCount = 0;

      // Add pages
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

        // Safety limit
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

  const projects = [
    {
      title: 'Multi-Platform Enterprise Integration System',
      tech: 'Node.js, Python, GCP Cloud Functions, PostgreSQL, OAuth 2.0, Webhooks',
      description: 'Architected a unified integration platform connecting Arrivy with 15+ enterprise systems. Implemented bi-directional data sync, webhook processing, and automated field mapping. Reduced integration setup time from weeks to hours and achieved 99.9% data accuracy.',
      color: 'blue'
    },
    {
      title: 'Automated Customer Onboarding Platform',
      tech: 'Python, Node.js, Cloud Run, Pub/Sub, REST APIs',
      description: 'Developed an intelligent system for migrating customer data from various sources (CSV, Excel, APIs) into Arrivy\'s platform. Features include data validation, transformation, and error recovery. Reduced onboarding time by 80% and eliminated manual data entry errors.',
      color: 'green'
    },
    {
      title: 'Internal Workflow Automation Suite',
      tech: 'Python, Node.js, React.js, Monday.com API, ClickUp API, Slack API, Cloud Run, Pub/Sub',
      description: 'Built comprehensive automation tools for task management, customer request routing, and real-time status updates. Integrated with Slack for instant notifications and created dashboards for performance monitoring. Improved team productivity by 40%.',
      color: 'orange'
    },
    {
      title: 'Triangle Integration Architecture',
      tech: 'Node.js, GCP Pub/Sub, Webhooks, REST APIs',
      description: 'Designed complex multi-directional data flow system enabling seamless communication between three or more platforms simultaneously. Implemented intelligent conflict resolution and data consistency algorithms ensuring real-time synchronization.',
      color: 'dark-green'
    }
  ];

  const themeClass = darkMode ? 'dark' : 'light';

  return (
    <div className={`container ${themeClass}`}>
      {/* Dark Mode Toggle */}
      <div style={{ maxWidth: '64rem', margin: '0 auto 1rem', textAlign: 'right' }}>
        <button onClick={() => setDarkMode(!darkMode)} className={`dark-toggle ${themeClass}`}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div ref={resumeRef} className={`resume-card ${themeClass}`}>
        {/* Header */}
        <div className={`header ${themeClass}`}>
          <div className="header-content">
            {/* Profile Picture */}
            <div className="profile-image">
              <img src={profileImage} alt="Ali Afzal" />
            </div>

            {/* Header Text */}
            <div className="header-text">
              <h1>Ali Afzal</h1>
              <h2>Software Engineer II | Cloud Integration Specialist</h2>
              <div className="contact-links">
                <a href="mailto:aliafzal.me1@gmail.com" className="contact-link">
                  <Mail size={16} /> aliafzal.me1@gmail.com
                </a>
                <a href="tel:+923041056703" className="contact-link">
                  <Phone size={16} /> +92 304 1056703
                </a>
                <span className="contact-link">
                  <MapPin size={16} /> Lahore, Pakistan
                </span>
                <a href="https://www.linkedin.com/in/ali-afzal-790966177" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <Linkedin size={16} /> LinkedIn
                </a>

              </div>
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <div className={`section ${themeClass}`}>
          <h3 className={`section-title ${themeClass}`}>Professional Summary</h3>
          <p className={`text ${themeClass}`}>
            Software Engineer with 4+ years of experience specializing in cloud-based integrations and automation.
            Expert in building scalable solutions that connect enterprise systems and streamline operations.
            At Arrivy, architected and deployed 15+ enterprise integrations (HubSpot, Salesforce, NetSuite, Zoho, Pipedrive)
            serving 500+ business clients, reducing manual processes by 70% and improving data accuracy across platforms.
            Passionate about solving real-time problems through innovative technology solutions and automation.
          </p>
        </div>

        {/* Technical Skills */}
        <div className={`section ${themeClass}`}>
          <h3 className={`section-title ${themeClass}`}>Technical Skills</h3>
          <div className="skills-grid">
            {Object.entries(skillsData).map(([category, skills], index) => (
              <div key={category} className="skills-category">
                <h4 className={themeClass}>{category}</h4>
                <div>
                  {skills.map(skill => (
                    <span key={skill} className={`skill skill-${skillColors[index]} ${themeClass}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className={`section ${themeClass}`}>
          <h3 className={`section-title ${themeClass}`}>Professional Experience</h3>
          <div>
            <div className="experience-header">
              <div className="experience-title">
                <h4 className={themeClass}>Software Engineer II</h4>
                <p className={`experience-company ${themeClass}`}>Arrivy - Field Service Management SaaS Platform</p>
              </div>
              <div className="experience-date">
                <p className={`date ${themeClass}`}>
                  <Calendar size={16} /> Sep 2021 - Present (4 years)
                </p>
                <p className="location">Lahore, Pakistan | On-site</p>
              </div>
            </div>

            <div className="achievements">
              <p className={themeClass}>Key Achievements:</p>
              <ul className={themeClass}>
                <li>Built full bi-directional integrations with 15+ platforms including HubSpot, Zoho, Pipedrive, Salesforce, Google Calendar, Microsoft 365, AWS S3, Motive, NetSuite, Quickbase, Slack, Zendesk, Xero, Insightly, Nimble, and Archibus</li>
                <li>Reduced customer onboarding time by 80% through automated data migration scripts in Python and Node.js</li>
                <li>Designed event-driven architecture using GCP Pub/Sub, processing 1M+ events monthly with 99.9% uptime</li>
                <li>Decreased manual data entry by 70% through automated workflows and real-time synchronization</li>
                <li>Optimized PostgreSQL database performance, improving API response times by 60%</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className={`section ${themeClass}`}>
          <h3 className={`section-title ${themeClass}`}>Key Projects</h3>
          <div>
            {projects.map((project, index) => (
              <div key={index} className={`project-card ${project.color} ${themeClass}`}>
                <h4 className={themeClass}>{project.title}</h4>
                <p className={`project-tech ${themeClass}`}>{project.tech}</p>
                <p className={`text ${themeClass}`}>{project.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className={`section ${themeClass}`}>
          <h3 className={`section-title ${themeClass}`}>Education</h3>
          <div className="education-header">
            <div className="education-info">
              <h4 className={themeClass}>Bachelor of Software Engineering (BSSE)</h4>
              <p className={themeClass}>University of Sargodha</p>
              <p className={themeClass}>Computer and Information Sciences</p>
            </div>
            <div className="education-dates">
              <p className={`year ${themeClass}`}>2016 - 2020</p>
              <p className="grade">Grade: B</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`footer ${themeClass}`}>
          <p>References available upon request | Open to remote and hybrid opportunities | Immediate availability</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button
          onClick={handleDownloadPDF}
          className={`button download-button ${themeClass}`}
          disabled={isGenerating}
        >
          <ExternalLink size={18} />
          {isGenerating ? 'Generating PDF...' : 'Download as PDF'}
        </button>
        <a href="mailto:aliafzal.me1@gmail.com" className={`button contact-button ${themeClass}`}>
          <Mail size={18} /> Contact Me
        </a>
      </div>
    </div>
  );
};

export default Resume;