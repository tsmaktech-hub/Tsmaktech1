import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Check, Copy, Sparkles, Play } from 'lucide-react';

const PRESETS = [
  {
    cmd: 'tsmak status',
    label: 'Status',
    output: [
      '● [Tsmak Tech Production Node v2.4.0]',
      '  Environment: Cloud Run Container (Port 3000)',
      '  Studio Status: Available for Q3 Client Projects',
      '  Academy Status: Active • Community Open (WhatsApp/Online)',
      '  Live Systems: 4 Production Platforms Operational',
      '  Integrity: 100% Verified • Zero Unhandled Exceptions'
    ]
  },
  {
    cmd: 'tsmak stack',
    label: 'Tech Stack',
    output: [
      '⚡ [Certified Production Toolkit]',
      '  Frontend : React 19, Next.js App Router, Tailwind CSS, Framer Motion',
      '  Backend  : Node.js, Express, TypeScript Strict, Python',
      '  Data     : PostgreSQL, Better-SQLite3, Supabase, Redis',
      '  AI / LLM : Gemini 2.5 Flash, RAG Embeddings, Function Calling',
      '  Mobile   : React Native, Expo, Flutter'
    ]
  },
  {
    cmd: 'tsmak deploy --prod',
    label: 'Deployment',
    output: [
      '🚀 Initiating zero-downtime build sequence...',
      '  ✔ Compiling TypeScript and tree-shaking bundles... (284ms)',
      '  ✔ CSS Purged & Post-Processed with Tailwind v4 (42ms)',
      '  ✔ Running pre-flight security audit & lint... (PASS)',
      '  ✔ Pushing container image to europe-west2.run.app',
      '  ✨ Deployed live at: https://tsmak-tech.vercel.app'
    ]
  },
  {
    cmd: 'tsmak quote --studio',
    label: 'Get Quote',
    output: [
      '💼 [Tsmak Tech Client Engagement Protocol]',
      '  Scope: Full-Stack Web App, Enterprise Dashboard, or Mobile Suite',
      '  Delivery: Typical MVP delivered in 2 to 4 weeks sprint',
      '  Founder Direct: Direct WhatsApp line (+234 708 744 5219)',
      '  Status: Ready to receive requirements via "Get Started" page.'
    ]
  }
];

export default function TerminalDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentPreset = PRESETS[activeTab];

  const handleCopy = () => {
    navigator.clipboard?.writeText(currentPreset.output.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-3xl bg-[#0c0f17] border border-white/10 shadow-2xl overflow-hidden text-left font-mono">
      {/* Terminal Title Bar */}
      <div className="px-4 sm:px-6 py-3.5 bg-zinc-950/80 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-400 pl-2">
            <TerminalIcon size={14} className="text-emerald-400" />
            <span>tsmak-terminal ~ zsh</span>
          </div>
        </div>

        {/* Command Pill Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {PRESETS.map((preset, i) => (
            <button
              key={preset.cmd}
              onClick={() => setActiveTab(i)}
              className={`px-3 py-1 rounded-lg text-xs transition-all whitespace-nowrap ${
                activeTab === i
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleCopy}
          className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors"
          title="Copy output"
        >
          {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
          <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Terminal Body */}
      <div className="p-5 sm:p-7 space-y-3 min-h-[220px] bg-[#090b12] text-xs sm:text-sm">
        {/* Command prompt */}
        <div className="flex items-center gap-2 text-zinc-400">
          <span className="text-emerald-400 font-bold">tsmak@studio:~$</span>
          <span className="text-white font-semibold">{currentPreset.cmd}</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-2 h-4 bg-emerald-400 inline-block align-middle"
          />
        </div>

        {/* Output lines */}
        <motion.div
          key={currentPreset.cmd}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-1.5 pt-2"
        >
          {currentPreset.output.map((line, idx) => (
            <div
              key={idx}
              className={`leading-relaxed ${
                line.startsWith('●') || line.startsWith('⚡') || line.startsWith('🚀') || line.startsWith('💼')
                  ? 'text-emerald-300 font-bold'
                  : line.includes('✔')
                  ? 'text-teal-300'
                  : line.includes('✨')
                  ? 'text-amber-300 font-semibold'
                  : 'text-zinc-400'
              }`}
            >
              {line}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
