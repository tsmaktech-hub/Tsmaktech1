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
    let upwardEnergy = 0; // 0 to ~3.0, charges when scrolling up
    let lastWheelTime = 0;
    let scrollVelocity = 0;

    // Rings spawned during upward ascension
    const energyRings: EnergyRing[] = [];

    // Mouse tracking for subtle interactive ripple
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 160,
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

    const triggerUpwardPulse = (magnitude: number) => {
      upwardEnergy = Math.min(3.2, upwardEnergy + magnitude);
      // Spawn an expanding energy ring
      if (energyRings.length < 5 && Math.random() > 0.4) {
        energyRings.push({
          x: width * (0.3 + Math.random() * 0.4),
          y: height * (0.4 + Math.random() * 0.4),
          radius: 15,
          maxRadius: Math.min(width, height) * 0.45,
          alpha: 0.5,
          speed: 3.5 + Math.random() * 2.5,
        });
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      scrollVelocity = delta;

      if (delta < -2) {
        // Scrolling UPWARDS!
        const intensity = Math.min(Math.abs(delta) * 0.045, 0.65);
        triggerUpwardPulse(intensity);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY < -4) {
        // Trackpad or mouse wheel upward scroll
        const now = performance.now();
        lastWheelTime = now;
        const intensity = Math.min(Math.abs(e.deltaY) * 0.035, 0.6);
        triggerUpwardPulse(intensity);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Initialize drifting constellation particles
    const particleCount = Math.min(Math.floor((width * height) / 24000), 65);
    const particles: Particle[] = [];
    const colors = ['#60a5fa', '#38bdf8', '#93c5fd', '#ffffff', '#818cf8'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5 - 0.2, // slight natural upward bias
        radius: Math.random() * 1.6 + 0.8,
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

      // Smoothly decay upward energy
      upwardEnergy = Math.max(0, upwardEnergy * 0.965);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Advanced effect multiplier: increases when scrolling up
      // 0 = resting state; 1.0+ = high-intensity advanced ascension state
      const advanceFactor = Math.min(2.5, upwardEnergy);
      const isAdvanced = advanceFactor > 0.08;

      // 1. Render Energy Rings when advancing
      for (let k = energyRings.length - 1; k >= 0; k--) {
        const ring = energyRings[k];
        ring.radius += ring.speed * (1 + advanceFactor * 0.8);
        ring.alpha *= 0.955;

        if (ring.alpha <= 0.01 || ring.radius >= ring.maxRadius) {
          energyRings.splice(k, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${ring.alpha * 0.4})`;
        ctx.lineWidth = 1.2 + advanceFactor * 0.6;
        ctx.stroke();

        // Secondary faint concentric halo
        if (ring.radius > 30) {
          ctx.beginPath();
          ctx.arc(ring.x, ring.y, ring.radius * 0.75, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(129, 140, 248, ${ring.alpha * 0.2})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // 2. Infinite flowing grid dots with upward scroll warp
      // Base drift speed + upward acceleration boost
      const baseSpeedX = 6.0;
      const baseSpeedY = 4.0;
      const upwardWarpSpeed = advanceFactor * 48; // Accelerates upward smoothly!

      const offsetX = (elapsed * baseSpeedX) % SPACING;
      const offsetY = (elapsed * baseSpeedY - elapsed * upwardWarpSpeed) % SPACING;

      const cols = Math.ceil(width / SPACING) + 2;
      const rows = Math.ceil(height / SPACING) + 2;

      // Scanning ascension beam Y position
      const scanBeamY = (height - ((elapsed * (180 + advanceFactor * 350)) % (height + 200)));

      for (let i = -1; i < cols; i++) {
        for (let j = -1; j < rows; j++) {
          const x = i * SPACING + offsetX;
          const y = j * SPACING + offsetY;

          // Multi-frequency wave for organic infinity ripple effect
          const wave1 = Math.sin(x * 0.012 + y * 0.012 - elapsed * 1.8);
          const wave2 = Math.cos(x * 0.018 - y * 0.014 + elapsed * 1.3);
          const wave = (wave1 + wave2) * 0.5; // -1 to 1

          // Proximity to upward scan beam
          const distToBeam = Math.abs(y - scanBeamY);
          let beamFactor = 0;
          if (distToBeam < 90) {
            beamFactor = (1 - distToBeam / 90) * (0.3 + advanceFactor * 0.7);
          }

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
          const baseAlpha = isAccentNode ? 0.24 : 0.07;
          
          // Enhanced brightness during advance
          const energyBoost = advanceFactor * (isAccentNode ? 0.45 : 0.18);
          const alpha = Math.min(1, baseAlpha + (wave + 1) * 0.5 * 0.2 + mouseFactor * 0.5 + beamFactor * 0.45 + energyBoost);
          const radius = (isAccentNode ? 1.4 : 0.9) + (wave + 1) * 0.5 * 0.4 + mouseFactor * 1.2 + beamFactor * 1.1 + advanceFactor * 0.5;

          // In advanced state, draw vertical warp streak for fast-moving dots
          if (advanceFactor > 0.35 && (isAccentNode || Math.random() > 0.85)) {
            const streakLen = 4 + advanceFactor * 7;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + streakLen);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.45})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);

          if (isAccentNode || mouseFactor > 0.3 || beamFactor > 0.2) {
            ctx.fillStyle = advanceFactor > 0.3
              ? `rgba(56, 189, 248, ${alpha})` // Radiant electric cyan when advanced
              : `rgba(96, 165, 250, ${alpha})`;
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          }
          ctx.fill();

          // Technical CAD crosshair and quantum ring on accent nodes
          if (isAccentNode && (wave > 0.25 || mouseFactor > 0.1 || isAdvanced)) {
            const crossLength = 3 + mouseFactor * 2 + advanceFactor * 2.5;
            ctx.strokeStyle = advanceFactor > 0.2
              ? `rgba(56, 189, 248, ${alpha * 0.8})`
              : `rgba(96, 165, 250, ${alpha * 0.6})`;
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            ctx.moveTo(x - crossLength, y);
            ctx.lineTo(x + crossLength, y);
            ctx.moveTo(x, y - crossLength);
            ctx.lineTo(x, y + crossLength);
            ctx.stroke();

            // When advanced: draw glowing concentric target ring around key nodes
            if (advanceFactor > 0.5) {
              ctx.beginPath();
              ctx.arc(x, y, 5.5 + advanceFactor * 2, 0, Math.PI * 2);
              ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.4})`;
              ctx.lineWidth = 0.7;
              ctx.stroke();
            }
          }
        }
      }

      // 3. Drifting infinite constellation particles with upward ascension warp & geometric mesh
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Accelerate upwards when scrolling up (advanceFactor)
        const upwardBoost = advanceFactor * 3.2;
        p.x += p.vx;
        p.y += p.vy - upwardBoost;

        // Infinite boundary wrap
        if (p.x < 0) p.x += width;
        if (p.x > width) p.x -= width;
        if (p.y < 0) {
          p.y += height;
          p.x = Math.random() * width; // distribute randomly on wrap
        }
        if (p.y > height) p.y -= height;

        // Breathing pulse
        const pulse = Math.sin(elapsed * 2.2 + p.phase);
        const currentRadius = p.radius + pulse * 0.4 + advanceFactor * 0.6;
        const currentAlpha = Math.min(1, Math.max(0.15, p.baseAlpha + pulse * 0.15 + advanceFactor * 0.35));

        // When scrolling up: draw elegant vertical photon trail behind particles
        if (advanceFactor > 0.2) {
          const trailLength = 8 + advanceFactor * 18;
          const trailGradient = ctx.createLinearGradient(p.x, p.y, p.x, p.y + trailLength);
          trailGradient.addColorStop(0, `rgba(56, 189, 248, ${currentAlpha * 0.8})`);
          trailGradient.addColorStop(1, 'rgba(56, 189, 248, 0)');

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x, p.y + trailLength);
          ctx.strokeStyle = trailGradient;
          ctx.lineWidth = p.radius * 0.9;
          ctx.stroke();
        }

        // Draw particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.6, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = advanceFactor > 0.3
          ? `rgba(56, 189, 248, ${currentAlpha})`
          : (p.color === '#ffffff' ? `rgba(255, 255, 255, ${currentAlpha})` : `rgba(96, 165, 250, ${currentAlpha})`);
        ctx.fill();

        // 4. Advanced Geometric Hologram Mesh & Filaments
        // Max connection distance expands when advanced, forming rich sci-fi constellations
        const maxDist = 95 + advanceFactor * 45;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDist * maxDist) {
            const distance = Math.sqrt(distSq);
            const lineAlpha = (1 - distance / maxDist) * (0.16 + advanceFactor * 0.28);
            
            ctx.strokeStyle = advanceFactor > 0.3
              ? `rgba(56, 189, 248, ${lineAlpha})`
              : `rgba(96, 165, 250, ${lineAlpha})`;
            ctx.lineWidth = 0.65 + advanceFactor * 0.45;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();

            // When significantly advanced: draw translucent triangular geometric planes between triplets
            if (advanceFactor > 0.6 && j < particles.length - 1) {
              const p3 = particles[j + 1];
              const d2 = (p.x - p3.x) ** 2 + (p.y - p3.y) ** 2;
              if (d2 < (maxDist * 0.8) ** 2) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.lineTo(p3.x, p3.y);
                ctx.closePath();
                ctx.fillStyle = `rgba(56, 189, 248, ${0.02 * advanceFactor})`;
                ctx.fill();
              }
            }
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
