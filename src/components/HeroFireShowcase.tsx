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
    <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-500/12 via-teal-500/8 to-transparent rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-amber-500/8 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Heading, Pitch, Actions */}
          <div className="lg:col-span-6 text-left">
            {/* Animated Fiery Badge (WeAreBrand Reel Effect) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-emerald-500/15 border border-amber-500/30 text-[11px] font-mono text-zinc-200 mb-5 backdrop-blur-md shadow-sm"
            >
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-orange-500/20 text-orange-400">
                <Flame size={11} className="animate-pulse fill-orange-400" />
              </span>
              <span className="font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400">
                WEBDESIGN ON FIRE
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-emerald-400 font-semibold">Tsmak Tech Studio</span>
            </motion.div>

            {/* Punchy Headline beside the computer */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[42px] xl:text-[46px] font-extrabold text-white tracking-tight leading-[1.12] mb-4 font-display"
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
              className="text-sm sm:text-base text-zinc-400 max-w-lg mb-7 leading-relaxed font-sans"
            >
              Bespoke high-concurrency SaaS, institutional attendance suites, and domain AI platforms — built with zero templates and extreme visual craft.
            </motion.p>

            {/* Direct Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              <button
                onClick={() => onNavigate('get-started')}
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all group"
              >
                <span>Hire Us for Your Project</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="https://wa.me/2347087445219?text=Hello%20Tsmak%20Tech%2C%20I'm%20interested%20in%20a%20website%2Fsystem%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-semibold text-xs sm:text-sm border border-white/10 flex items-center justify-center gap-2 backdrop-blur-md transition-all active:scale-95"
              >
                <MessageCircle size={15} className="text-emerald-400" />
                <span>Direct WhatsApp</span>
              </a>
            </motion.div>

            {/* Key Trust Metrics */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/[0.08] text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>99.9% Uptime SLA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>Zero-Template Code</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap size={14} className="text-amber-400" />
                <span>Direct Founder Sprint</span>
              </div>
            </div>
          </div>

          {/* Right Column: Computer / Browser Mockup beside text */}
          <div className="lg:col-span-6">
            {/* Interactive Device Mockup Switcher Tabs */}
            <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1 scrollbar-none">
              {PREVIEWS.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActivePreview(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap ${
                    activePreview === idx
                      ? 'bg-emerald-500 text-zinc-950 font-bold shadow-sm shadow-emerald-500/20 scale-[1.02]'
                      : 'bg-white/[0.04] text-zinc-400 hover:text-white border border-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* 3D Floating Interactive Browser Mockup with Tilt Effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative group w-full"
            >
              {/* Laser-border animated line around the container */}
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-emerald-500/30 via-amber-500/30 to-teal-500/30 opacity-60 blur-sm group-hover:opacity-100 transition-opacity" />

              <TiltCard
                tiltAngle={5}
                glareColor="rgba(52, 211, 153, 0.15)"
                className="rounded-3xl bg-[#0c1017] border border-white/20 p-3 sm:p-4 shadow-2xl backdrop-blur-xl"
              >
                {/* macOS Browser Header */}
                <div className="flex items-center justify-between px-2 py-1.5 border-b border-white/10 mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90" />
                    <div className="flex items-center gap-1.5 ml-2 px-2.5 py-0.5 rounded-md bg-black/50 border border-white/10 text-[11px] font-mono text-zinc-400">
                      <span className="text-emerald-400">https://</span>
                      <span>tsmak.tech/systems/{preview.id}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold">
                      {preview.tag}
                    </span>
                  </div>
                </div>

                {/* High-Resolution Visual Mockup Image */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-950 border border-white/10">
                  <img
                    src={preview.image}
                    alt={preview.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />

                  {/* Floating Live Pill 1 (Top Left) */}
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-semibold flex items-center gap-1.5 shadow-xl"
                  >
                    <Flame size={12} className="text-orange-400 fill-orange-400" />
                    <span>Bespoke Code</span>
                  </motion.div>

                  {/* Floating Live Pill 2 (Bottom Right) */}
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-emerald-500 text-zinc-950 text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-xl shadow-emerald-500/25"
                  >
                    <Zap size={12} />
                    <span>{preview.metric}</span>
                  </motion.div>

                  {/* Floating Live Pill 3 (Bottom Left) */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-md border border-white/15 text-zinc-300 text-[10px] font-mono hidden sm:flex items-center gap-1.5 shadow-md">
                    <Cpu size={12} className="text-emerald-400" />
                    <span>{preview.feature}</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
