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

interface CyberRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
  hue: number;
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

    // Scroll tracking & Advanced Ascension Energy State
    // energy runs from 0 (resting) to 1.0 (fully advanced tier)
    let currentEnergy = 0;
    let targetEnergy = 0;
    let lastScrollY = window.scrollY;
    let lastTouchY = 0;

    // Active expanding sonar/radar rings
    const cyberRings: CyberRing[] = [];

    // Pointer tracking for interactive illumination
    const pointer = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 170,
    };

    const handleMouseMove = (e: MouseEvent) => {
      pointer.targetX = e.clientX;
      pointer.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      pointer.targetX = -1000;
      pointer.targetY = -1000;
    };

    // Helper to spawn dynamic cyber energy rings
    const spawnRing = (x?: number, y?: number, boostSpeed = 1) => {
      if (cyberRings.length < 6) {
        cyberRings.push({
          x: x ?? width * (0.25 + Math.random() * 0.5),
          y: y ?? height * (0.3 + Math.random() * 0.4),
          radius: 10,
          maxRadius: Math.min(width, height) * 0.55,
          alpha: 0.55,
          speed: (3.0 + Math.random() * 3.0) * boostSpeed,
          hue: Math.random() > 0.5 ? 195 : 215, // cyan to sky blue
        });
      }
    };

    // Boost upward energy on any upward scroll action
    const boostUpwardEnergy = (amount: number) => {
      targetEnergy = Math.min(1.0, targetEnergy + amount);
      if (Math.random() > 0.3) {
        spawnRing(
          pointer.x > 0 ? pointer.x : undefined,
          pointer.y > 0 ? pointer.y : undefined,
          1.2
        );
      }
    };

    // 1. Scroll event listener
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      if (delta < -2) {
        // Scrolling UPWARDS towards page top
        const boost = Math.min(0.5, Math.abs(delta) * 0.018 + 0.15);
        boostUpwardEnergy(boost);
      }
    };

    // 2. Wheel event listener (handles trackpad and mouse wheel flicking up)
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY < -1) {
        // Scrolling UP
        const boost = Math.min(0.5, Math.abs(e.deltaY) * 0.009 + 0.15);
        boostUpwardEnergy(boost);
      }
    };

    // 3. Touch event listener (mobile/touchpad swipe down = scroll up)
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        lastTouchY = e.touches[0].clientY;
        pointer.targetX = e.touches[0].clientX;
        pointer.targetY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touchY = e.touches[0].clientY;
        const delta = touchY - lastTouchY; // positive delta means finger dragged down -> page scrolls UP
        lastTouchY = touchY;

        pointer.targetX = e.touches[0].clientX;
        pointer.targetY = e.touches[0].clientY;

        if (delta > 3) {
          const boost = Math.min(0.4, delta * 0.015 + 0.1);
          boostUpwardEnergy(boost);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Initialize constellation nodes
    const particleCount = Math.min(Math.floor((width * height) / 22000), 60);
    const particles: Particle[] = [];
    const colors = ['#60a5fa', '#38bdf8', '#93c5fd', '#ffffff', '#818cf8'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45 - 0.15, // subtle natural upward drift
        radius: Math.random() * 1.6 + 0.9,
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
    const SPACING = 34; // Matrix cell spacing in pixels

    // Main animation loop
    const render = (now: number) => {
      const elapsed = (now - startTime) * 0.001; // seconds

      // Smooth interpolation for upward energy
      currentEnergy += (targetEnergy - currentEnergy) * 0.08;
      // Generous decay so the advanced effect lingers for several seconds of enjoyment
      targetEnergy = Math.max(0, targetEnergy - 0.0022);

      // Smooth pointer interpolation
      pointer.x += (pointer.targetX - pointer.x) * 0.08;
      pointer.y += (pointer.targetY - pointer.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // 1. Render Expanding Cyber Sonar Rings
      for (let k = cyberRings.length - 1; k >= 0; k--) {
        const ring = cyberRings[k];
        ring.radius += ring.speed * (1 + currentEnergy * 0.7);
        ring.alpha *= 0.965;

        if (ring.alpha <= 0.01 || ring.radius >= ring.maxRadius) {
          cyberRings.splice(k, 1);
          continue;
        }

        // Primary glowing ring
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${ring.alpha * (0.35 + currentEnergy * 0.45)})`;
        ctx.lineWidth = 1.2 + currentEnergy * 1.2;
        ctx.stroke();

        // Secondary concentric echo ring
        if (ring.radius > 25) {
          ctx.beginPath();
          ctx.arc(ring.x, ring.y, ring.radius * 0.72, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(129, 140, 248, ${ring.alpha * (0.2 + currentEnergy * 0.25)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // 2. Upward Ascension Light Wave Beam
      // Sweeps upward across the matrix; speed increases with currentEnergy
      const sweepSpeed = 190 + currentEnergy * 320;
      const sweepY = (height - ((elapsed * sweepSpeed) % (height + 250)));

      // 3. Infinite Matrix of Grid Dots with Warp Ascension Effect
      const baseSpeedX = 6.0;
      const baseSpeedY = 4.0;
      const upwardWarpSpeed = currentEnergy * 45;

      const offsetX = (elapsed * baseSpeedX) % SPACING;
      const offsetY = (elapsed * baseSpeedY - elapsed * upwardWarpSpeed) % SPACING;

      const cols = Math.ceil(width / SPACING) + 2;
      const rows = Math.ceil(height / SPACING) + 2;

      for (let i = -1; i < cols; i++) {
        for (let j = -1; j < rows; j++) {
          const x = i * SPACING + offsetX;
          const y = j * SPACING + offsetY;

          // Harmonic mathematical wave
          const wave1 = Math.sin(x * 0.013 + y * 0.013 - elapsed * 1.8);
          const wave2 = Math.cos(x * 0.018 - y * 0.015 + elapsed * 1.4);
          const wave = (wave1 + wave2) * 0.5;

          // Proximity to upward sweep beam
          const distToBeam = Math.abs(y - sweepY);
          let beamFactor = 0;
          if (distToBeam < 100) {
            beamFactor = (1 - distToBeam / 100) * (0.25 + currentEnergy * 0.75);
          }

          // Pointer proximity
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          let pointerFactor = 0;
          if (dist < pointer.radius) {
            pointerFactor = (1 - dist / pointer.radius);
          }

          // Check for primary accent crosshair nodes (every 4x4)
          const isMajorNode = (i % 4 === 0 && j % 4 === 0);
          const baseAlpha = isMajorNode ? 0.25 : 0.08;

          // Energy boost elevates visibility across the entire matrix
          const energyBoost = currentEnergy * (isMajorNode ? 0.45 : 0.22);
          const alpha = Math.min(
            1.0,
            baseAlpha +
              (wave + 1) * 0.5 * 0.2 +
              pointerFactor * 0.55 +
              beamFactor * 0.5 +
              energyBoost
          );

          const radius =
            (isMajorNode ? 1.5 : 0.95) +
            (wave + 1) * 0.5 * 0.4 +
            pointerFactor * 1.3 +
            beamFactor * 1.2 +
            currentEnergy * 0.7;

          // ADVANCED EFFECT: Vertical light warp streaks when currentEnergy is active
          if (currentEnergy > 0.15 && (isMajorNode || Math.random() > 0.82)) {
            const streakLen = 4 + currentEnergy * 11;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + streakLen);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.55})`;
            ctx.lineWidth = 1.0;
            ctx.stroke();
          }

          // Render dot
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);

          if (currentEnergy > 0.2) {
            // Advanced vibrant cyan/azure glow
            ctx.fillStyle = isMajorNode || pointerFactor > 0.2 || beamFactor > 0.2
              ? `rgba(56, 189, 248, ${alpha})`
              : `rgba(147, 197, 253, ${alpha * 0.85})`;
          } else {
            // Standard elegant blueprint styling
            ctx.fillStyle = isMajorNode || pointerFactor > 0.25
              ? `rgba(96, 165, 250, ${alpha})`
              : `rgba(255, 255, 255, ${alpha})`;
          }
          ctx.fill();

          // ADVANCED EFFECT: HUD Crosshair & Quantum targeting reticles on major nodes
          if (isMajorNode) {
            const crossLen = 3 + pointerFactor * 2 + currentEnergy * 3.5;
            ctx.strokeStyle = currentEnergy > 0.2
              ? `rgba(56, 189, 248, ${alpha * 0.85})`
              : `rgba(96, 165, 250, ${alpha * 0.6})`;
            ctx.lineWidth = 0.85;

            ctx.beginPath();
            ctx.moveTo(x - crossLen, y);
            ctx.lineTo(x + crossLen, y);
            ctx.moveTo(x, y - crossLen);
            ctx.lineTo(x, y + crossLen);
            ctx.stroke();

            // When energy is advanced: draw glowing concentric target circle
            if (currentEnergy > 0.25) {
              ctx.beginPath();
              ctx.arc(x, y, 6.5 + currentEnergy * 3.0, 0, Math.PI * 2);
              ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * (0.35 + currentEnergy * 0.35)})`;
              ctx.lineWidth = 0.75;
              ctx.stroke();
            }
          }
        }
      }

      // 4. Autonomous Constellation Nodes with Ascension Warp & Polygonal Mesh
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Accelerate upwards when currentEnergy is charged
        const upwardVelocity = currentEnergy * 3.6;
        p.x += p.vx;
        p.y += p.vy - upwardVelocity;

        // Infinite boundary wrap
        if (p.x < 0) p.x += width;
        if (p.x > width) p.x -= width;
        if (p.y < 0) {
          p.y += height;
          p.x = Math.random() * width;
        }
        if (p.y > height) p.y -= height;

        // Breathing pulse
        const pulse = Math.sin(elapsed * 2.2 + p.phase);
        const currentRadius = p.radius + pulse * 0.4 + currentEnergy * 0.7;
        const currentAlpha = Math.min(
          1.0,
          Math.max(0.18, p.baseAlpha + pulse * 0.15 + currentEnergy * 0.4)
        );

        // ADVANCED EFFECT: Glowing photon trail streaming behind particle during ascension
        if (currentEnergy > 0.15) {
          const trailLength = 9 + currentEnergy * 24;
          const grad = ctx.createLinearGradient(p.x, p.y, p.x, p.y + trailLength);
          grad.addColorStop(0, `rgba(56, 189, 248, ${currentAlpha * 0.9})`);
          grad.addColorStop(1, 'rgba(56, 189, 248, 0)');

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x, p.y + trailLength);
          ctx.strokeStyle = grad;
          ctx.lineWidth = p.radius * 1.1;
          ctx.stroke();
        }

        // Draw particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.6, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = currentEnergy > 0.25
          ? `rgba(56, 189, 248, ${currentAlpha})`
          : p.color === '#ffffff'
          ? `rgba(255, 255, 255, ${currentAlpha})`
          : `rgba(96, 165, 250, ${currentAlpha})`;
        ctx.fill();

        // ADVANCED EFFECT: Holographic Mesh & Faceted Polygonal Constellations
        // Connection distance expands dramatically as energy increases
        const maxDist = 95 + currentEnergy * 65;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDist * maxDist) {
            const distance = Math.sqrt(distSq);
            const lineAlpha = (1 - distance / maxDist) * (0.16 + currentEnergy * 0.38);

            ctx.strokeStyle = currentEnergy > 0.25
              ? `rgba(56, 189, 248, ${lineAlpha})`
              : `rgba(96, 165, 250, ${lineAlpha})`;
            ctx.lineWidth = 0.65 + currentEnergy * 0.65;

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();

            // When advanced: render cyber holographic triangular planes between 3 connected nodes
            if (currentEnergy > 0.35 && j < particles.length - 1) {
              const p3 = particles[j + 1];
              const d2 = (p.x - p3.x) ** 2 + (p.y - p3.y) ** 2;
              if (d2 < (maxDist * 0.85) ** 2) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.lineTo(p3.x, p3.y);
                ctx.closePath();
                ctx.fillStyle = `rgba(56, 189, 248, ${0.035 * currentEnergy})`;
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
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
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
