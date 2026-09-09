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
  ChevronLeft
} from 'lucide-react';
import { PROJECTS, STUDIO_METRICS } from '../constants';
import { Project } from '../types';
import { TsmakLogo } from '../components/Logo';

interface PortfolioPageProps {
  onBackToHome: () => void;
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
    icon: <Globe size={22} className="text-emerald-400" />, 
    tech: "Next.js 15, React 19, TypeScript Strict, Tailwind CSS v4, Framer Motion",
    desc: "Building production platforms optimized for sub-second paint times and 60fps kinetic user interaction." 
  },
  { 
    name: "Backend, APIs & Cloud Scalability", 
    icon: <Cpu size={22} className="text-teal-400" />, 
    tech: "Node.js, Express, PostgreSQL, SQLite, Docker, Cloud Run, Supabase",
    desc: "ACID relational schema design, role-based access control, JWT verification, and zero-downtime containerized deployments." 
  },
  { 
    name: "Applied AI & Vector Pipelines", 
    icon: <Sparkles size={22} className="text-indigo-400" />, 
    tech: "Gemini 2.5, Semantic Vector Indexing, Function Calling, Edge Caching",
    desc: "Secure server-side LLM integrations that ground answers in proprietary knowledge bases, like our Tsmak-Islamic GPT." 
  },
  { 
    name: "Cross-Platform Mobile Suites", 
    icon: <Smartphone size={22} className="text-amber-400" />, 
    tech: "React Native, Expo SDK, Native Biometrics, Offline-First Sync",
    desc: "Performant iOS and Android mobile software with local persistence and background push notification pipelines." 
  }
];

const CATEGORIES = ['All Works', 'AI Application', 'Institutional System', 'Enterprise SaaS', 'Web App'];

export default function PortfolioPage({ onBackToHome, onGetStarted, onSelectProject }: PortfolioPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All Works');

  const filteredProjects = selectedCategory === 'All Works' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#090A0F] text-white pt-24 pb-20">
      {/* Header Back Link & Title */}
      <section className="relative py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-sm font-mono text-zinc-400 hover:text-white transition-colors mb-8 group"
          >
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform text-emerald-400" />
            <span>Return to Studio Home</span>
          </button>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-3 block">
                Engineering Provenance
              </span>
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight font-display mb-6">
                Selected Works & Case Studies
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Every project below is a certified, live production system built for real clients, universities, and specialized user communities.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-2xl font-extrabold text-emerald-400 font-display">4+</div>
                <div className="text-xs text-zinc-400">Deployed Systems</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-2xl font-extrabold text-white font-display">99.9%</div>
                <div className="text-xs text-zinc-400">Uptime SLA</div>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-white/[0.08]">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
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
                  className="rounded-3xl bg-[#0e121a] border border-white/10 hover:border-emerald-500/40 p-6 sm:p-8 flex flex-col justify-between group shadow-xl transition-all"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {project.category}
                      </span>
                      {project.client && (
                        <span className="text-xs text-zinc-500 font-mono">
                          {project.client}
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-display group-hover:text-emerald-300 transition-colors">
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
                      className="cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 mb-6 group/img relative"
                    >
                      <div className="h-7 bg-zinc-900 px-3 flex items-center justify-between border-b border-white/5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-rose-500/70" />
                          <div className="w-2 h-2 rounded-full bg-amber-500/70" />
                          <div className="w-2 h-2 rounded-full bg-emerald-500/70" />
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
                          <span className="px-4 py-2 rounded-full bg-white text-zinc-950 text-xs font-bold shadow-xl flex items-center gap-1.5">
                            <Layers size={14} />
                            <span>Inspect Architecture</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Metric & Tags */}
                    {project.metric && (
                      <div className="text-xs font-mono text-emerald-400 mb-4 flex items-center gap-2">
                        <ShieldCheck size={14} />
                        <span>Metric: {project.metric}</span>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.03] text-zinc-400 border border-white/5"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                      <button
                        onClick={() => onSelectProject(project)}
                        className="flex-grow py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-semibold border border-white/10 transition-all flex items-center justify-center gap-2"
                      >
                        <span>Case Study Details</span>
                        <ArrowRight size={14} />
                      </button>

                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 active:scale-95"
                      >
                        <span>Live Site</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Skills Matrix / Architectural Capabilities */}
      <section className="py-24 border-y border-white/[0.08] bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-3 block">
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
                className="p-8 rounded-3xl bg-[#0e121a] border border-white/10 hover:border-emerald-500/30 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                    {domain.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-display">
                      {domain.name}
                    </h3>
                    <div className="text-xs text-emerald-400 font-mono">
                      Production Certified
                    </div>
                  </div>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  {domain.desc}
                </p>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs font-mono text-zinc-300">
                  {domain.tech}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Feedback & Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-3 block">
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
                className="p-8 rounded-3xl bg-[#0e121a] border border-white/10 relative flex flex-col justify-between hover:border-emerald-500/30 transition-all"
              >
                <Quote size={32} className="text-emerald-500/20 absolute top-6 right-6" />
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={15} className="fill-emerald-400 text-emerald-400" />
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
          <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-[#0e131d] to-[#090A0F] border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-2">
                Have a platform to build?
              </h2>
              <p className="text-zinc-400 text-base">
                Let's discuss scope, architectural requirements, and delivery timeline.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Hire Studio</span>
                <ArrowRight size={16} />
              </button>
              <a
                href="https://chat.whatsapp.com/IV6sRV0HRYU2vl7o8kYHea"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-all border border-white/10 flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} className="text-emerald-400" />
                <span>WhatsApp Hotline</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
