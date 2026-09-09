import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Sparkles, 
  Play, 
  Pause, 
  ArrowRight,
  Eye,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { Project } from '../types';

interface Carousel3DProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onNavigateGetStarted?: () => void;
}

export default function Carousel3D({
  projects,
  onSelectProject,
  onNavigateGetStarted
}: Carousel3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = projects.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Autoplay
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Calculate relative offset for 3D circular cascade
  const getCardStyle = (index: number) => {
    const offset = (index - currentIndex + total) % total;
    let normalizedOffset = offset;
    if (normalizedOffset > total / 2) {
      normalizedOffset -= total;
    }

    // Positions:
    // 0: Center (active)
    // 1: Right 1
    // -1: Left 1
    // 2 or -2: Hidden / background

    if (normalizedOffset === 0) {
      return {
        zIndex: 30,
        x: '0%',
        scale: 1,
        rotateY: 0,
        opacity: 1,
        filter: 'brightness(1)',
        pointerEvents: 'auto' as const,
      };
    } else if (normalizedOffset === 1) {
      return {
        zIndex: 20,
        x: '55%',
        scale: 0.82,
        rotateY: -28,
        opacity: 0.65,
        filter: 'brightness(0.7)',
        pointerEvents: 'auto' as const,
      };
    } else if (normalizedOffset === -1) {
      return {
        zIndex: 20,
        x: '-55%',
        scale: 0.82,
        rotateY: 28,
        opacity: 0.65,
        filter: 'brightness(0.7)',
        pointerEvents: 'auto' as const,
      };
    } else {
      return {
        zIndex: 10,
        x: normalizedOffset > 0 ? '90%' : '-90%',
        scale: 0.65,
        rotateY: normalizedOffset > 0 ? -45 : 45,
        opacity: 0,
        filter: 'brightness(0.4)',
        pointerEvents: 'none' as const,
      };
    }
  };

  const activeProject = projects[currentIndex];

  return (
    <div className="relative w-full py-12 select-none">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between max-w-5xl mx-auto px-4 mb-8">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
            3D Interactive Showcase ({currentIndex + 1} / {total})
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Play / Pause Autoplay */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-zinc-400 hover:text-white transition-all text-xs flex items-center gap-1.5"
            title={isPlaying ? 'Pause Auto-rotation' : 'Resume Auto-rotation'}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            <span className="hidden sm:inline font-mono">{isPlaying ? 'Pause' : 'Auto'}</span>
          </button>

          {/* Prev / Next Arrows */}
          <button
            onClick={prevSlide}
            className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-emerald-500 hover:text-zinc-950 text-white border border-white/10 transition-all active:scale-95"
            aria-label="Previous project"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextSlide}
            className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-emerald-500 hover:text-zinc-950 text-white border border-white/10 transition-all active:scale-95"
            aria-label="Next project"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* 3D Perspective Stage */}
      <div
        style={{ perspective: 1200 }}
        className="relative h-[480px] sm:h-[540px] md:h-[580px] max-w-5xl mx-auto flex items-center justify-center overflow-hidden px-4"
        onTouchStart={(e) => setDragStartX(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (dragStartX !== null) {
            const diff = e.changedTouches[0].clientX - dragStartX;
            if (diff > 50) prevSlide();
            if (diff < -50) nextSlide();
            setDragStartX(null);
          }
        }}
      >
        {projects.map((project, idx) => {
          const style = getCardStyle(idx);
          const isCenter = (idx - currentIndex + total) % total === 0;

          return (
            <motion.div
              key={project.id}
              animate={{
                x: style.x,
                scale: style.scale,
                rotateY: style.rotateY,
                opacity: style.opacity,
                filter: style.filter,
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 26,
              }}
              style={{
                zIndex: style.zIndex,
                transformStyle: 'preserve-3d',
                pointerEvents: style.pointerEvents,
              }}
              onClick={() => {
                if (!isCenter) {
                  goToSlide(idx);
                }
              }}
              className="absolute w-[90%] sm:w-[540px] md:w-[620px] rounded-[2rem] bg-[#0c1017] border border-white/15 p-4 sm:p-6 shadow-2xl backdrop-blur-xl group cursor-pointer transition-colors hover:border-emerald-500/50"
            >
              {/* Browser Window Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] font-mono text-zinc-400 pl-2 truncate max-w-[200px]">
                    tsmak.tech/{project.id}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Full Image Visual Area */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-zinc-950 mb-4 border border-white/10 group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070";
                  }}
                />

                {/* Metric Overlay Badge */}
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-white text-xs font-mono flex items-center gap-2 shadow-lg">
                  <Sparkles size={13} className="text-emerald-400" />
                  <span>{project.metric}</span>
                </div>

                {/* Quick Inspect Button on Image Hover */}
                {isCenter && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-500 text-zinc-950 font-bold text-xs flex items-center gap-1.5 shadow-xl shadow-emerald-500/30 active:scale-95 transition-all"
                    >
                      <Eye size={14} />
                      <span>Inspect Architecture</span>
                    </button>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center gap-1.5 backdrop-blur-md transition-all active:scale-95"
                      >
                        <ExternalLink size={14} />
                        <span>Live Site</span>
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Title & Micro Description (Low text, high visual punch) */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-display flex items-center gap-2">
                    <span>{project.title}</span>
                    <span className="text-xs text-zinc-500 font-mono">({project.year})</span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-1">
                    {project.description}
                  </p>
                </div>

                {/* Action Trigger */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProject(project);
                  }}
                  className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-emerald-500 hover:text-zinc-950 text-zinc-300 border border-white/10 transition-all flex-shrink-0"
                  title="View Details"
                >
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Tech Pills */}
              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/5">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.03] text-zinc-400 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono text-emerald-400 bg-emerald-500/10">
                    +{project.tags.length - 3} more
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Indicator Dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {projects.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? 'w-8 bg-emerald-400 shadow-md shadow-emerald-400/40'
                : 'w-2 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
