/**
 * Content lifted from the current site bundle (soumitabhattacharyasen.com).
 * Corrections vs. the live site are marked with `FIXED:`; things to confirm are marked `VERIFY:`.
 */

/** The Prism palette. Each station owns one hue; tokens live in globals.css per theme. */
export type Hue = 'cobalt' | 'tangerine' | 'magenta' | 'teal' | 'sun' | 'ink';
export const HUE_CYCLE: Hue[] = ['cobalt', 'tangerine', 'magenta', 'teal', 'sun'];

export interface Contact {
  email: string;
  phone?: string; // VERIFY: publishing a personal mobile number invites spam; consider dropping it.
  linkedin: string;
  github: string;
}

export interface Profile {
  name: string;
  shortName: string;
  title: string;
  tagline: string;
  summary: string;
  /** optional portrait under /public; the intro renders without it */
  photo?: string;
  resumeHref: string;
  contact: Contact;
  builtBy: { label: string; href: string };
}

export interface Role {
  id: string;
  company: string;
  /** label on the journey rail */
  short: string;
  role: string;
  hue: Hue;
  /** month is 1-12 */
  start: { month: number; year: number };
  end: { month: number; year: number } | 'present';
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface SkillGroup {
  id: string;
  label: string;
  hue: Hue;
  items: string[];
}

export interface Recommendation {
  id: string;
  name: string;
  role: string;
  text: string;
}

export const profile: Profile = {
  name: 'Soumita Bhattacharya Sen',
  shortName: 'Soumita',
  title: 'Senior BI Developer · Data Analyst · AI Enthusiast',
  tagline: 'Quiet luxury in data visualization',
  summary:
    'Results-driven data analyst with 11+ years of turning raw data into strategic insight — Power BI, Tableau, Qlik, Alteryx and Looker on the front, SQL, Azure Databricks and Informatica PowerCenter underneath. Currently extending into machine learning, statistical analysis and data modelling.',
  // VERIFY: the live site's /assets/images/profile.png returns 404. Drop a portrait into /public and set it here.
  photo: undefined,
  resumeHref: '/Soumita Bhattacharya Sen-CV.pdf',
  contact: {
    email: 'sbhattacharyaa3@gmail.com',
    phone: '+91 9163539213',
    linkedin: 'https://www.linkedin.com/in/soumita-bhattacharya-sen-1859a154/',
    github: 'https://github.com/Bhat-7/Soumita',
  },
  builtBy: { label: 'Debayan Sen', href: 'https://www.debayansen.com' },
};

export const roles: Role[] = [
  {
    id: 'wipro',
    company: 'Wipro Technologies',
    short: 'Wipro',
    role: 'Communications Trainer',
    hue: 'tangerine',
    start: { month: 8, year: 2014 },
    end: { month: 11, year: 2016 },
    description:
      'Supported core business operations — employee development, training delivery and the metrics behind it.',
    highlights: [
      'Delivered communications training that improved team efficiency and stakeholder interactions.',
      'Maintained performance dashboards tracking trainee progress and programme effectiveness.',
    ],
    technologies: ['Performance dashboards', 'Excel', 'Data analysis', 'Stakeholder management'],
  },
  {
    id: 'tcs',
    company: 'Tata Consultancy Services',
    short: 'TCS',
    role: 'BI Developer',
    hue: 'cobalt',
    start: { month: 11, year: 2016 },
    end: 'present',
    description: 'Leading enterprise-grade business intelligence solutions.',
    highlights: [
      'Architected scalable Power BI data models handling 50M+ rows of transactional data.',
      'Worked with executive stakeholders to define KPIs and operational metrics.',
    ],
    technologies: ['Power BI', 'SAP BO', 'Tableau', 'SQL', 'Python'],
  },
];

export const toolkit: SkillGroup[] = [
  {
    id: 'bi',
    label: 'BI tools',
    hue: 'cobalt',
    items: [
      'Power BI (DAX, Power Query)',
      'Tableau',
      'Tableau Pulse',
      'Google Looker',
      'QlikView',
      'Qlik Sense',
      'SAP Analytics Cloud',
    ],
  },
  {
    id: 'data',
    label: 'Languages & data',
    hue: 'teal',
    // FIXED: scikit-learn / Matplotlib moved here from "BI Tools" — they are Python libraries, not BI tools.
    items: ['Python (Pandas, NumPy)', 'scikit-learn', 'Matplotlib', 'SQL', 'T-SQL', 'PL/SQL', 'PostgreSQL', 'GitHub'],
  },
];

export const practice: SkillGroup[] = [
  {
    id: 'soft',
    label: 'How I work',
    hue: 'sun',
    items: [
      'Stakeholder management',
      'Requirement gathering',
      'Agile / Scrum',
      'Data storytelling',
      'Application lifecycle management',
      'Documentation',
    ],
  },
  {
    id: 'ai',
    label: 'AI',
    hue: 'magenta',
    // FIXED: "Claude Ceritified" typo. VERIFY: exact credential names for all three.
    items: ['Be10x', 'Claude Certified', 'ChatGPT Certified'],
  },
];

export const certifications: string[] = [
  'Microsoft Certified: Fabric Analytics Engineer Associate',
  'Microsoft Certified: Power BI Data Analyst Associate',
  'Microsoft Certified: Power Platform App Maker Associate',
  'Tableau Desktop Specialist',
];

/**
 * VERIFY: both recommendations on the live site read like placeholders (generic names, generic praise).
 * If they are not real, delete them — the Recommendations station disappears automatically when this is empty.
 */
export const recommendations: Recommendation[] = [
  {
    id: 'aman',
    name: 'Aman Verma',
    role: 'Delivery Manager, TCS',
    text: 'Soumita is an exceptional BI developer. Her ability to translate vague stakeholder requirements into crystal-clear, performant dashboards is unmatched.',
  },
  {
    id: 'priya',
    name: 'Priya Sharma',
    role: 'Lead Data Scientist, Wipro',
    text: 'She has a meticulous approach to data validation and always makes sure the insights presented are accurate and actionable. A true asset to any data team.',
  },
];

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mjgljnbb';
