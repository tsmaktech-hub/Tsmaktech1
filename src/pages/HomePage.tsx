import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Code2, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  Smartphone, 
  Server, 
  Layers, 
  CheckCircle2, 
  ExternalLink,
  MessageCircle,
  TrendingUp,
  Terminal,
  Zap,
  Bookmark,
  Play
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { PROJECTS, LEARNING_PATHS, FEATURED_TUTORIALS, STUDIO_METRICS } from '../constants';
import { Project } from '../types';
import Marquee from '../components/Marquee';
import TerminalDemo from '../components/TerminalDemo';
import HeroFireShowcase from '../components/HeroFireShowcase';
import Carousel3D from '../components/Carousel3D';
import VisualWorkflow from '../components/VisualWorkflow';
import TiltCard from '../components/TiltCard';

interface HomePageProps {
  onNavigate: (page: 'home' | 'portfolio' | 'get-started', sectionId?: string) => void;
  onSelectProject: (project: Project) => void;
}

const PRESET_QUERIES = [
  "Build an AI Quran/Hadith search app",
  "Institutional university attendance system",
  "Full-stack React & Next.js SaaS with Stripe",
  "Cross-platform mobile app with React Native"
];

export default function HomePage({ onNavigate, onSelectProject }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [aiRecommendation, setAiRecommendation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [dualMode, setDualMode] = useState<'studio' | 'academy'>('studio');
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleAiPathfinder = async (queryToRun?: string) => {
    const query = queryToRun || searchQuery;
    if (!query.trim()) return;
    setIsAiLoading(true);
    setSearchQuery(query);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        setTimeout(() => {
          setAiRecommendation(
            `🚀 Recommended Engineering Roadmap for "${query}":\n\n` +
            `• Phase 1: Architecture & Schema Design (TypeScript, Postgres, RBAC Auth)\n` +
            `• Phase 2: 3D Kinetic UI & Motion (React 19, Tailwind CSS, Framer Motion)\n` +
            `• Phase 3: AI & API Integration (Server-side Gemini pipelines, Edge Caching)\n` +
            `• Phase 4: Production Hardening & Cloud Run Deployment (Audit, Docker, CI/CD)\n\n` +
            `Estimated Sprint: 2-3 Weeks with Tsmak Tech.`
          );
          setIsAiLoading(false);
        }, 500);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are Lead Systems Architect at Tsmak Tech. A user wants to build: "${query}".
Provide a concise, highly actionable 4-phase technical roadmap.
Mention modern technologies (Next.js, React 19, PostgreSQL, AI vectors).
Format with clear bullet points and realistic timeframe. Max 120 words.`,
      });

      setAiRecommendation(response.text || "Roadmap synthesized. Engage our studio to begin.");
    } catch (error) {
      console.error("Pathfinder error:", error);
      setAiRecommendation(
        `Technical Blueprint for "${query}":\n` +
        `1. System Architecture & Schema (PostgreSQL/Supabase)\n` +
        `2. Full-Stack Reactive Interface (Next.js 15 App Router)\n` +
        `3. Security, RBAC & API Gateway (Cloud Run)\n` +
        `Chat with our founder directly on WhatsApp to initiate sprint.`
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
    <div className="relative w-full overflow-x-hidden">
      {/* 1. Visual-First Hero with "Webdesign on FIRE" & Floating 3D Browser Mockup */}
      <HeroFireShowcase onNavigate={onNavigate} />

      {/* Infinite Tech Marquee */}
      <Marquee />

      {/* 2. 3D Perspective Fan-out Carousel (Reel 3 & 4: LightswindUI 3D Portfolio Showcase) */}
      <motion.section 
        id="portfolio-showcase" 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.55 }}
        className="py-12 sm:py-16 relative bg-black/20 border-b border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
              <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-400 uppercase mb-1.5 block">
                3D Interactive Gallery
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-white tracking-tight font-display">
                Featured Production Systems
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('portfolio')}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors group px-3 py-1.5 rounded-lg hover:bg-emerald-500/10 btn-glass-hover"
              >
                <span>Full Portfolio Details</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* 3D Carousel Component */}
          <Carousel3D
            projects={PROJECTS}
            onSelectProject={onSelectProject}
            onNavigateGetStarted={() => onNavigate('get-started')}
          />
        </div>
      </motion.section>

      {/* 3. Visual Execution Pipeline ("Get started 👇" - Reel 2 Effect) */}
      <VisualWorkflow onNavigateGetStarted={() => onNavigate('get-started')} />

      {/* 4. Visual Dual Discipline (Studio vs Academy) with Imagery */}
      <motion.section 
        id="professional-services" 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.55 }}
        className="py-14 sm:py-18 relative scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-400 uppercase mb-2 block">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight font-display mb-3">
              Two Disciplines. Zero Mediocrity.
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Choose your engagement path with Tsmak Tech.
            </p>

            {/* Interactive Toggle */}
            <div className="inline-flex items-center p-1 rounded-full bg-white/[0.04] border border-white/10 mt-5">
              <button
                onClick={() => setDualMode('studio')}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  dualMode === 'studio'
                    ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20 btn-shine'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                For Companies (The Studio)
              </button>
              <button
                onClick={() => setDualMode('academy')}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  dualMode === 'academy'
                    ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20 btn-shine'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                For Learners (The Academy)
              </button>
            </div>
          </div>

          {/* Visual Cards with Minimal Text */}
          <AnimatePresence mode="wait">
            {dualMode === 'studio' ? (
              <motion.div
                key="studio-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-3 gap-5"
              >
                {/* Visual Card 1 */}
                <TiltCard className="p-4 sm:p-5 rounded-2xl bg-[#0c1017] border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between group h-full">
                  <div>
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-900 mb-4 border border-white/10">
                      <img
                        src="/images/attendance_ui.jpg"
                        alt="Institutional Web Apps"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-emerald-400 font-mono text-[9px] font-bold">
                        Institutional
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 font-display">
                      Enterprise & Attendance Systems
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed mb-3">
                      High-concurrency portals with role-based security, automated attendance logging, and institutional audit integrity.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-emerald-400">
                    <span>PostgreSQL • ACID</span>
                    <CheckCircle2 size={13} />
                  </div>
                </TiltCard>

                {/* Visual Card 2 */}
                <TiltCard className="p-4 sm:p-5 rounded-2xl bg-[#0c1017] border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between group h-full">
                  <div>
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-900 mb-4 border border-white/10">
                      <img
                        src="/images/islamic_gpt_ui.jpg"
                        alt="AI Systems"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-amber-400 font-mono text-[9px] font-bold">
                        AI & Vectors
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 font-display">
                      Domain AI & Vector Platforms
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed mb-3">
                      Bespoke retrieval pipelines, private document grounding, and sub-second semantic search (as in Tsmak-Islamic GPT).
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-amber-400">
                    <span>Gemini API • Edge</span>
                    <CheckCircle2 size={13} />
                  </div>
                </TiltCard>

                {/* Visual Card 3 */}
                <TiltCard className="p-4 sm:p-5 rounded-2xl bg-[#0c1017] border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between group h-full">
                  <div>
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-900 mb-4 border border-white/10">
                      <img
                        src="/images/webdesign_on_fire.jpg"
                        alt="Kinetic Web Design"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-teal-400 font-mono text-[9px] font-bold">
                        Kinetic UI
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 font-display">
                      Rapid MVP to Production
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed mb-3">
                      From specification to production in 2 to 4 weeks. Direct founder access, clean git commits, and Cloud Run hosting.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-teal-400">
                    <span>2-4 Wk Delivery</span>
                    <CheckCircle2 size={13} />
                  </div>
                </TiltCard>
              </motion.div>
            ) : (
              <motion.div
                key="academy-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-3 gap-5"
              >
                {/* Academy Card 1 */}
                <TiltCard className="p-4 sm:p-5 rounded-2xl bg-[#0c1017] border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between group h-full">
                  <div>
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-900 mb-4 border border-white/10">
                      <img
                        src="/images/academy_mentorship.jpg"
                        alt="Production Stack"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-emerald-400 font-mono text-[9px] font-bold">
                        Production Stack
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 font-display">
                      Real Projects (No Toys)
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed mb-3">
                      Build full-stack production systems: React 19, TypeScript strict mode, Next.js App Router, and Postgres.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 text-[11px] text-emerald-400 font-mono">
                    Based on live client contracts
                  </div>
                </TiltCard>

                {/* Academy Card 2 */}
                <TiltCard className="p-4 sm:p-5 rounded-2xl bg-[#0c1017] border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between group h-full">
                  <div>
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-900 mb-4 border border-white/10">
                      <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                        alt="WhatsApp Community"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-teal-400 font-mono text-[9px] font-bold">
                        Live Community
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 font-display">
                      Direct WhatsApp Mentorship
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed mb-3">
                      Get unblocked in minutes. Code reviews, architectural advice, and career roadmaps directly from senior engineers.
                    </p>
                  </div>

                  <a
                    href="https://chat.whatsapp.com/IV6sRV0HRYU2vl7o8kYHea"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pt-3 border-t border-white/5 text-[11px] text-emerald-400 font-bold flex items-center justify-between hover:underline"
                  >
                    <span>Join 500+ Builders</span>
                    <ArrowRight size={12} />
                  </a>
                </TiltCard>

                {/* Academy Card 3 */}
                <TiltCard className="p-4 sm:p-5 rounded-2xl bg-[#0c1017] border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between group h-full">
                  <div>
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-900 mb-4 border border-white/10">
                      <img
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
                        alt="Hirable Portfolio"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-indigo-400 font-mono text-[9px] font-bold">
                        Career Output
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 font-display">
                      Verified Portfolio Links
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed mb-3">
                      Graduate with live production links and clean git commits that demonstrate competence to international employers.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 text-[11px] text-zinc-400 font-mono">
                    High interview conversion rate
                  </div>
                </TiltCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* 5. AI Pathfinder Workbench */}
      <motion.section 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.55 }}
        className="py-14 sm:py-16 bg-black/40 border-y border-white/[0.08] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
                <Sparkles size={13} />
                <span>AI Architecture Pathfinder</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
                Have an idea? Synthesize the blueprint.
              </h2>

              {/* Quick Presets */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {PRESET_QUERIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleAiPathfinder(q)}
                    className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-white/[0.04] hover:bg-white/[0.1] text-zinc-300 border border-white/10 transition-all text-left truncate max-w-full btn-glass-hover cursor-pointer"
                  >
                    + {q}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <div className="p-1.5 rounded-xl bg-[#0c1017] border border-white/15 flex flex-col sm:flex-row gap-2 shadow-lg">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAiPathfinder()}
                  placeholder="e.g. Build an AI school attendance engine"
                  className="flex-grow bg-transparent px-3 py-2 text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none"
                />
                <button
                  onClick={() => handleAiPathfinder()}
                  disabled={isAiLoading}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all disabled:opacity-50 whitespace-nowrap flex items-center justify-center gap-1.5 active:scale-95 btn-emerald-glow btn-shine cursor-pointer"
                >
                  {isAiLoading ? (
                    <span>Synthesizing...</span>
                  ) : (
                    <>
                      <Sparkles size={14} />
                      <span>Generate Spec</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Blueprint Box */}
            <div className="lg:col-span-6">
              {aiRecommendation ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-5 rounded-2xl bg-[#0c1017] border border-emerald-500/30 text-left relative shadow-xl"
                >
                  <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-2.5">
                    <span className="text-xs font-mono text-emerald-400 flex items-center gap-2">
                      <Terminal size={13} />
                      <span>Synthesized Spec</span>
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(aiRecommendation);
                      }}
                      className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1"
                    >
                      <Bookmark size={12} />
                      <span>Copy</span>
                    </button>
                  </div>
                  <pre className="font-mono text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                    {aiRecommendation}
                  </pre>
                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
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
      </motion.section>

      {/* 6. Visual Knowledge & Free Weekly Tutorials with Rich Imagery */}
      <motion.section 
        id="tutorials" 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.55 }}
        className="py-14 sm:py-18 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-400 uppercase mb-1.5 block">
                Open Access
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight font-display">
                Weekly Developer Masterclasses
              </h2>
            </div>
            <a
              href="https://chat.whatsapp.com/IV6sRV0HRYU2vl7o8kYHea"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 btn-glass-hover"
            >
              <MessageCircle size={15} />
              <span>Join WhatsApp Group for Live Coding</span>
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {FEATURED_TUTORIALS.map((tutorial, idx) => (
              <TiltCard
                key={tutorial.id}
                tiltAngle={6}
                className="rounded-2xl bg-[#0c1017] border border-white/10 hover:border-emerald-500/40 transition-all p-4 flex flex-col justify-between group h-full cursor-pointer"
                onClick={() => onNavigate('get-started')}
              >
                <div>
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-900 mb-3 border border-white/10">
                    <img
                      src={tutorial.image}
                      alt={tutorial.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-emerald-400 font-mono text-[9px] font-bold">
                      {tutorial.category}
                    </div>
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center shadow-lg">
                        <Play size={16} className="fill-zinc-950 ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-mono mb-1.5">
                    <span>{tutorial.difficulty}</span>
                    <span>•</span>
                    <span className="text-emerald-400">{tutorial.duration}</span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-emerald-300 transition-colors font-display">
                    {tutorial.title}
                  </h3>

                  <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2">
                    {tutorial.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-emerald-400">
                  <span>Start Learning</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 7. Bottom Action Channel */}
      <motion.section 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.55 }}
        className="py-14 sm:py-16 bg-gradient-to-b from-transparent to-[#07080c] border-t border-white/[0.06] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#0d121b] to-[#080a0f] border border-emerald-500/25 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
                Direct Hotline
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Discuss Your System with Founder
              </h2>
              <p className="text-zinc-300 text-xs sm:text-sm max-w-lg">
                Direct WhatsApp consultation with Tsmak Tech. Usually responds within 2 hours.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
              <a
                href="https://wa.me/2347087445219?text=Hello%20Tsmak%20Tech%2C%20I'd%20like%20to%20discuss%20a%20new%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 btn-emerald-glow btn-shine active:scale-95 transition-all cursor-pointer"
              >
                <MessageCircle size={15} />
                <span>WhatsApp: +234 708 744 5219</span>
              </a>

              <button
                onClick={() => onNavigate('get-started')}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-semibold text-xs flex items-center justify-center gap-2 border border-white/10 btn-glass-hover active:scale-95 cursor-pointer"
              >
                <span>Request Project Scope</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
