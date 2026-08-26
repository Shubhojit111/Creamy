import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Flavor } from '../data/flavors';

interface IceCreamCarouselProps {
  flavors: Flavor[];
  currentIndex: number;
  direction: number;
  onSelectFlavor: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const IceCreamCarousel: React.FC<IceCreamCarouselProps> = ({
  flavors,
  currentIndex,
  direction,
  onSelectFlavor,
}) => {
  const current = flavors[currentIndex];
  const nextIdx1 = (currentIndex + 1) % flavors.length;
  const nextIdx2 = (currentIndex + 2) % flavors.length;
  const prevIdx = (currentIndex - 1 + flavors.length) % flavors.length;

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none select-none">
      {/* Exiting / Previous flavor in bottom left wave valley */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={`prev-${flavors[prevIdx].id}`}
          initial={{ opacity: 0, scale: 0.3, x: 0, y: 80 }}
          animate={{ opacity: 0, scale: 0.35, x: -180, y: 160 }}
          exit={{ opacity: 0, scale: 0.25, x: -240, y: 200 }}
          transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
          className="absolute z-0 pointer-events-none hidden md:block"
        >
          <img
            src={flavors[prevIdx].image}
            alt={flavors[prevIdx].name}
            className="w-44 md:w-52 h-auto object-contain tub-shadow-sm filter brightness-90"
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>

      {/* Main Center Hero Ice Cream Tub */}
      <div className="relative z-20 flex items-center justify-center translate-y-4 md:translate-y-6">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current.id}
            custom={direction}
            initial={{
              opacity: 0,
              scale: direction > 0 ? 0.60 : 0.85,
              x: direction > 0 ? 160 : -140,
              y: direction > 0 ? -25 : 35,
              rotate: direction > 0 ? 5 : -4,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
              rotate: 0,
            }}
            exit={{
              opacity: 0,
              scale: direction > 0 ? 0.40 : 0.60,
              x: direction > 0 ? -180 : 160,
              y: direction > 0 ? 150 : -25,
              rotate: direction > 0 ? -8 : 5,
            }}
            transition={{
              duration: 0.65,
              ease: [0.34, 1.25, 0.64, 1],
            }}
            className="relative flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -40) {
                onSelectFlavor((currentIndex + 1) % flavors.length);
              } else if (info.offset.x > 40) {
                onSelectFlavor((currentIndex - 1 + flavors.length) % flavors.length);
              }
            }}
          >
            {/* Subtle glow behind center tub */}
            <div
              style={{ background: current.color.glow }}
              className="absolute -inset-8 rounded-full filter blur-3xl opacity-70 pointer-events-none"
            />

            {/* Ice cream tub image */}
            <motion.img
              src={current.image}
              alt={current.name}
              className="w-56 sm:w-64 md:w-72 lg:w-[320px] xl:w-[350px] h-auto object-contain tub-shadow z-20 transition-transform duration-300"
              draggable={false}
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Side +1 Ice Cream Tub (Medium Preview) */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={`next1-${flavors[nextIdx1].id}`}
          initial={{ opacity: 0, scale: 0.42, x: 240, y: -25 }}
          animate={{ opacity: 0.95, scale: 0.58, x: 175, y: -20 }}
          exit={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="absolute z-10 cursor-pointer pointer-events-auto hidden sm:block"
          onClick={() => onSelectFlavor(nextIdx1)}
          title={`Switch to ${flavors[nextIdx1].name}`}
        >
          <motion.img
            src={flavors[nextIdx1].image}
            alt={flavors[nextIdx1].name}
            className="w-52 md:w-60 h-auto object-contain tub-shadow-sm filter brightness-95 hover:brightness-105 hover:scale-105 transition-all duration-200"
            draggable={false}
            whileHover={{ scale: 1.06, y: -4 }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Far Right +2 Ice Cream Tub (Small Preview) */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={`next2-${flavors[nextIdx2].id}`}
          initial={{ opacity: 0, scale: 0.22, x: 310, y: -35 }}
          animate={{ opacity: 0.80, scale: 0.34, x: 275, y: -30 }}
          exit={{ opacity: 0, scale: 0.28, x: 175, y: -20 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="absolute z-0 cursor-pointer pointer-events-auto hidden lg:block"
          onClick={() => onSelectFlavor(nextIdx2)}
          title={`Switch to ${flavors[nextIdx2].name}`}
        >
          <motion.img
            src={flavors[nextIdx2].image}
            alt={flavors[nextIdx2].name}
            className="w-48 md:w-56 h-auto object-contain tub-shadow-sm filter brightness-90 hover:brightness-100 hover:scale-110 transition-all duration-200"
            draggable={false}
            whileHover={{ scale: 1.1, y: -4 }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
