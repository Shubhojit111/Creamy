import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Flavor } from '../data/flavors';

interface HeroContentProps {
  currentFlavor: Flavor;
  onOrderNow: () => void;
  onSeeMenu: () => void;
  onOpenReviews: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  currentFlavor,
  onOrderNow,
  onSeeMenu,
  onOpenReviews,
}) => {
  return (
    <div className="flex flex-col justify-between h-full z-20 pointer-events-auto py-2 md:py-4">
      {/* Top Left Hero Copy */}
      <div className="max-w-[300px] sm:max-w-[340px] md:max-w-[500px] pt-2 md:pt-4 h-[70%] flex flex-col justify-center">
        {/* Title */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFlavor.id + '-title'}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="mb-3 md:mb-4"
          >
            <h1 className="font-bubble text-3xl sm:text-5xl md:text-6xl lg:text-[70px] font-bold text-white leading-[1.06] tracking-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.18)]">
              <span>{currentFlavor.headlineLine1}</span>
              <br />
              <span>{currentFlavor.headlineLine2}</span>
            </h1>
          </motion.div>
        </AnimatePresence>

        {/* Subtitle */}
        <AnimatePresence mode="wait">
          <motion.p
            key={currentFlavor.id + '-sub'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            style={{ color: currentFlavor.color.subtext }}
            className="text-[11px] sm:text-sm md:text-[14px] leading-relaxed mb-5 md:mb-8 max-w-[280px] sm:max-w-[320px] md:max-w-[360px] transition-colors duration-500 font-sans"
          >
            {currentFlavor.subtitle}
          </motion.p>
        </AnimatePresence>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Order Now Button with Arrow */}
          <button
            onClick={onOrderNow}
            className="group inline-flex items-center gap-1.5 bg-[#FAEED1] hover:bg-white text-[#2C2016] font-bold text-[10px] sm:text-xs md:text-sm tracking-wider uppercase px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.22)] hover:shadow-[0_6px_22px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <span>ORDER NOW</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* See Menu Items Button */}
          <button
            onClick={onSeeMenu}
            style={{
              backgroundColor: currentFlavor.color.secondaryPill,
            }}
            className="text-white font-semibold text-[10px] sm:text-xs md:text-sm tracking-wider uppercase px-3 sm:px-6 py-2.5 sm:py-3.5 rounded-full border border-white/25 shadow-sm hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            SEE MENU ITEMS
          </button>
        </div>
      </div>

      {/* Bottom Left Customer Reviews */}
      <div
        onClick={onOpenReviews}
        className="cursor-pointer group flex items-center gap-2 sm:gap-3 mt-6 md:mt-12 z-30"
      >
        {/* Avatars Overlap */}
        <div className="flex items-center -space-x-2 sm:-space-x-2.5">
          <img
            src="/avatar1.png"
            alt="Customer avatar"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover shadow-sm transition-transform duration-200 group-hover:scale-105"
          />
          <img
            src="/avatar2.png"
            alt="Customer avatar"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover shadow-sm transition-transform duration-200 group-hover:scale-105"
          />
          <img
            src="/avatar3.png"
            alt="Customer avatar"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover shadow-sm transition-transform duration-200 group-hover:scale-105"
          />
        </div>

        {/* Reviews Text */}
        <div className="flex flex-col text-left">
          <span className="text-xs sm:text-sm font-bold text-[#222222] leading-tight group-hover:text-black">
            {currentFlavor.reviewsCount} Reviews
          </span>
          <span className="text-[10px] sm:text-xs text-[#666666] font-medium leading-tight">
            Customers are satisfied
          </span>
        </div>
      </div>
    </div>
  );
};
