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
    let upwardEnergy = 0; // Charges when scrolling up
    let downwardEnergy = 0; // Charges when scrolling down
    let touchStartY = 0;

    // Rings spawned during scroll evolution
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

        if (delta > 3) {
          // Swiping down (content moves down, i.e. viewing top / scroll up)
          triggerPulse('up', Math.min(delta * 0.04, 0.7));
        } else if (delta < -3) {
          // Swiping up (viewing lower content / scroll down)
          triggerPulse('down', Math.min(Math.abs(delta) * 0.04, 0.7));
        }
      }
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const triggerPulse = (direction: 'up' | 'down', magnitude: number) => {
      if (direction === 'up') {
        upwardEnergy = Math.min(3.2, upwardEnergy + magnitude);
        downwardEnergy = Math.max(0, downwardEnergy - magnitude * 0.3);
      } else {
        downwardEnergy = Math.min(3.2, downwardEnergy + magnitude);
        upwardEnergy = Math.max(0, upwardEnergy - magnitude * 0.3);
      }

      // Spawn expanding energy shockwaves
      if (energyRings.length < 6 && Math.random() > 0.35) {
        energyRings.push({
          x: width * (0.25 + Math.random() * 0.5),
          y: direction === 'up' ? height * (0.6 + Math.random() * 0.3) : height * (0.1 + Math.random() * 0.3),
          radius: 15,
          maxRadius: Math.min(width, height) * 0.48,
          alpha: 0.55,
          speed: 3.8 + Math.random() * 2.5,
        });
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      if (delta < -2) {
        // Scrolling UPWARDS!
        const intensity = Math.min(Math.abs(delta) * 0.045, 0.75);
        triggerPulse('up', intensity);
      } else if (delta > 2) {
        // Scrolling DOWNWARDS!
        const intensity = Math.min(Math.abs(delta) * 0.045, 0.75);
        triggerPulse('down', intensity);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY < -3) {
        // Trackpad or mouse wheel upward scroll
        const intensity = Math.min(Math.abs(e.deltaY) * 0.038, 0.7);
        triggerPulse('up', intensity);
      } else if (e.deltaY > 3) {
        // Trackpad or mouse wheel downward scroll
        const intensity = Math.min(Math.abs(e.deltaY) * 0.038, 0.7);
        triggerPulse('down', intensity);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
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

      // Smoothly decay kinetic energies
      upwardEnergy = Math.max(0, upwardEnergy * 0.96);
      downwardEnergy = Math.max(0, downwardEnergy * 0.96);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Total advanced activity factor from scrolling in either direction
      const totalFactor = Math.min(2.8, upwardEnergy + downwardEnergy);
      const isAdvanced = totalFactor > 0.08;

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

      // 1. Render Dynamic Energy Rings
      for (let k = energyRings.length - 1; k >= 0; k--) {
        const ring = energyRings[k];
        ring.radius += ring.speed * (1 + totalFactor * 0.7);
        ring.alpha *= 0.952;

        if (ring.alpha <= 0.01 || ring.radius >= ring.maxRadius) {
          energyRings.splice(k, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${dynamicThemeColor.r}, ${dynamicThemeColor.g}, ${dynamicThemeColor.b}, ${ring.alpha * 0.45})`;
        ctx.lineWidth = 1.2 + totalFactor * 0.5;
        ctx.stroke();

        // Secondary concentric harmonic halo
        if (ring.radius > 25) {
          ctx.beginPath();
          ctx.arc(ring.x, ring.y, ring.radius * 0.72, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(147, 197, 253, ${ring.alpha * 0.22})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // 2. Infinite flowing grid dots with bidirectional scroll warp
      const baseSpeedX = 6.0;
      const baseSpeedY = 4.0;
      // When scrolling UP: warp pushes dots upward (-Y)
      // When scrolling DOWN: warp pushes dots downward (+Y)
      const scrollWarpSpeed = (upwardEnergy * -46) + (downwardEnergy * 46);

      const offsetX = (elapsed * baseSpeedX) % SPACING;
      const offsetY = (elapsed * baseSpeedY + elapsed * scrollWarpSpeed) % SPACING;

      const cols = Math.ceil(width / SPACING) + 2;
      const rows = Math.ceil(height / SPACING) + 2;

      // Bidirectional scanning laser beam
      // Upward scroll sweeps beam bottom-to-top; downward scroll sweeps top-to-bottom
      const scanPeriod = height + 240;
      const scanSpeed = 190 + totalFactor * 360;
      const scanBeamY = isDescending
        ? ((elapsed * scanSpeed) % scanPeriod) - 120
        : (height - ((elapsed * scanSpeed) % scanPeriod)) + 120;

      for (let i = -1; i < cols; i++) {
        for (let j = -1; j < rows; j++) {
          const x = i * SPACING + offsetX;
          const y = j * SPACING + offsetY;

          // Multi-frequency organic wave
          const wave1 = Math.sin(x * 0.012 + y * 0.012 - elapsed * 1.8);
          const wave2 = Math.cos(x * 0.018 - y * 0.014 + elapsed * 1.3);
          const wave = (wave1 + wave2) * 0.5;

          // Proximity to dynamic scan beam
          const distToBeam = Math.abs(y - scanBeamY);
          let beamFactor = 0;
          if (distToBeam < 90) {
            beamFactor = (1 - distToBeam / 90) * (0.3 + totalFactor * 0.7);
          }

          // Mouse proximity effect
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          let mouseFactor = 0;
          if (dist < mouse.radius) {
            mouseFactor = (1 - dist / mouse.radius);
          }

          // Compute size and opacity with boost from scroll energy
          const isAccentNode = (i % 4 === 0 && j % 4 === 0);
          const baseAlpha = isAccentNode ? 0.24 : 0.07;
          
          const energyBoost = totalFactor * (isAccentNode ? 0.48 : 0.2);
          const alpha = Math.min(1, baseAlpha + (wave + 1) * 0.5 * 0.2 + mouseFactor * 0.5 + beamFactor * 0.45 + energyBoost);
          const radius = (isAccentNode ? 1.4 : 0.9) + (wave + 1) * 0.5 * 0.4 + mouseFactor * 1.2 + beamFactor * 1.1 + totalFactor * 0.5;

          // Directional warp streaks when scrolling fast
          if (totalFactor > 0.32 && (isAccentNode || Math.random() > 0.86)) {
            const streakLen = (4 + totalFactor * 8) * (isDescending ? -1 : 1);
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + streakLen);
            ctx.strokeStyle = `rgba(${dynamicThemeColor.r}, ${dynamicThemeColor.g}, ${dynamicThemeColor.b}, ${alpha * 0.5})`;
            ctx.lineWidth = 0.95;
            ctx.stroke();
          }

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);

          if (isAccentNode || mouseFactor > 0.3 || beamFactor > 0.2) {
            ctx.fillStyle = totalFactor > 0.3
              ? `rgba(${dynamicThemeColor.r}, ${dynamicThemeColor.g}, ${dynamicThemeColor.b}, ${alpha})`
              : `rgba(96, 165, 250, ${alpha})`;
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          }
          ctx.fill();

          // Technical CAD crosshair & quantum rings on key accent nodes
          if (isAccentNode && (wave > 0.25 || mouseFactor > 0.1 || isAdvanced)) {
            const crossLength = 3 + mouseFactor * 2 + totalFactor * 2.5;
            ctx.strokeStyle = totalFactor > 0.2
              ? `rgba(${dynamicThemeColor.r}, ${dynamicThemeColor.g}, ${dynamicThemeColor.b}, ${alpha * 0.85})`
              : `rgba(96, 165, 250, ${alpha * 0.6})`;
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            ctx.moveTo(x - crossLength, y);
            ctx.lineTo(x + crossLength, y);
            ctx.moveTo(x, y - crossLength);
            ctx.lineTo(x, y + crossLength);
            ctx.stroke();

            // Concentric target ring when scrolling actively
            if (totalFactor > 0.45) {
              ctx.beginPath();
              ctx.arc(x, y, 5.5 + totalFactor * 2.2, 0, Math.PI * 2);
              ctx.strokeStyle = `rgba(${dynamicThemeColor.r}, ${dynamicThemeColor.g}, ${dynamicThemeColor.b}, ${alpha * 0.42})`;
              ctx.lineWidth = 0.75;
              ctx.stroke();
            }
          }
        }
      }

      // 3. Drifting infinite constellation particles with bidirectional warp velocity
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Velocity shift according to scroll direction
        // Scrolling up -> particles fly up (-Y)
        // Scrolling down -> particles stream down (+Y)
        const directionalVelocity = (upwardEnergy * -3.4) + (downwardEnergy * 3.4);
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
        const pulse = Math.sin(elapsed * 2.2 + p.phase);
        const currentRadius = p.radius + pulse * 0.4 + totalFactor * 0.6;
        const currentAlpha = Math.min(1, Math.max(0.15, p.baseAlpha + pulse * 0.15 + totalFactor * 0.35));

        // Photon trails: length and direction follow movement
        if (totalFactor > 0.22) {
          const trailLength = (8 + totalFactor * 20) * (isDescending ? -1 : 1);
          const trailGradient = ctx.createLinearGradient(p.x, p.y, p.x, p.y + trailLength);
          trailGradient.addColorStop(0, `rgba(${dynamicThemeColor.r}, ${dynamicThemeColor.g}, ${dynamicThemeColor.b}, ${currentAlpha * 0.85})`);
          trailGradient.addColorStop(1, `rgba(${dynamicThemeColor.r}, ${dynamicThemeColor.g}, ${dynamicThemeColor.b}, 0)`);

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x, p.y + trailLength);
          ctx.strokeStyle = trailGradient;
          ctx.lineWidth = p.radius * 0.95;
          ctx.stroke();
        }

        // Draw particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.6, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = totalFactor > 0.3
          ? `rgba(${dynamicThemeColor.r}, ${dynamicThemeColor.g}, ${dynamicThemeColor.b}, ${currentAlpha})`
          : (p.color === '#ffffff' ? `rgba(255, 255, 255, ${currentAlpha})` : `rgba(96, 165, 250, ${currentAlpha})`);
        ctx.fill();

        // 4. Advanced Geometric Hologram Mesh & Filaments
        const maxDist = 95 + totalFactor * 48;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDist * maxDist) {
            const distance = Math.sqrt(distSq);
            const lineAlpha = (1 - distance / maxDist) * (0.16 + totalFactor * 0.3);
            
            ctx.strokeStyle = totalFactor > 0.3
              ? `rgba(${dynamicThemeColor.r}, ${dynamicThemeColor.g}, ${dynamicThemeColor.b}, ${lineAlpha})`
              : `rgba(96, 165, 250, ${lineAlpha})`;
            ctx.lineWidth = 0.65 + totalFactor * 0.45;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();

            // Geometric triangular facets between particle triplets
            if (totalFactor > 0.55 && j < particles.length - 1) {
              const p3 = particles[j + 1];
              const d2 = (p.x - p3.x) ** 2 + (p.y - p3.y) ** 2;
              if (d2 < (maxDist * 0.8) ** 2) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.lineTo(p3.x, p3.y);
                ctx.closePath();
                ctx.fillStyle = `rgba(${dynamicThemeColor.r}, ${dynamicThemeColor.g}, ${dynamicThemeColor.b}, ${0.025 * totalFactor})`;
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

      {/* Infinite dynamic canvas dot matrix & constellation with gentle background opacity */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-75"
        style={{ willChange: 'transform' }}
      />

      {/* Subtle overlay with small opacity to soften and unify background depth */}
      <div className="absolute inset-0 bg-[#07090e]/25 pointer-events-none" />

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
