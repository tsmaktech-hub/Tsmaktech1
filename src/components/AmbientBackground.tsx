import React from 'react';

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 1. Deep charcoal canvas base */}
      <div className="absolute inset-0 bg-[#07090e]" />

      {/* 2. Crisp Architectural Blueprint Pattern (Continuous across all scroll positions) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Small 36x36px blueprint cell */}
          <pattern id="arch-grid-pattern" width="36" height="36" patternUnits="userSpaceOnUse">
            {/* Fine coordinate grid lines */}
            <path
              d="M 36 0 L 0 0 0 36"
              fill="none"
              stroke="rgba(255, 255, 255, 0.065)"
              strokeWidth="0.8"
            />
            {/* Blue intersection micro-node */}
            <circle cx="0" cy="0" r="1.4" fill="#3b82f6" opacity="0.85" />
            {/* Subtle center matrix point */}
            <circle cx="18" cy="18" r="0.75" fill="rgba(255, 255, 255, 0.25)" />
          </pattern>

          {/* 144x144px CAD crosshair overlay */}
          <pattern id="arch-cad-marks" width="144" height="144" patternUnits="userSpaceOnUse">
            {/* Technical plus mark at major intersections */}
            <path
              d="M 0 -4 L 0 4 M -4 0 L 4 0"
              stroke="rgba(96, 165, 250, 0.4)"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        {/* Primary blueprint grid fill */}
        <rect width="100%" height="100%" fill="url(#arch-grid-pattern)" />
        {/* Secondary CAD crosshair marks */}
        <rect width="100%" height="100%" fill="url(#arch-cad-marks)" />
      </svg>

      {/* 3. Soft ambient lighting highlights to bring depth to the pattern */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(37, 99, 235, 0.16) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-1/3 left-0 w-[500px] h-[500px] pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle at 10% 50%, rgba(37, 99, 235, 0.08) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute top-2/3 right-0 w-[550px] h-[550px] pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle at 90% 50%, rgba(37, 99, 235, 0.08) 0%, transparent 60%)',
        }}
      />
    </div>
  );
}



