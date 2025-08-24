import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Github, MapPin, Calendar, ExternalLink, Upload, User, Moon, Sun } from 'lucide-react';

const Resume = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: darkMode ? '#1a202c' : '#f7fafc',
      padding: '2rem',
      transition: 'background-color 0.5s'
    },
    resumeCard: {
      maxWidth: '64rem',
      margin: '0 auto',
      backgroundColor: darkMode ? '#2d3748' : '#ffffff',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      transition: 'all 0.5s'
    },
    header: {
      background: darkMode 
        ? 'linear-gradient(to right, #553c9a, #6b46c1)' 
        : 'linear-gradient(to right, #2563eb, #1e40af)',
      color: 'white',
      padding: '2.5rem 2rem'
    },
    darkToggle: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      padding: '0.75rem',
      borderRadius: '50%',
      backgroundColor: darkMode ? '#4a5568' : '#ffffff',
      color: darkMode ? '#fbbf24' : '#1a202c',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    profileImage: {
      width: '128px',
      height: '128px',
      borderRadius: '50%',
      overflow: 'hidden',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      border: '4px solid rgba(255, 255, 255, 0.5)',
      position: 'relative',
      marginBottom: '1rem'
    },
    section: {
      padding: '1.5rem 2rem',
      borderBottom: darkMode ? '1px solid #4a5568' : '1px solid #e2e8f0'
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: darkMode ? '#ffffff' : '#1a202c'
    },
    text: {
      color: darkMode ? '#e2e8f0' : '#4a5568',
      lineHeight: 1.6
    },
    skill: {
      display: 'inline-block',
      padding: '0.25rem 0.75rem',
      margin: '0.25rem',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      transition: 'transform 0.2s',
      cursor: 'default'
    },
    skillBlue: {
      backgroundColor: darkMode ? '#2c5282' : '#dbeafe',
      color: darkMode ? '#bee3f8' : '#1e40af'
    },
    skillGreen: {
      backgroundColor: darkMode ? '#276749' : '#d1fae5',
      color: darkMode ? '#9ae6b4' : '#065f46'
    },
    skillPurple: {
      backgroundColor: darkMode ? '#553c9a' : '#e9d8fd',
      color: darkMode ? '#d6bcfa' : '#6b21a8'
    },
    skillOrange: {
      backgroundColor: darkMode ? '#c05621' : '#fed7aa',
      color: darkMode ? '#fbd38d' : '#c2410c'
    },
    contactLink: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: 'white',
      textDecoration: 'none',
      marginRight: '1rem',
      fontSize: '0.875rem',
      transition: 'transform 0.2s'
    },
    button: {
      padding: '0.5rem 1.5rem',
      borderRadius: '0.5rem',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      margin: '1rem 0.5rem',
      transition: 'transform 0.2s',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    downloadButton: {
      backgroundColor: darkMode ? '#6b46c1' : '#2563eb'
    },
    contactButton: {
      backgroundColor: darkMode ? '#4c1d95' : '#059669'
    },
    projectCard: {
      borderLeft: '4px solid',
      paddingLeft: '1rem',
      marginBottom: '1rem',
      padding: '0.5rem 0 0.5rem 1rem',
      borderRadius: '0 0.25rem 0.25rem 0',
      transition: 'all 0.3s'
    }
  };

  return (
    <div style={styles.container}>
      {/* Dark Mode Toggle */}
      <div style={{ maxWidth: '64rem', margin: '0 auto 1rem', textAlign: 'right' }}>
        <button onClick={() => setDarkMode(!darkMode)} style={styles.darkToggle}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div style={styles.resumeCard}>
        {/* Header */}
        <div style={styles.header}>
          <div style={{ display: 'flex', flexDirection: window.innerWidth > 768 ? 'row' : 'column', alignItems: 'center', gap: '1.5rem' }}>
            {/* Profile Picture */}
            <div style={styles.profileImage}>
              {profileImage ? (
                <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={48} style={{ opacity: 0.7 }} />
                </div>
              )}
              <label htmlFor="profile-upload" style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: '50%',
                opacity: 0,
                cursor: 'pointer',
                transition: 'opacity 0.3s'
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = 1}
              onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                <Upload size={24} color="white" />
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </div>

            {/* Header Text */}
            <div style={{ flex: 1, textAlign: window.innerWidth > 768 ? 'left' : 'center' }}>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Ali Afzal</h1>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Software Engineer II | Cloud Integration Specialist</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: window.innerWidth > 768 ? 'flex-start' : 'center' }}>
                <a href="mailto:aliafzal.me1@gmail.com" style={styles.contactLink}>
                  <Mail size={16} /> aliafzal.me1@gmail.com
                </a>
                <a href="tel:+923041056703" style={styles.contactLink}>
                  <Phone size={16} /> +92 304 1056703
                </a>
                <span style={styles.contactLink}>
                  <MapPin size={16} /> Lahore, Pakistan
                </span>
                <a href="https://linkedin.com/in/ali-afzal-790966177" target="_blank" rel="noopener noreferrer" style={styles.contactLink}>
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a href="https://github.com/aliafzal" target="_blank" rel="noopener noreferrer" style={styles.contactLink}>
                  <Github size={16} /> GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Professional Summary</h3>
          <p style={styles.text}>
            Software Engineer with 4+ years of experience specializing in cloud-based integrations and automation. 
            Expert in building scalable solutions that connect enterprise systems and streamline operations. 
            At Arrivy, architected and deployed 15+ enterprise integrations (HubSpot, Salesforce, NetSuite, Zoho, Pipedrive) 
            serving 500+ business clients, reducing manual processes by 70% and improving data accuracy across platforms. 
            Passionate about solving real-time problems through innovative technology solutions and automation.
          </p>
        </div>

        {/* Technical Skills */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Technical Skills</h3>
          <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 768 ? 'repeat(2, 1fr)' : '1fr', gap: '1rem' }}>
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', color: darkMode ? '#e2e8f0' : '#4a5568' }}>Languages & Frameworks</h4>
              <div>
                {['JavaScript', 'Python', 'Node.js', 'React.js', 'Java', 'PHP', 'Laravel', 'Google Apps Script'].map(skill => (
                  <span key={skill} style={{...styles.skill, ...styles.skillBlue}}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) translateY(0)'}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', color: darkMode ? '#e2e8f0' : '#4a5568' }}>Cloud & DevOps</h4>
              <div>
                {['Google Cloud Platform', 'Cloud Functions Gen1/Gen2', 'Cloud Run', 'Pub/Sub', 'Bitbucket'].map(skill => (
                  <span key={skill} style={{...styles.skill, ...styles.skillGreen}}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) translateY(0)'}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', color: darkMode ? '#e2e8f0' : '#4a5568' }}>Databases & APIs</h4>
              <div>
                {['PostgreSQL', 'REST APIs', 'Webhooks', 'OAuth 2.0', 'JSON', 'Postman', 'API Development'].map(skill => (
                  <span key={skill} style={{...styles.skill, ...styles.skillPurple}}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) translateY(0)'}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', color: darkMode ? '#e2e8f0' : '#4a5568' }}>Enterprise Platforms</h4>
              <div>
                {['Salesforce', 'HubSpot', 'NetSuite', 'Microsoft 365', 'AWS S3', 'Zoho', 'Pipedrive', 'Xero', 'Google Calendar'].map(skill => (
                  <span key={skill} style={{...styles.skill, ...styles.skillOrange}}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) translateY(0)'}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Professional Experience</h3>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <div>
                <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: darkMode ? '#ffffff' : '#1a202c' }}>Software Engineer II</h4>
                <p style={{ color: darkMode ? '#cbd5e0' : '#718096' }}>Arrivy - Field Service Management SaaS Platform</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: darkMode ? '#cbd5e0' : '#718096', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Calendar size={16} /> Sep 2021 - Present (4 years)
                </p>
                <p style={{ fontSize: '0.875rem', color: darkMode ? '#a0aec0' : '#a0aec0' }}>Lahore, Pakistan | On-site</p>
              </div>
            </div>
            
            <div style={{ marginTop: '1rem' }}>
              <p style={{ fontWeight: '600', marginBottom: '0.5rem', color: darkMode ? '#e2e8f0' : '#4a5568' }}>Key Achievements:</p>
              <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', color: darkMode ? '#cbd5e0' : '#718096' }}>
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
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Key Projects</h3>
          <div>
            <div style={{...styles.projectCard, borderLeftColor: '#2563eb', backgroundColor: darkMode ? 'rgba(37, 99, 235, 0.1)' : 'rgba(37, 99, 235, 0.05)'}}>
              <h4 style={{ fontWeight: '600', color: darkMode ? '#ffffff' : '#1a202c' }}>Multi-Platform Enterprise Integration System</h4>
              <p style={{ fontSize: '0.875rem', color: darkMode ? '#cbd5e0' : '#718096', marginBottom: '0.25rem' }}>Node.js, Python, GCP Cloud Functions, PostgreSQL, OAuth 2.0, Webhooks</p>
              <p style={styles.text}>
                Architected a unified integration platform connecting Arrivy with 15+ enterprise systems. Implemented 
                bi-directional data sync, webhook processing, and automated field mapping. Reduced integration setup 
                time from weeks to hours and achieved 99.9% data accuracy.
              </p>
            </div>
            
            <div style={{...styles.projectCard, borderLeftColor: '#10b981', backgroundColor: darkMode ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.05)'}}>
              <h4 style={{ fontWeight: '600', color: darkMode ? '#ffffff' : '#1a202c' }}>Automated Customer Onboarding Platform</h4>
              <p style={{ fontSize: '0.875rem', color: darkMode ? '#cbd5e0' : '#718096', marginBottom: '0.25rem' }}>Python, Node.js, Cloud Run, Pub/Sub, REST APIs</p>
              <p style={styles.text}>
                Developed an intelligent system for migrating customer data from various sources (CSV, Excel, APIs) 
                into Arrivy's platform. Features include data validation, transformation, and error recovery. 
                Reduced onboarding time by 80% and eliminated manual data entry errors.
              </p>
            </div>

            <div style={{...styles.projectCard, borderLeftColor: '#e0a957ff', backgroundColor: darkMode ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.05)'}}>
              <h4 style={{ fontWeight: '600', color: darkMode ? '#ffffff' : '#1a202c' }}>Internal Workflow Automation Suite</h4>
              <p style={{ fontSize: '0.875rem', color: darkMode ? '#cbd5e0' : '#718096', marginBottom: '0.25rem' }}>Python, Node.js, React.js, Monday.com API, ClickUp API, Slack API, Cloud Run, Pub/Sub</p>
              <p style={styles.text}>
                Built comprehensive automation tools for task management, customer request routing, and real-time 
                status updates. Integrated with Slack for instant notifications and created dashboards for 
                performance monitoring. Improved team productivity by 40%.
              </p>
            </div>
        
            <div style={{...styles.projectCard, borderLeftColor: '#17480cff', backgroundColor: darkMode ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.05)'}}>
              <h4 style={{ fontWeight: '600', color: darkMode ? '#ffffff' : '#1a202c' }}>Triangle Integration Architecture</h4>
              <p style={{ fontSize: '0.875rem', color: darkMode ? '#cbd5e0' : '#718096', marginBottom: '0.25rem' }}>Node.js, GCP Pub/Sub, Webhooks, REST APIs</p>
              <p style={styles.text}>
                Designed complex multi-directional data flow system enabling seamless communication between 
                three or more platforms simultaneously. Implemented intelligent conflict resolution and 
                data consistency algorithms ensuring real-time synchronization.
              </p>
            </div>

          </div>
        </div>

        {/* Education */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Education</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: darkMode ? '#ffffff' : '#1a202c' }}>Bachelor of Software Engineering (BSSE)</h4>
              <p style={{ color: darkMode ? '#cbd5e0' : '#718096' }}>University of Sargodha</p>
              <p style={{ color: darkMode ? '#cbd5e0' : '#718096' }}>Computer and Information Sciences</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: darkMode ? '#cbd5e0' : '#718096' }}>2016 - 2020</p>
              <p style={{ color: darkMode ? '#a0aec0' : '#a0aec0' }}>Grade: B</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ 
          backgroundColor: darkMode ? '#1a202c' : '#f7fafc', 
          padding: '1rem 2rem', 
          textAlign: 'center',
          color: darkMode ? '#cbd5e0' : '#718096',
          fontSize: '0.875rem'
        }}>
          <p>References available upon request | Open to remote and hybrid opportunities | Immediate availability</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ maxWidth: '64rem', margin: '2rem auto', textAlign: 'center' }}>
        <button onClick={() => window.print()} style={{...styles.button, ...styles.downloadButton}}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          <ExternalLink size={18} /> Download as PDF
        </button>
        <a href="mailto:aliafzal.me1@gmail.com" style={{...styles.button, ...styles.contactButton, textDecoration: 'none'}}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          <Mail size={18} /> Contact Me
        </a>
      </div>
    </div>
  );
};

export default Resume;