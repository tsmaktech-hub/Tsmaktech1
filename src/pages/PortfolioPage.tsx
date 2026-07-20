import React from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  ArrowRight, 
  Mail, 
  Star, 
  CheckCircle2, 
  Code2, 
  Cpu, 
  Globe, 
  Smartphone,
  Quote,
  Briefcase,
  GraduationCap,
  MessageCircle
} from 'lucide-react';
import { PROJECTS } from '../constants';
import { TsmakLogo } from '../components/Logo';

interface PortfolioPageProps {
  onBackToHome: () => void;
  onGetStarted: () => void;
}

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, Nebula Group",
    content: "Tsmak Tech delivered our attendance system ahead of schedule. The attention to detail and user experience is unmatched. Highly recommended!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 2,
    name: "Dr. Adebayo",
    role: "Dean, Lasustech",
    content: "The Lasustech Attendance System has transformed how we manage student records. It's robust, secure, and very easy to use. Thank you for the great work!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Product Manager, AttendX",
    content: "Working with Tsmak Tech was a breeze. They understood our requirements perfectly and built a high-performance web app that our users love.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  }
];

const SKILLS = [
  { name: "Frontend Development", icon: <Globe size={20} />, level: "Expert", description: "React, Next.js, Tailwind CSS, Framer Motion" },
  { name: "Backend Systems", icon: <Cpu size={20} />, level: "Advanced", description: "Node.js, Express, PostgreSQL, MongoDB" },
  { name: "Mobile Apps", icon: <Smartphone size={20} />, level: "Advanced", description: "React Native, Flutter, Expo" },
  { name: "Cloud & DevOps", icon: <Code2 size={20} />, level: "Intermediate", description: "AWS, Vercel, Docker, CI/CD" }
];

export default function PortfolioPage({ onBackToHome, onGetStarted }: PortfolioPageProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8">
            <TsmakLogo size="lg" />
          </div>
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors mb-8 group"
          >
            <ArrowRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </motion.button>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">Portfolio</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            A curated selection of our best work, from institutional systems to high-performance web applications.
          </motion.p>
        </div>
      </section>

      {/* Top Project */}
      <section id="portfolio" className="py-16 md:py-24 bg-black relative overflow-hidden scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Top Project</h2>
              <p className="text-zinc-400 text-sm sm:text-base">
                A showcase of digital products we've built for businesses, institutions, and community groups. Each project represents our commitment to quality and innovation.
              </p>
            </div>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-6 py-3 bg-white text-zinc-950 rounded-xl font-bold hover:bg-zinc-100 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              Back to Top <ArrowRight size={18} className="-rotate-90" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-zinc-900/50 border border-white/5 p-6 rounded-[2rem] hover:border-emerald-500/30 transition-all"
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-white/10 shadow-sm group-hover:shadow-xl group-hover:shadow-emerald-500/10 transition-all">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover bg-zinc-900 group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070";
                    }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-full bg-white text-zinc-950 flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                    >
                      <ExternalLink size={24} />
                    </a>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-zinc-400 text-[10px] font-bold uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Visit Website <ExternalLink size={14} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Client <span className="text-emerald-400">Feedback</span></h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">Don't just take our word for it. Here's what our clients have to say about working with Tsmak Tech.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl relative"
              >
                <Quote className="absolute top-6 right-8 text-emerald-500/20" size={40} />
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-emerald-500 text-emerald-500" />
                  ))}
                </div>
                <p className="text-zinc-300 mb-8 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-zinc-500 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-zinc-900/30 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">About <span className="text-emerald-400">Tsmak Tech</span></h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                Founded with a vision to bridge the gap between education and industry, Tsmak Tech is a premier software development and tech education firm. We specialize in crafting high-performance digital solutions that solve real-world problems.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-500" size={20} />
                  <span className="text-zinc-300">Expert-led development and training</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-500" size={20} />
                  <span className="text-zinc-300">Focus on modern, scalable technologies</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-500" size={20} />
                  <span className="text-zinc-300">Commitment to client success and satisfaction</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {SKILLS.map((skill, index) => (
                <div key={index} className="p-6 bg-zinc-900 border border-white/5 rounded-2xl hover:border-emerald-500/30 transition-colors">
                  <div className="text-emerald-400 mb-4">{skill.icon}</div>
                  <h4 className="font-bold mb-1">{skill.name}</h4>
                  <p className="text-zinc-500 text-xs">{skill.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Let's Build Something <br /> Amazing Together</h2>
              <p className="text-emerald-50 text-lg mb-12">
                Ready to start your next project or have questions about our services? Reach out to us directly through any of the channels below.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button 
                  onClick={onGetStarted}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-zinc-950 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-zinc-100 transition-all"
                >
                  <MessageCircle size={24} className="text-emerald-600" />
                  Get Started
                </button>
                <a 
                  href="mailto:tsmaktech@gmail.com" 
                  className="w-full sm:w-auto px-8 py-4 bg-zinc-950 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-zinc-900 transition-all border border-white/10"
                >
                  <Mail size={24} className="text-emerald-400" />
                  Email Us
                </a>
              </div>
              
              <div className="mt-12 pt-12 border-t border-white/10">
                <p className="text-emerald-100/60 text-sm">
                  Available for new projects and consultations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (Simplified) */}
      <footer className="py-12 border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-zinc-500 text-sm">
            © 2026 Tsmak Tech. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
