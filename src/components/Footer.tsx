import React from 'react';
import { ArrowRight, MessageCircle, Mail, Globe, Github, Terminal } from 'lucide-react';
import { TsmakLogo } from './Logo';

interface FooterProps {
  onNavigate: (page: 'home' | 'portfolio' | 'get-started', sectionId?: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-white/[0.08] bg-[#07080c] text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <TsmakLogo size="sm" />
              <div className="text-xl font-bold tracking-tight text-white font-display">
                Tsmak <span className="text-pink-400">Tech</span>
              </div>
            </div>
            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
              An engineering studio & academy. Architecting mission-critical platforms, attendance ecosystems, and custom AI solutions while mentoring high-caliber developers.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                <span>All systems operational</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Studio
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Selected Works & Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'professional-services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Enterprise Engineering
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('get-started')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Request a Project Quote
                </button>
              </li>
              <li>
                <a
                  href="https://tsmakislamicgpt.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-300 transition-colors flex items-center gap-1 text-pink-400"
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
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Curriculum & Syllabi
                </button>
              </li>
              <li>
                <a
                  href="https://chat.whatsapp.com/IV6sRV0HRYU2vl7o8kYHea"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <MessageCircle size={12} className="text-purple-400" />
                  <span>WhatsApp Community</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('get-started')}
                  className="hover:text-white transition-colors cursor-pointer"
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
                  className="hover:text-pink-300 transition-colors text-pink-400 flex items-center gap-1"
                >
                  <span>+234 708 744 5219</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:tsmaktech@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  tsmaktech@gmail.com
                </a>
              </li>
              <li className="text-zinc-500 pt-2 text-[11px]">
                Lagos, Nigeria • Operating Globally
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
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
              className="hover:text-pink-400 transition-colors cursor-pointer"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
