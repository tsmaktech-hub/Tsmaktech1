import React from 'react';
import { motion } from 'framer-motion';

export const TsmakLogo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const dimensions = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-24 h-24'
  };

  return (
    <div className={`${dimensions[size]} relative flex items-center justify-center group`}>
      {/* Outer Rotating Ring (Cyan/Blue) */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/50"
      />
      
      {/* Middle Pulsing Ring (Orange) */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-1 rounded-full border-2 border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.2)]"
      />

      {/* Inner Core */}
      <div className="absolute inset-2 rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden border border-zinc-700 shadow-inner">
        <span className="text-[10px] font-black text-orange-500 tracking-tighter select-none">
          TSMAK
        </span>
        
        {/* Scanning Effect */}
        <motion.div 
          animate={{ top: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-1/2 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent pointer-events-none"
        />
      </div>
      
      {/* Decorative Tech Bits */}
      <motion.div 
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_5px_#22d3ee]" 
      />
      <motion.div 
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full shadow-[0_0_5px_#f97316]" 
      />
    </div>
  );
};
