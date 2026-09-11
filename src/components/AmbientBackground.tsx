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

interface EnergyRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
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

    // Scroll tracking state
    let lastScrollY = window.scrollY;
    let upwardEnergy = 0; // Charges gently when scrolling up
    let downwardEnergy = 0; // Charges gently when scrolling down
    let touchStartY = 0;

    // Subtle rings spawned during scroll evolution
    const energyRings: EnergyRing[] = [];

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

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const currentY = e.touches[0].clientY;
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = currentY;
        const delta = currentY - touchStartY;
        touchStartY = currentY;

        if (delta > 6) {
          // Swiping down (viewing top / scroll up)
          triggerPulse('up', Math.min(delta * 0.012, 0.25));
        } else if (delta < -6) {
          // Swiping up (scroll down)
          triggerPulse('down', Math.min(Math.abs(delta) * 0.012, 0.25));
        }
      }
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const triggerPulse = (direction: 'up' | 'down', magnitude: number) => {
      if (direction === 'up') {
        upwardEnergy = Math.min(1.2, upwardEnergy + magnitude);
        downwardEnergy = Math.max(0, downwardEnergy - magnitude * 0.5);
      } else {
        downwardEnergy = Math.min(1.2, downwardEnergy + magnitude);
        upwardEnergy = Math.max(0, upwardEnergy - magnitude * 0.5);
      }

      // Spawn at most 2 gentle rings to avoid frame drops
      if (energyRings.length < 2 && Math.random() > 0.65) {
        energyRings.push({
          x: width * (0.35 + Math.random() * 0.3),
          y: direction === 'up' ? height * (0.6 + Math.random() * 0.2) : height * (0.2 + Math.random() * 0.2),
          radius: 12,
          maxRadius: Math.min(width, height) * 0.35,
          alpha: 0.35,
          speed: 1.8 + Math.random() * 1.0,
        });
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      if (delta < -3) {
        // Scrolling UP - gentle impulse
        const intensity = Math.min(Math.abs(delta) * 0.012, 0.3);
        triggerPulse('up', intensity);
      } else if (delta > 3) {
        // Scrolling DOWN - gentle impulse
        const intensity = Math.min(Math.abs(delta) * 0.012, 0.3);
        triggerPulse('down', intensity);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY < -4) {
        const intensity = Math.min(Math.abs(e.deltaY) * 0.01, 0.25);
        triggerPulse('up', intensity);
      } else if (e.deltaY > 4) {
        const intensity = Math.min(Math.abs(e.deltaY) * 0.01, 0.25);
        triggerPulse('down', intensity);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Initialize drifting constellation particles (optimized count for smooth 60fps)
    const particleCount = Math.min(Math.floor((width * height) / 42000), 32);
    const particles: Particle[] = [];
    const colors = ['#60a5fa', '#38bdf8', '#93c5fd', '#ffffff', '#818cf8'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35 - 0.15, // gentle natural upward drift
        radius: Math.random() * 1.4 + 0.8,
        baseAlpha: Math.random() * 0.35 + 0.3,
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
    const SPACING = 48; // Optimized dot grid spacing for high performance & clean spacing
    const mouseRadiusSq = mouse.radius * mouse.radius;

    // Main animation loop
    const render = (now: number) => {
      const elapsed = (now - startTime) * 0.001; // seconds

      // Smoothly and swiftly decay kinetic energies to prevent lingering lag
      upwardEnergy = Math.max(0, upwardEnergy * 0.92);
      downwardEnergy = Math.max(0, downwardEnergy * 0.92);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Total activity factor from scrolling in either direction
      const totalFactor = Math.min(1.2, upwardEnergy + downwardEnergy);
      const isAdvanced = totalFactor > 0.05;

      // Direction bias: +1 for pure UP, -1 for pure DOWN, 0 for balanced/idle
      const directionBias = totalFactor > 0.001 ? (upwardEnergy - downwardEnergy) / totalFactor : 0;
      const isAscending = directionBias > 0.15;
      const isDescending = directionBias < -0.15;

      // Dynamic color theme based on direction
      // Upward = Electric Cyan (#38bdf8), Downward = Cyber Indigo/Violet (#818cf8)
      const dynamicThemeColor = isAscending
        ? { r: 56, g: 189, b: 248 }
        : isDescending
        ? { r: 129, g: 140, b: 248 }
        : { r: 96, g: 165, b: 250 };

      // 1. Render Dynamic Energy Rings (gentle and lightweight)
      for (let k = energyRings.length - 1; k >= 0; k--) {
        const ring = energyRings[k];
        ring.radius += ring.speed * (1 + totalFactor * 0.3);
        ring.alpha *= 0.94;

        if (ring.alpha <= 0.01 || ring.radius >= ring.maxRadius) {
          energyRings.splice(k, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${dynamicThemeColor.r}, ${dynamicThemeColor.g}, ${dynamicThemeColor.b}, ${ring.alpha * 0.35})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }

      // 2. Infinite flowing grid dots with gentle, smooth scroll glide
      const baseSpeedX = 4.5;
      const baseSpeedY = 3.0;
      // Controlled, smooth velocity boost (dampened to prevent sudden jumping)
      const scrollWarpSpeed = (upwardEnergy * -7.0) + (downwardEnergy * 7.0);

      const offsetX = (elapsed * baseSpeedX) % SPACING;
      const offsetY = (elapsed * baseSpeedY + elapsed * scrollWarpSpeed) % SPACING;

      const cols = Math.ceil(width / SPACING) + 2;
      const rows = Math.ceil(height / SPACING) + 2;

      // Gentle scanning pulse beam
      const scanPeriod = height + 200;
      const scanSpeed = 75 + totalFactor * 60;
      const scanBeamY = isDescending
        ? ((elapsed * scanSpeed) % scanPeriod) - 100
        : (height - ((elapsed * scanSpeed) % scanPeriod)) + 100;

      for (let i = -1; i < cols; i++) {
        for (let j = -1; j < rows; j++) {
          const x = i * SPACING + offsetX;
          const y = j * SPACING + offsetY;

          // Multi-frequency organic wave
          const wave1 = Math.sin(x * 0.01 + y * 0.01 - elapsed * 1.4);
          const wave2 = Math.cos(x * 0.015 - y * 0.012 + elapsed * 1.1);
          const wave = (wave1 + wave2) * 0.5;

          // Proximity to dynamic scan beam
          const distToBeam = Math.abs(y - scanBeamY);
          let beamFactor = 0;
          if (distToBeam < 80) {
            beamFactor = (1 - distToBeam / 80) * (0.2 + totalFactor * 0.4);
          }

          // Optimized mouse proximity check (avoids Math.sqrt unless within range)
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const distSq = dx * dx + dy * dy;
          let mouseFactor = 0;
          if (distSq < mouseRadiusSq) {
            const dist = Math.sqrt(distSq);
            mouseFactor = (1 - dist / mouse.radius);
          }

          // Compute size and opacity with boost from scroll energy
          const isAccentNode = (i % 4 === 0 && j % 4 === 0);
          const baseAlpha = isAccentNode ? 0.32 : 0.12;
          
          const energyBoost = totalFactor * (isAccentNode ? 0.3 : 0.12);
          const alpha = Math.min(1, baseAlpha + (wave + 1) * 0.5 * 0.18 + mouseFactor * 0.5 + beamFactor * 0.35 + energyBoost);
          const radius = (isAccentNode ? 1.4 : 0.9) + (wave + 1) * 0.5 * 0.3 + mouseFactor * 1.0 + totalFactor * 0.3;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);

          if (isAccentNode || mouseFactor > 0.3 || beamFactor > 0.2) {
            ctx.fillStyle = totalFactor > 0.2
              ? `rgba(${dynamicThemeColor.r}, ${dynamicThemeColor.g}, ${dynamicThemeColor.b}, ${alpha})`
              : `rgba(96, 165, 250, ${alpha})`;
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          }
          ctx.fill();

          // Technical CAD crosshairs on accent nodes
          if (isAccentNode && (wave > 0.3 || mouseFactor > 0.15 || isAdvanced)) {
            const crossLength = 3 + totalFactor * 1.5;
            ctx.strokeStyle = totalFactor > 0.2
              ? `rgba(${dynamicThemeColor.r}, ${dynamicThemeColor.g}, ${dynamicThemeColor.b}, ${alpha * 0.8})`
              : `rgba(96, 165, 250, ${alpha * 0.55})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(x - crossLength, y);
            ctx.lineTo(x + crossLength, y);
            ctx.moveTo(x, y - crossLength);
            ctx.lineTo(x, y + crossLength);
            ctx.stroke();
          }
        }
      }

      // 3. Drifting infinite constellation particles with gentle, smooth directional drift
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Smooth and gentle directional velocity (no sudden jumping)
        const directionalVelocity = (upwardEnergy * -0.7) + (downwardEnergy * 0.7);
        p.x += p.vx;
        p.y += p.vy + directionalVelocity;

        // Infinite boundary wrap
        if (p.x < 0) p.x += width;
        if (p.x > width) p.x -= width;
        if (p.y < 0) {
          p.y += height;
          p.x = Math.random() * width;
        }
        if (p.y > height) {
          p.y -= height;
          p.x = Math.random() * width;
        }

        // Breathing pulse
        const pulse = Math.sin(elapsed * 2.0 + p.phase);
        const currentRadius = p.radius + pulse * 0.35 + totalFactor * 0.3;
        const currentAlpha = Math.min(1, Math.max(0.2, p.baseAlpha + pulse * 0.12 + totalFactor * 0.25));

        // Smooth photon trails during scroll (lightweight stroke without expensive gradient allocation)
        if (totalFactor > 0.15) {
          const trailLength = (6 + totalFactor * 10) * (isDescending ? -1 : 1);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x, p.y + trailLength);
          ctx.strokeStyle = `rgba(${dynamicThemeColor.r}, ${dynamicThemeColor.g}, ${dynamicThemeColor.b}, ${currentAlpha * 0.45})`;
          ctx.lineWidth = p.radius * 0.8;
          ctx.stroke();
        }

        // Draw particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.6, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = totalFactor > 0.2
          ? `rgba(${dynamicThemeColor.r}, ${dynamicThemeColor.g}, ${dynamicThemeColor.b}, ${currentAlpha})`
          : (p.color === '#ffffff' ? `rgba(255, 255, 255, ${currentAlpha})` : `rgba(96, 165, 250, ${currentAlpha})`);
        ctx.fill();

        // 4. Subtle constellation filaments between particles
        const maxDist = 85 + totalFactor * 25;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDist * maxDist) {
            const distance = Math.sqrt(distSq);
            const lineAlpha = (1 - distance / maxDist) * (0.18 + totalFactor * 0.15);
            
            ctx.strokeStyle = totalFactor > 0.2
              ? `rgba(${dynamicThemeColor.r}, ${dynamicThemeColor.g}, ${dynamicThemeColor.b}, ${lineAlpha})`
              : `rgba(96, 165, 250, ${lineAlpha})`;
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
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Deep charcoal background canvas */}
      <div className="absolute inset-0 bg-[#07090e]" />

      {/* Infinite dynamic canvas dot matrix & constellation with increased opacity */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-90"
        style={{ willChange: 'transform' }}
      />

      {/* Light balancing overlay for rich contrast */}
      <div className="absolute inset-0 bg-[#07090e]/10 pointer-events-none" />

      {/* Ambient breathing lighting gradients for depth and atmosphere */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[950px] h-[550px] pointer-events-none opacity-35 transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(37, 99, 235, 0.16) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-1/3 left-0 w-[550px] h-[550px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle at 10% 50%, rgba(37, 99, 235, 0.08) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute top-2/3 right-0 w-[600px] h-[600px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle at 90% 50%, rgba(37, 99, 235, 0.08) 0%, transparent 60%)',
        }}
      />
    </div>
  );
}
