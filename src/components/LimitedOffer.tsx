import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface LimitedOfferProps {
  onOrderNow: () => void;
}

export const LimitedOffer: React.FC<LimitedOfferProps> = ({ onOrderNow }) => {
  return (
    <section className="w-full bg-[#FFF8EB] py-6 sm:py-10 px-6 md:px-12 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="relative w-full bg-[#753D2A] rounded-[32px] md:rounded-[40px] overflow-hidden p-6 sm:p-10 lg:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 transition-transform duration-300 hover:shadow-2xl">
          {/* Top Right Cream Drip SVG */}
          <div className="absolute top-0 right-0 w-44 sm:w-60 h-20 pointer-events-none">
            <svg
              viewBox="0 0 260 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                d="M 0 0 
                   L 260 0 
                   L 260 40 
                   C 240 40, 235 75, 220 75 
                   C 205 75, 200 35, 180 35 
                   C 165 35, 160 65, 145 65 
                   C 130 65, 125 30, 105 30 
                   C 90 30, 85 85, 70 85 
                   C 55 85, 50 35, 30 35 
                   C 15 35, 10 50, 0 50 
                   Z"
                fill="#FFF8EB"
              />
            </svg>
          </div>

          {/* Floating Chocolate chunks & doodle sparkles */}
          <div className="absolute top-6 left-12 w-4 h-4 bg-[#4A2417] rounded-sm rotate-12 shadow-md hidden sm:block animate-float-slow opacity-80" />
          <div className="absolute bottom-8 left-1/3 w-3.5 h-3.5 bg-[#4A2417] rounded-sm -rotate-45 shadow-md hidden sm:block animate-float-slow opacity-70" />
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-[#4A2417] rounded-sm rotate-45 shadow-md hidden sm:block animate-float-slow opacity-60" />

          {/* Left Side: 3 Ice Cream Tubs Grouped */}
          <div className="relative w-full lg:w-1/2 flex items-center justify-center pt-2 lg:pt-0">
            {/* White playful doodle rays */}
            <div className="absolute -top-3 left-4 text-white/30 hidden sm:block">
              <Sparkles className="w-6 h-6" />
            </div>

            <div className="relative flex items-center justify-center">
              {/* Tub 1: Cookies & Kräm (Left) */}
              <div className="relative -mr-6 sm:-mr-10 z-10 -rotate-6 transition-transform duration-300 hover:scale-105 hover:z-30">
                <img
                  src="/cookies_transparent.png"
                  alt="Cookies and Kräm"
                  className="w-28 sm:w-40 md:w-44 h-auto object-contain drop-shadow-lg"
                />
              </div>

              {/* Tub 2: Mint Chokladchip (Center & Taller) */}
              <div className="relative z-20 scale-110 transition-transform duration-300 hover:scale-115 hover:z-30">
                <img
                  src="/mint_transparent.png"
                  alt="Mint Chokladchip"
                  className="w-32 sm:w-44 md:w-48 h-auto object-contain drop-shadow-2xl"
                />
              </div>

              {/* Tub 3: Strawberry Swirl (Right) */}
              <div className="relative -ml-6 sm:-ml-10 z-10 rotate-6 transition-transform duration-300 hover:scale-105 hover:z-30">
                <img
                  src="/strawberry_transparent.png"
                  alt="Strawberry Swirl"
                  className="w-28 sm:w-40 md:w-44 h-auto object-contain drop-shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Promo Copy & Action */}
          <div className="w-full lg:w-1/2 flex flex-col items-start lg:pl-6 text-left relative z-10">
            <span className="inline-block bg-white/15 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 border border-white/20">
              LIMITED TIME OFFER
            </span>

            <h2 className="font-bubble text-3xl sm:text-4xl lg:text-[42px] font-bold text-white mb-2.5 leading-tight">
              Buy 2 Get 1 Free!
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-[#F4D9CE] leading-relaxed mb-6 max-w-md">
              Mix your favorites and enjoy one on us. Because joy is better shared.
            </p>

            <button
              onClick={onOrderNow}
              className="group inline-flex items-center gap-2 bg-[#FAEED1] hover:bg-white text-[#2C1810] font-bold text-xs sm:text-sm tracking-wider uppercase px-6 sm:px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span>ORDER NOW</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
