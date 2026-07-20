import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Mail, 
  User,
  Briefcase, 
  GraduationCap,
  ChevronLeft,
  CheckCircle2
} from 'lucide-react';
import { TsmakLogo } from '../components/Logo';

interface GetStartedPageProps {
  onBack: () => void;
}

type Purpose = 'learning' | 'project' | null;

const WHATSAPP_NUMBER = "2347087445219";
const COMMUNITY_LINK = "https://chat.whatsapp.com/IV6sRV0HRYU2vl7o8kYHea";
export default function GetStartedPage({ onBack }: GetStartedPageProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState<Purpose>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !purpose) return;

    setIsSubmitting(true);

    // Small delay for effect
    setTimeout(() => {
      if (purpose === 'learning') {
        window.open(COMMUNITY_LINK, '_blank');
      } else {
        const message = encodeURIComponent(`Hello Tsmak Tech, I'm ${fullName}. I'm interested in hiring you for a project. My email is: ${email}`);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
      }
      setIsSubmitting(false);
      onBack(); // Go back after redirect
    }, 800);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-bottom border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Back
            </button>
            <div className="flex items-center gap-2">
              <TsmakLogo size="sm" />
              <div className="text-xl font-black tracking-tighter">
                TSMAK<span className="text-emerald-500">.</span>TECH
              </div>
            </div>
            <div className="w-20" /> {/* Spacer */}
          </div>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center pt-20 pb-12 px-4">
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/50 border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl backdrop-blur-sm"
          >
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Let's Get Started</h1>
              <p className="text-zinc-400">Tell us a bit about yourself and what you're looking for.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Full Name Input */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-zinc-400 uppercase tracking-widest ml-1">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-emerald-500 transition-colors">
                    <User size={20} />
                  </div>
                  <input
                    required
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-zinc-950 border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-zinc-400 uppercase tracking-widest ml-1">
                  Your Gmail Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-emerald-500 transition-colors">
                    <Mail size={20} />
                  </div>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full bg-zinc-950 border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              {/* Purpose Selection */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-zinc-400 uppercase tracking-widest ml-1">
                  What is your purpose?
                </label>
                <div className="grid sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPurpose('learning')}
                    className={`relative p-6 rounded-2xl border transition-all text-left group ${
                      purpose === 'learning' 
                        ? 'bg-emerald-500/10 border-emerald-500 shadow-lg shadow-emerald-500/10' 
                        : 'bg-zinc-950 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                      purpose === 'learning' ? 'bg-emerald-500 text-white' : 'bg-zinc-800 text-zinc-400 group-hover:text-white'
                    }`}>
                      <GraduationCap size={24} />
                    </div>
                    <h3 className="font-bold text-lg mb-1">Learning to Develop</h3>
                    <p className="text-zinc-500 text-sm">Join our community and learn from experts.</p>
                    {purpose === 'learning' && (
                      <div className="absolute top-4 right-4 text-emerald-500">
                        <CheckCircle2 size={20} />
                      </div>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setPurpose('project')}
                    className={`relative p-6 rounded-2xl border transition-all text-left group ${
                      purpose === 'project' 
                        ? 'bg-indigo-500/10 border-indigo-500 shadow-lg shadow-indigo-500/10' 
                        : 'bg-zinc-950 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                      purpose === 'project' ? 'bg-indigo-500 text-white' : 'bg-zinc-800 text-zinc-400 group-hover:text-white'
                    }`}>
                      <Briefcase size={24} />
                    </div>
                    <h3 className="font-bold text-lg mb-1">Hire for a Project</h3>
                    <p className="text-zinc-500 text-sm">Let's build something amazing together.</p>
                    {purpose === 'project' && (
                      <div className="absolute top-4 right-4 text-indigo-500">
                        <CheckCircle2 size={20} />
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                disabled={!fullName || !email || !purpose || isSubmitting}
                type="submit"
                className="w-full bg-white text-zinc-950 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-zinc-950/20 border-t-zinc-950 rounded-full animate-spin" />
                ) : (
                  <>
                    Submit & Continue
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
