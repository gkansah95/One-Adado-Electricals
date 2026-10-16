import React from 'react';

interface CompanyLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const sizeMap = {
    sm: { icon: 34, title: 'text-sm', sub: 'text-[9px]' },
    md: { icon: 42, title: 'text-base font-bold', sub: 'text-[10px]' },
    lg: { icon: 56, title: 'text-xl font-extrabold', sub: 'text-xs' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Light-bulb-and-lightning logo emblem */}
      <div
        className="relative shrink-0 flex items-center justify-center rounded-lg bg-[#18266B] p-1.5 shadow-sm border border-[#79CDEE]/30"
        style={{ width: currentSize.icon + 10, height: currentSize.icon + 10 }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer glow ring */}
          <circle cx="50" cy="45" r="40" stroke="#79CDEE" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.6" />

          {/* Light bulb glass bulb body */}
          <path
            d="M30 40 C30 25 39 16 50 16 C61 16 70 25 70 40 C70 50 63 56 61 64 L39 64 C37 56 30 50 30 40 Z"
            fill="#FFFFFF"
            stroke="#18266B"
            strokeWidth="3.5"
          />

          {/* Bulb screw base contacts */}
          <rect x="42" y="67" width="16" height="4" rx="1.5" fill="#79CDEE" />
          <rect x="43" y="73" width="14" height="4" rx="1.5" fill="#79CDEE" />
          <path d="M46 79 Q50 83 54 79" stroke="#F4C64F" strokeWidth="3" strokeLinecap="round" />

          {/* Prominent electric lightning bolt inside filament */}
          <path
            d="M52 24 L40 44 L49 44 L44 60 L61 38 L52 38 L57 24 Z"
            fill="#F4C64F"
            stroke="#18266B"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Electric energy sparks */}
          <line x1="20" y1="28" x2="26" y2="33" stroke="#F4C64F" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="80" y1="28" x2="74" y2="33" stroke="#F4C64F" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="50" y1="8" x2="50" y2="13" stroke="#79CDEE" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`text-[#18266B] uppercase tracking-tight font-extrabold ${currentSize.title}`}>
            ONE ADADO
          </span>
          <span className={`text-[#18266B]/80 font-bold uppercase tracking-wider text-[11px]`}>
            ELECTRICALS VENTURES
          </span>
          <span className="text-slate-500 text-[10px] hidden sm:inline">
            Domestic &amp; Industrial Works
          </span>
        </div>
      )}
    </div>
  );
};
