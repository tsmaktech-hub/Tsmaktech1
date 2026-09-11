import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Laptop, 
  Code2, 
  Sparkles, 
  Users, 
  Target, 
  Rocket, 
  BookOpen, 
  ArrowRight, 
  MessageCircle, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  HeartHandshake, 
  Award, 
  Smartphone, 
  Globe, 
  Lightbulb,
  Terminal,
  Cpu,
  Zap
} from 'lucide-react';
import TiltCard from '../components/TiltCard';

const FOUNDER_IMAGE_URL = 'https://lh3.googleusercontent.com/u/0/d/1RMbVzbxfhQT1SV6MejHoctam0kapyQOV';

interface AboutPageProps {
  onNavigate: (page: 'home' | 'portfolio' | 'about' | 'get-started', sectionId?: string) => void;
}

const PILLARS = [
  {
    icon: <Laptop className="text-blue-400" size={24} />,
    title: "Hands-On Digital Skills",
    desc: "We don't teach dry theory in isolation. Every learner builds live websites, responsive web apps, and real software tools from day one.",
    highlight: "Practical Learning"
  },
  {
    icon: <Users className="text-blue-400" size={24} />,
    title: "Youth & Beginner Centered",
    desc: "Specially structured for young minds, students, and curious career changers taking their first steps into the fast-paced tech industry.",
    highlight: "Zero Gatekeeping"
  },
  {
    icon: <MessageCircle className="text-blue-400" size={24} />,
    title: "Active WhatsApp Community",
    desc: "Never get stuck alone on a bug. Our active community provides daily code reviews, problem walkthroughs, and direct peer collaboration.",
    highlight: "24/7 Peer Support"
  },
  {
    icon: <Rocket className="text-blue-400" size={24} />,
    title: "Career & Project Portfolios",
    desc: "Learners graduate with live production links, deployed web apps, and a verified portfolio to showcase to clients, schools, and employers.",
    highlight: "Proof of Competence"
  }
];

const CURRICULUM_TRACKS = [
  {
    title: "Web Development Fundamentals",
    badge: "Foundation Track",
    desc: "Master the building blocks of the modern internet. Learn semantic HTML5, modern CSS styling, flexbox/grid layouts, and responsive design for all screen sizes.",
    skills: ["HTML5 & CSS3", "Modern JavaScript", "Responsive Design", "Git & GitHub Basics"],
    icon: <Globe size={20} className="text-blue-400" />
  },
  {
    title: "Modern React & Frontend Engineering",
    badge: "Application Track",
    desc: "Level up to dynamic single-page web applications using React, TypeScript, component architecture, APIs, and state management.",
    skills: ["React 19 & Hooks", "TypeScript Strict", "Tailwind CSS", "REST API Consumption"],
    icon: <Code2 size={20} className="text-blue-400" />
  },
  {
    title: "Mobile & Full-Stack Foundations",
    badge: "Advanced Track",
    desc: "Explore backend servers, cloud databases, user authentication, and cross-platform mobile app development with React Native and Expo.",
    skills: ["Node.js & Express", "PostgreSQL & SQLite", "Mobile App UI", "Cloud Deployment"],
    icon: <Smartphone size={20} className="text-blue-400" />
  },
  {
    title: "Applied AI Tools & Digital Literacy",
    badge: "Future-Ready",
    desc: "Learn how to leverage AI tools (like Gemini, code assistants, and vector search) responsibly to accelerate learning and automate workflows.",
    skills: ["AI-Assisted Coding", "Prompt Engineering", "Digital Problem Solving", "Tech Ethics"],
    icon: <Sparkles size={20} className="text-blue-400" />
  }
];

const JOURNEY_STEPS = [
  {
    step: "01",
    title: "Curiosity to Code",
    desc: "Join our program and start with clean, step-by-step interactive lessons that turn curiosity into real digital literacy."
  },
  {
    step: "02",
    title: "Build Real Software",
    desc: "Work on guided mini-projects—calculators, portfolio pages, interactive dashboards, and community utilities."
  },
  {
    step: "03",
    title: "Direct Founder Mentorship",
    desc: "Get line-by-line feedback on your code and live guidance via WhatsApp sessions and workshops."
  },
  {
    step: "04",
    title: "Launch & Earn",
    desc: "Publish your live apps to the web, gain confidence, and unlock freelancing or tech internship opportunities."
  }
];

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="pt-24 sm:pt-28 pb-20 relative z-10">
      {/* 1. Hero Mission Statement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4"
          >
            <GraduationCap size={14} />
            <span>About Tsmak Tech Program</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white tracking-tight leading-[1.15] mb-6"
          >
            Empowering the Next Generation with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-300">
              Real Digital Skills
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-base sm:text-lg text-zinc-300 leading-relaxed"
          >
            <strong className="text-white font-semibold">Tsmak Tech</strong> is an online tech program created to teach, guide, and help young people and anyone interested in technology to build and acquire tangible digital skills that matter.
          </motion.p>
        </div>

        {/* Highlight Banner / Core Purpose Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="rounded-3xl bg-gradient-to-br from-[#0c1222] via-[#090d18] to-[#060912] border border-blue-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 grid md:grid-cols-3 gap-6 sm:gap-8 items-center">
            <div className="md:col-span-2 space-y-3">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest font-semibold flex items-center gap-2">
                <Target size={14} />
                Our Core Purpose
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
                Demystifying tech and turning curiosity into real-world capability.
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                We believe that learning tech shouldn't be intimidating, overly expensive, or buried under confusing jargon. Tsmak Tech provides clear, hands-on learning paths where beginners become confident creators who can build their own websites, applications, and digital solutions.
              </p>
            </div>

            <div className="flex flex-col gap-3 justify-center">
              <a
                href="https://chat.whatsapp.com/IV6sRV0HRYU2vl7o8kYHea"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95 transition-all cursor-pointer"
              >
                <MessageCircle size={16} />
                <span>Join Student Community</span>
              </a>

              <button
                onClick={() => onNavigate('get-started')}
                className="w-full py-3.5 px-5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white font-medium text-xs sm:text-sm border border-white/10 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                <span>Enroll in Mentorship</span>
                <ArrowRight size={15} className="text-blue-400" />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. Four Pillars of the Program */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-blue-400 uppercase mb-2 block">
            Why Tsmak Tech
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Built from the ground up for aspiring tech builders
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILLARS.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <TiltCard className="p-6 rounded-2xl bg-[#0c101c] border border-white/10 hover:border-blue-500/30 transition-all h-full flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider font-semibold block mb-1">
                    {pillar.highlight}
                  </span>
                  <h3 className="text-base font-bold text-white mb-2 font-display">
                    {pillar.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                  <CheckCircle2 size={13} className="text-blue-400" />
                  <span>Verified Pathway</span>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Founder Story & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="rounded-3xl bg-[#090d16]/90 border border-white/10 p-6 sm:p-10 lg:p-12 relative overflow-hidden backdrop-blur-sm shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Founder Biography and Vision */}
            <div className="lg:col-span-7 flex flex-col order-2 lg:order-1">
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-mono font-semibold uppercase tracking-wider">
                  Founder & Lead Mentor
                </span>
                <span className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                  <MapPin size={13} className="text-blue-400" />
                  Lagos, Nigeria
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight leading-tight mb-2">
                Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Ajibade Abdullateef</span>
              </h2>

              <p className="text-sm sm:text-base font-mono text-blue-400/90 font-medium mb-4">
                Founder of Tsmak Tech • Mechatronics Student • Full-Stack Software Developer
              </p>

              <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
                <p>
                  As an engineering student studying <strong className="text-white font-semibold">Mechatronics</strong>, I discovered that the best way to master technology is by building things that solve actual human problems.
                </p>
                <p>
                  I created <strong className="text-white font-semibold">Tsmak Tech</strong> to pass this knowledge forward. Countless young people and tech enthusiasts have immense creativity, but lack a clear, supportive program to show them how to start coding, how to design digital products, and how to build confidence in tech.
                </p>
                <p>
                  Through Tsmak Tech, we break down high-tech barriers into actionable milestones—whether you want to build a portfolio website, create an attendance system, or develop modern web apps with React and modern APIs.
                </p>
              </div>

              {/* Skills and Focus Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300">
                  <Cpu size={14} className="text-blue-400" />
                  Mechatronics Engineering
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300">
                  <Code2 size={14} className="text-blue-400" />
                  Web & Mobile Engineering
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300">
                  <GraduationCap size={14} className="text-blue-400" />
                  Online Tech Mentorship
                </span>
              </div>

              {/* Founder Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://wa.me/2347087445219?text=Hello%20Ajibade,%20I'd%20like%20to%20learn%20more%20about%20the%20Tsmak%20Tech%20program."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-95 cursor-pointer"
                >
                  <MessageCircle size={16} />
                  <span>Message Founder Directly</span>
                </a>

                <button
                  onClick={() => onNavigate('portfolio')}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] text-white font-medium text-xs sm:text-sm transition-colors border border-white/10 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>See Studio Projects</span>
                  <ArrowRight size={15} className="text-zinc-400" />
                </button>
              </div>
            </div>

            {/* Right Column: Verified Photo */}
            <div className="lg:col-span-5 flex flex-col items-center order-1 lg:order-2">
              <div className="w-full max-w-sm relative">
                <div className="relative rounded-2xl sm:rounded-3xl p-2 sm:p-2.5 bg-gradient-to-b from-blue-500/30 via-white/10 to-white/5 border border-blue-500/30 shadow-2xl">
                  <div className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-square bg-[#050811]">
                    <img
                      src={FOUNDER_IMAGE_URL}
                      onError={(e) => {
                        e.currentTarget.src = '/images/founder.jpg';
                      }}
                      alt="Ajibade Abdullateef - Founder of Tsmak Tech"
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#060a14] via-[#060a14]/60 to-transparent pointer-events-none" />
                    
                    <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-xs">
                      <span className="font-mono text-white font-semibold flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Founder & Mentor
                      </span>
                      <span className="text-[11px] text-zinc-300 font-mono bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                        Tsmak Tech
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white">Ajibade Abdullateef</div>
                    <div className="text-[11px] text-zinc-400 font-mono">Dedicated to raising confident digital builders</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-blue-400 text-xs font-mono font-medium">
                    <ShieldCheck size={16} />
                    <span>Lead Mentor</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. What You Learn in the Program */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-blue-400 uppercase mb-2 block">
            Curriculum & Skills
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Digital skills taught in our online program
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {CURRICULUM_TRACKS.map((track, i) => (
            <div
              key={i}
              className="p-6 sm:p-8 rounded-2xl bg-[#0c101c] border border-white/10 hover:border-blue-500/30 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      {track.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-display">
                        {track.title}
                      </h3>
                      <span className="text-xs font-mono text-blue-400 font-medium">
                        {track.badge}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                  {track.desc}
                </p>
              </div>

              <div>
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  Key Concepts & Tools:
                </div>
                <div className="flex flex-wrap gap-2">
                  {track.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-blue-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. The 4-Step Learning Roadmap */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-blue-400 uppercase mb-2 block">
            How It Works
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Your journey from beginner to building real projects
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {JOURNEY_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0c101c] border border-white/10 hover:border-blue-500/30 transition-all flex flex-col justify-between relative"
            >
              <div>
                <div className="text-2xl font-mono font-black text-blue-400/40 mb-3">
                  {step.step}
                </div>
                <h3 className="text-base font-bold text-white mb-2 font-display">
                  {step.title}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-1 text-xs text-blue-400 font-mono">
                <span>Phase {idx + 1}</span>
                <ArrowRight size={12} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Join the Movement CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-900/30 via-[#0c101c] to-indigo-950/30 border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
              Ready to learn tech?
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white">
              Start building your digital skills today.
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base max-w-xl">
              Join 500+ passionate learners in our WhatsApp community, or reach out directly to founder Ajibade Abdullateef to start your learning path.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <a
              href="https://chat.whatsapp.com/IV6sRV0HRYU2vl7o8kYHea"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 active:scale-95 cursor-pointer shadow-md text-center"
            >
              <MessageCircle size={16} />
              <span>Join WhatsApp Community</span>
            </a>

            <button
              onClick={() => onNavigate('get-started')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white font-medium text-xs sm:text-sm transition-colors border border-white/10 flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <span>Get Mentorship</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
