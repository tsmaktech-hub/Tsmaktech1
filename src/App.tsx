import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import AmbientBackground from './components/AmbientBackground';
import ScrollProgressBar from './components/ScrollProgressBar';
import ProjectModal from './components/ProjectModal';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import GetStartedPage from './pages/GetStartedPage';
import { Project, Page, TrackType } from './types';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [getStartedTrack, setGetStartedTrack] = useState<TrackType>('client');

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (page: Page, sectionId?: string, track?: TrackType) => {
    if (track) {
      setGetStartedTrack(track);
    }
    setCurrentPage(page);

    if (sectionId) {
      // Small timeout to allow DOM render if switching pages
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 flex flex-col selection:bg-blue-600/30 selection:text-blue-200 relative">
      {/* Dynamic Scroll Progress Bar fixed at top of screen */}
      <ScrollProgressBar />

      {/* Ambient Blueprint Grid & Lighting Field */}
      <AmbientBackground />

      {/* Navigation Header */}
      <div className="relative z-20">
        <Navigation
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isScrolled={isScrolled}
        />
      </div>

      {/* Page Routing with Fluid Transitions */}
      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <HomePage
                onNavigate={handleNavigate}
                onSelectProject={(proj) => setSelectedProject(proj)}
              />
            </motion.div>
          )}

          {currentPage === 'portfolio' && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <PortfolioPage
                onBackToHome={() => handleNavigate('home')}
                onGetStarted={() => handleNavigate('get-started')}
                onSelectProject={(proj) => setSelectedProject(proj)}
              />
            </motion.div>
          )}

          {currentPage === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <AboutPage onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentPage === 'get-started' && (
            <motion.div
              key="get-started"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <GetStartedPage onBack={() => handleNavigate('home')} initialTrack={getStartedTrack} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Case Study Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onGetStarted={() => {
          setSelectedProject(null);
          handleNavigate('get-started');
        }}
      />

      {/* Floating Quick WhatsApp Hotline Pill */}
      <motion.a
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        href="https://wa.me/2347087445219?text=Hello%20Tsmak%20Tech%2C%20I'm%20reaching%20out%20from%20your%20website."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 p-3 sm:p-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-900/40 flex items-center justify-center group cursor-pointer transition-all active:scale-95 border border-white/10"
        title="Direct WhatsApp Hotline with Founder"
        aria-label="Direct WhatsApp Hotline"
      >
        <MessageCircle size={22} className="text-white group-hover:scale-110 transition-transform" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
          Founder Line
        </span>
      </motion.a>

      {/* Shared High-Craft Footer - Visible on All Pages */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

