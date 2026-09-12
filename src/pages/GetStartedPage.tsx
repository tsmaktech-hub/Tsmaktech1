import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Mail, 
  User, 
  Phone, 
  Briefcase, 
  GraduationCap, 
  CheckCircle2, 
  MessageCircle,
  Sparkles,
  Send,
  Layers,
  Clock
} from 'lucide-react';
import { TrackType } from '../types';

interface GetStartedPageProps {
  onBack?: () => void;
  initialTrack?: TrackType;
}

const WHATSAPP_NUMBER = "2347087445219";
const COMMUNITY_LINK = "https://chat.whatsapp.com/IV6sRV0HRYU2vl7o8kYHea";

export default function GetStartedPage({ onBack, initialTrack = 'client' }: GetStartedPageProps) {
  const [track, setTrack] = useState<TrackType>(initialTrack);

  useEffect(() => {
    if (initialTrack) {
      setTrack(initialTrack);
    }
  }, [initialTrack]);
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
    <div className="min-h-screen bg-transparent text-white flex flex-col pt-28 sm:pt-32 pb-16">
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-3xl">
          {/* Track Switcher */}
          <div className="text-center mb-10">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-400 uppercase mb-3 block">
              Engagement Portal
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-display text-white mb-4">
              How can we assist you?
            </h1>
            <p className="text-zinc-400 text-base max-w-lg mx-auto">
              Select whether you want to hire the engineering studio for a project or enroll in developer mentorship.
            </p>

            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto mt-8 p-1.5 rounded-xl bg-white/[0.04] border border-white/10">
              <button
                type="button"
                onClick={() => setTrack('client')}
                className={`py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  track === 'client'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Briefcase size={16} />
                <span>Hire the Studio</span>
              </button>
              <button
                type="button"
                onClick={() => setTrack('student')}
                className={`py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  track === 'student'
                    ? 'bg-blue-600 text-white shadow-sm'
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
            className="rounded-2xl bg-[#0c101c] border border-white/10 p-6 sm:p-10 shadow-xl"
          >
            {track === 'client' ? (
              <form onSubmit={handleClientSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold text-zinc-400 uppercase">
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
                        className="w-full bg-[#080b14] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Contact info */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold text-zinc-400 uppercase">
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
                        className="w-full bg-[#080b14] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Type */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-semibold text-zinc-400 uppercase">
                    Project Type
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full bg-[#080b14] border border-white/10 rounded-xl py-3.5 px-4 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
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
                  <label className="text-xs font-mono font-semibold text-zinc-400 uppercase">
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
                            ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
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
                  <label className="text-xs font-mono font-semibold text-zinc-400 uppercase">
                    Brief Project Overview (Optional)
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us about the key features, users, or integrations you require..."
                    className="w-full bg-[#080b14] border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                {/* Action button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center justify-center gap-2 active:scale-95 transition-colors cursor-pointer shadow-sm"
                >
                  <Send size={16} />
                  <span>Send via WhatsApp</span>
                </button>

                <p className="text-center text-xs text-zinc-500">
                  Direct founder line: +234 708 744 5219. Fast response.
                </p>
              </form>
            ) : (
              <div className="text-center py-6 space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-600/10 text-blue-400 flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
                  <MessageCircle size={28} />
                </div>

                <h2 className="text-2xl font-bold text-white font-display">
                  Join the Tsmak Tech Developer Community
                </h2>

                <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
                  Get instant access to weekly live coding sessions, code reviews, career mentorship, and a collaborative network of developers.
                </p>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 max-w-md mx-auto text-left space-y-2 text-xs font-mono text-zinc-300">
                  <div className="flex items-center gap-2 text-blue-400">
                    <CheckCircle2 size={15} />
                    <span>Free weekly masterclasses on modern full-stack</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-400">
                    <CheckCircle2 size={15} />
                    <span>Direct troubleshooting & unblocking with mentors</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-400">
                    <CheckCircle2 size={15} />
                    <span>Real-world client project case breakdowns</span>
                  </div>
                </div>

                <a
                  href={COMMUNITY_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm active:scale-95 transition-colors cursor-pointer shadow-sm text-center"
                >
                  <MessageCircle size={18} />
                  <span>Join WhatsApp Community</span>
                </a>

                <div className="pt-4 border-t border-white/5">
                  <p className="text-xs text-zinc-500">
                    Have a direct mentorship question?{' '}
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
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
