import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  MessageCircle, 
  CheckCircle2, 
  Cpu,
  Monitor,
  Smartphone,
  Layers,
  Sparkles
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
    mobileMetric: '60 FPS Mobile Touch',
    feature: 'React 19 • Next.js 15 • Cloud Run'
  },
  {
    id: 'attendance',
    label: 'Attendance Suite',
    tag: 'Institutional Ops',
    image: '/images/attendance_ui.jpg',
    metric: '99.9% University Uptime',
    mobileMetric: 'Offline Biometrics',
    feature: 'PostgreSQL • Biometrics • Role Security'
  },
  {
    id: 'islamic-gpt',
    label: 'Islamic GPT AI',
    tag: 'Knowledge Vectors',
    image: '/images/islamic_gpt_ui.jpg',
    metric: 'Sub-second Semantic Lookup',
    mobileMetric: 'Voice & Semantic Q&A',
    feature: 'Gemini LLM • Quran & Hadith Retrieval'
  }
];

export default function HeroFireShowcase({ onNavigate }: HeroFireShowcaseProps) {
  const [activePreview, setActivePreview] = useState(0);
  const [deviceMode, setDeviceMode] = useState<'dual' | 'desktop' | 'mobile'>('dual');

  const preview = PREVIEWS[activePreview];

  return (
    <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Radial Glow using zero-cost CSS radial gradients */}
      <div 
        className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none -z-10 opacity-70"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(14, 165, 233, 0.05) 40%, transparent 70%)',
        }}
      />
      <div 
        className="absolute top-1/3 right-10 w-72 h-72 pointer-events-none -z-10 opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Heading, Pitch, Actions */}
          <div className="lg:col-span-6 text-left">
            {/* Animated Fiery Badge (WeAreBrand Reel Effect) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-emerald-500/15 border border-amber-500/30 text-[11px] font-mono text-zinc-200 mb-5 shadow-sm"
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
              Bespoke high-concurrency SaaS, institutional attendance suites, and domain AI platforms — built with zero templates, responsive mobile & desktop synergy, and extreme visual craft.
            </motion.p>

            {/* Direct Action Buttons with Enhanced Hover Effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              <button
                onClick={() => onNavigate('get-started')}
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 btn-emerald-glow btn-shine group cursor-pointer"
              >
                <span>Hire Us for Your Project</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="https://wa.me/2347087445219?text=Hello%20Tsmak%20Tech%2C%20I'm%20interested%20in%20a%20website%2Fsystem%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-semibold text-xs sm:text-sm border border-white/10 flex items-center justify-center gap-2 btn-glass-hover btn-shine cursor-pointer"
              >
                <MessageCircle size={15} className="text-emerald-400 group-hover:scale-110 transition-transform" />
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

          {/* Right Column: Responsive Multi-Device Display (Mobile + Desktop) beside text */}
          <div className="lg:col-span-6 w-full">
            {/* Interactive Switchers: System tabs + Device mode toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3.5">
              {/* Project Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {PREVIEWS.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActivePreview(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap cursor-pointer ${
                      activePreview === idx
                        ? 'bg-emerald-500 text-zinc-950 font-bold shadow-sm shadow-emerald-500/20 scale-[1.02]'
                        : 'bg-white/[0.04] text-zinc-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Display Mode Switcher (Desktop / Mobile / Dual) */}
              <div className="inline-flex items-center p-0.5 rounded-lg bg-white/[0.04] border border-white/10 self-start sm:self-auto">
                <button
                  onClick={() => setDeviceMode('dual')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono flex items-center gap-1 transition-all cursor-pointer ${
                    deviceMode === 'dual'
                      ? 'bg-white/15 text-emerald-300 font-bold shadow-xs'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title="Desktop + Mobile Display"
                >
                  <Layers size={12} />
                  <span>Dual</span>
                </button>
                <button
                  onClick={() => setDeviceMode('desktop')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono flex items-center gap-1 transition-all cursor-pointer ${
                    deviceMode === 'desktop'
                      ? 'bg-white/15 text-emerald-300 font-bold shadow-xs'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title="Desktop Screen Only"
                >
                  <Monitor size={12} />
                  <span className="hidden sm:inline">Desktop</span>
                </button>
                <button
                  onClick={() => setDeviceMode('mobile')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono flex items-center gap-1 transition-all cursor-pointer ${
                    deviceMode === 'mobile'
                      ? 'bg-white/15 text-emerald-300 font-bold shadow-xs'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title="Mobile Screen Only"
                >
                  <Smartphone size={12} />
                  <span className="hidden sm:inline">Mobile</span>
                </button>
              </div>
            </div>

            {/* Showcase Stage: Desktop + Mobile Display Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative group w-full pb-6 sm:pb-8 pr-2 sm:pr-6"
            >
              {/* Laser-border animated line around the container */}
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-emerald-500/30 via-amber-500/30 to-teal-500/30 opacity-60 blur-sm group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* 1. Desktop Browser Window Display */}
              {(deviceMode === 'dual' || deviceMode === 'desktop') && (
                <TiltCard
                  tiltAngle={4}
                  glareColor="rgba(52, 211, 153, 0.15)"
                  className={`rounded-3xl bg-[#0c1017] border border-white/20 p-3 sm:p-4 shadow-2xl backdrop-blur-xl transition-all duration-500 ${
                    deviceMode === 'desktop' ? 'w-full' : 'w-full sm:w-[94%]'
                  }`}
                >
                  {/* macOS Browser Header */}
                  <div className="flex items-center justify-between px-2 py-1.5 border-b border-white/10 mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90" />
                      <div className="flex items-center gap-1.5 ml-2 px-2.5 py-0.5 rounded-md bg-black/50 border border-white/10 text-[11px] font-mono text-zinc-400 max-w-[190px] sm:max-w-xs truncate">
                        <span className="text-emerald-400">https://</span>
                        <span className="truncate">tsmak.tech/systems/{preview.id}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold">
                        {preview.tag}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded">
                        <Monitor size={10} className="text-emerald-400" />
                        <span className="hidden sm:inline">Desktop 4K</span>
                      </span>
                    </div>
                  </div>

                  {/* High-Resolution Visual Mockup Image */}
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-950 border border-white/10">
                    <img
                      src={preview.image}
                      alt={`${preview.label} desktop view`}
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
                      className={`absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-emerald-500 text-zinc-950 text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-xl shadow-emerald-500/25 ${
                        deviceMode === 'dual' ? 'hidden sm:flex mr-20 md:mr-28' : 'flex'
                      }`}
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
              )}

              {/* 2. Mobile Smartphone Display (iPhone Titanium Frame) */}
              {(deviceMode === 'dual' || deviceMode === 'mobile') && (
                <motion.div
                  initial={{ opacity: 0, y: 25, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={
                    deviceMode === 'dual'
                      ? 'absolute -bottom-2 -right-1 sm:bottom-0 sm:right-0 md:right-1 w-[125px] sm:w-[155px] md:w-[175px] z-30 group/phone cursor-pointer'
                      : 'mx-auto w-[220px] sm:w-[260px] z-30 group/phone cursor-pointer py-4'
                  }
                >
                  <div className="relative rounded-[2rem] sm:rounded-[2.4rem] bg-[#0c1017] p-1.5 sm:p-2 border-2 border-zinc-700/80 shadow-[0_20px_60px_rgba(0,0,0,0.85)] shadow-emerald-950/40 backdrop-blur-xl transition-all duration-300 group-hover/phone:-translate-y-2 group-hover/phone:shadow-emerald-500/20">
                    {/* Speaker Notch / Dynamic Island */}
                    <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-11 sm:w-14 h-3 sm:h-3.5 bg-black rounded-full z-30 flex items-center justify-end px-1.5 gap-1 border border-zinc-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="w-1 h-1 rounded-full bg-zinc-700" />
                    </div>

                    {/* Smartphone Glass Bezel & Screen */}
                    <div className="relative rounded-[1.6rem] sm:rounded-[2rem] overflow-hidden bg-zinc-950 border border-white/15 aspect-[9/19] flex flex-col">
                      {/* Mobile Status Bar */}
                      <div className="pt-2 px-3 pb-1 flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-zinc-400 bg-zinc-950/95 z-20 relative">
                        <span className="font-semibold text-zinc-300">09:41</span>
                        <div className="flex items-center gap-1">
                          <span className="text-[7px]">5G</span>
                          <div className="w-3.5 h-1.5 border border-zinc-500 rounded-sm p-[0.5px] flex items-center">
                            <div className="h-full w-2.5 bg-emerald-400 rounded-[1px]" />
                          </div>
                        </div>
                      </div>

                      {/* Mobile App Navigation Header */}
                      <div className="px-2 py-1 flex items-center justify-between bg-black/60 border-b border-white/10 z-20">
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span className="text-[8px] font-bold tracking-wider text-white">TSMAK</span>
                        </div>
                        <span className="text-[7px] font-mono px-1 rounded bg-emerald-500/20 text-emerald-300">MOBILE</span>
                      </div>

                      {/* Mobile Screen Visual (Cropped & Optimized for Mobile View) */}
                      <div className="relative flex-grow overflow-hidden bg-zinc-900">
                        <img
                          src={preview.image}
                          alt={`${preview.label} mobile view`}
                          className="w-full h-full object-cover object-top filter contrast-105"
                          referrerPolicy="no-referrer"
                        />
                        {/* Shading overlay for high-end mobile depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                        {/* Mobile Floating Card Pill */}
                        <div className="absolute bottom-3 left-1.5 right-1.5 p-1.5 rounded-lg bg-black/85 backdrop-blur-md border border-white/20 shadow-lg">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[8px] font-bold text-white truncate">{preview.label}</span>
                            <span className="text-[6px] font-mono px-1 rounded bg-emerald-400 text-zinc-950 font-bold">100%</span>
                          </div>
                          <div className="text-[7px] font-mono text-emerald-400 truncate flex items-center gap-1">
                            <Smartphone size={8} />
                            <span>{preview.mobileMetric}</span>
                          </div>
                        </div>
                      </div>

                      {/* iOS Bottom Indicator Bar */}
                      <div className="py-1 bg-zinc-950 flex items-center justify-center z-20">
                        <div className="w-10 sm:w-12 h-0.5 bg-white/40 rounded-full" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

