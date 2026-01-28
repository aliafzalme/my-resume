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
    'Cloud & DevOps': ['Google Cloud Platform', 'Cloud Functions', 'Cloud Run', 'Pub/Sub', 'Cloud Monitoring', 'Cloud Logging', 'Error Reporting', 'Git', 'Bitbucket', 'CI/CD'],
    'Integration & Architecture': ['REST APIs', 'Webhooks', 'OAuth 2.0', 'API Development', 'Microservices', 'Event-Driven Architecture', 'ETL/ELT', 'Data Pipelines', 'iPaaS', 'Middleware'],
    'Databases & Tools': ['PostgreSQL', 'JSON', 'Postman', 'API Testing', 'Database Optimization', 'Data Migration'],
    'Enterprise Platforms': ['Salesforce', 'HubSpot', 'NetSuite', 'Microsoft 365', 'AWS S3', 'Zoho', 'Pipedrive', 'Xero', 'Google Calendar', 'Zendesk', 'Slack', 'Monday.com', 'ClickUp', 'JobNimbus', 'Archibus', 'Zapier', 'QuickBooks', 'Quickbase', 'Insightly', 'Motive', 'Nimble']
  };

  const skillColors = ['blue', 'green', 'purple', 'orange', 'teal'];

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
      title: 'Enterprise iPaaS Integration Platform',
      tech: 'Node.js, Python, GCP Cloud Functions, PostgreSQL, OAuth 2.0, REST APIs, Webhooks, Event-Driven Architecture',
      description: 'Architected scalable middleware platform connecting 15+ enterprise systems (Salesforce, HubSpot, NetSuite, Microsoft 365) with bi-directional data synchronization. Implemented intelligent field mapping, rate limiting, and retry logic. Reduced integration deployment time from 2 weeks to 4 hours with 99.9% data accuracy.',
      color: 'blue'
    },
    {
      title: 'Automated ETL Data Migration Engine',
      tech: 'Python, Node.js, GCP Cloud Run, Pub/Sub, REST APIs, Data Pipelines, PostgreSQL',
      description: 'Built intelligent ETL system processing 500+ enterprise data migrations from multiple sources (CSV, Excel, REST APIs) with automated validation, transformation, and error recovery. Implemented batch processing handling 1M+ records with 99.9% success rate. Reduced onboarding time by 80% and eliminated manual errors.',
      color: 'green'
    },
    {
      title: 'Real-Time Workflow Automation Platform',
      tech: 'Python, Node.js, React.js, Monday.com API, ClickUp API, Slack API, Webhooks, Cloud Run, Pub/Sub, Microservices',
      description: 'Engineered event-driven automation platform for task management and customer request routing. Built real-time notification system via Slack webhooks and performance dashboards. Implemented queue-based processing handling 50K+ daily events. Improved operational efficiency by 40%.',
      color: 'orange'
    },
    {
      title: 'Multi-Directional Data Synchronization System',
      tech: 'Node.js, GCP Pub/Sub, Webhooks, REST APIs, Conflict Resolution, Event-Driven Architecture',
      description: 'Designed complex multi-platform synchronization architecture enabling real-time data flow between 3+ systems simultaneously. Implemented distributed conflict resolution using timestamp-based algorithms and eventual consistency patterns. Achieved sub-second latency for 99% of transactions.',
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
              <h2>Senior Integration Engineer | API & Cloud Solutions Specialist</h2>
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
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <Github size={16} /> GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <div className={`section ${themeClass}`}>
          <h3 className={`section-title ${themeClass}`}>Professional Summary</h3>
          <p className={`text ${themeClass}`}>
            Senior Integration Engineer with 4+ years of experience architecting scalable API integrations and cloud-based automation solutions.
            Specialized in building event-driven microservices and ETL pipelines connecting enterprise platforms (Salesforce, HubSpot, NetSuite, Microsoft 365).
            Delivered 15+ production integrations serving 500+ enterprise clients, processing 10M+ API calls monthly with 99.9% uptime SLA.
            Reduced manual data entry by 70% and cut integration setup time from weeks to hours through intelligent automation.
            Expertise in REST APIs, OAuth 2.0, webhooks, GCP, and cross-platform data synchronization.
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
                <li>Architected and deployed 15+ bi-directional API integrations (Salesforce, HubSpot, NetSuite, Zoho, Pipedrive, Microsoft 365) processing 10M+ records monthly, reducing data sync time by 85% and saving clients $500K+ annually in manual labor costs</li>
                <li>Engineered automated customer onboarding platform handling 500+ enterprise migrations, reducing onboarding time from 2 weeks to 2 hours (80% improvement) while achieving 99.9% data accuracy through intelligent validation and error recovery mechanisms</li>
                <li>Designed scalable event-driven microservices architecture using GCP Cloud Functions and Pub/Sub, processing 1M+ webhook events monthly with 99.9% uptime and sub-200ms average response time</li>
                <li>Built complex multi-platform data synchronization system enabling real-time bidirectional data flow between 3+ systems simultaneously, implementing intelligent conflict resolution and maintaining data consistency across platforms</li>
                <li>Optimized PostgreSQL database queries and implemented connection pooling, improving API response times by 60% and reducing database costs by 40% while handling 5x traffic increase</li>
                <li>Developed robust error handling and retry logic with exponential backoff, reducing integration failure rates from 5% to 0.1% and improving overall system reliability</li>
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

        {/* Technical Expertise */}
        <div className={`section ${themeClass}`}>
          <h3 className={`section-title ${themeClass}`}>Technical Expertise & Specializations</h3>
          <div className="achievements">
            <ul className={themeClass}>
              <li>Google Cloud Platform - Production-level expertise with Cloud Functions, Cloud Run, Pub/Sub, and Cloud Monitoring</li>
              <li>API Architecture & Security - Advanced experience in RESTful API design, OAuth 2.0 implementation, and webhook integration</li>
              <li>Event-Driven Systems - Hands-on experience architecting microservices and distributed systems using Pub/Sub messaging</li>
              <li>Enterprise Integrations - Deep expertise in iPaaS patterns, ETL pipelines, and multi-platform data synchronization</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className={`footer ${themeClass}`}>
          <p>Open to remote & hybrid roles globally | Authorized to work in Pakistan | Willing to relocate for the right opportunity | Available for immediate start | References available upon request</p>
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