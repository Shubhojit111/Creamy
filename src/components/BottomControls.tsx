import React from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

interface BottomControlsProps {
  onPrev: () => void;
  onNext: () => void;
}

/** Previous flavor-switch pill — placed at the bottom of the ice creams */
export const BottomControls: React.FC<BottomControlsProps> = ({
  onPrev,
  onNext,
}) => {
  return (
    <div className="relative flex items-center justify-center z-30">
      <div className="relative flex items-center gap-2.5 bg-white/25 hover:bg-white/40 backdrop-blur-md p-1.5 rounded-full border border-white/40 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
        {/* Tooltip hint */}
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 pointer-events-none flex items-center gap-1 animate-bounce-soft">
          <Sparkles className="w-3 h-3 text-amber-300 animate-ping-soft" />
          <span>Switch Flavors</span>
        </div>

        {/* Left Arrow Button */}
        <button
          onClick={onPrev}
          aria-label="Previous Flavor"
          className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white text-gray-800 shadow-md flex items-center justify-center hover:bg-amber-50 hover:scale-110 active:scale-90 transition-all duration-200 border border-black/5"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
        </button>

        <span className="text-[11px] font-bold text-white/90 px-1 hidden sm:inline select-none">
          Taste Next
        </span>

        {/* Right Arrow Button */}
        <button
          onClick={onNext}
          aria-label="Next Flavor"
          className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white text-gray-800 shadow-md flex items-center justify-center hover:bg-amber-50 hover:scale-110 active:scale-90 transition-all duration-200 border border-black/5 animate-pulse-subtle"
        >
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};

/** Socials — sits on the cream wave at the hero bottom */
export const WaveBar: React.FC = () => {
  return (
    <div className="w-full relative z-30 pointer-events-none">
      {/* Right socials */}
      <div className="absolute right-4 sm:right-6 md:right-12 bottom-12 sm:bottom-14 md:bottom-16 flex items-center gap-2 pointer-events-auto">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="w-8 h-8 rounded-full bg-white text-[#2B1610] shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="w-8 h-8 rounded-full bg-white text-[#2B1610] shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200"
        >
          <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          className="w-8 h-8 rounded-full bg-white text-[#2B1610] shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </a>
      </div>
    </div>
  );
};
