import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import AmbientBackground from './components/AmbientBackground';
import ScrollProgressBar from './components/ScrollProgressBar';
import ProjectModal from './components/ProjectModal';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import GetStartedPage from './pages/GetStartedPage';
import { Project } from './types';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'portfolio' | 'get-started'>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (page: 'home' | 'portfolio' | 'get-started', sectionId?: string) => {
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
    <div className="min-h-screen bg-[#090A0F] text-zinc-100 flex flex-col selection:bg-emerald-500/25 selection:text-emerald-300 relative">
      {/* Dynamic Scroll Progress Bar fixed at top of screen */}
      <ScrollProgressBar />

      {/* Ambient Mouse Particle & Light Field (Ultra-low GPU overhead) */}
      <AmbientBackground />

      {/* Navigation Header */}
      {currentPage !== 'get-started' && (
        <Navigation
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isScrolled={isScrolled}
        />
      )}

      {/* Page Routing with Fluid Transitions */}
      <main className="flex-grow">
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

          {currentPage === 'get-started' && (
            <motion.div
              key="get-started"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <GetStartedPage onBack={() => handleNavigate('home')} />
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

      {/* Floating Quick WhatsApp Hotline Pill with Smooth Lift & Glow */}
      {currentPage !== 'get-started' && (
        <motion.a
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          href="https://wa.me/2347087445219?text=Hello%20Tsmak%20Tech%2C%20I'm%20reaching%20out%20from%20your%20website."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-emerald-500 text-zinc-950 btn-emerald-glow btn-shine flex items-center justify-center group cursor-pointer"
          title="Direct WhatsApp Hotline with Founder"
          aria-label="Direct WhatsApp Hotline"
        >
          <MessageCircle size={22} className="fill-zinc-950 group-hover:scale-110 transition-transform" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
            Founder Line
          </span>
        </motion.a>
      )}

      {/* Shared High-Craft Footer */}
      {currentPage !== 'get-started' && (
        <Footer onNavigate={handleNavigate} />
      )}
    </div>
  );
}

