import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  phase: number;
  color: string;
}

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking for subtle interactive ripple
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 140,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
      }
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Initialize drifting constellation particles
    const particleCount = Math.min(Math.floor((width * height) / 28000), 55);
    const particles: Particle[] = [];
    const colors = ['#60a5fa', '#93c5fd', '#ffffff', '#3b82f6'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 0.8,
        baseAlpha: Math.random() * 0.35 + 0.25,
        phase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Resize handling
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    let startTime = performance.now();
    const SPACING = 36; // Grid dot spacing in pixels

    // Main animation loop
    const render = (now: number) => {
      const elapsed = (now - startTime) * 0.001; // seconds

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // 1. Infinite flowing grid dots
      // Compute seamless infinite translational offsets
      const driftSpeedX = 6.5; // pixels per second
      const driftSpeedY = 4.0;
      const offsetX = (elapsed * driftSpeedX) % SPACING;
      const offsetY = (elapsed * driftSpeedY) % SPACING;

      const cols = Math.ceil(width / SPACING) + 2;
      const rows = Math.ceil(height / SPACING) + 2;

      for (let i = -1; i < cols; i++) {
        for (let j = -1; j < rows; j++) {
          const x = i * SPACING + offsetX;
          const y = j * SPACING + offsetY;

          // Multi-frequency wave for organic infinity ripple effect
          const wave1 = Math.sin(x * 0.012 + y * 0.012 - elapsed * 1.8);
          const wave2 = Math.cos(x * 0.018 - y * 0.014 + elapsed * 1.3);
          const wave = (wave1 + wave2) * 0.5; // -1 to 1

          // Mouse proximity effect
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          let mouseFactor = 0;
          if (dist < mouse.radius) {
            mouseFactor = (1 - dist / mouse.radius);
          }

          // Compute size and opacity
          const isAccentNode = (i % 4 === 0 && j % 4 === 0);
          const baseAlpha = isAccentNode ? 0.25 : 0.08;
          const alpha = Math.min(1, baseAlpha + (wave + 1) * 0.5 * 0.22 + mouseFactor * 0.5);
          const radius = (isAccentNode ? 1.4 : 0.9) + (wave + 1) * 0.5 * 0.5 + mouseFactor * 1.2;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);

          if (isAccentNode || mouseFactor > 0.3) {
            ctx.fillStyle = `rgba(96, 165, 250, ${alpha})`;
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          }
          ctx.fill();

          // Subtle CAD crosshair on primary accent nodes
          if (isAccentNode && (wave > 0.4 || mouseFactor > 0.1)) {
            const crossLength = 3 + mouseFactor * 2;
            ctx.strokeStyle = `rgba(96, 165, 250, ${alpha * 0.6})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(x - crossLength, y);
            ctx.lineTo(x + crossLength, y);
            ctx.moveTo(x, y - crossLength);
            ctx.lineTo(x, y + crossLength);
            ctx.stroke();
          }
        }
      }

      // 2. Drifting infinite constellation particles with wrap-around & connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particle infinitely
        p.x += p.vx;
        p.y += p.vy;

        // Infinite boundary wrap
        if (p.x < 0) p.x += width;
        if (p.x > width) p.x -= width;
        if (p.y < 0) p.y += height;
        if (p.y > height) p.y -= height;

        // Breathing pulse
        const pulse = Math.sin(elapsed * 2.2 + p.phase);
        const currentRadius = p.radius + pulse * 0.4;
        const currentAlpha = Math.max(0.1, p.baseAlpha + pulse * 0.15);

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = p.color === '#ffffff' 
          ? `rgba(255, 255, 255, ${currentAlpha})`
          : `rgba(96, 165, 250, ${currentAlpha})`;
        ctx.fill();

        // Connect nearby particles with subtle filament lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distSq = (p.x - p2.x) ** 2 + (p.y - p2.y) ** 2;
          const maxDist = 95;

          if (distSq < maxDist * maxDist) {
            const distance = Math.sqrt(distSq);
            const lineAlpha = (1 - distance / maxDist) * 0.14;
            ctx.strokeStyle = `rgba(96, 165, 250, ${lineAlpha})`;
            ctx.lineWidth = 0.65;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Deep charcoal background canvas */}
      <div className="absolute inset-0 bg-[#07090e]" />

      {/* Infinite dynamic canvas dot matrix & constellation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ willChange: 'transform' }}
      />

      {/* Ambient breathing lighting gradients for depth and atmosphere */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[950px] h-[550px] pointer-events-none opacity-40 transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(37, 99, 235, 0.18) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-1/3 left-0 w-[550px] h-[550px] pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(circle at 10% 50%, rgba(37, 99, 235, 0.1) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute top-2/3 right-0 w-[600px] h-[600px] pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(circle at 90% 50%, rgba(37, 99, 235, 0.1) 0%, transparent 60%)',
        }}
      />
    </div>
  );
}



