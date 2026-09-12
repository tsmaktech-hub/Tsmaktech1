import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Zap, 
  Info, 
  CheckCircle2, 
  Eye,
  ExternalLink,
  Cpu
} from 'lucide-react';
import TiltCard from './TiltCard';
import { Page } from '../types';

interface HeroFireShowcaseProps {
  onNavigate: (page: Page, sectionId?: string) => void;
}

interface WebsiteCreationStage {
  id: string;
  stepNumber: string;
  stepLabel: string;
  badgeCategory: string;
  badgeHighlight: string;
  headlinePrefix: string;
  headlineAccent: string;
  subtitle: string;
  tag: string;
  label: string;
  image: string;
  fallbackImage: string;
  urlPath: string;
  metric: string;
  feature: string;
  pillText: string;
}

const CREATION_STAGES: WebsiteCreationStage[] = [
  {
    id: 'stage-coding',
    stepNumber: '01',
    stepLabel: 'Coding & Programming',
    badgeCategory: 'Tsmak Tech Studio',
    badgeHighlight: 'Step 1 • Coding & Programming',
    headlinePrefix: 'We Build Modern Websites ',
    headlineAccent: 'Through Real Coding & Programming.',
    subtitle: 'At Tsmak Tech, every great website begins with disciplined coding and clean architecture. We write robust, responsive code from scratch with zero lazy templates — turning your idea into a fast, scalable web system.',
    tag: '01 • Clean Code',
    label: 'Stage 1: Building websites through real coding and programming',
    image: 'https://lh3.googleusercontent.com/u/0/d/1ymtHR9f0-Hi2aF60XcAU8B4p1KBUJBY4',
    fallbackImage: '/images/stage1_coding.jpg',
    urlPath: 'studio/coding-stage',
    metric: 'Bespoke Architecture',
    feature: 'HTML • CSS • TypeScript • React',
    pillText: 'Pure Coding Stage'
  },
  {
    id: 'stage-mentorship',
    stepNumber: '02',
    stepLabel: 'Need a Mentor',
    badgeCategory: 'Tsmak Tech Academy',
    badgeHighlight: 'Step 2 • Hands-On Mentorship',
    headlinePrefix: 'When Building Gets Tough, ',
    headlineAccent: 'We Mentor You to Overcome Every Hurdle.',
    subtitle: 'Creating a website can become tough when complex logic, bugs, or architectures arise. Through Tsmak Tech’s hands-on mentorship, an experienced engineer guides you 1-on-1 to explain solutions and solve hard problems.',
    tag: '02 • Mentorship',
    label: 'Stage 2: When building a website gets tough and you need a mentor',
    image: 'https://lh3.googleusercontent.com/u/0/d/1O-0qgiP9tasNb8vCPbDKF3sb6pl1xdFd',
    fallbackImage: '/images/stage2_mentorship.jpg',
    urlPath: 'academy/mentorship-stage',
    metric: '1-on-1 Expert Guidance',
    feature: 'Debugging & Collaborative Logic',
    pillText: 'Mentorship Stage'
  },
  {
    id: 'stage-finished',
    stepNumber: '03',
    stepLabel: 'Website Done',
    badgeCategory: 'Tsmak Tech Delivery',
    badgeHighlight: 'Step 3 • Finished & Live',
    headlinePrefix: 'The Final Result: ',
    headlineAccent: 'A Polished, Live Website Ready to Scale.',
    subtitle: 'This is what we deliver — the final finished website, completely done, beautifully responsive across all screens, and launched live with high performance and zero errors for your brand or business.',
    tag: '03 • Finished & Live',
    label: 'Stage 3: The final website displayed when you have finished the website',
    image: 'https://lh3.googleusercontent.com/u/0/d/1-8rFOqbMxRHqIXJ1yEVKCXOQXV-2b8yu',
    fallbackImage: '/images/stage3_finished_site.png',
    urlPath: 'delivery/finished-website',
    metric: '100% Finished & Live',
    feature: 'Production Ready • High Speed',
    pillText: 'Finished Website'
  }
];

export default function HeroFireShowcase({ onNavigate }: HeroFireShowcaseProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  // Continuously cycle between the 3 website creation stages (6.5s delay)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % CREATION_STAGES.length);
    }, 6500);

    return () => clearInterval(timer);
  }, []);

  const currentStage = CREATION_STAGES[activeSlide];

  return (
    <section 
      className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
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

            {/* Dynamic Content Container with min-height to prevent layout jumps */}
            <div className="min-h-[220px] sm:min-h-[200px] md:min-h-[210px] lg:min-h-[225px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStage.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Streamlined Category Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-zinc-300 mb-3 shadow-sm w-fit">
                    <span className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-blue-500/20 text-blue-400">
                      <Flame size={11} className="text-blue-400 fill-blue-400" />
                    </span>
                    <span className="font-semibold text-white">{currentStage.badgeCategory}</span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-blue-400 font-mono">{currentStage.badgeHighlight}</span>
                  </div>

                  {/* Punchy Headline */}
                  <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-[40px] xl:text-[44px] font-extrabold text-white tracking-tight leading-[1.12] mb-3 font-display">
                    {currentStage.headlinePrefix}
                    <span className="text-blue-400">
                      {currentStage.headlineAccent}
                    </span>
                  </h1>

                  {/* Reduced & Punchy Subtitle */}
                  <p className="text-xs sm:text-sm md:text-xs lg:text-sm text-zinc-400 max-w-lg mb-4 leading-relaxed font-sans">
                    {currentStage.subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

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

              <button
                onClick={() => onNavigate('about')}
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white font-medium text-xs sm:text-sm border border-white/10 hover:border-white/20 flex items-center justify-center gap-2 cursor-pointer transition-colors active:scale-95"
              >
                <Info size={14} className="text-blue-400" />
                <span>Learn More</span>
              </button>
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
                      <span>tsmak.tech/{currentStage.urlPath}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-white/[0.06] text-zinc-300 border border-white/10 text-[9px] sm:text-[10px] font-mono font-medium">
                      {currentStage.tag}
                    </span>
                  </div>
                </div>

                {/* High-Resolution Visual Mockup Image */}
                <div 
                  className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-950 border border-white/10"
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentStage.id}
                      src={currentStage.image}
                      alt={currentStage.label}
                      initial={{ opacity: 0.3, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.3, scale: 0.98 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = currentStage.fallbackImage;
                      }}
                    />
                  </AnimatePresence>

                  {/* Floating Live Pill 1 (Top Left) */}
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-black/85 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-[11px] font-mono font-semibold flex items-center gap-1.5 shadow-xl"
                  >
                    <Flame size={11} className="text-sky-400 fill-sky-400" />
                    <span>{currentStage.pillText}</span>
                  </motion.div>

                  {/* Floating Live Pill 2 (Bottom Right) */}
                  <motion.div
                    key={`metric-${currentStage.id}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-blue-600 text-white text-[10px] sm:text-[11px] font-mono font-medium flex items-center gap-1.5 shadow-md"
                  >
                    <Zap size={11} />
                    <span>{currentStage.metric}</span>
                  </motion.div>

                  {/* Floating Live Pill 3 (Bottom Left) */}
                  <motion.div
                    key={`feat-${currentStage.id}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-black/85 backdrop-blur-md border border-white/15 text-zinc-300 text-[9px] sm:text-[10px] font-mono hidden sm:flex items-center gap-1.5 shadow-md"
                  >
                    <Cpu size={11} className="text-sky-400" />
                    <span>{currentStage.feature}</span>
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
