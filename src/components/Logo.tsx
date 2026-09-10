import React from 'react';

export const TsmakLogo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const dimensions = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-14 h-14 rounded-2xl'
  };

  const fontSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg'
  };

  return (
    <div className={`${dimensions[size]} bg-blue-600 flex items-center justify-center select-none shadow-sm text-white font-bold font-mono tracking-tight shrink-0 ${fontSizes[size]}`}>
      <span>TS</span>
    </div>
  );
};


