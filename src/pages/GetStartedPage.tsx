import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Mail, 
  User, 
  Phone, 
  Briefcase, 
  GraduationCap, 
  ChevronLeft, 
  CheckCircle2, 
  MessageCircle,
  Sparkles,
  Send,
  Layers,
  Clock
} from 'lucide-react';
import { TsmakLogo } from '../components/Logo';

interface GetStartedPageProps {
  onBack: () => void;
}

type TrackType = 'client' | 'student';

const WHATSAPP_NUMBER = "2347087445219";
const COMMUNITY_LINK = "https://chat.whatsapp.com/IV6sRV0HRYU2vl7o8kYHea";

export default function GetStartedPage({ onBack }: GetStartedPageProps) {
  const [track, setTrack] = useState<TrackType>('client');
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [projectType, setProjectType] = useState('Web Application / SaaS');
  const [timeline, setTimeline] = useState('2-4 Weeks (MVP)');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !contact) return;

    setSubmitted(true);
    const message = encodeURIComponent(
      `Hello Tsmak Tech! 👋\n` +
      `My name is ${fullName}.\n` +
      `I would like to hire Tsmak Tech for a project:\n` +
      `• Type: ${projectType}\n` +
      `• Target Timeline: ${timeline}\n` +
      `• Contact: ${contact}\n` +
      (description ? `• Brief: ${description}\n` : '') +
      `Looking forward to discussing scope and getting started!`
    );

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    // Open smoothly
    window.location.href = waUrl;
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-white flex flex-col pt-24 pb-16">
      {/* Header Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#090A0F]/80 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group text-sm font-mono cursor-pointer"
            >
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform text-pink-400" />
              <span>Back to Home</span>
            </button>
            <div className="flex items-center gap-2.5">
              <TsmakLogo size="sm" />
              <div className="text-lg font-bold tracking-tight font-display">
                Tsmak <span className="text-pink-400">Tech</span>
              </div>
            </div>
            <div className="w-20" />
          </div>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-3xl">
          {/* Track Switcher */}
          <div className="text-center mb-10">
            <span className="text-xs font-mono font-bold tracking-widest text-pink-400 uppercase mb-3 block">
              Engagement Portal
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-display text-white mb-4">
              How can we assist you?
            </h1>
            <p className="text-zinc-400 text-base max-w-lg mx-auto">
              Select whether you want to hire the engineering studio for a project or enroll in developer mentorship.
            </p>

            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto mt-8 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10">
              <button
                type="button"
                onClick={() => setTrack('client')}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  track === 'client'
                    ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-lg shadow-purple-500/25'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Briefcase size={16} />
                <span>Hire the Studio</span>
              </button>
              <button
                type="button"
                onClick={() => setTrack('student')}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  track === 'student'
                    ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-lg shadow-purple-500/25'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <GraduationCap size={16} />
                <span>Learn with Academy</span>
              </button>
            </div>
          </div>

          {/* Form Container */}
          <motion.div
            layout
            className="rounded-[2.5rem] bg-[#0c0e20] border border-purple-500/20 p-6 sm:p-10 shadow-2xl backdrop-blur-md"
          >
            {track === 'client' ? (
              <form onSubmit={handleClientSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-zinc-400 uppercase">
                      Your Name / Company
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                        <User size={18} />
                      </div>
                      <input
                        required
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Sarah Connor"
                        className="w-full bg-[#090b12] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-pink-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Contact info */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-zinc-400 uppercase">
                      Email or WhatsApp Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                        <Phone size={18} />
                      </div>
                      <input
                        required
                        type="text"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="+1 555 0192 or name@company.com"
                        className="w-full bg-[#090b12] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-pink-400 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Type */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-zinc-400 uppercase">
                    Project Type
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full bg-[#090b12] border border-white/10 rounded-xl py-3.5 px-4 text-white text-sm focus:outline-none focus:border-pink-400 transition-colors"
                  >
                    <option value="Web Application / SaaS">Web Application / High-Concurrency SaaS</option>
                    <option value="Attendance / Institutional System">Institutional Attendance & Records System</option>
                    <option value="AI & Vector LLM Platform">AI & Knowledge System (like Tsmak-Islamic GPT)</option>
                    <option value="Mobile App (iOS & Android)">Mobile App Suite (React Native)</option>
                    <option value="Modern Corporate Website">Modern Performance Corporate Website</option>
                  </select>
                </div>

                {/* Timeline */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-zinc-400 uppercase">
                    Expected Timeline
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Immediate (1-2 wks)', 'Standard (2-4 wks)', 'Quarterly Roadmap'].map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setTimeline(t)}
                        className={`py-3 px-3 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                          timeline === t
                            ? 'bg-pink-500/15 border-pink-500 text-pink-300'
                            : 'bg-white/[0.02] border-white/5 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Brief */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-zinc-400 uppercase">
                    Brief Project Overview (Optional)
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us about the key features, users, or integrations you require..."
                    className="w-full bg-[#090b12] border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-pink-400 transition-colors resize-none"
                  />
                </div>

                {/* Action button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-500 hover:via-pink-500 hover:to-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 btn-launchpad-glow btn-shine active:scale-95 transition-all cursor-pointer shadow-lg shadow-purple-500/25"
                >
                  <Send size={16} />
                  <span>Send Requirements via WhatsApp Hotline</span>
                </button>

                <p className="text-center text-xs text-zinc-500">
                  Connects directly to founder line: +234 708 744 5219. Usually responds within 2 hours.
                </p>
              </form>
            ) : (
              <div className="text-center py-6 space-y-6">
                <div className="w-16 h-16 rounded-3xl bg-purple-500/15 text-pink-400 flex items-center justify-center mx-auto mb-4 border border-purple-500/20">
                  <MessageCircle size={32} />
                </div>

                <h2 className="text-2xl font-bold text-white font-display">
                  Join the Tsmak Tech Developer Community
                </h2>

                <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
                  Get instant access to weekly live coding sessions, code reviews, career mentorship, and a collaborative network of developers.
                </p>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 max-w-md mx-auto text-left space-y-2 text-xs font-mono text-zinc-300">
                  <div className="flex items-center gap-2 text-pink-400">
                    <CheckCircle2 size={15} />
                    <span>Free weekly masterclasses on modern full-stack</span>
                  </div>
                  <div className="flex items-center gap-2 text-pink-400">
                    <CheckCircle2 size={15} />
                    <span>Direct troubleshooting & unblocking with mentors</span>
                  </div>
                  <div className="flex items-center gap-2 text-pink-400">
                    <CheckCircle2 size={15} />
                    <span>Real-world client project case breakdowns</span>
                  </div>
                </div>

                <a
                  href={COMMUNITY_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-500 hover:via-pink-500 hover:to-blue-500 text-white font-bold text-sm btn-launchpad-glow btn-shine active:scale-95 transition-all cursor-pointer shadow-lg shadow-purple-500/25"
                >
                  <MessageCircle size={18} />
                  <span>Join Official WhatsApp Community Group</span>
                </a>

                <div className="pt-4 border-t border-white/5">
                  <p className="text-xs text-zinc-500">
                    Have a direct mentorship question?{' '}
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-400 hover:underline"
                    >
                      Chat with Founder directly
                    </a>
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
