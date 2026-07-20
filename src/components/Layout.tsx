import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Github, 
  Twitter, 
  Linkedin 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { TsmakLogo } from './Logo';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-zinc-950 font-sans selection:bg-emerald-500/30 selection:text-emerald-400">
      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent py-6"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <TsmakLogo />
              <span className="text-xl font-bold tracking-tight text-white">Tsmak <span className="text-emerald-400">Tech</span></span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className={cn(
                "text-sm font-medium transition-colors",
                location.pathname === "/" ? "text-emerald-400" : "text-zinc-400 hover:text-emerald-400"
              )}>Home</Link>
              
              <Link to="/portfolio" className={cn(
                "text-sm font-medium transition-colors",
                location.pathname === "/portfolio" ? "text-emerald-400" : "text-zinc-400 hover:text-emerald-400"
              )}>Portfolio</Link>
              
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
                      <Link 
                        to="/#professional-services" 
                        onClick={() => setIsServicesOpen(false)}
                        className="block px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-emerald-400 transition-colors"
                      >
                        Hire Us
                      </Link>
                      <Link 
                        to="/#tutorials" 
                        onClick={() => setIsServicesOpen(false)}
                        className="block px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-emerald-400 transition-colors"
                      >
                        Learn Development
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/portfolio#about" className="text-sm font-medium text-zinc-400 hover:text-emerald-400 transition-colors">About Us</Link>

              <a href="https://chat.whatsapp.com/IV6sRV0HRYU2vl7o8kYHea" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-zinc-400 hover:text-emerald-400 transition-colors">Community</a>
              <button className="bg-white text-zinc-950 px-5 py-2 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors">
                Get Started
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-zinc-400">
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
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-emerald-400">Home</Link>
              <Link to="/portfolio" onClick={() => setIsMenuOpen(false)} className="text-xl font-semibold text-white hover:text-emerald-400 transition-colors">Portfolio</Link>
              
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
                      <Link to="/#professional-services" onClick={() => setIsMenuOpen(false)} className="text-lg text-zinc-400 hover:text-emerald-400 transition-colors">Hire Us</Link>
                      <Link to="/#tutorials" onClick={() => setIsMenuOpen(false)} className="text-lg text-zinc-400 hover:text-emerald-400 transition-colors">Learn Development</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/portfolio#about" onClick={() => setIsMenuOpen(false)} className="text-xl font-semibold text-white hover:text-emerald-400 transition-colors">About Us</Link>

              <a 
                href="https://chat.whatsapp.com/IV6sRV0HRYU2vl7o8kYHea" 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => setIsMenuOpen(false)} 
                className="text-xl font-semibold text-white hover:text-emerald-400 transition-colors"
              >
                Community
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>{children}</main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-white pt-24 pb-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <TsmakLogo />
                <span className="text-2xl font-bold tracking-tight text-zinc-900">Tsmak <span className="text-emerald-600">Tech</span></span>
              </div>
              <p className="text-zinc-500 text-lg max-w-md mb-8 leading-relaxed">
                Empowering the next generation of developers and businesses through world-class education and professional digital solutions.
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
                <li><Link to="/" className="text-zinc-500 hover:text-emerald-600 transition-colors">Home</Link></li>
                <li><Link to="/portfolio" className="text-zinc-500 hover:text-emerald-600 transition-colors">Portfolio</Link></li>
                <li><Link to="/portfolio#about" className="text-zinc-500 hover:text-emerald-600 transition-colors">About Us</Link></li>
                <li><Link to="/#professional-services" className="text-zinc-500 hover:text-emerald-600 transition-colors">Services</Link></li>
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
