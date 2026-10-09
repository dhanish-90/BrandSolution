import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  size = 'md',
  showTagline = true,
  className = ''
}) => {
  // Dimensions
  const emblemSizes = {
    sm: { w: 34, h: 42 },
    md: { w: 42, h: 52 },
    lg: { w: 56, h: 70 }
  };

  const { w, h } = emblemSizes[size];

  const isDark = variant === 'dark';

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-3 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-rose-600 rounded-sm ${className}`}
      aria-label="Marcom Brand Solution Pvt. Ltd. - Home"
    >
      {/* Authentic MBS Monogram Card Emblem */}
      <div className="relative shrink-0 transition-transform duration-300 group-hover:scale-105">
        <svg
          width={w}
          height={h}
          viewBox="0 0 120 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-xs"
        >
          {/* Shadow layer */}
          <rect
            x="8"
            y="8"
            width="106"
            height="136"
            rx="16"
            fill="#061224"
            opacity="0.9"
          />

          {/* Main White Card Base */}
          <rect
            x="4"
            y="4"
            width="106"
            height="136"
            rx="16"
            fill="#FFFFFF"
            stroke="#0b1a30"
            strokeWidth="3.5"
          />

          {/* Inner Accent Crimson Red Frame */}
          <path
            d="M14 26C14 18 18 14 26 14H88C96 14 100 18 100 26V32"
            stroke="#c81e2b"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M100 118C100 126 96 130 88 130H26C18 130 14 126 14 118V112"
            stroke="#c81e2b"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Red Stylized Curved "S" Ribbon in background */}
          <path
            d="M84 20C65 19 32 30 32 50C32 76 86 68 86 96C86 114 62 125 34 124C22 123.5 16 118 16 110"
            stroke="#c81e2b"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Foreground Bold Navy "M" and "B" Intertwined */}
          {/* M Letter (Left & Center) */}
          <path
            d="M22 108V40H28L44 82L60 40H66V108H58V58L46 90H42L30 58V108H22Z"
            fill="#0b1a30"
          />

          {/* B Letter (Right overlapping) */}
          <path
            d="M58 40H82C94 40 100 46 100 56C100 64 94 70 86 73C96 76 102 83 102 94C102 104 94 108 80 108H58V40ZM68 50V68H80C86 68 90 65 90 59C90 53 86 50 80 50H68ZM68 78V98H82C88 98 92 95 92 88C92 81 88 78 82 78H68Z"
            fill="#0b1a30"
          />
        </svg>
      </div>

      {/* Typography Lockup */}
      <div className="flex flex-col text-left justify-center">
        {/* Subtle MARCOM kicker */}
        <span
          className={`text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase leading-none transition-colors ${
            isDark ? 'text-rose-400' : 'text-slate-500 group-hover:text-rose-700'
          }`}
        >
          MARCOM
        </span>

        {/* Visually Prominent "Brand Solution" */}
        <div className="leading-tight flex items-baseline gap-1 mt-0.5">
          <span
            className={`font-extrabold tracking-tight ${
              size === 'sm'
                ? 'text-base'
                : size === 'lg'
                ? 'text-2xl sm:text-3xl'
                : 'text-lg sm:text-xl'
            } ${isDark ? 'text-white' : 'text-slate-900'}`}
          >
            Brand
          </span>
          <span
            className={`font-extrabold tracking-tight text-rose-600 ${
              size === 'sm'
                ? 'text-base'
                : size === 'lg'
                ? 'text-2xl sm:text-3xl'
                : 'text-lg sm:text-xl'
            }`}
          >
            Solution
          </span>
        </div>

        {/* Sub-tag & Since 2000 */}
        {showTagline && (
          <div className="flex items-center gap-1.5 mt-0.5 text-[9px] sm:text-[10px] font-medium tracking-wider">
            <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>
              PVT. LTD.
            </span>
            <span
              className={isDark ? 'text-slate-400' : 'text-slate-400'}
              aria-hidden="true"
            >
              •
            </span>
            <span className="font-semibold text-rose-600">
              Since 2000
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};
