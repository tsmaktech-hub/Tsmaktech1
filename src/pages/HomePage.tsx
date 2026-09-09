import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Code2, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  Smartphone, 
  Server, 
  Layers, 
  CheckCircle2, 
  ExternalLink,
  Search,
  MessageCircle,
  TrendingUp,
  Terminal,
  Zap,
  Bookmark
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { PROJECTS, LEARNING_PATHS, FEATURED_TUTORIALS, STUDIO_METRICS } from '../constants';
import { Project } from '../types';
import Marquee from '../components/Marquee';
import TerminalDemo from '../components/TerminalDemo';

interface HomePageProps {
  onNavigate: (page: 'home' | 'portfolio' | 'get-started', sectionId?: string) => void;
  onSelectProject: (project: Project) => void;
}

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=2070',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070',
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=2070'
];

const PRESET_QUERIES = [
  "Build an AI Quran/Hadith search app",
  "Institutional university attendance system",
  "Full-stack React & Next.js SaaS with Stripe",
  "Cross-platform mobile app with React Native"
];

export default function HomePage({ onNavigate, onSelectProject }: HomePageProps) {
  const [currentHeroIdx, setCurrentHeroIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiRecommendation, setAiRecommendation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [dualMode, setDualMode] = useState<'studio' | 'academy'>('studio');
  const [activeCodeTab, setActiveCodeTab] = useState<'nextjs' | 'auth' | 'ai'>('nextjs');
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Hero background image transition
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const handleAiPathfinder = async (queryToRun?: string) => {
    const query = queryToRun || searchQuery;
    if (!query.trim()) return;
    setIsAiLoading(true);
    setSearchQuery(query);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // High-quality structured fallback if offline
        setTimeout(() => {
          setAiRecommendation(
            `🚀 Recommended Engineering Roadmap for "${query}":\n\n` +
            `• Phase 1: Architecture & Data Modeling (TypeScript, Schema Design, Auth)\n` +
            `• Phase 2: Core Frontend & Kinetic UI (React 19, Tailwind CSS, Framer Motion)\n` +
            `• Phase 3: AI & API Integration (Server-side Gemini pipelines, Edge Caching)\n` +
            `• Phase 4: Production Hardening & Cloud Run Deployment (Audit, Docker, CI/CD)\n\n` +
            `Estimated Sprint: 3-4 Weeks with Tsmak Tech mentorship.`
          );
          setIsAiLoading(false);
        }, 600);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are the Lead Systems Architect at Tsmak Tech. A user wants to build or learn: "${query}".
Provide an executive, highly actionable 4-phase technical roadmap.
Keep it punchy, technical, and inspiring. Mention recommended technologies (e.g. Next.js, React, Node.js, PostgreSQL, AI vectors).
Format with clear bullet points and a realistic timeframe estimate. Max 140 words.`,
      });

      setAiRecommendation(response.text || "Roadmap generated. Start your sprint today!");
    } catch (error) {
      console.error("Pathfinder error:", error);
      setAiRecommendation(
        `Technical Blueprint for "${query}":\n` +
        `1. System Architecture & Relational Schema (PostgreSQL/Supabase)\n` +
        `2. Full-Stack Reactive Interface (Next.js 15 App Router)\n` +
        `3. Security, RBAC & API Gateway (JWT, Cloud Run)\n` +
        `Connect with our founder on WhatsApp for full guidance.`
      );
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setEmailSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 3000);
  };

  return (
    <div className="relative w-full overflow-x-hidden pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-20 overflow-hidden">
        {/* Subtle Background Layer */}
        <div className="absolute inset-0 -z-10 bg-[#090A0F]">
          <AnimatePresence mode="wait">
            <motion.img
              key={HERO_IMAGES[currentHeroIdx]}
              src={HERO_IMAGES[currentHeroIdx]}
              alt="Engineering Canvas"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 0.18, scale: 1.02 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
              className="w-full h-full object-cover grayscale contrast-125"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          {/* Radial depth vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#090A0F] via-transparent to-[#090A0F]" />
          <div className="absolute inset-0 bg-radial-gradient opacity-80" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-mono text-zinc-300 mb-8 backdrop-blur-md shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Tsmak Tech Studio & Academy</span>
            <span className="text-zinc-600">•</span>
            <span className="text-emerald-400 font-semibold">Q3 Sprints Open</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.06] mb-8 font-display max-w-5xl mx-auto"
          >
            Architecting{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400">
              Modern Systems.
            </span>
            <br className="hidden sm:inline" />
            <span className="text-zinc-300 font-medium"> Mentoring Master Builders.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed font-sans"
          >
            We build high-concurrency web apps, institutional attendance suites, and bespoke AI platforms for enterprises — while training the next generation of engineers through rigorous production-level mentorship.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <button
              onClick={() => onNavigate('get-started')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-base flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-emerald-500/20 active:scale-95 group"
            >
              <span>Hire Us or Start Learning</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('portfolio')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-semibold text-base border border-white/10 flex items-center justify-center gap-2.5 transition-all backdrop-blur-md"
            >
              <Layers size={18} className="text-emerald-400" />
              <span>Explore Live Work</span>
            </button>
          </motion.div>

          {/* Metrics Ribbon */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-white/[0.08]"
          >
            {STUDIO_METRICS.map((metric, i) => (
              <div key={i} className="text-left p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  {metric.value}
                </div>
                <div className="text-xs font-semibold text-emerald-400 mt-1">
                  {metric.label}
                </div>
                <div className="text-[11px] text-zinc-500 mt-0.5 hidden sm:block">
                  {metric.detail}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Infinite Tech Marquee */}
      <Marquee />

      {/* Dual Identity Section: Studio vs Academy */}
      <section id="professional-services" className="py-24 sm:py-32 relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-3 block">
              Dual Identity
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-display mb-6">
              Two disciplines. One unified standard of excellence.
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg">
              Whether you need a rock-solid production platform delivered for your company, or the exact skills to build it yourself from scratch.
            </p>

            {/* Interactive Toggle */}
            <div className="inline-flex items-center p-1.5 rounded-full bg-white/[0.04] border border-white/10 mt-8">
              <button
                onClick={() => setDualMode('studio')}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  dualMode === 'studio'
                    ? 'bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                For Companies (The Studio)
              </button>
              <button
                onClick={() => setDualMode('academy')}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  dualMode === 'academy'
                    ? 'bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                For Engineers (The Academy)
              </button>
            </div>
          </div>

          {/* Dual Content Switcher */}
          <AnimatePresence mode="wait">
            {dualMode === 'studio' ? (
              <motion.div
                key="studio-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid lg:grid-cols-3 gap-6"
              >
                {/* Feature 1 */}
                <div className="p-8 rounded-3xl bg-[#0d111a] border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Cpu size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 font-display">
                      Enterprise & Institutional Web Apps
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                      Full-stack systems engineered for scale. Role-based security, relational data integrity, automated attendance logs, and real-time dashboard analytics.
                    </p>
                  </div>
                  <ul className="space-y-2 border-t border-white/5 pt-4 text-xs font-mono text-zinc-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-400" />
                      <span>Zero-bloat, modular microservices</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-400" />
                      <span>PostgreSQL & SQLite ACID compliance</span>
                    </li>
                  </ul>
                </div>

                {/* Feature 2 */}
                <div className="p-8 rounded-3xl bg-[#0d111a] border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Zap size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 font-display">
                      AI Integration & Vector Systems
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                      Bespoke LLM pipelines (Gemini API), semantic search over private documents, domain knowledge bots (like Tsmak-Islamic GPT), and automated workflows.
                    </p>
                  </div>
                  <ul className="space-y-2 border-t border-white/5 pt-4 text-xs font-mono text-zinc-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-400" />
                      <span>Server-side protected keys & proxy</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-400" />
                      <span>Sub-second streaming responses</span>
                    </li>
                  </ul>
                </div>

                {/* Feature 3 */}
                <div className="p-8 rounded-3xl bg-[#0d111a] border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <ShieldCheck size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 font-display">
                      Rapid MVP to Production Sprints
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                      From specification to production deployment in 2 to 4 weeks. Direct founder access, weekly staging releases, and zero agency handoff delays.
                    </p>
                  </div>
                  <ul className="space-y-2 border-t border-white/5 pt-4 text-xs font-mono text-zinc-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-400" />
                      <span>Containerized Cloud Run ready</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-400" />
                      <span>Full source code & documentation handover</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="academy-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid lg:grid-cols-3 gap-6"
              >
                {/* Academy 1 */}
                <div className="p-8 rounded-3xl bg-[#0d111a] border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-6">
                      <Code2 size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 font-display">
                      Production Stack (No Toy Projects)
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                      Learn by building real apps that people actually use: React 19, TypeScript strict mode, Next.js App Router, Tailwind CSS, and Server Actions.
                    </p>
                  </div>
                  <div className="border-t border-white/5 pt-4 text-xs text-zinc-400">
                    Curriculum built directly from real client work experience.
                  </div>
                </div>

                {/* Academy 2 */}
                <div className="p-8 rounded-3xl bg-[#0d111a] border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
                      <MessageCircle size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 font-display">
                      Direct WhatsApp Mentorship
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                      Get unblocked in minutes. Code reviews, architectural advice, and career roadmaps directly from experienced senior software developers.
                    </p>
                  </div>
                  <div className="border-t border-white/5 pt-4 text-xs text-emerald-400">
                    Active community of over 500+ builders.
                  </div>
                </div>

                {/* Academy 3 */}
                <div className="p-8 rounded-3xl bg-[#0d111a] border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6">
                      <TrendingUp size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 font-display">
                      Portfolio That Gets You Hired
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                      Graduate with live verified links, enterprise Git commit histories, and deployment URLs you can proudly showcase to international employers.
                    </p>
                  </div>
                  <div className="border-t border-white/5 pt-4 text-xs text-zinc-400">
                    High interview conversion rate among graduates.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* AI Pathfinder Workbench */}
      <section className="py-20 bg-black/40 border-y border-white/[0.08] relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Pathfinder Form */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
                <Sparkles size={14} />
                <span>AI Architecture Pathfinder</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight font-display">
                Have an idea? Let's design the technical blueprint.
              </h2>

              <p className="text-zinc-400 text-base leading-relaxed">
                Tell our AI system architect what you want to build or learn. We will instantly synthesize the exact tech stack, schema approach, and phase breakdown.
              </p>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap gap-2 pt-2">
                {PRESET_QUERIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleAiPathfinder(q)}
                    className="px-3 py-1.5 rounded-full text-xs font-mono bg-white/[0.04] hover:bg-white/[0.09] text-zinc-300 border border-white/10 transition-all text-left truncate max-w-full"
                  >
                    + {q}
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <div className="p-2 rounded-2xl bg-[#0e121a] border border-white/15 flex flex-col sm:flex-row gap-2 shadow-xl">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAiPathfinder()}
                  placeholder="e.g. Build an AI-driven school attendance engine"
                  className="flex-grow bg-transparent px-4 py-3 text-sm sm:text-base text-white placeholder:text-zinc-500 focus:outline-none"
                />
                <button
                  onClick={() => handleAiPathfinder()}
                  disabled={isAiLoading}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm transition-all disabled:opacity-50 whitespace-nowrap flex items-center justify-center gap-2 active:scale-95"
                >
                  {isAiLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full"
                      />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      <span>Synthesize Blueprint</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Terminal Preview */}
            <div className="lg:col-span-6">
              {aiRecommendation ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 sm:p-8 rounded-3xl bg-[#0d111a] border border-emerald-500/30 text-left relative shadow-2xl"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                    <span className="text-xs font-mono text-emerald-400 flex items-center gap-2">
                      <Terminal size={14} />
                      <span>Generated Blueprint Response</span>
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(aiRecommendation);
                      }}
                      className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1"
                    >
                      <Bookmark size={13} />
                      <span>Copy</span>
                    </button>
                  </div>
                  <pre className="font-mono text-xs sm:text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">
                    {aiRecommendation}
                  </pre>
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-zinc-500 font-mono">Ready to execute?</span>
                    <button
                      onClick={() => onNavigate('get-started')}
                      className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                    >
                      <span>Engage Studio</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <TerminalDemo />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Client Projects (Spotlight Showcase) */}
      <section className="py-24 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-3 block">
                Selected Works
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-display">
                Featured Production Systems
              </h2>
            </div>
            <button
              onClick={() => onNavigate('portfolio')}
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors group"
            >
              <span>View All 4 Case Studies</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Project Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                onClick={() => onSelectProject(project)}
                className="rounded-3xl bg-[#0e121a] border border-white/10 hover:border-emerald-500/40 transition-all p-6 sm:p-8 flex flex-col justify-between group cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-emerald-500/5"
              >
                <div>
                  {/* Top bar with category and external link */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white/[0.05] border border-white/10 text-emerald-400">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-zinc-500 group-hover:text-white transition-colors flex items-center gap-1">
                      <span>Explore Case</span>
                      <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 font-display group-hover:text-emerald-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Simulated browser window with image */}
                <div>
                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 mb-6 relative">
                    <div className="h-7 bg-zinc-900/90 border-b border-white/5 px-3 flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-rose-500/70" />
                      <div className="w-2 h-2 rounded-full bg-amber-500/70" />
                      <div className="w-2 h-2 rounded-full bg-emerald-500/70" />
                    </div>
                    <div className="aspect-[16/9] w-full overflow-hidden bg-zinc-900">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070";
                        }}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/[0.03] text-zinc-400 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Structured Curriculum Bento Grid */}
      <section id="tutorials" className="py-24 sm:py-32 bg-black/30 border-y border-white/[0.06] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-3 block">
              Curriculum Architecture
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-display mb-6">
              Designed for depth, not superficial tutorials.
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg">
              Every course track corresponds directly to the technology stack we deploy in real enterprise contracts.
            </p>
          </div>

          {/* Asymmetric Bento Grid */}
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Card 1: Web Applications (Span 7) */}
            <div className="lg:col-span-7 p-8 rounded-3xl bg-[#0e121a] border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Globe size={24} />
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 text-zinc-400 border border-white/5">
                    Flagship Track • 12 Weeks
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 font-display">
                  Web Applications & SaaS Systems
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  Master modern full-stack development with Next.js 15, React 19, TypeScript, Server Actions, and Postgres. Build high-concurrency portals with zero layout shift.
                </p>
              </div>

              {/* Interactive Code Preview Tabs */}
              <div className="rounded-2xl bg-[#090b12] border border-white/10 p-4 font-mono text-xs">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-zinc-400">app/api/auth/route.ts</span>
                </div>
                <div className="space-y-1 text-zinc-300">
                  <span className="text-indigo-400">export async function</span>{' '}
                  <span className="text-emerald-400">POST</span>(req: Request) &#123;
                  <div className="pl-4 text-zinc-400">
                    const &#123; user, role &#125; = await verifySession(req);
                  </div>
                  <div className="pl-4 text-zinc-400">
                    if (!role.includes('ADMIN')) return unauthorized();
                  </div>
                  <div className="pl-4 text-emerald-300">
                    return Response.json(&#123; ok: true, timestamp: Date.now() &#125;);
                  </div>
                  &#125;
                </div>
              </div>
            </div>

            {/* Card 2: Mobile Systems (Span 5) */}
            <div className="lg:col-span-5 p-8 rounded-3xl bg-[#0e121a] border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                    <Smartphone size={24} />
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 text-zinc-400 border border-white/5">
                    iOS & Android
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 font-display">
                  Mobile App Engineering
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  Cross-platform mobile applications powered by React Native and Expo. Offline-first data synchronization, push notifications, and biometric verification.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-zinc-300 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-zinc-400">Target Platforms</span>
                  <span className="text-emerald-400 font-bold">iOS + Android</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-zinc-400">Native APIs</span>
                  <span className="text-zinc-200">Biometrics, Camera, Geolocation</span>
                </div>
              </div>
            </div>

            {/* Card 3: Backend & Security (Span 5) */}
            <div className="lg:col-span-5 p-8 rounded-3xl bg-[#0e121a] border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
                    <Server size={24} />
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 text-zinc-400 border border-white/5">
                    Cloud & Scale
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 font-display">
                  Backend Architecture & Cloud
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  Node.js, Express, Docker containers on Cloud Run, ACID-relational design, Redis caching, and zero-downtime migrations.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span>Security hardened • Automated linting</span>
              </div>
            </div>

            {/* Card 4: Modern Web Design & Micro-Interactions (Span 7) */}
            <div className="lg:col-span-7 p-8 rounded-3xl bg-[#0e121a] border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                    <Sparkles size={24} />
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 text-zinc-400 border border-white/5">
                    60fps Craft
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 font-display">
                  Design Engineering & Kinetic UI
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  Bridge the gap between design and code. Master Framer Motion spring physics, optical kerning, accessible micro-interactions, and bespoke styling with Tailwind CSS v4.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400">Target Frame Rate</span>
                <span className="text-xs font-mono text-emerald-400 font-bold">60fps Smooth Animation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Free Tutorials */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-3 block">
                Free Knowledge Drops
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-display">
                Weekly Developer Guides
              </h2>
            </div>
            <button
              onClick={() => onNavigate('get-started')}
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span>Join WhatsApp Group for Live Classes</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURED_TUTORIALS.map((tutorial, idx) => (
              <motion.div
                key={tutorial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                onClick={() => onNavigate('get-started')}
                className="rounded-3xl bg-[#0e121a] border border-white/10 hover:border-emerald-500/40 transition-all overflow-hidden flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="aspect-[16/10] w-full overflow-hidden bg-zinc-900 relative">
                    <img
                      src={tutorial.image}
                      alt={tutorial.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-black/70 backdrop-blur-md text-emerald-400 border border-white/10">
                        {tutorial.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono mb-3">
                      <span>{tutorial.difficulty}</span>
                      <span>•</span>
                      <span>{tutorial.duration}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors font-display">
                      {tutorial.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {tutorial.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-emerald-400">
                  <span>Read Tutorial</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Newsletter & Direct WhatsApp Banner */}
      <section className="py-20 bg-emerald-950/30 border-t border-white/[0.08] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="p-8 sm:p-12 md:p-16 rounded-[2.5rem] bg-gradient-to-br from-emerald-900/50 via-[#0e141c] to-[#090a0f] border border-emerald-500/20 shadow-2xl relative overflow-hidden">
            <div className="max-w-3xl">
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-3 block">
                Direct Channel
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display">
                Ready to build something impactful?
              </h2>
              <p className="text-zinc-300 text-base sm:text-lg mb-8 leading-relaxed">
                Connect directly with the founder and senior engineering team on WhatsApp, or subscribe for curated architectural blueprints delivered to your inbox.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href="https://chat.whatsapp.com/IV6sRV0HRYU2vl7o8kYHea"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all text-sm sm:text-base"
                >
                  <MessageCircle size={18} />
                  <span>Join WhatsApp Community</span>
                </a>

                <button
                  onClick={() => onNavigate('get-started')}
                  className="px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold flex items-center justify-center gap-2 border border-white/10 transition-all text-sm sm:text-base"
                >
                  <span>Request Studio Project Quote</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Newsletter subscribe form */}
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-emerald-400 flex-grow"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/10 transition-colors whitespace-nowrap"
                >
                  {emailSubscribed ? 'Subscribed!' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
