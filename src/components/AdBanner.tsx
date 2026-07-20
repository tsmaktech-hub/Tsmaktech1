import React, { useEffect } from 'react';

export default function AdBanner() {
  useEffect(() => {
    // Dynamically create the ad script element
    const script = document.createElement('script');
    script.src = 'https://pl30431597.effectivecpmnetwork.com/f6/d0/49/f6d0499625ffe1f7ca9b85398be5c5ea.js';
    script.async = true;
    script.type = 'text/javascript';

    // Append to document.body so that the script executes globally and renders ad placements/overlays correctly
    document.body.appendChild(script);

    return () => {
      // Clean up the script element on component unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="w-full bg-zinc-50 border-t border-zinc-200 py-6 flex justify-center items-center" id="ad-banner-section">
      <div className="max-w-7xl w-full px-4 flex flex-col items-center justify-center gap-2">
        <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1">
          Advertisement
        </span>
        <div 
          className="w-full flex justify-center items-center min-h-[90px] overflow-hidden rounded-xl bg-white border border-zinc-100 p-4 shadow-sm"
          id="ad-banner-container"
        >
          <span className="text-xs text-zinc-400">Sponsored Content</span>
        </div>
      </div>
    </div>
  );
}

