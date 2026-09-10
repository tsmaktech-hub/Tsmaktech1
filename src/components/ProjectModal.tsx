import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ArrowRight, ShieldCheck, Cpu, Layers, Sparkles } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onGetStarted: () => void;
}

export default function ProjectModal({ project, onClose, onGetStarted }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0c101c] border border-white/10 shadow-2xl p-6 sm:p-8 md:p-10 text-white z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close project modal"
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>

          {/* Header Metadata */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Sparkles size={12} />
              {project.category || 'Case Study'}
            </span>
            {project.client && (
              <span className="text-xs text-zinc-400 font-mono">
                Client: <span className="text-zinc-200">{project.client}</span>
              </span>
            )}
            {project.year && (
              <span className="text-xs text-zinc-500 font-mono">
                • {project.year}
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 font-display">
            {project.title}
          </h2>

          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Browser frame preview */}
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-zinc-950 mb-8 shadow-inner">
            {/* Window bar */}
            <div className="h-9 bg-zinc-900 border-b border-white/5 px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              </div>
              <div className="text-[11px] font-mono text-zinc-500 truncate max-w-xs px-2 py-0.5 rounded bg-black/40 border border-white/5">
                {project.link.replace(/^https?:\/\//, '')}
              </div>
              <div className="w-10" />
            </div>

            <div className="relative aspect-video w-full bg-zinc-900 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070";
                }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Metrics & Architecture Grid */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {project.metric && (
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-400 mb-1">
                  <ShieldCheck size={14} />
                  Performance Benchmark
                </div>
                <div className="text-lg font-bold text-white font-display">
                  {project.metric}
                </div>
              </div>
            )}

            {project.architecture && (
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-400 mb-1">
                  <Layers size={14} />
                  Core Architecture
                </div>
                <div className="text-xs font-mono text-zinc-300">
                  {project.architecture}
                </div>
              </div>
            )}
          </div>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">
                Key Engineering Highlights
              </h3>
              <ul className="space-y-2.5">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.05] border border-white/[0.08] text-zinc-300"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Action Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors shadow-sm active:scale-95 cursor-pointer text-sm"
            >
              Open Live Project
              <ExternalLink size={16} />
            </a>

            <button
              onClick={() => {
                onClose();
                onGetStarted();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white font-semibold border border-white/10 transition-colors cursor-pointer text-sm"
            >
              Build Something Similar
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
