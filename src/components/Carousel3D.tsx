import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  Sparkles, 
  ArrowRight,
  Eye
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
        pointerEvents: 'auto' as const,
      };
    } else if (normalizedOffset === 1) {
      return {
        zIndex: 20,
        x: '55%',
        scale: 0.82,
        rotateY: -28,
        opacity: 0.65,
        pointerEvents: 'auto' as const,
      };
    } else if (normalizedOffset === -1) {
      return {
        zIndex: 20,
        x: '-55%',
        scale: 0.82,
        rotateY: 28,
        opacity: 0.65,
        pointerEvents: 'auto' as const,
      };
    } else {
      return {
        zIndex: 10,
        x: normalizedOffset > 0 ? '90%' : '-90%',
        scale: 0.65,
        rotateY: normalizedOffset > 0 ? -45 : 45,
        opacity: 0,
        pointerEvents: 'none' as const,
      };
    }
  };

  return (
    <div className="relative w-full py-4 select-none">
      {/* 3D Perspective Stage */}
      <div
        style={{ perspective: 1200 }}
        className="relative h-[390px] sm:h-[430px] md:h-[460px] max-w-4xl mx-auto flex items-center justify-center overflow-hidden px-4"
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
              className="absolute w-[88%] sm:w-[440px] md:w-[480px] rounded-2xl bg-[#0b0e1b] border border-white/10 p-3 sm:p-4 shadow-xl group cursor-pointer transition-colors hover:border-sky-500/40 gpu-accel"
            >
              {/* Browser Window Header */}
              <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-rose-500/80" />
                  <div className="w-2 h-2 rounded-full bg-amber-500/80" />
                  <div className="w-2 h-2 rounded-full bg-sky-400/80" />
                  <span className="text-[10px] font-mono text-zinc-400 pl-2 truncate max-w-[180px]">
                    tsmak.tech/{project.id}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-violet-500/15 text-violet-300 border border-violet-500/25">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Full Image Visual Area */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-950 mb-3 border border-white/10 group">
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
                <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-white text-[11px] font-mono flex items-center gap-1.5 shadow-md">
                  <Sparkles size={11} className="text-sky-400" />
                  <span>{project.metric}</span>
                </div>

                {/* Quick Inspect Button on Image Hover */}
                {isCenter && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-sky-600 hover:from-violet-500 hover:to-sky-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-violet-950/40 active:scale-95 transition-all"
                    >
                      <Eye size={13} />
                      <span>Inspect</span>
                    </button>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-3.5 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center gap-1.5 backdrop-blur-md transition-all active:scale-95"
                      >
                        <ExternalLink size={13} />
                        <span>Live Site</span>
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Title & Micro Description (Low text, high visual punch) */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                    <span>{project.title}</span>
                    <span className="text-[11px] text-zinc-500 font-mono">({project.year})</span>
                  </h3>
                  <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">
                    {project.description}
                  </p>
                </div>

                {/* Action Trigger */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProject(project);
                  }}
                  className="p-2 rounded-lg bg-white/[0.04] hover:bg-gradient-to-r hover:from-violet-600 hover:to-sky-600 hover:text-white text-zinc-300 border border-white/10 transition-all flex-shrink-0"
                  title="View Details"
                >
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Tech Pills */}
              <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2.5 border-t border-white/5">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md text-[9px] font-mono bg-white/[0.03] text-zinc-400 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-1.5 py-0.5 rounded-md text-[9px] font-mono text-sky-400 bg-sky-500/10">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
