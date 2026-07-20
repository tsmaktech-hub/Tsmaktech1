import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Smartphone, 
  Server, 
  ChevronRight, 
  Play, 
  BookOpen, 
  Search,
  Sparkles,
  ArrowRight,
  Building2,
  Briefcase,
  Rocket,
  ShieldCheck,
  ExternalLink,
  Layout
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { cn } from '../lib/utils';
import { LEARNING_PATHS, FEATURED_TUTORIALS, PROJECTS } from '../constants';
import { Tutorial } from '../types';

const HERO_IMAGES = [
  '/hero.jpg',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=2070',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070',
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=2070'
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [aiRecommendation, setAiRecommendation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const handleAiPathfinder = async () => {
    if (!searchQuery.trim()) return;
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `As an expert learning path designer for Tsmak Tech, create a high-level learning roadmap for someone interested in: "${searchQuery}". 
        The roadmap should be structured with 3-4 key phases, each with specific skills to master. 
        Format the output as a clean, structured list. Keep it concise but professional.`,
      });
      setAiRecommendation(response.text);
    } catch (error) {
      console.error("AI Error:", error);
      setAiRecommendation("Sorry, I couldn't generate a roadmap right now. Please try again later.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Images with Crossfade */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              className="absolute inset-0"
            >
              <img 
                src={HERO_IMAGES[currentImageIndex]} 
                alt="Hero Background" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070";
                }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-zinc-950" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8"
            >
              <Sparkles size={14} className="animate-pulse" />
              Empowering Digital Innovation
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-[1.1]"
            >
              Learn. Build. <br />
              <span className="text-emerald-400">Transform.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed"
            >
              Tsmak Tech provides world-class tutorials and paths to help you build professional web apps, websites, and mobile applications. We also specialize in building high-performance web applications and websites for companies, brands, and organizations.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.button 
                animate={{ y: [0, -6, 0] }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20 group"
              >
                Start Learning Now
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button 
                animate={{ y: [0, -6, 0] }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="w-full sm:w-auto px-8 py-4 bg-white/10 border border-white/10 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                <Play size={20} className="text-emerald-400" />
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* AI Pathfinder Section */}
      <section className="py-12 md:py-20 text-white overflow-hidden relative">
        <div className="absolute inset-0 -z-10 bg-black">
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070" 
            alt="AI Pathfinder Background" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Not sure where to start?</h2>
              <p className="text-zinc-400 text-base sm:text-lg mb-8">
                Tell our AI Pathfinder what you're interested in, and we'll create a custom learning roadmap just for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 p-2 bg-white/10 rounded-2xl border border-white/10">
                <input 
                  type="text" 
                  placeholder="e.g. I want to build a social media app"
                  className="flex-grow bg-transparent border-none focus:ring-0 px-4 py-3 text-white placeholder:text-zinc-500 text-sm sm:text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <motion.button 
                  onClick={handleAiPathfinder}
                  disabled={isAiLoading}
                  animate={{ 
                    boxShadow: ["0 0 0px rgba(16, 185, 129, 0)", "0 0 15px rgba(16, 185, 129, 0.3)", "0 0 0px rgba(16, 185, 129, 0)"] 
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-zinc-900 font-bold rounded-xl transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                  {isAiLoading ? 'Thinking...' : 'Find My Path'}
                </motion.button>
              </div>
              
              <AnimatePresence>
                {aiRecommendation && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-8 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl"
                  >
                    <div className="flex items-center gap-2 text-emerald-400 font-bold mb-4">
                      <Sparkles size={18} />
                      Your Custom Roadmap
                    </div>
                    <div className="text-zinc-300 text-sm sm:text-base whitespace-pre-wrap leading-relaxed">
                      {aiRecommendation}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-[120px] rounded-full" />
              <div className="relative bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                        {i}
                      </div>
                      <div className="space-y-2 flex-grow">
                        <div className="h-4 bg-white/10 rounded-full w-3/4" />
                        <div className="h-3 bg-white/5 rounded-full w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section id="tutorials" className="py-16 md:py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
              Choose Your <span className="text-emerald-600">Learning Path</span>
            </h2>
            <p className="text-zinc-600 text-base sm:text-lg">
              Structured courses and tutorials designed to take you from beginner to professional in your chosen field.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {LEARNING_PATHS.map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 hover:bg-white hover:shadow-xl hover:shadow-zinc-200/50 transition-all cursor-pointer"
              >
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 group-hover:rotate-3",
                  path.color === 'emerald' ? "bg-emerald-100 text-emerald-600" :
                  path.color === 'indigo' ? "bg-indigo-100 text-indigo-600" :
                  path.color === 'violet' ? "bg-violet-100 text-violet-600" :
                  "bg-amber-100 text-amber-600"
                )}>
                  {path.icon === 'Layout' && <Layout size={28} />}
                  {path.icon === 'Globe' && <Globe size={28} />}
                  {path.icon === 'Smartphone' && <Smartphone size={28} />}
                  {path.icon === 'Server' && <Server size={28} />}
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-3">{path.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                  {path.description}
                </p>
                <div className="flex items-center gap-2 text-zinc-900 font-bold text-sm group-hover:text-emerald-600 transition-colors">
                  Explore Path <ChevronRight size={16} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Services Section */}
      <section id="professional-services" className="py-12 md:py-20 bg-zinc-950 text-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
                <Building2 size={14} />
                For Businesses & Brands
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Scale Your Vision with <br />
                <span className="text-emerald-400">Professional Solutions</span>
              </h2>
              <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
                Beyond education, we partner with institutions and brands to build high-performance digital products. From complex web applications to stunning brand websites, we bring your ideas to life.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0 text-emerald-400">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Enterprise Apps</h4>
                    <p className="text-zinc-500 text-sm">Custom internal tools and management systems.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0 text-emerald-400">
                    <Rocket size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Brand Websites</h4>
                    <p className="text-zinc-500 text-sm">High-converting landing pages and portfolios.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0 text-emerald-400">
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Mobile Solutions</h4>
                    <p className="text-zinc-500 text-sm">Native-feel cross-platform mobile applications.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0 text-emerald-400">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Secure Portals</h4>
                    <p className="text-zinc-500 text-sm">Robust security for institutional data access.</p>
                  </div>
                </div>
              </div>

              <button className="mt-12 px-8 py-4 bg-white text-zinc-950 rounded-2xl font-bold hover:bg-zinc-200 transition-all flex items-center gap-2">
                Work With Us <ArrowRight size={20} />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-emerald-500/20 blur-[120px] rounded-full" />
              <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015" 
                  alt="Business Solutions" 
                  className="w-full aspect-[4/3] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-zinc-950">
                      99%
                    </div>
                    <div>
                      <h5 className="font-bold">Client Satisfaction</h5>
                      <p className="text-zinc-400 text-xs">Based on 50+ enterprise projects</p>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '99%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-emerald-500" 
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="portfolio" className="py-16 md:py-24 bg-white relative overflow-hidden scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Featured Projects</h2>
              <p className="text-zinc-600 text-sm sm:text-base">
                A showcase of digital products we've built for businesses, institutions, and community groups. Each project represents our commitment to quality and innovation.
              </p>
            </div>
            <button className="px-6 py-3 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all flex items-center gap-2 whitespace-nowrap">
              View All Work <ArrowRight size={18} />
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
                className="group"
              >
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-6 border border-zinc-100 shadow-sm group-hover:shadow-xl group-hover:shadow-zinc-200/50 transition-all">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover bg-zinc-50 group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      if (project.image.startsWith('http')) {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070";
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-zinc-900 shadow-lg hover:bg-emerald-500 hover:text-white transition-colors"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-zinc-100 text-zinc-500 text-[10px] font-bold uppercase tracking-wider rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tutorials Section */}
      <section className="py-16 md:py-24 bg-zinc-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Latest Tutorials</h2>
              <p className="text-zinc-600 text-sm sm:text-base">
                Start your journey with our most popular tutorials. Learn by building real-world projects with modern tools.
              </p>
            </div>
            <button className="px-6 py-3 bg-white border border-zinc-200 text-zinc-900 rounded-xl font-bold hover:bg-zinc-50 transition-all flex items-center gap-2 whitespace-nowrap">
              Browse All Tutorials <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_TUTORIALS.map((tutorial, index) => (
              <TutorialCard key={tutorial.id} tutorial={tutorial} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function TutorialCard({ tutorial, index }: { tutorial: Tutorial, index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-[2rem] overflow-hidden border border-zinc-200 shadow-sm hover:shadow-xl hover:shadow-zinc-200/50 transition-all group"
    >
      <div className="relative h-52 overflow-hidden">
        <img 
          src={tutorial.image} 
          alt={tutorial.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-wider text-zinc-900">
            {tutorial.category}
          </span>
        </div>
      </div>
      <div className="p-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="flex items-center gap-1 text-xs font-medium text-zinc-500">
            <BookOpen size={14} className="text-emerald-600" />
            {tutorial.difficulty}
          </span>
          <span className="w-1 h-1 rounded-full bg-zinc-300" />
          <span className="text-xs font-medium text-zinc-500">{tutorial.duration}</span>
        </div>
        <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-emerald-600 transition-colors">
          {tutorial.title}
        </h3>
        <p className="text-zinc-600 text-sm leading-relaxed mb-6 line-clamp-2">
          {tutorial.description}
        </p>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-zinc-50 border border-zinc-100 text-zinc-900 font-bold rounded-xl group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all"
        >
          Start Tutorial
        </motion.button>
      </div>
    </motion.div>
  );
}
