import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FLAVORS } from '../data/flavors';
import type { Flavor } from '../data/flavors';

gsap.registerPlugin(ScrollTrigger);

interface FlavorExperienceProps {
  onSelectFlavor: (flavor: Flavor) => void;
  onAddToCart: (flavor: Flavor, size: string) => void;
}

export const FlavorExperience: React.FC<FlavorExperienceProps> = ({
  onAddToCart,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const flavorStories = [
    {
      ...FLAVORS[0],
      story: 'Sourced directly from Bourbon Island Madagascar, double-steeped in fresh Swedish cream for a floral, aromatic sweetness.',
      headlineStory: 'Pure Bourbon Vanilla Bean',
    },
    {
      ...FLAVORS[1],
      story: 'Dark baked cocoa wafers crushed into rich sweet cream with a hint of sea salt for the ultimate nostalgic crunch.',
      headlineStory: 'Double-Crushed Cocoa Biscuits',
    },
    {
      ...FLAVORS[2],
      story: 'Cool spearmint oil pressed from organic mountain herbs, folded with crisp dark Belgian chocolate flakes that melt on contact.',
      headlineStory: 'Crisp Mountain Peppermint',
    },
    {
      ...FLAVORS[3],
      story: 'Sun-ripened wild Nordic strawberries simmered into glossy fruit ribbons, swirled into luscious cultured cream.',
      headlineStory: 'Wild Nordic Strawberry Ribbons',
    },
  ];

  const current = flavorStories[activeIdx];

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 70%',
        end: 'bottom 20%',
        onEnter: () => {
          gsap.from('.flavor-story-reveal', {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        backgroundColor: current.color.primary,
      }}
      className="w-full py-20 sm:py-28 px-6 md:px-12 relative z-20 text-white transition-colors duration-700 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flavor-story-reveal text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> FLAVOR DISCOVERY
          </span>
          <h2 className="font-bubble text-3xl sm:text-5xl font-bold tracking-tight mb-3">
            Every flavor has a story.
          </h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-md mx-auto leading-relaxed">
            Crafted in small batches with Swedish devotion to clean ingredients, zero sugar rush, and uncompromised creaminess.
          </p>
        </div>

        {/* Flavor Selector Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12">
          {flavorStories.map((flv, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={flv.id}
                onClick={() => setActiveIdx(idx)}
                className={`text-xs sm:text-sm font-bold uppercase tracking-wider px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-white text-gray-900 shadow-xl scale-105'
                    : 'bg-white/15 hover:bg-white/30 text-white/90 backdrop-blur-sm border border-white/20'
                }`}
              >
                {flv.name}
              </button>
            );
          })}
        </div>

        {/* Active Flavor Showcase Box */}
        <div className="bg-white/10 backdrop-blur-md rounded-[36px] sm:rounded-[48px] p-6 sm:p-12 border border-white/20 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Flavor Highlights */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="inline-block bg-white/20 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase border border-white/30">
                  {current.caloriesLabel}
                </div>

                <h3 className="font-bubble text-2xl sm:text-4xl font-bold leading-tight">
                  {current.headlineStory}
                </h3>

                <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-md font-sans">
                  {current.story}
                </p>

                {/* Nutrition Grid */}
                <div className="grid grid-cols-3 gap-3 pt-2 max-w-sm">
                  <div className="bg-white/15 backdrop-blur-sm p-3 rounded-2xl border border-white/20 text-center">
                    <span className="block text-[10px] uppercase font-bold text-white/70">Calories</span>
                    <span className="text-lg font-bold">{current.calories}</span>
                  </div>
                  <div className="bg-white/15 backdrop-blur-sm p-3 rounded-2xl border border-white/20 text-center">
                    <span className="block text-[10px] uppercase font-bold text-white/70">Net Carbs</span>
                    <span className="text-lg font-bold">{current.nutrition.netCarbs}</span>
                  </div>
                  <div className="bg-white/15 backdrop-blur-sm p-3 rounded-2xl border border-white/20 text-center">
                    <span className="block text-[10px] uppercase font-bold text-white/70">Added Sugar</span>
                    <span className="text-lg font-bold">{current.nutrition.sugarAdded}</span>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => onAddToCart(current, '100g')}
                    className="inline-flex items-center gap-2 bg-[#FAEED1] hover:bg-white text-[#2C1810] font-bold text-xs sm:text-sm uppercase px-6 sm:px-8 py-3 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>Taste {current.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Floating Product Tub Showcase */}
          <div className="lg:col-span-6 flex items-center justify-center relative min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id + '-img'}
                initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.85, rotate: 6 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative flex items-center justify-center"
              >
                <div
                  style={{ background: current.color.accent }}
                  className="absolute inset-4 rounded-full filter blur-3xl opacity-40 pointer-events-none"
                />
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-56 sm:w-64 md:w-80 h-auto object-contain tub-shadow transition-transform duration-300 hover:scale-105"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
