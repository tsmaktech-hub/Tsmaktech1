import React, { useRef, useEffect } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  glareColor?: string;
  tiltAngle?: number;
}

export default function TiltCard({
  children,
  className = '',
  onClick,
  glareColor = 'rgba(16, 185, 129, 0.15)',
  tiltAngle = 8,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    // Check if the current device is touch-only or lacks fine mouse pointer
    if (typeof window !== 'undefined') {
      isTouchDevice.current = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    }
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice.current || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -tiltAngle;
    const rY = ((x - centerX) / centerX) * tiltAngle;

    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      cardRef.current.style.transform = `perspective(1000px) rotateX(${rX.toFixed(2)}deg) rotateY(${rY.toFixed(2)}deg)`;
      cardRef.current.style.transition = 'transform 0.08s ease-out';

      if (glareRef.current) {
        const gx = ((x / rect.width) * 100).toFixed(1);
        const gy = ((y / rect.height) * 100).toFixed(1);
        glareRef.current.style.background = `radial-gradient(circle 280px at ${gx}% ${gy}%, ${glareColor}, transparent 70%)`;
        glareRef.current.style.opacity = '0.6';
      }
    });
  };

  const handleMouseLeave = () => {
    if (isTouchDevice.current || !cardRef.current) return;

    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      cardRef.current.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';

      if (glareRef.current) {
        glareRef.current.style.opacity = '0';
      }
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden cursor-pointer gpu-accel ${className}`}
    >
      {/* Dynamic Specular Glare Reflection (Ref-driven, zero re-renders) */}
      <div
        ref={glareRef}
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 rounded-[inherit] opacity-0"
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}

