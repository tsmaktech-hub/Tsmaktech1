import { Tutorial, LearningPath, Project } from './types';

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'web-apps',
    title: 'Web Applications',
    description: 'Master React, Next.js, and modern full-stack development.',
    icon: 'Layout',
    color: 'purple',
  },
  {
    id: 'websites',
    title: 'Websites',
    description: 'Learn HTML, CSS, and responsive design for stunning sites.',
    icon: 'Globe',
    color: 'indigo',
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Apps',
    description: 'Build cross-platform apps with React Native and Flutter.',
    icon: 'Smartphone',
    color: 'violet',
  },
  {
    id: 'backend',
    title: 'Backend Systems',
    description: 'Deep dive into Node.js, databases, and cloud infrastructure.',
    icon: 'Server',
    color: 'amber',
  },
];

export const FEATURED_TUTORIALS: Tutorial[] = [
  {
    id: '1',
    title: 'Building High-Velocity React & Next.js Systems',
    description: 'Practical guide to assembling production apps with Server Actions, strict TypeScript, and edge cache.',
    category: 'Full-Stack',
    difficulty: 'All Levels',
    duration: 'Live Class',
    image: '/images/academy_mentorship.jpg',
  },
  {
    id: '2',
    title: 'Kinetic 60fps UI & 3D Web Interfaces',
    description: 'Master Framer Motion spring physics, 3D carousel cascades, and dynamic specular card glare.',
    category: 'Kinetic UI',
    difficulty: 'Intermediate',
    duration: 'Interactive',
    image: '/images/webdesign_on_fire.jpg',
  },
  {
    id: '3',
    title: 'Biometric & Geolocation Mobile Engineering',
    description: 'Cross-platform attendance logging, background sync, and offline-first mobile architecture with React Native.',
    category: 'Mobile & Cloud',
    difficulty: 'Advanced',
    duration: 'Case Study',
    image: '/images/attendance_ui.jpg',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'islamic-gpt',
    title: 'Tsmak-Islamic GPT',
    description: 'An Islamic intelligence platform that answers Islamic theological and daily queries backed by cited verses from the Quran and verified Hadith.',
    link: 'https://tsmakislamicgpt.vercel.app',
    image: '/projects/tsmakislamicgpt.png',
    tags: ['AI & LLM', 'Next.js', 'Vector Search', 'TypeScript'],
    category: 'AI Application',
    client: 'Tsmak Tech R&D',
    year: '2025',
    metric: 'Sub-second semantic lookup',
    highlights: [
      'Engineered retrieval pipeline cross-referencing authentic tafseer and Hadith grades',
      'Minimalist distraction-free typography designed for long-form Arabic & English reading',
      'Zero-latency caching layer for recurring theological inquiries'
    ],
    architecture: 'Next.js App Router, Gemini API, Vector Embeddings, Edge Functions'
  },
  {
    id: 'lasustech',
    title: 'Lasustech Attendance System',
    description: 'An institutional-grade attendance automation ecosystem engineered for university faculties, monitoring student attendance with audit-ready security.',
    link: 'https://lasustech-attendance-system.vercel.app',
    image: '/projects/lasustech.png',
    tags: ['Full-Stack', 'PostgreSQL', 'University Ops', 'Role Security'],
    category: 'Institutional System',
    client: 'Lasustech University',
    year: '2025',
    metric: '99.9% uptime across campuses',
    highlights: [
      'Multi-role hierarchy: Dean, Department Head, Lecturer, and Student views',
      'Real-time automated eligibility calculating threshold alerts for examinations',
      'Exportable CSV and PDF institutional audit sheets'
    ],
    architecture: 'React, Node.js REST API, PostgreSQL, JWT Authentication, Tailwind CSS'
  },
  {
    id: 'noor-ai',
    title: 'Noor AI Assistant',
    description: 'An intelligent Islamic knowledge and verified evidence platform providing theological answers backed by cited Quranic verses and verified Hadith.',
    link: 'https://noor-ai-assist.vercel.app',
    image: '/projects/noor-ai.png',
    tags: ['AI & LLM', 'Next.js', 'Quran & Hadith', 'Evidence Engine'],
    category: 'AI Application',
    client: 'Noor AI Initiative',
    year: '2025',
    metric: 'Authentic cited evidences in < 1s',
    highlights: [
      'Engineered scholarly AI pipeline grounding queries directly in authentic Quranic verses and verified Hadith texts',
      'Distraction-free Arabic calligraphy & English typography optimized for reflective study',
      'Sub-second semantic lookup for theology, daily practice, and jurisprudential citations'
    ],
    architecture: 'Next.js, Tailwind CSS, LLM Embeddings, Server Actions'
  },
  {
    id: 'group-black',
    title: 'AttendX Institutional',
    description: 'A minimalist, high-speed attendance engine emphasizing fluid 60fps micro-interactions, responsive ergonomics, and instant biometric logging.',
    link: 'https://group-project-teal-seven.vercel.app',
    image: '/projects/group-teal.png',
    tags: ['React', 'Framer Motion', 'Micro-Interactions', 'UX Lab'],
    category: 'Web App',
    client: 'AttendX Group',
    year: '2025',
    metric: '60fps fluid touch response',
    highlights: [
      'Zero layout-shift mobile web experience built for high-throughput scanning',
      'Framer Motion spring physics for tactile feedback',
      'Progressive Web App support with background syncing'
    ],
    architecture: 'React, Vite, Framer Motion, Tailwind CSS, Local Storage Cache'
  }
];

export const TECH_STACK = [
  { name: 'React 19 & Next.js', category: 'Frontend', level: 'Production' },
  { name: 'TypeScript', category: 'Language', level: 'Strict Mode' },
  { name: 'Node.js & Express', category: 'Backend', level: 'Enterprise' },
  { name: 'PostgreSQL & SQLite', category: 'Database', level: 'ACID Relational' },
  { name: 'Tailwind CSS & Framer Motion', category: 'Interface', level: 'Fluid Kinetic' },
  { name: 'Gemini & LLM Pipelines', category: 'AI Systems', level: 'Server-Side' },
  { name: 'React Native & Mobile', category: 'Cross-Platform', level: 'iOS / Android' },
  { name: 'Cloud Run & Docker', category: 'Infrastructure', level: 'Containerized' },
];

export const STUDIO_METRICS = [
  { value: '4+', label: 'Shipped Production Platforms', detail: 'Real enterprise & university clients' },
  { value: '99.9%', label: 'Platform Reliability', detail: 'Zero critical downtime recorded' },
  { value: '100%', label: 'Custom Engineered', detail: 'No bloated templates or off-the-shelf themes' },
  { value: '< 24h', label: 'Sprint Response SLA', detail: 'Rapid agile iteration & direct founder access' },
];
