import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import type { Flavor } from "../data/flavors";

interface HeroContentProps {
  currentFlavor: Flavor;
  onOrderNow: () => void;
  onSeeMenu: () => void;
  onOpenReviews: () => void;
}

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: d, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export const HeroContent: React.FC<HeroContentProps> = ({
  currentFlavor,
  onOrderNow,
  onSeeMenu,
  onOpenReviews,
}) => {
  return (
    <div className="flex flex-col justify-start h-full z-20 pointer-events-auto">
      {/* Lifted higher — no big top pad, text starts near navbar */}
      <div className="max-w-[340px] sm:max-w-[440px] md:max-w-[560px] flex flex-col justify-start pt-1 md:pt-2">
        {/* Title — masked line reveal, sits higher */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFlavor.id + "-title"}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -14, transition: { duration: 0.25 } }}
            className="mb-2 md:mb-3 relative"
          >
            <h1 className="font-bubble text-[44px] sm:text-6xl md:text-[68px] lg:text-[82px] font-bold leading-[0.95] tracking-tight drop-shadow-[0_3px_16px_rgba(0,0,0,0.25)]">
              <span className="block overflow-hidden pb-1">
                <motion.span
                  className="block text-white"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.1,
                  }}
                >
                  {currentFlavor.headlineLine1}
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-2">
                <motion.span
                  className="block text-[#FFC9D6]"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.2,
                  }}
                  style={{ textShadow: "0 0 32px rgba(255,201,214,0.35)" }}
                >
                  {currentFlavor.headlineLine2}
                  <motion.svg
                    className="inline-block ml-2 -mt-8 w-7 h-7 md:w-9 md:h-9 text-white"
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    strokeLinecap="round"
                    animate={{
                      rotate: [0, 15, 0],
                      scale: [1, 1.25, 1],
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <line x1="16" y1="4" x2="16" y2="10" />
                    <line x1="24" y1="10" x2="20" y2="14" />
                    <line x1="26" y1="20" x2="20" y2="20" />
                  </motion.svg>
                </motion.span>
              </span>
            </h1>
          </motion.div>
        </AnimatePresence>

        {/* Subtitle */}
        <AnimatePresence mode="wait">
          <motion.p
            key={currentFlavor.id + "-sub"}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.32 }}
            className="text-[12px] sm:text-sm md:text-[15px] leading-relaxed mb-5 md:mb-6 max-w-[300px] sm:max-w-[370px] md:max-w-[420px] font-sans text-white/90"
          >
            Crafted with the finest ingredients, our ice creams aren&apos;t just
            delicious — they&apos;re designed for your happiness in every scoop.
          </motion.p>
        </AnimatePresence>

        {/* CTA Buttons */}
        <motion.div
          variants={rise}
          initial="hidden"
          animate="show"
          custom={0.42}
          className="flex flex-wrap items-center gap-3"
        >
          <button
            onClick={onOrderNow}
            className="group relative overflow-hidden inline-flex items-center gap-3 bg-[#FFF3D6] hover:bg-white text-[#2B1610] font-bold text-[13px] md:text-sm pl-6 pr-1.5 py-1.5 rounded-full shadow-[0_10px_28px_rgba(0,0,0,0.28)] hover:shadow-[0_14px_34px_rgba(0,0,0,0.34)] hover:scale-[1.04] active:scale-95 transition-all duration-200"
          >
            {/* shine sweep */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/70 to-transparent" />
            <span className="relative">Order Now</span>
            <span className="relative flex items-center gap-1 text-[#2B1610]">
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF8FAB] to-[#ED5B7D] group-hover:scale-110 flex items-center justify-center transition-transform shadow-[0_4px_12px_rgba(237,91,125,0.5)]">
                <ArrowRight className="w-4 h-4 text-white" />
              </span>
            </span>
          </button>

          <button
            onClick={onSeeMenu}
            className="relative overflow-hidden text-white font-semibold text-[13px] md:text-sm px-6 py-3.5 rounded-full border border-white/40 bg-white/5 backdrop-blur-sm hover:bg-white/15 hover:scale-[1.04] active:scale-95 transition-all duration-200"
          >
            See Menu Items
          </button>
        </motion.div>

        {/* Reviews */}
        <motion.button
          variants={rise}
          initial="hidden"
          animate="show"
          custom={0.55}
          onClick={onOpenReviews}
          className="cursor-pointer group flex items-center gap-3 mt-5 md:mt-6 text-left w-fit"
        >
          <span className="flex items-center -space-x-2.5">
            {[
              "/avatar1.png",
              "/avatar2.png",
              "/avatar3.png",
              "/avatar1.png",
            ].map((src, i) => (
              <motion.img
                key={i}
                src={src}
                alt="Customer"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.6 + i * 0.08,
                  type: "spring",
                  stiffness: 300,
                  damping: 18,
                }}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white object-cover shadow-md"
              />
            ))}
          </span>
          <span className="flex flex-col">
            <span className="text-[13px] sm:text-sm font-bold text-white leading-tight">
              {currentFlavor.reviewsCount} Reviews
            </span>
            <span className="flex items-center gap-0.5 my-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.7 + i * 0.06,
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                  className="inline-flex"
                >
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]" />
                </motion.span>
              ))}
            </span>
            <span className="text-[11px] sm:text-xs text-white/70 font-medium leading-tight">
              Customers are satisfied
            </span>
          </span>
        </motion.button>
      </div>
    </div>
  );
};
