import React from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  Sparkles, 
  Code2, 
  Rocket, 
  ArrowRight, 
  CheckCircle2, 
  MessageCircle,
  Phone,
  Layers,
  Cpu
} from 'lucide-react';
import TiltCard from './TiltCard';

interface VisualWorkflowProps {
  onNavigateGetStarted: () => void;
}

const STEPS = [
  {
    step: '01',
    title: 'Architecture Blueprint',
    short: 'Schema & System Spec',
    desc: 'Database models, RBAC security contracts, and vector pipelines mapped before code.',
    icon: Terminal,
    color: 'emerald',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    tag: 'Phase 1 • 3 Days'
  },
  {
    step: '02',
    title: '3D & Kinetic UI',
    short: '60fps Micro-Interactions',
    desc: 'Fluid Framer Motion physics, specular lighting, and responsive tactile interfaces.',
    icon: Sparkles,
    color: 'amber',
    image: '/images/webdesign_on_fire.jpg',
    tag: 'Phase 2 • 1 Week'
  },
  {
    step: '03',
    title: 'High-Velocity Sprint',
    short: 'Full-Stack Engineering',
    desc: 'Strict TypeScript, Next.js 15, PostgreSQL, and server-side API encryption.',
    icon: Code2,
    color: 'teal',
    image: '/images/attendance_ui.jpg',
    tag: 'Phase 3 • 2 Weeks'
  },
  {
    step: '04',
    title: 'Cloud Run Launch',
    short: '99.9% Production SLA',
    desc: 'Containerized deployment, domain binding, and direct founder handover.',
    icon: Rocket,
    color: 'indigo',
    image: '/images/academy_mentorship.jpg',
    tag: 'Phase 4 • Delivery'
  }
];

export default function VisualWorkflow({ onNavigateGetStarted }: VisualWorkflowProps) {
  return (
    <section className="py-14 sm:py-18 relative bg-black/40 border-y border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-400 uppercase mb-2 block">
            Execution Velocity
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight font-display mb-3">
            From Concept to Shipped Product 👇
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            A battle-tested 4-step deployment cycle designed for speed, visual excellence, and zero downtime.
          </p>
        </div>

        {/* Visual 4-Step Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="h-full"
              >
                <TiltCard
                  tiltAngle={6}
                  glareColor="rgba(16, 185, 129, 0.12)"
                  className="rounded-2xl bg-[#0c1017] border border-white/10 hover:border-emerald-500/40 transition-all p-3.5 sm:p-4 flex flex-col justify-between h-full group"
                >
                  <div>
                    {/* Visual Thumbnail */}
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-900 mb-3 border border-white/10">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-emerald-400 font-mono text-[10px] font-bold border border-white/10">
                        {item.step}
                      </div>
                      <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-zinc-300 font-mono text-[9px] border border-white/10">
                        {item.tag}
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white font-display group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </h3>
                    <div className="text-[11px] font-mono text-emerald-400 font-semibold mb-1.5">
                      {item.short}
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                    <span>Target: Zero-Friction</span>
                    <CheckCircle2 size={12} className="text-emerald-400" />
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Visual "Get Started" Action Dock */}
        <div className="p-5 sm:p-7 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#0e141d] to-[#090b10] border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-5 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
              Instant Engagement
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              Ready to begin Step 01?
            </h3>
            <p className="text-xs text-zinc-400 max-w-xl">
              Discuss your system requirements directly with founder <span className="text-emerald-400 font-semibold">Tsmak</span> on WhatsApp or submit your project scope.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={onNavigateGetStarted}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-500/25 active:scale-95 transition-all"
            >
              <span>Request Project Quote</span>
              <ArrowRight size={14} />
            </button>

            <a
              href="https://wa.me/2347087445219?text=Hello%20Tsmak%2C%20I%20want%20to%20get%20started%20on%20a%20new%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-semibold text-xs flex items-center justify-center gap-2 border border-white/10 transition-all active:scale-95"
            >
              <MessageCircle size={14} className="text-emerald-400" />
              <span>WhatsApp +234 708 744 5219</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
