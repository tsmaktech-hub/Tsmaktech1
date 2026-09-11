import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { TsmakLogo } from './Logo';
import { cn } from '../lib/utils';
import { Page } from '../types';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page, sectionId?: string) => void;
  isScrolled: boolean;
}

export default function Navigation({ currentPage, onNavigate, isScrolled }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const handleLinkClick = (page: Page, sectionId?: string) => {
    onNavigate(page, sectionId);
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'py-3 bg-[#080a12]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl'
          : 'py-5 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo & Brand */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
            aria-label="Tsmak Tech Home"
          >
            <TsmakLogo size="sm" />
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1 font-display">
                Tsmak <span className="text-blue-400">Tech</span>
              </span>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:block">
                Studio & Academy
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            <button
              onClick={() => handleLinkClick('home')}
              className={cn(
                'relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors cursor-pointer',
                currentPage === 'home' ? 'text-white' : 'text-zinc-400 hover:text-white'
              )}
            >
              {currentPage === 'home' && (
                <motion.div
                  layoutId="navPill"
                  className="absolute inset-0 bg-white/10 rounded-full border border-white/10"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">Home</span>
            </button>

            <button
              onClick={() => handleLinkClick('about')}
              className={cn(
                'relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors cursor-pointer',
                currentPage === 'about' ? 'text-white' : 'text-zinc-400 hover:text-white'
              )}
            >
              {currentPage === 'about' && (
                <motion.div
                  layoutId="navPill"
                  className="absolute inset-0 bg-white/10 rounded-full border border-white/10"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">About Us</span>
            </button>

            <button
              onClick={() => handleLinkClick('portfolio')}
              className={cn(
                'relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors cursor-pointer',
                currentPage === 'portfolio' ? 'text-white' : 'text-zinc-400 hover:text-white'
              )}
            >
              {currentPage === 'portfolio' && (
                <motion.div
                  layoutId="navPill"
                  className="absolute inset-0 bg-white/10 rounded-full border border-white/10"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">Portfolio</span>
            </button>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="px-4 py-2 rounded-full text-xs font-semibold text-zinc-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Services</span>
                <ChevronDown
                  size={12}
                  className={cn('transition-transform duration-200', isServicesOpen && 'rotate-180 text-blue-400')}
                />
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-3 w-56 p-2 rounded-2xl bg-[#0c101c] border border-white/10 shadow-xl z-50"
                  >
                    <button
                      onClick={() => handleLinkClick('home', 'professional-services')}
                      className="w-full text-left p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer"
                    >
                      <div className="text-xs font-semibold text-white group-hover:text-blue-400 transition-colors">
                        Hire the Studio
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        Custom web apps, platforms & mobile dev
                      </div>
                    </button>
                    <button
                      onClick={() => handleLinkClick('home', 'tutorials')}
                      className="w-full text-left p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer"
                    >
                      <div className="text-xs font-semibold text-white group-hover:text-blue-400 transition-colors">
                        Engineering Academy
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        Guided curriculums & career mentorship
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Action Cluster */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://chat.whatsapp.com/IV6sRV0HRYU2vl7o8kYHea"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-full text-xs font-semibold text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageCircle size={14} className="text-blue-400" />
              <span>Community</span>
            </a>

            <button
              onClick={() => handleLinkClick('get-started')}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => handleLinkClick('get-started')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm"
            >
              Start
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle Navigation"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-4 top-20 bg-[#0c101c] border border-white/10 rounded-2xl p-6 shadow-2xl z-[60] space-y-4"
          >
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleLinkClick('home')}
                className={cn(
                  'text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors',
                  currentPage === 'home' ? 'bg-white/10 text-white' : 'text-zinc-300 hover:bg-white/5'
                )}
              >
                Home
              </button>
              <button
                onClick={() => handleLinkClick('about')}
                className={cn(
                  'text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors',
                  currentPage === 'about' ? 'bg-white/10 text-white' : 'text-zinc-300 hover:bg-white/5'
                )}
              >
                About Us
              </button>
              <button
                onClick={() => handleLinkClick('portfolio')}
                className={cn(
                  'text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors',
                  currentPage === 'portfolio' ? 'bg-white/10 text-white' : 'text-zinc-300 hover:bg-white/5'
                )}
              >
                Portfolio & Case Studies
              </button>
              <button
                onClick={() => handleLinkClick('home', 'professional-services')}
                className="text-left px-4 py-3 rounded-xl text-base font-semibold text-zinc-300 hover:bg-white/5"
              >
                Hire Us (Studio)
              </button>
              <button
                onClick={() => handleLinkClick('home', 'tutorials')}
                className="text-left px-4 py-3 rounded-xl text-base font-semibold text-zinc-300 hover:bg-white/5"
              >
                Curriculum & Tutorials
              </button>
              <a
                href="https://chat.whatsapp.com/IV6sRV0HRYU2vl7o8kYHea"
                target="_blank"
                rel="noopener noreferrer"
                className="text-left px-4 py-3 rounded-xl text-base font-semibold text-blue-400 hover:bg-white/5 flex items-center justify-between"
              >
                <span>Join Community</span>
                <MessageCircle size={18} />
              </a>
            </div>

            <div className="pt-2 border-t border-white/10">
              <button
                onClick={() => handleLinkClick('get-started')}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-center flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-colors"
              >
                <span>Start Learning or Hire Us</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
