import React from 'react';
import { Sparkles, Terminal, Cpu, Database, Globe, Smartphone, ShieldCheck, Zap } from 'lucide-react';
import { TECH_STACK } from '../constants';

const ICONS = [
  <Globe key="globe" size={14} className="text-purple-400" />,
  <Terminal key="terminal" size={14} className="text-pink-400" />,
  <Cpu key="cpu" size={14} className="text-blue-400" />,
  <Database key="database" size={14} className="text-purple-300" />,
  <Smartphone key="phone" size={14} className="text-pink-400" />,
  <ShieldCheck key="shield" size={14} className="text-blue-400" />,
  <Zap key="zap" size={14} className="text-pink-500" />,
  <Sparkles key="sparkles" size={14} className="text-purple-400" />,
];

export default function Marquee() {
  const items = [...TECH_STACK, ...TECH_STACK];

  return (
    <div className="relative w-full overflow-hidden py-8 border-y border-white/[0.06] bg-black/30 backdrop-blur-sm">
      {/* Gradient edge masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-[#090A0F] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-[#090A0F] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center gap-6">
        {items.map((tech, idx) => (
          <div
            key={`${tech.name}-${idx}`}
            className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.07] hover:border-purple-500/40 transition-all duration-300 group cursor-default whitespace-nowrap"
          >
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/[0.05] group-hover:scale-110 transition-transform">
              {ICONS[idx % ICONS.length]}
            </span>
            <span className="text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors tracking-tight">
              {tech.name}
            </span>
            <span className="text-[10px] font-mono text-zinc-500 bg-white/[0.04] px-2 py-0.5 rounded-full uppercase tracking-wider">
              {tech.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
