import React from 'react';
import { motion } from 'framer-motion';

export const TsmakLogo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const dimensions = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-20 h-20'
  };

  const fontSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-base'
  };

  return (
    <div className={`${dimensions[size]} relative flex items-center justify-center group select-none`}>
      {/* Outer Rotating Ring */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-dashed border-violet-500/35"
      />
      
      {/* Middle Breathing Glow */}
      <motion.div 
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-1 rounded-full border border-sky-500/30 shadow-[0_0_12px_rgba(70,130,180,0.25)]"
      />

      {/* Inner Core */}
      <div className="absolute inset-1.5 rounded-full bg-[#0b0e1b] flex items-center justify-center overflow-hidden border border-white/10 shadow-inner">
        <span className={`${fontSizes[size]} font-black text-white tracking-tighter flex items-center`}>
          T<span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-violet-400">S</span>
        </span>
        
        {/* Subtle Scanning Ray */}
        <motion.div 
          animate={{ top: ['-100%', '200%'] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-1/2 bg-gradient-to-b from-transparent via-sky-400/20 to-transparent pointer-events-none"
        />
      </div>
      
      {/* Orbiting Satellite Node */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="w-1.5 h-1.5 bg-sky-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)] -top-0.5 left-1/2 -translate-x-1/2 absolute" />
      </motion.div>
    </div>
  );
};

