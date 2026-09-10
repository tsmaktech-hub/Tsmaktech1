import React from 'react';
import { ArrowRight, MessageCircle, Mail, Globe, Github, Terminal } from 'lucide-react';
import { TsmakLogo } from './Logo';

interface FooterProps {
  onNavigate: (page: 'home' | 'portfolio' | 'get-started', sectionId?: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer id="site-footer" className="relative z-20 w-full border-t border-white/[0.12] bg-[#060810] text-zinc-300 text-sm">
      {/* Subtle top accent highlight */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16">
          {/* Brand Info */}
          <div className="sm:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <TsmakLogo size="sm" />
              <div className="text-xl font-bold tracking-tight text-white font-display">
                Tsmak <span className="text-blue-400">Tech</span>
              </div>
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              An elite engineering studio & academy. Architecting mission-critical platforms, attendance ecosystems, and custom AI solutions while mentoring high-caliber developers.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span>All systems operational</span>
              </div>
            </div>
          </div>

          {/* Navigation Links - Studio */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Studio
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Selected Works & Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'featured-systems')}
                  className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Interactive 3D Systems
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('get-started')}
                  className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Request a Project Quote
                </button>
              </li>
              <li>
                <a
                  href="https://tsmakislamicgpt.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-300 transition-colors flex items-center gap-1 text-blue-400"
                >
                  <span>Tsmak-Islamic GPT</span>
                  <ArrowRight size={11} />
                </a>
              </li>
            </ul>
          </div>

          {/* Academy Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Academy
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home', 'tutorials')}
                  className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Curriculum & Syllabi
                </button>
              </li>
              <li>
                <a
                  href="https://chat.whatsapp.com/IV6sRV0HRYU2vl7o8kYHea"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white text-zinc-400 transition-colors flex items-center gap-1"
                >
                  <MessageCircle size={12} className="text-blue-400" />
                  <span>WhatsApp Community</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('get-started')}
                  className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  1-on-1 Code Mentorship
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Direct Channel */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Direct Contact
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <a
                  href="https://wa.me/2347087445219"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-300 transition-colors text-blue-400 flex items-center gap-1.5"
                >
                  <MessageCircle size={12} />
                  <span>+234 708 744 5219</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:tsmaktech@gmail.com"
                  className="hover:text-white text-zinc-400 transition-colors flex items-center gap-1.5"
                >
                  <Mail size={12} className="text-blue-400" />
                  <span>tsmaktech@gmail.com</span>
                </a>
              </li>
              <li className="text-zinc-500 pt-1 text-[11px] flex items-center gap-1.5">
                <Globe size={12} className="text-zinc-500" />
                <span>Lagos, Nigeria • Operating Globally</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Tsmak Tech. Handcrafted with precision & modern engineering principles.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Privacy & Integrity
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-blue-400 text-zinc-400 transition-colors cursor-pointer"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
