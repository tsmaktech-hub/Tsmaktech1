import { Tutorial, LearningPath, Project } from './types';

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'web-apps',
    title: 'Web Applications',
    description: 'Master React, Next.js, and modern full-stack development.',
    icon: 'Layout',
    color: 'emerald',
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
    title: 'Building your first React App',
    description: 'A step-by-step guide to creating a modern web application from scratch.',
    category: 'Web App',
    difficulty: 'Beginner',
    duration: '45 mins',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072',
  },
  {
    id: '2',
    title: 'Responsive Design Mastery',
    description: 'Learn how to make your websites look great on any device with Tailwind CSS.',
    category: 'Website',
    difficulty: 'Intermediate',
    duration: '1.5 hours',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=2031',
  },
  {
    id: '3',
    title: 'Introduction to React Native',
    description: 'Start your mobile development journey by building a simple cross-platform app.',
    category: 'Mobile App',
    difficulty: 'Beginner',
    duration: '1 hour',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=2070',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'islamic-gpt',
    title: 'Tsmak-Islamic GPT',
    description: 'An Islamic intelligence platform that answers Islamic theological and daily queries backed by cited verses from the Quran and verified Hadith.',
    link: 'https://tsmakislamicgpt.vercel.app',
    image: 'https://v1.screenshot.11ty.dev/https%3A%2F%2Ftsmakislamicgpt.vercel.app/large/',
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
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=2070',
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
    id: 'nebula',
    title: 'Nebula Attendance System',
    description: 'A collaborative enterprise workforce attendance and productivity suite designed for modern remote and hybrid organizations.',
    link: 'https://nebula-group-project.vercel.app',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070',
    tags: ['Next.js', 'Tailwind', 'Real-Time Sync', 'Enterprise'],
    category: 'Enterprise SaaS',
    client: 'Nebula Group',
    year: '2025',
    metric: '85% faster payroll audit',
    highlights: [
      'One-tap biometric & geolocation validated check-ins',
      'Interactive team status board with real-time presence indicators',
      'Automated slack and email notification webhooks'
    ],
    architecture: 'Next.js 14, Tailwind CSS, Supabase / PostgreSQL, Server Actions'
  },
  {
    id: 'group-black',
    title: 'AttendX Institutional',
    description: 'A minimalist, high-speed attendance engine emphasizing fluid 60fps micro-interactions, responsive ergonomics, and instant biometric logging.',
    link: 'https://group-project-teal-seven.vercel.app',
    image: 'https://v1.screenshot.11ty.dev/https%3A%2F%2Fgroup-project-teal-seven.vercel.app/large/',
    tags: ['React', 'Framer Motion', 'Micro-Interactions', 'UX Lab'],
    category: 'Web App',
    client: 'AttendX Group',
    year: '2025',
    metric: '60fps fluid touch response',
    highlights: [
      'Zero layout-shift mobile web experience built for high-throughput scanning',
      'Framer Motion spring physics for tactile tactile feedback',
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
