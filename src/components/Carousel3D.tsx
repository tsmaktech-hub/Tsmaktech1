import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  Sparkles, 
  ArrowRight,
  Eye,
  ChevronLeft,
  ChevronRight
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
        x: '52%',
        scale: 0.84,
        rotateY: -24,
        opacity: 0.65,
        pointerEvents: 'auto' as const,
      };
    } else if (normalizedOffset === -1) {
      return {
        zIndex: 20,
        x: '-52%',
        scale: 0.84,
        rotateY: 24,
        opacity: 0.65,
        pointerEvents: 'auto' as const,
      };
    } else {
      return {
        zIndex: 10,
        x: normalizedOffset > 0 ? '88%' : '-88%',
        scale: 0.65,
        rotateY: normalizedOffset > 0 ? -40 : 40,
        opacity: 0,
        pointerEvents: 'none' as const,
      };
    }
  };

  return (
    <div className="relative w-full py-2 select-none">
      {/* 3D Perspective Stage - Reduced width & height for sleeker, compact cards */}
      <div
        style={{ perspective: 1200 }}
        className="relative h-[360px] sm:h-[390px] md:h-[415px] max-w-3xl mx-auto flex items-center justify-center overflow-hidden px-2 sm:px-4"
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
              className="absolute w-[78%] sm:w-[320px] md:w-[350px] rounded-2xl bg-[#0c101c] border border-white/10 p-3 sm:p-3.5 shadow-xl group cursor-pointer transition-colors hover:border-blue-500/30 gpu-accel"
            >
              {/* Browser Window Header */}
              <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-zinc-600" />
                  <div className="w-2 h-2 rounded-full bg-zinc-600" />
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-[10px] font-mono text-zinc-400 pl-1.5 truncate max-w-[140px] sm:max-w-[170px]">
                    tsmak.tech/{project.id}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Full Image Visual Area */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-950 mb-2.5 border border-white/10 group">
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
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/15 text-white text-[10px] font-mono flex items-center gap-1 shadow-sm">
                  <Sparkles size={10} className="text-blue-400" />
                  <span>{project.metric}</span>
                </div>

                {/* Quick Inspect Button on Image Hover */}
                {isCenter && (
                  <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-colors cursor-pointer"
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
                        className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium text-xs flex items-center gap-1.5 transition-colors active:scale-95 cursor-pointer"
                      >
                        <ExternalLink size={13} />
                        <span>Live</span>
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Title & Micro Description */}
              <div className="flex items-start justify-between gap-2.5">
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-white font-display flex items-center gap-1.5 truncate">
                    <span className="truncate">{project.title}</span>
                    <span className="text-[10px] text-zinc-500 font-mono shrink-0">({project.year})</span>
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
                  className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-blue-600 hover:text-white text-zinc-300 border border-white/10 transition-colors shrink-0 cursor-pointer"
                  title="View Details"
                >
                  <ArrowRight size={13} />
                </button>
              </div>

              {/* Tech Pills */}
              <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-white/5">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/[0.03] text-zinc-400 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono text-blue-400 bg-blue-500/10">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Left & Right Nav Controls */}
        <button
          onClick={prevSlide}
          aria-label="Previous Project"
          className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-40 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0c101c]/90 border border-white/10 hover:border-blue-500/40 hover:bg-blue-600 hover:text-white text-zinc-300 flex items-center justify-center transition-all shadow-md cursor-pointer active:scale-95"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next Project"
          className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-40 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0c101c]/90 border border-white/10 hover:border-blue-500/40 hover:bg-blue-600 hover:text-white text-zinc-300 flex items-center justify-center transition-all shadow-md cursor-pointer active:scale-95"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Slide Pagination Indicator Dots */}
      <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
        {projects.map((project, idx) => (
          <button
            key={project.id}
            onClick={() => goToSlide(idx)}
            aria-label={`View ${project.title}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              currentIndex === idx
                ? 'w-6 h-1.5 bg-blue-500'
                : 'w-1.5 h-1.5 bg-zinc-700 hover:bg-zinc-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
