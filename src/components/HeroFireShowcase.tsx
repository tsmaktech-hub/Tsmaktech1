import React, { useState } from 'react';
import { motion } from 'framer-motion';
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

  const preview = PREVIEWS[activePreview];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full text-center relative z-10">
        {/* Animated Fiery Badge (WeAreBrand Reel Effect) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-emerald-500/15 border border-amber-500/30 text-xs font-mono text-zinc-200 mb-8 backdrop-blur-md shadow-lg shadow-amber-500/10"
        >
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-500/20 text-orange-400">
            <Flame size={13} className="animate-pulse fill-orange-400" />
          </span>
          <span className="font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400">
            WEBDESIGN ON FIRE
          </span>
          <span className="text-zinc-600">•</span>
          <span className="text-emerald-400 font-semibold">Tsmak Tech Studio</span>
        </motion.div>

        {/* Punchy Headline (Low text, high impact) */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.04] mb-6 font-display max-w-5xl mx-auto"
        >
          Web Systems{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
            Engineered to Dominate.
          </span>
        </motion.h1>

        {/* Concise Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-sans"
        >
          Bespoke high-concurrency SaaS, institutional attendance suites, and domain AI platforms — built with zero templates and extreme visual craft.
        </motion.p>

        {/* Direct Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <button
            onClick={() => onNavigate('get-started')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold text-base flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/25 active:scale-95 transition-all group"
          >
            <span>Hire Us for Your Project</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="https://wa.me/2347087445219?text=Hello%20Tsmak%20Tech%2C%20I'm%20interested%20in%20a%20website%2Fsystem%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-semibold text-base border border-white/10 flex items-center justify-center gap-2.5 backdrop-blur-md transition-all active:scale-95"
          >
            <MessageCircle size={18} className="text-emerald-400" />
            <span>Direct WhatsApp Line</span>
          </a>
        </motion.div>

        {/* Interactive Device Mockup Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {PREVIEWS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActivePreview(idx)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-semibold transition-all ${
                activePreview === idx
                  ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20 scale-105'
                  : 'bg-white/[0.03] text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* 3D Floating Interactive Browser Mockup with Tilt Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-5xl mx-auto relative group"
        >
          {/* Laser-border animated line around the container */}
          <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-emerald-500/40 via-amber-500/40 to-teal-500/40 opacity-70 blur-md group-hover:opacity-100 transition-opacity" />

          <TiltCard
            tiltAngle={6}
            glareColor="rgba(52, 211, 153, 0.2)"
            className="rounded-[2.2rem] bg-[#0c1017] border border-white/20 p-3 sm:p-5 shadow-2xl backdrop-blur-xl"
          >
            {/* macOS Browser Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/90" />
                <span className="w-3 h-3 rounded-full bg-amber-500/90" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/90" />
                <div className="hidden sm:flex items-center gap-2 ml-4 px-3 py-1 rounded-lg bg-black/50 border border-white/10 text-xs font-mono text-zinc-400">
                  <span className="text-emerald-400">https://</span>
                  <span>tsmak.tech/systems/{preview.id}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold">
                  {preview.tag}
                </span>
              </div>
            </div>

            {/* High-Resolution Visual Mockup Image */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-white/10">
              <img
                src={preview.image}
                alt={preview.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Floating Live Pill 1 (Top Left) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-4 left-4 px-3.5 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-semibold flex items-center gap-2 shadow-2xl"
              >
                <Flame size={14} className="text-orange-400 fill-orange-400" />
                <span>100% Bespoke Code • 0% Templates</span>
              </motion.div>

              {/* Floating Live Pill 2 (Bottom Right) */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-xl bg-emerald-500 text-zinc-950 text-xs font-mono font-bold flex items-center gap-2 shadow-2xl shadow-emerald-500/30"
              >
                <Zap size={14} />
                <span>{preview.metric}</span>
              </motion.div>

              {/* Floating Live Pill 3 (Bottom Left) */}
              <div className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/15 text-zinc-300 text-xs font-mono hidden sm:flex items-center gap-2 shadow-lg">
                <Cpu size={14} className="text-emerald-400" />
                <span>{preview.feature}</span>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
