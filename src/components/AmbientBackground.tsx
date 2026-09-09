import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function AmbientBackground() {
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 300);

  const springConfig = { damping: 30, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
      {/* Deep baseline background */}
      <div className="absolute inset-0 bg-[#090A0F]" />

      {/* Interactive cursor follower radial aura */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-25"
        style={{
          left: smoothX,
          top: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.45) 0%, rgba(14, 165, 233, 0.2) 45%, transparent 70%)',
        }}
      />

      {/* Static corner ambient orbs for rich depth */}
      <div className="absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full bg-emerald-600/10 blur-[130px]" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[140px]" />
      <div className="absolute -bottom-40 left-1/4 w-[700px] h-[700px] rounded-full bg-teal-500/8 blur-[160px]" />

      {/* Subtle fine tech grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_60%,transparent_100%)]" />

      {/* Vignette border */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#090A0F_95%)]" />
    </div>
  );
}
