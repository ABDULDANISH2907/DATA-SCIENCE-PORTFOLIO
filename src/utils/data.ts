export interface Skill {
  name: string;
  level: number;
  fullMark: number;
}

export interface Project {
  id: string;
  title: string;
  problem: string;
  solution: string;
  techStack: string[];
  result: string;
  metrics: { label: string; value: string }[];
  color: 'cyan' | 'red';
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  points: string[];
}

export const personalInfo = {
  name: 'Danish Abdul',
  title: 'Data Scientist',
  location: 'Maharashtra, India',
  email: 'danishabdul928@gmail.com',
  phone: '+91 92844 87947',
  linkedin: 'https://linkedin.com/in/danish2129',
  github: 'https://github.com/ABDULDANISH2907',
};

export const summary =
  'Data Scientist with hands-on experience building and deploying machine learning solutions for real-world problems. Strong in Python, SQL, and data analysis, with experience working on large datasets (70K+ records). Focused on solving business problems through data-driven decision making and end-to-end ML pipelines.';

export const skillsData: Skill[] = [
  { name: 'Python', level: 90, fullMark: 100 },
  { name: 'SQL', level: 82, fullMark: 100 },
  { name: 'Pandas / NumPy', level: 88, fullMark: 100 },
  { name: 'Scikit-learn', level: 85, fullMark: 100 },
  { name: 'NLP', level: 78, fullMark: 100 },
  { name: 'Classification', level: 86, fullMark: 100 },
  { name: 'Clustering', level: 72, fullMark: 100 },
  { name: 'Visualization', level: 80, fullMark: 100 },
];

export const projectsData: Project[] = [
  {
    id: 'ai-resume-screening',
    title: 'AI Resume Screening System',
    problem:
      'HR teams spend hours manually screening resumes for each job opening. The process is subjective, inconsistent, and scales poorly with high application volumes.',
    solution:
      'Built an NLP-powered resume ranking system using TF-IDF vectorization and cosine similarity to match resumes against job descriptions. Created a Flask REST API for real-time scoring and deployed an interactive Streamlit dashboard.',
    techStack: ['Python', 'Flask', 'Streamlit', 'Scikit-learn', 'NLTK', 'TF-IDF'],
    result:
      'Automated first-pass resume screening, reducing manual review time by ~70% and providing ranked shortlists in under 2 seconds per resume.',
    metrics: [
      { label: 'Speed', value: '<2s' },
      { label: 'Time Saved', value: '~70%' },
      { label: 'Data Size', value: '1K+' },
    ],
    color: 'cyan',
  },
  {
    id: 'loan-approval',
    title: 'Loan Approval Prediction System',
    problem:
      'Financial institutions struggle with inconsistent loan approval decisions and high default rates due to reliance on rule-based manual assessments.',
    solution:
      'Developed a classification pipeline with feature engineering, missing-value handling, and model comparison (Logistic Regression, Decision Tree, Random Forest). Deployed via Streamlit for real-time predictions.',
    techStack: ['Python', 'Pandas', 'Scikit-learn', 'Streamlit', 'Matplotlib'],
    result:
      'Achieved competitive accuracy with the best-performing model, enabling instant loan eligibility checks and reducing decision turnaround time.',
    metrics: [
      { label: 'Models', value: '3' },
      { label: 'Best Model', value: 'RF' },
      { label: 'Deploy', value: 'Live' },
    ],
    color: 'red',
  },
  {
    id: 'fraud-detection',
    title: 'AI Fraud Detection System',
    problem:
      'Financial institutions need real-time fraud detection to analyze transaction patterns and identify potentially fraudulent activities before losses occur.',
    solution:
      'Built an end-to-end ML pipeline for fraud detection using XGBoost with real-world transaction patterns. Integrated a trained model with a production-ready Streamlit interface displaying fraud probability, confidence scores, and feature importance.',
    techStack: ['Python', 'Scikit-learn', 'XGBoost', 'Streamlit', 'Pandas', 'NumPy', 'Joblib'],
    result:
      'Real-time fraud detection system with confidence scoring and feature-level insights for transaction analysis.',
    metrics: [
      { label: 'Models', value: 'XGBoost' },
      { label: 'Deploy', value: 'Live' },
      { label: 'UI', value: 'Streamlit' },
    ],
    color: 'cyan',
  },
];

export const experienceData: ExperienceItem[] = [
  {
    role: 'Data Science Intern',
    company: 'Ai Variant',
    location: 'Bangalore',
    period: 'May 2025 — Feb 2026',
    points: [
      'Processed and analyzed structured datasets using Python (Pandas, NumPy), improving data quality and usability',
      'Conducted EDA to identify trends and patterns, supporting data-driven decisions',
      'Built and evaluated machine learning models for classification and clustering tasks',
      'Translated business requirements into analytical solutions in collaboration with cross-functional teams',
      'Developed dashboards and reports to communicate insights effectively',
    ],
  },
];

export const educationData = [
  {
    degree: 'B.E. Electronics & Telecommunication',
    school: 'P. R. Pote Patil Group of Educational Institutes, Amravati',
    period: '2021 — 2025',
  },
];

export const certificationsData = [
  'Data Science — ExcelR',
  'AIML Virtual Internship — Google for Developers',
];

export const navLinks = [
  { label: 'About', href: '#hero' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];
