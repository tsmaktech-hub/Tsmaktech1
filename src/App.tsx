import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layout, 
  Globe, 
  Smartphone, 
  Server, 
  ChevronRight, 
  Play, 
  BookOpen, 
  Search,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Building2,
  Briefcase,
  Rocket,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { cn } from './lib/utils';
import { PROJECTS, LEARNING_PATHS, FEATURED_TUTORIALS } from './constants';
import { Tutorial } from './types';

import { TsmakLogo } from './components/Logo';
import PortfolioPage from './pages/PortfolioPage';
import GetStartedPage from './pages/GetStartedPage';

const HERO_IMAGES = [
  '/hero.jpg',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=2070',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070',
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=2070'
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'portfolio' | 'get-started'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiRecommendation, setAiRecommendation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const scroll = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return true;
      }
      return false;
    };

    const targetPage = sectionId === 'about' ? 'portfolio' : 'home';

    if (currentPage !== targetPage) {
      setCurrentPage(targetPage);
      // Wait for page transition to complete before scrolling
      // Using a longer timeout and a small retry loop to ensure the element is in DOM
      let attempts = 0;
      const interval = setInterval(() => {
        if (scroll() || attempts > 10) {
          clearInterval(interval);
        }
        attempts++;
      }, 100);
    } else {
      scroll();
    }
    setIsServicesOpen(false);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    document.title = "Tsmak-Tech Website";
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.services-dropdown')) {
        setIsServicesOpen(false);
      }
    };
    if (isServicesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isServicesOpen]);

  const handleAiPathfinder = async () => {
    if (!searchQuery) return;
    setIsAiLoading(true);
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not defined");
      }
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `A user wants to learn: "${searchQuery}". Based on Tsmak Tech's focus (Web Apps, Websites, Mobile Apps, Backend), recommend a learning path and explain why in 2-3 sentences. Keep it encouraging and professional.`,
      });
      setAiRecommendation(response.text || "I couldn't generate a recommendation right now. Try focusing on Web or Mobile development!");
    } catch (error) {
      console.error("AI Error:", error);
      setAiRecommendation("Error connecting to AI assistant. Please try again.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className={cn(
        "sticky top-0 z-50 transition-all duration-300 border-b",
        isScrolled 
          ? "bg-zinc-950/80 backdrop-blur-md border-white/5 py-3" 
          : "bg-black/90 backdrop-blur-sm border-transparent py-4"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div onClick={() => setCurrentPage('home')} className="cursor-pointer">
                <TsmakLogo />
              </div>
              <span 
                className="text-xl font-bold tracking-tight text-white cursor-pointer"
                onClick={() => setCurrentPage('home')}
              >
                Tsmak <span className="text-emerald-400">Tech</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => setCurrentPage('home')} 
                className={cn(
                  "text-sm font-medium relative py-1 transition-colors",
                  currentPage === 'home' ? "text-white" : "text-zinc-400 hover:text-emerald-400"
                )}
              >
                Home
                {currentPage === 'home' && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-500 rounded-full"
                  />
                )}
              </button>
              <button 
                onClick={() => setCurrentPage('portfolio')} 
                className={cn(
                  "text-sm font-medium relative py-1 transition-colors",
                  currentPage === 'portfolio' ? "text-white" : "text-zinc-400 hover:text-emerald-400"
                )}
              >
                Portfolio
                {currentPage === 'portfolio' && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-500 rounded-full"
                  />
                )}
              </button>
              
              {/* Services Dropdown */}
              <div className="relative services-dropdown">
                <button 
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="text-sm font-medium text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-1 py-1"
                >
                  Services <ChevronDown size={14} className={cn("transition-transform duration-300", isServicesOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                    >
                      <button 
                        onClick={() => scrollToSection('professional-services')}
                        className="w-full text-left block px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-emerald-400 transition-colors"
                      >
                        Hire Us
                      </button>
                      <button 
                        onClick={() => scrollToSection('tutorials')}
                        className="w-full text-left block px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-emerald-400 transition-colors"
                      >
                        Learn Development
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button 
                onClick={() => scrollToSection('about')} 
                className="text-sm font-medium text-zinc-400 hover:text-emerald-400 transition-colors"
              >
                About Us
              </button>

              <a href="https://chat.whatsapp.com/IV6sRV0HRYU2vl7o8kYHea" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-zinc-400 hover:text-emerald-400 transition-colors">Community</a>
              <button 
                onClick={() => setCurrentPage('get-started')}
                className="bg-white text-zinc-950 px-5 py-2 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors"
              >
                Get Started
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-zinc-600">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="md:hidden fixed top-20 right-4 w-72 z-[60] bg-black/95 backdrop-blur-xl px-6 py-8 rounded-3xl border border-white/10 shadow-2xl space-y-6"
          >
            <div className="flex flex-col gap-6">
              <button 
                onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }} 
                className={cn("text-left text-xl font-bold transition-colors", currentPage === 'home' ? "text-emerald-400" : "text-white")}
              >
                Home
              </button>
              <button 
                onClick={() => { setCurrentPage('portfolio'); setIsMenuOpen(false); }} 
                className={cn("text-left text-xl font-bold transition-colors", currentPage === 'portfolio' ? "text-emerald-400" : "text-white")}
              >
                Portfolio
              </button>
              
              <div className="space-y-4 services-dropdown">
                <button 
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="text-xl font-semibold text-white flex items-center justify-between w-full"
                >
                  Services
                  <ChevronDown size={20} className={cn("transition-transform duration-300", isServicesOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pl-4 flex flex-col gap-4 overflow-hidden"
                    >
                      <button onClick={() => scrollToSection('professional-services')} className="text-left text-lg text-zinc-400 hover:text-emerald-400 transition-colors">Hire Us</button>
                      <button onClick={() => scrollToSection('tutorials')} className="text-left text-lg text-zinc-400 hover:text-emerald-400 transition-colors">Learn Development</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button 
                onClick={() => scrollToSection('about')} 
                className="text-left text-xl font-semibold text-white hover:text-emerald-400 transition-colors"
              >
                About Us
              </button>

              <a 
                href="https://chat.whatsapp.com/IV6sRV0HRYU2vl7o8kYHea" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xl font-semibold text-white hover:text-emerald-400 transition-colors"
              >
                Community
              </a>
              <div className="pt-4">
                <button 
                  onClick={() => { setCurrentPage('get-started'); setIsMenuOpen(false); }}
                  className="w-full bg-emerald-600 text-white py-3.5 rounded-xl text-lg font-bold shadow-lg shadow-emerald-600/20 active:scale-95 transition-transform"
                >
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentPage === 'home' ? (
          <motion.main 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-grow"
          >
            {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-24 overflow-hidden scroll-mt-20">
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 -z-10 bg-black">
            <AnimatePresence mode="wait">
              <motion.img 
                key={HERO_IMAGES[currentImageIndex]}
                src={HERO_IMAGES[currentImageIndex]} 
                alt="Coding Background" 
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.4, scale: 1.05 }}
                exit={{ opacity: 0, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if an image fails to load
                  e.currentTarget.src = "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=2070";
                }}
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              <motion.span 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-6 border border-emerald-500/20"
              >
                <Sparkles size={14} />
                Learn to build the future
              </motion.span>
              <motion.h1 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 md:mb-8 leading-[1.1]"
              >
                Master the Art of <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">
                  Modern Development
                </span>
              </motion.h1>
              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed"
              >
                Tsmak Tech provides world-class tutorials and paths to help you build professional web apps, websites, and mobile applications. We also specialize in building high-performance web applications and websites for companies, brands, and organizations.
              </motion.p>

              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <motion.button 
                  onClick={() => setCurrentPage('get-started')}
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
        <section className="py-16 md:py-24 text-white overflow-hidden relative">
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 -z-10 bg-black">
            <img 
              src="/hero.jpg" 
              alt="AI Pathfinder Background" 
              className="w-full h-full object-cover opacity-30"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070";
              }}
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
                      className="mt-6 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl"
                    >
                      <div className="flex items-start gap-3">
                        <Sparkles className="text-emerald-400 mt-1 shrink-0" size={20} />
                        <p className="text-emerald-50 text-sm leading-relaxed">
                          {aiRecommendation}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative hidden lg:block"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-indigo-500 blur-3xl opacity-20" />
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative bg-zinc-800 border border-white/10 rounded-3xl p-8 shadow-2xl"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="space-y-4 font-mono text-sm">
                    <div className="flex gap-4">
                      <span className="text-zinc-500">01</span>
                      <span className="text-emerald-400">const</span>
                      <span className="text-white">learningPath = </span>
                      <span className="text-indigo-400">await</span>
                      <span className="text-white"> findPath(</span>
                      <span className="text-amber-300">"your_goals"</span>
                      <span className="text-white">);</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-zinc-500">02</span>
                      <span className="text-emerald-400">if</span>
                      <span className="text-white"> (learningPath.success) {'{'}</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-zinc-500">03</span>
                      <span className="text-zinc-500 ml-4">console.log(</span>
                      <span className="text-amber-300">"Welcome to Tsmak Tech!"</span>
                      <span className="text-white">);</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-zinc-500">04</span>
                      <span className="text-white">{'}'}</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Learning Paths */}
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
          {/* Subtle Background Pattern/Image */}
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
            <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070" 
              alt="Tech Pattern" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Choose Your Focus</h2>
              <p className="text-zinc-600 text-sm sm:text-base max-w-2xl mx-auto">
                Structured paths designed to take you from zero to professional developer in your chosen field.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {LEARNING_PATHS.map((path, index) => (
                <motion.div
                  key={path.id}
                  onClick={() => setCurrentPage('get-started')}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-3xl border border-zinc-100 bg-zinc-50/50 hover:bg-white hover:shadow-xl hover:shadow-zinc-200/50 transition-all group cursor-pointer"
                >
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors",
                    path.color === 'emerald' && "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
                    path.color === 'indigo' && "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white",
                    path.color === 'violet' && "bg-violet-100 text-violet-600 group-hover:bg-violet-600 group-hover:text-white",
                    path.color === 'amber' && "bg-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",
                  )}>
                    {path.id === 'web-apps' && <Layout size={28} />}
                    {path.id === 'websites' && <Globe size={28} />}
                    {path.id === 'mobile-apps' && <Smartphone size={28} />}
                    {path.id === 'backend' && <Server size={28} />}
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-3">{path.title}</h3>
                  <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                    {path.description}
                  </p>
                  <div className="flex items-center text-sm font-bold text-zinc-900 group-hover:gap-2 transition-all">
                    Explore Path <ArrowRight size={16} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Business Solutions Section */}
        <section id="professional-services" className="py-16 md:py-24 bg-black text-white overflow-hidden scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
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

                <button 
                  onClick={() => setCurrentPage('get-started')}
                  className="mt-12 px-8 py-4 bg-white text-zinc-950 rounded-2xl font-bold hover:bg-zinc-200 transition-all flex items-center gap-2"
                >
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
              <button 
                onClick={() => setCurrentPage('portfolio')}
                className="px-6 py-3 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all flex items-center gap-2 whitespace-nowrap"
              >
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
                      <span key={tag} className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-[10px] font-bold uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900 hover:text-emerald-600 transition-colors"
                  >
                    Visit Website <ExternalLink size={14} />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Tutorials */}
        <section id="tutorials" className="py-16 md:py-24 bg-zinc-50 relative overflow-hidden scroll-mt-20">
          {/* Subtle Background Image */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none grayscale">
            <img 
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=2070" 
              alt="Coding Pattern" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12 gap-6">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Latest Tutorials</h2>
                <p className="text-zinc-600 text-sm sm:text-base">Fresh content added weekly to keep you ahead of the curve.</p>
              </div>
              <button className="text-zinc-900 font-bold flex items-center gap-2 hover:text-emerald-600 transition-colors text-sm sm:text-base">
                View All Tutorials <ArrowRight size={20} />
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {FEATURED_TUTORIALS.map((tutorial, index) => (
                <TutorialCard key={tutorial.id} tutorial={tutorial} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-16 md:py-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-emerald-600 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-8 md:p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
              
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">Join the Tsmak Tech community</h2>
                <p className="text-emerald-50 text-base sm:text-lg mb-8 md:mb-10">
                  Get the latest tutorials, tech news, and career tips delivered straight to your inbox. No spam, just value.
                </p>
                <form className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-grow px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white border-none focus:ring-2 focus:ring-emerald-400 text-zinc-900 placeholder:text-zinc-400 text-sm sm:text-base"
                  />
                  <button className="px-8 py-3 sm:py-4 bg-zinc-900 text-white font-bold rounded-xl sm:rounded-2xl hover:bg-zinc-800 transition-colors text-sm sm:text-base">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.section>
      </motion.main>
    ) : currentPage === 'portfolio' ? (
      <motion.div
        key="portfolio"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex-grow"
      >
        <PortfolioPage 
          onBackToHome={() => setCurrentPage('home')} 
          onGetStarted={() => setCurrentPage('get-started')}
        />
      </motion.div>
    ) : (
      <motion.div
        key="get-started"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex-grow"
      >
        <GetStartedPage onBack={() => setCurrentPage('home')} />
      </motion.div>
    )}
    </AnimatePresence>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-white border-t border-zinc-200 pt-12 md:pt-20 pb-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <TsmakLogo size="sm" />
                <span className="text-lg font-bold tracking-tight text-zinc-900">Tsmak Tech</span>
              </div>
              <p className="text-zinc-500 max-w-sm mb-8">
                Empowering the next generation of developers with high-quality, accessible tech education. Build anything you can imagine.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-emerald-600 hover:text-white transition-all">
                  <Github size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-emerald-600 hover:text-white transition-all">
                  <Twitter size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-emerald-600 hover:text-white transition-all">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-zinc-900 mb-6 uppercase text-xs tracking-widest">Platform</h4>
              <ul className="space-y-4">
                <li><button onClick={() => setCurrentPage('home')} className="text-zinc-500 hover:text-emerald-600 transition-colors">Home</button></li>
                <li><button onClick={() => setCurrentPage('portfolio')} className="text-zinc-500 hover:text-emerald-600 transition-colors">Portfolio</button></li>
                <li><button onClick={() => setCurrentPage('get-started')} className="text-zinc-500 hover:text-emerald-600 transition-colors">Get Started</button></li>
                <li><button onClick={() => scrollToSection('about')} className="text-zinc-500 hover:text-emerald-600 transition-colors">About Us</button></li>
                <li><button onClick={() => scrollToSection('professional-services')} className="text-zinc-500 hover:text-emerald-600 transition-colors">Services</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-zinc-900 mb-6 uppercase text-xs tracking-widest">Support</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-zinc-500 hover:text-emerald-600 transition-colors">Help Center</a></li>
                <li><a href="https://chat.whatsapp.com/IV6sRV0HRYU2vl7o8kYHea" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-emerald-600 transition-colors">Community</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-emerald-600 transition-colors">Contact</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-emerald-600 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-zinc-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-400 text-sm">
              © 2026 Tsmak Tech. All rights reserved.
            </p>
            <div className="flex gap-8">
              <span className="text-zinc-400 text-sm">Built by the founder of Tsmak Tech.</span>
            </div>
          </div>
        </div>
      </motion.footer>
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
        <a 
          href="https://chat.whatsapp.com/IV6sRV0HRYU2vl7o8kYHea" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full"
        >
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-zinc-50 border border-zinc-100 text-zinc-900 font-bold rounded-xl group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all"
          >
            Start Tutorial
          </motion.button>
        </a>
      </div>
    </motion.div>
  );
}
