import React, { useEffect, useRef } from 'react';

export default function AmbientBackground() {
  const followerRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500, y: 300 });
  const currentPos = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500, y: 300 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only activate cursor light follower on desktop with mouse
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;
    };

    const animate = () => {
      // Smooth lerp (linear interpolation)
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.08;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.08;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
      {/* Deep baseline background */}
      <div className="absolute inset-0 bg-[#090A0F]" />

      {/* Lightweight GPU-accelerated cursor glow (pure radial gradient without expensive blur filters) */}
      <div
        ref={followerRef}
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-40 will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, rgba(14, 165, 233, 0.08) 35%, transparent 70%)',
          transform: 'translate3d(-500px, -500px, 0)',
        }}
      />

      {/* Static ambient depth orbs using pure CSS gradients (0% blur overhead) */}
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] pointer-events-none opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(5, 150, 105, 0.12) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-1/3 -right-32 w-[550px] h-[550px] pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute -bottom-32 left-1/4 w-[600px] h-[600px] pointer-events-none opacity-45"
        style={{
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.09) 0%, transparent 70%)',
        }}
      />

      {/* Fine tech grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_60%,transparent_100%)]" />

      {/* Soft vignette border */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,#090A0F_95%)]" />
    </div>
  );
}

