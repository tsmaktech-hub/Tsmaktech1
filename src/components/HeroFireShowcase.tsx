import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Zap, 
  MessageCircle, 
  CheckCircle2, 
  Eye,
  ExternalLink,
  Cpu
} from 'lucide-react';
import TiltCard from './TiltCard';

interface HeroFireShowcaseProps {
  onNavigate: (page: 'home' | 'portfolio' | 'get-started', sectionId?: string) => void;
}

const PREVIEWS = [
  {
    id: 'studio',
    label: 'High-Velocity SaaS',
    tag: 'Webdesign on FIRE',
    image: '/images/webdesign_on_fire.jpg',
    metric: '99/100 Lighthouse Performance',
    feature: 'React 19 • Next.js 15 • Cloud Run'
  },
  {
    id: 'attendance',
    label: 'Attendance Suite',
    tag: 'Institutional Ops',
    image: '/images/attendance_ui.jpg',
    metric: '99.9% University Uptime',
    feature: 'PostgreSQL • Biometrics • Role Security'
  },
  {
    id: 'islamic-gpt',
    label: 'Islamic GPT AI',
    tag: 'Knowledge Vectors',
    image: '/images/islamic_gpt_ui.jpg',
    metric: 'Sub-second Semantic Lookup',
    feature: 'Gemini LLM • Quran & Hadith Retrieval'
  }
];

export default function HeroFireShowcase({ onNavigate }: HeroFireShowcaseProps) {
  const [activePreview, setActivePreview] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Automatically cycle between High-Velocity SaaS, Attendance Suite, and Islamic GPT AI
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActivePreview((prev) => (prev + 1) % PREVIEWS.length);
    }, 3800);

    return () => clearInterval(timer);
  }, [isPaused]);

  const preview = PREVIEWS[activePreview];

  return (
    <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Radial Glow */}
      <div 
        className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none -z-10 opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)',
        }}
      />
      <div 
        className="absolute top-1/3 right-10 w-72 h-72 pointer-events-none -z-10 opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-10 items-center">
          {/* Left Column: Heading, Pitch, Actions, Switcher */}
          <div className="md:col-span-6 lg:col-span-6 text-left flex flex-col justify-center">
            {/* Streamlined Studio Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-zinc-300 mb-3.5 shadow-sm w-fit"
            >
              <span className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-blue-500/20 text-blue-400">
                <Flame size={11} className="text-blue-400 fill-blue-400" />
              </span>
              <span className="font-semibold text-white">Tsmak Tech Studio</span>
              <span className="text-zinc-600">•</span>
              <span className="text-blue-400 font-mono">Bespoke Systems</span>
            </motion.div>

            {/* Punchy Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-3xl lg:text-[40px] xl:text-[44px] font-extrabold text-white tracking-tight leading-[1.12] mb-3 font-display"
            >
              Web Systems{' '}
              <span className="text-blue-400">
                Engineered to Dominate.
              </span>
            </motion.h1>

            {/* Reduced & Punchy Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-xs sm:text-sm md:text-xs lg:text-sm text-zinc-400 max-w-lg mb-5 leading-relaxed font-sans"
            >
              Bespoke SaaS, attendance suites, and domain AI platforms — built with zero templates and high concurrency.
            </motion.p>

            {/* Direct Action Buttons - Clean & Simple */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 mb-5"
            >
              <button
                onClick={() => onNavigate('get-started')}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm active:scale-95"
              >
                <span>Hire Us for Your Project</span>
                <ArrowRight size={14} />
              </button>

              <a
                href="https://wa.me/2347087445219?text=Hello%20Tsmak%20Tech%2C%20I'm%20interested%20in%20a%20website%2Fsystem%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white font-medium text-xs sm:text-sm border border-white/10 hover:border-white/20 flex items-center justify-center gap-2 cursor-pointer transition-colors active:scale-95"
              >
                <MessageCircle size={14} className="text-blue-400" />
                <span>Direct WhatsApp</span>
              </a>
            </motion.div>

            {/* Compact Trust Bar */}
            <div className="pt-3.5 border-t border-white/[0.08]">
              {/* Trust Indicators in a clean responsive row */}
              <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-[10px] sm:text-[11px] font-mono text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-blue-400 shrink-0" />
                  <span>99.9% Uptime SLA</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-blue-400 shrink-0" />
                  <span>Zero-Template Code</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap size={13} className="text-blue-400 shrink-0" />
                  <span>Founder Sprint</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Computer / Browser Mockup beside text on laptop and desktop */}
          <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-center w-full max-w-lg md:max-w-none mx-auto mt-6 md:mt-0">
            {/* 3D Floating Interactive Browser Mockup with Tilt Effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="relative w-full"
            >
              <TiltCard
                tiltAngle={4}
                glareColor="rgba(37, 99, 235, 0.05)"
                className="rounded-2xl bg-[#0c101c] border border-white/10 p-2.5 sm:p-3.5 lg:p-4 shadow-xl"
              >
                {/* macOS Browser Header */}
                <div className="flex items-center justify-between px-2 py-1.5 border-b border-white/10 mb-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shrink-0" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shrink-0" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shrink-0" />
                    <div className="flex items-center gap-1.5 ml-1.5 sm:ml-2 px-2 py-0.5 rounded-md bg-black/40 border border-white/10 text-[10px] sm:text-[11px] font-mono text-zinc-400 truncate max-w-[120px] sm:max-w-none">
                      <span className="text-blue-400 hidden sm:inline">https://</span>
                      <span>tsmak.tech/systems/{preview.id}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-white/[0.06] text-zinc-300 border border-white/10 text-[9px] sm:text-[10px] font-mono font-medium">
                      {preview.tag}
                    </span>
                  </div>
                </div>

                {/* High-Resolution Visual Mockup Image */}
                <div 
                  className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-950 border border-white/10"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={preview.id}
                      src={preview.image}
                      alt={preview.label}
                      initial={{ opacity: 0.3, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.3, scale: 0.98 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>

                  {/* Floating Live Pill 1 (Top Left) */}
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-black/85 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-[11px] font-mono font-semibold flex items-center gap-1.5 shadow-xl"
                  >
                    <Flame size={11} className="text-sky-400 fill-sky-400" />
                    <span>Bespoke Code</span>
                  </motion.div>

                  {/* Floating Live Pill 2 (Bottom Right) */}
                  <motion.div
                    key={`metric-${preview.id}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-blue-600 text-white text-[10px] sm:text-[11px] font-mono font-medium flex items-center gap-1.5 shadow-md"
                  >
                    <Zap size={11} />
                    <span>{preview.metric}</span>
                  </motion.div>

                  {/* Floating Live Pill 3 (Bottom Left) */}
                  <motion.div
                    key={`feat-${preview.id}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-black/85 backdrop-blur-md border border-white/15 text-zinc-300 text-[9px] sm:text-[10px] font-mono hidden sm:flex items-center gap-1.5 shadow-md"
                  >
                    <Cpu size={11} className="text-sky-400" />
                    <span>{preview.feature}</span>
                  </motion.div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
