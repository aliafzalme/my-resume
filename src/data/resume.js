export const header = {
  name: 'Ali Afzal',
  title: 'Senior Integration Engineer | API & Cloud Solutions Specialist',
  email: 'aliafzal.me1@gmail.com',
  phone: '+92 304 1056703',
  location: 'Lahore, Pakistan',
  linkedin: {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ali-afzal-790966177',
  },
  github: {
    label: 'GitHub',
    url: 'https://github.com/yourusername',
  },
};

export const summary =
  'Senior Integration Engineer with 4+ years of experience architecting scalable API integrations and cloud-based automation solutions. ' +
  'Specialized in building event-driven microservices and ETL pipelines connecting enterprise platforms (Salesforce, HubSpot, NetSuite, Microsoft 365). ' +
  'Delivered 15+ production integrations serving 500+ enterprise clients, processing 10M+ API calls monthly with 99.9% uptime SLA. ' +
  'Reduced manual data entry by 70% and cut integration setup time from weeks to hours through intelligent automation. ' +
  'Expertise in REST APIs, OAuth 2.0, webhooks, GCP, and cross-platform data synchronization.';

export const skills = {
  'Languages & Frameworks': [
    'JavaScript',
    'Python',
    'Node.js',
    'React.js',
    'PHP',
    'Laravel',
    'Google Apps Script',
    'MS Power Automate',
    'MS Power Apps',
  ],
  'Cloud & DevOps': [
    'Google Cloud Platform',
    'Cloud Functions',
    'Cloud Run',
    'Pub/Sub',
    'Cloud Monitoring',
    'Cloud Logging',
    'Error Reporting',
    'Git',
    'Bitbucket',
    'CI/CD',
  ],
  'Integration & Architecture': [
    'REST APIs',
    'Webhooks',
    'OAuth 2.0',
    'API Development',
    'Microservices',
    'Event-Driven Architecture',
    'ETL/ELT',
    'Data Pipelines',
    'iPaaS',
    'Middleware',
  ],
  'Databases & Tools': [
    'PostgreSQL',
    'JSON',
    'Postman',
    'API Testing',
    'Database Optimization',
    'Data Migration',
  ],
};

export const enterprisePlatforms = [
  'Salesforce',
  'HubSpot',
  'NetSuite',
  'Microsoft 365',
  'AWS S3',
  'Zoho',
  'Pipedrive',
  'Xero',
  'Google Calendar',
  'Zendesk',
  'Slack',
  'Monday.com',
  'ClickUp',
  'JobNimbus',
  'Archibus',
  'Zapier',
  'QuickBooks',
  'Quickbase',
  'Insightly',
  'Motive',
  'Nimble',
];

export const experience = [
  {
    title: 'Software Engineer II',
    company: 'Arrivy - Field Service Management SaaS Platform',
    location: 'Lahore, Pakistan',
    workMode: 'On-site',
    dates: 'Sep 2021 - Present (4 years)',
    achievements: [
      'Architected and deployed 15+ bi-directional API integrations (Salesforce, HubSpot, NetSuite, Zoho, Pipedrive, Microsoft 365) processing 10M+ records monthly, reducing data sync time by 85% and saving clients $500K+ annually in manual labor costs',
      'Engineered automated customer onboarding platform handling 500+ enterprise migrations, reducing onboarding time from 2 weeks to 2 hours (80% improvement) while achieving 99.9% data accuracy through intelligent validation and error recovery mechanisms',
      'Designed scalable event-driven microservices architecture using GCP Cloud Functions and Pub/Sub, processing 1M+ webhook events monthly with 99.9% uptime and sub-200ms average response time',
      'Built complex multi-platform data synchronization system enabling real-time bidirectional data flow between 3+ systems simultaneously, implementing intelligent conflict resolution and maintaining data consistency across platforms',
      'Optimized PostgreSQL database queries and implemented connection pooling, improving API response times by 60% and reducing database costs by 40% while handling 5x traffic increase',
      'Developed robust error handling and retry logic with exponential backoff, reducing integration failure rates from 5% to 0.1% and improving overall system reliability',
    ],
  },
];

export const projects = [
  {
    title: 'Generic HubSpot Integration — Legacy-to-Modern API Rewrite',
    tech: 'Node.js, HubSpot Date-Versioned APIs, OAuth 2.0, REST APIs, Webhooks, JSON-Driven Configuration, GCP Cloud Functions, Pub/Sub',
    description:
      'Led the complete modernization of the HubSpot integration, migrating off deprecated legacy APIs to the current HubSpot platform and rewriting the core sync logic end-to-end. Architected a fully generic, JSON-mapping-driven engine with first-class support for every HubSpot module and its relations/associations, so any current or future customer use case is configurable without code changes — eliminating bespoke per-customer engineering work.',
  },
  {
    title: 'Enterprise iPaaS Integration Platform',
    tech: 'Node.js, Python, GCP Cloud Functions, PostgreSQL, OAuth 2.0, REST APIs, Webhooks, Event-Driven Architecture',
    description:
      'Architected scalable middleware platform connecting 15+ enterprise systems (Salesforce, HubSpot, NetSuite, Microsoft 365) with bi-directional data synchronization. Implemented intelligent field mapping, rate limiting, and retry logic. Reduced integration deployment time from 2 weeks to 4 hours with 99.9% data accuracy.',
  },
  {
    title: 'Automated ETL Data Migration Engine',
    tech: 'Python, Node.js, GCP Cloud Run, Pub/Sub, REST APIs, Data Pipelines, PostgreSQL',
    description:
      'Built intelligent ETL system processing 500+ enterprise data migrations from multiple sources (CSV, Excel, REST APIs) with automated validation, transformation, and error recovery. Implemented batch processing handling 1M+ records with 99.9% success rate. Reduced onboarding time by 80% and eliminated manual errors.',
  },
  {
    title: 'Real-Time Workflow Automation Platform',
    tech: 'Python, Node.js, React.js, Monday.com API, ClickUp API, Slack API, Webhooks, Cloud Run, Pub/Sub, Microservices',
    description:
      'Engineered event-driven automation platform for task management and customer request routing. Built real-time notification system via Slack webhooks and performance dashboards. Implemented queue-based processing handling 50K+ daily events. Improved operational efficiency by 40%.',
  },
  {
    title: 'Multi-Directional Data Synchronization System',
    tech: 'Node.js, GCP Pub/Sub, Webhooks, REST APIs, Conflict Resolution, Event-Driven Architecture',
    description:
      'Designed complex multi-platform synchronization architecture enabling real-time data flow between 3+ systems simultaneously. Implemented distributed conflict resolution using timestamp-based algorithms and eventual consistency patterns. Achieved sub-second latency for 99% of transactions.',
  },
];

export const education = {
  degree: 'Bachelor of Software Engineering (BSSE)',
  institution: 'University of Sargodha',
  field: 'Computer and Information Sciences',
  dates: '2016 - 2020',
  grade: 'Grade: B',
};

export const specializations = [
  'Google Cloud Platform — Production-level expertise with Cloud Functions, Cloud Run, Pub/Sub, and Cloud Monitoring',
  'API Architecture & Security — Advanced experience in RESTful API design, OAuth 2.0 implementation, and webhook integration',
  'Event-Driven Systems — Hands-on experience architecting microservices and distributed systems using Pub/Sub messaging',
  'Enterprise Integrations — Deep expertise in iPaaS patterns, ETL pipelines, and multi-platform data synchronization',
];

export const footer =
  'Open to remote & hybrid roles globally | Authorized to work in Pakistan | Willing to relocate for the right opportunity | Available for immediate start | References available upon request';
