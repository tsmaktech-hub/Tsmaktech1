import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  ArrowRight, 
  Mail, 
  Star, 
  CheckCircle2, 
  Code2, 
  Cpu, 
  Globe, 
  Smartphone, 
  Quote, 
  MessageCircle,
  Sparkles,
  Layers,
  ShieldCheck,
  GraduationCap,
  MapPin,
  Phone
} from 'lucide-react';
import { PROJECTS, STUDIO_METRICS } from '../constants';
import { Project } from '../types';
import { TsmakLogo } from '../components/Logo';
import TiltCard from '../components/TiltCard';
import Carousel3D from '../components/Carousel3D';

const FOUNDER_IMAGE_URL = 'https://lh3.googleusercontent.com/u/0/d/1RMbVzbxfhQT1SV6MejHoctam0kapyQOV';

interface PortfolioPageProps {
  onBackToHome?: () => void;
  onGetStarted: () => void;
  onSelectProject: (project: Project) => void;
}

const TESTIMONIALS = [
  {
    id: 1,
    name: "Engr. Sarah Johnson",
    role: "Director of Product, Nebula Group",
    content: "Tsmak Tech delivered our multi-tenant attendance suite ahead of deadline. Their mastery of real-time state synchronization, clean role-based permissions, and tactile micro-interactions made our daily operations 85% faster.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 2,
    name: "Dr. K. Adebayo",
    role: "Faculty Dean, Lasustech University",
    content: "The Lasustech Attendance System fundamentally transformed student audit compliance across four campuses. It seamlessly handles concurrent class check-ins with 99.9% reliability. A tour de force in modern educational software.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Lead Architect, AttendX Labs",
    content: "Working with Tsmak Tech was frictionless. They understood our complex requirements on day one, bypassed generic templates, and architected a lightning-fast React platform with zero layout shift.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  }
];

const SKILL_DOMAINS = [
  { 
    name: "Full-Stack Web Architectures", 
    icon: <Globe size={22} className="text-blue-400" />, 
    tech: "Next.js 15, React 19, TypeScript Strict, Tailwind CSS v4, Framer Motion",
    desc: "Building production platforms optimized for sub-second paint times and 60fps kinetic user interaction." 
  },
  { 
    name: "Backend, APIs & Cloud Scalability", 
    icon: <Cpu size={22} className="text-blue-400" />, 
    tech: "Node.js, Express, PostgreSQL, SQLite, Docker, Cloud Run, Supabase",
    desc: "ACID relational schema design, role-based access control, JWT verification, and zero-downtime containerized deployments." 
  },
  { 
    name: "Applied AI & Vector Pipelines", 
    icon: <Sparkles size={22} className="text-blue-400" />, 
    tech: "Gemini 2.5, Semantic Vector Indexing, Function Calling, Edge Caching",
    desc: "Secure server-side LLM integrations that ground answers in proprietary knowledge bases, like our Tsmak-Islamic GPT." 
  },
  { 
    name: "Cross-Platform Mobile Suites", 
    icon: <Smartphone size={22} className="text-blue-400" />, 
    tech: "React Native, Expo SDK, Native Biometrics, Offline-First Sync",
    desc: "Performant iOS and Android mobile software with local persistence and background push notification pipelines." 
  }
];

const CATEGORIES = ['All Works', 'AI Application', 'Institutional System', 'Enterprise SaaS', 'Web App'];

export default function PortfolioPage({ onGetStarted, onSelectProject }: PortfolioPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All Works');
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d');

  const filteredProjects = selectedCategory === 'All Works' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-transparent text-white pt-24 pb-20">
      {/* Founder Profile & Biography Section (First Page Section) */}
      <section id="about" className="relative pt-6 pb-12 sm:pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#090d16]/90 border border-white/10 p-6 sm:p-10 lg:p-12 relative overflow-hidden backdrop-blur-sm shadow-2xl">
            {/* Subtle blue accent background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Biography and Story (7 cols) */}
              <div className="lg:col-span-7 flex flex-col order-2 lg:order-1">
                <div className="flex flex-wrap items-center gap-2.5 mb-3">
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-mono font-semibold uppercase tracking-wider">
                    Founder & Lead Engineer
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                    <MapPin size={13} className="text-blue-400" />
                    Lagos, Nigeria
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight leading-tight mb-2">
                  Hi, I’m <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Ajibade Abdullateef</span>
                </h1>

                <p className="text-sm sm:text-base font-mono text-blue-400/90 font-medium mb-4">
                  Founder of Tsmak Tech • Mechatronics Student • Web & Mobile Developer
                </p>

                {/* Concise Rephrased Bio */}
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-5">
                  I am the founder of <strong className="text-white font-semibold">Tsmak Tech</strong>, studying <strong className="text-white font-semibold">Mechatronics Engineering</strong>, and developing modern web and mobile applications. Driven by curiosity and engineering precision, I build high-performance digital systems while inspiring and teaching young minds to learn, code, and thrive in tech.
                </p>

                {/* Focus Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300">
                    <Cpu size={14} className="text-blue-400" />
                    Mechatronics Engineering
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300">
                    <Smartphone size={14} className="text-blue-400" />
                    Web & Mobile Development
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300">
                    <GraduationCap size={14} className="text-blue-400" />
                    Tech Mentorship
                  </span>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://wa.me/2347087445219?text=Hello%20Ajibade,%20I%20am%20reaching%20out%20from%20your%20portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-95 cursor-pointer"
                  >
                    <MessageCircle size={16} />
                    <span>Connect on WhatsApp</span>
                  </a>

                  <a
                    href="#selected-works"
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] text-white font-medium text-xs sm:text-sm transition-colors border border-white/10 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>View Projects</span>
                    <ArrowRight size={15} className="text-zinc-400" />
                  </a>

                  <a
                    href="mailto:tsmaktech@gmail.com"
                    className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] text-zinc-300 hover:text-white text-xs sm:text-sm transition-colors border border-white/10 flex items-center justify-center gap-2"
                  >
                    <Mail size={15} className="text-blue-400" />
                    <span>tsmaktech@gmail.com</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Picture Beside It (5 cols) */}
              <div className="lg:col-span-5 flex flex-col items-center order-1 lg:order-2">
                <div className="w-full max-w-sm relative">
                  {/* Photo container with refined frame */}
                  <div className="relative rounded-2xl sm:rounded-3xl p-2 sm:p-2.5 bg-gradient-to-b from-blue-500/30 via-white/10 to-white/5 border border-blue-500/30 shadow-2xl">
                    <div className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-square bg-[#050811]">
                      <img
                        src={FOUNDER_IMAGE_URL}
                        onError={(e) => {
                          e.currentTarget.src = '/images/founder.jpg';
                        }}
                        alt="Ajibade Abdullateef - Founder of Tsmak Tech"
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                      {/* Subtle gradient overlay at bottom of photo */}
                      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#060a14] via-[#060a14]/60 to-transparent pointer-events-none" />
                      
                      <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-xs">
                        <span className="font-mono text-white font-semibold flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          Founder & Engineer
                        </span>
                        <span className="text-[11px] text-zinc-300 font-mono bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                          Tsmak Tech
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Trust Card beneath photo */}
                  <div className="mt-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white">Ajibade Abdullateef</div>
                      <div className="text-[11px] text-zinc-400 font-mono">Mechatronics Scholar & Full-Stack Developer</div>
                    </div>
                    <div className="flex items-center gap-1.5 text-blue-400 text-xs font-mono font-medium">
                      <ShieldCheck size={16} />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Header & Title */}
      <section id="selected-works" className="relative py-12 sm:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8">
            <div className="max-w-3xl">
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-blue-400 uppercase mb-2 sm:mb-3 block">
                Engineering Provenance
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-display mb-3 sm:mb-4">
                Selected Works & Case Studies
              </h1>
              <p className="text-zinc-400 text-xs sm:text-base lg:text-lg leading-relaxed">
                Every project below is a certified, live production system built for real clients, universities, and specialized user communities.
              </p>
            </div>

            {/* Quick Metrics & View Mode Switcher */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="p-1 rounded-xl bg-white/[0.04] border border-white/10 flex items-center">
                <button
                  onClick={() => setViewMode('3d')}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                    viewMode === '3d'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  3D Carousel
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Grid View
                </button>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="px-3 py-2 sm:p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <div className="text-lg sm:text-xl font-extrabold text-blue-400 font-display">4+</div>
                  <div className="text-[9px] sm:text-[10px] text-zinc-400 uppercase font-mono">Systems</div>
                </div>
                <div className="px-3 py-2 sm:p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <div className="text-lg sm:text-xl font-extrabold text-white font-display">99.9%</div>
                  <div className="text-[9px] sm:text-[10px] text-zinc-400 uppercase font-mono">Uptime</div>
                </div>
              </div>
            </div>
          </div>

          {/* If 3D Mode is active, show the 3D Carousel right here */}
          {viewMode === '3d' && (
            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <Carousel3D
                projects={PROJECTS}
                onSelectProject={onSelectProject}
                onNavigateGetStarted={onGetStarted}
              />
            </div>
          )}

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-white/[0.08]">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="h-full"
                >
                  <TiltCard
                    tiltAngle={6}
                    className="rounded-2xl bg-[#0c101c] border border-white/10 hover:border-blue-500/30 p-6 sm:p-8 flex flex-col justify-between group shadow-lg transition-all h-full"
                  >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {project.category}
                      </span>
                      {project.client && (
                        <span className="text-xs text-zinc-500 font-mono">
                          {project.client}
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-display">
                      {project.title}
                    </h2>

                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Simulated Browser Frame with Preview Image */}
                    <div 
                      onClick={() => onSelectProject(project)}
                      className="cursor-pointer rounded-xl overflow-hidden border border-white/10 bg-zinc-950 mb-6 group/img relative"
                    >
                      <div className="h-7 bg-zinc-900 px-3 flex items-center justify-between border-b border-white/5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-zinc-700" />
                          <div className="w-2 h-2 rounded-full bg-zinc-700" />
                          <div className="w-2 h-2 rounded-full bg-zinc-700" />
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500">
                          {project.link.replace(/^https?:\/\//, '')}
                        </span>
                        <div className="w-4" />
                      </div>

                      <div className="aspect-[16/9] w-full overflow-hidden bg-zinc-900 relative">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070";
                          }}
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold shadow-md flex items-center gap-1.5">
                            <Layers size={14} />
                            <span>Inspect Architecture</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Metric & Tags */}
                    {project.metric && (
                      <div className="text-xs font-mono text-blue-400 mb-4 flex items-center gap-2">
                        <ShieldCheck size={14} />
                        <span>Metric: {project.metric}</span>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/[0.03] text-zinc-400 border border-white/5"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                      <button
                        onClick={() => onSelectProject(project)}
                        className="flex-grow py-2.5 px-4 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-semibold border border-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Case Study Details</span>
                        <ArrowRight size={14} />
                      </button>

                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                      >
                        <span>Live Site</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Skills Matrix / Architectural Capabilities */}
      <section className="py-20 border-y border-white/[0.08] bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-400 uppercase mb-3 block">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
              What We Engineer at Tsmak Tech
            </h2>
            <p className="text-zinc-400 text-base">
              Built strictly on battle-tested languages and modern frameworks with strict type safety.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {SKILL_DOMAINS.map((domain, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-[#0c101c] border border-white/10 hover:border-blue-500/30 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                    {domain.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-display">
                      {domain.name}
                    </h3>
                    <div className="text-xs text-blue-400 font-mono">
                      Production Certified
                    </div>
                  </div>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  {domain.desc}
                </p>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-xs font-mono text-zinc-300">
                  {domain.tech}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Feedback & Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-400 uppercase mb-3 block">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
              What Leaders Say About Tsmak Tech
            </h2>
            <p className="text-zinc-400 text-base">
              Unfiltered feedback from enterprise founders, university deans, and product managers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-8 rounded-2xl bg-[#0c101c] border border-white/10 relative flex flex-col justify-between hover:border-blue-500/30 transition-colors"
              >
                <Quote size={32} className="text-white/10 absolute top-6 right-6" />
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed mb-8 italic">
                    "{t.content}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="text-sm font-bold text-white">{t.name}</div>
                    <div className="text-xs text-zinc-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-2xl bg-[#0c101c] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-2">
                Have a platform to build?
              </h2>
              <p className="text-zinc-400 text-base">
                Let's discuss scope, architectural requirements, and delivery timeline.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 active:scale-95 cursor-pointer shadow-sm"
              >
                <span>Hire Studio</span>
                <ArrowRight size={16} />
              </button>
              <a
                href="https://chat.whatsapp.com/IV6sRV0HRYU2vl7o8kYHea"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white font-medium text-sm transition-colors border border-white/10 hover:border-white/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle size={16} className="text-blue-400" />
                <span>WhatsApp Hotline</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
