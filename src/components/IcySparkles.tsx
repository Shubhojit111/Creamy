import React from 'react';
import { motion } from 'framer-motion';

/** Twinkling ice crystals scattered across the hero */
const CRYSTALS = Array.from({ length: 16 }).map((_, i) => ({
  id: i,
  left: `${4 + ((i * 61) % 92)}%`,
  top: `${6 + ((i * 37) % 62)}%`,
  size: 5 + ((i * 5) % 9),
  delay: (i % 8) * 0.45,
  dur: 1.8 + ((i % 5) * 0.5),
  cross: i % 3 === 0,
}));

/** Tiny snowflakes drifting down through the hero */
const FLAKES = Array.from({ length: 9 }).map((_, i) => ({
  id: i,
  left: `${6 + ((i * 53) % 88)}%`,
  size: 6 + ((i * 3) % 7),
  delay: (i % 9) * 0.9,
  dur: 7 + ((i % 4) * 2.2),
  drift: 24 + ((i * 13) % 40),
}));

export const IcySparkles: React.FC = () => {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden" aria-hidden>
      {/* frosty cool tint from the top */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cyan-100/15 to-transparent" />
      {/* frost mist hugging the wave */}
      <motion.div
        className="absolute bottom-16 left-[8%] w-[42%] h-16 rounded-[100%] bg-cyan-50/25 blur-2xl"
        animate={{ x: [0, 46, 0], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-24 right-[6%] w-[34%] h-14 rounded-[100%] bg-white/20 blur-2xl"
        animate={{ x: [0, -38, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* twinkling ice crystals */}
      {CRYSTALS.map((c) =>
        c.cross ? (
          <motion.svg
            key={c.id}
            viewBox="0 0 12 12"
            className="absolute"
            style={{ left: c.left, top: c.top, width: c.size, height: c.size }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], rotate: [0, 90, 180] }}
            transition={{ duration: c.dur, repeat: Infinity, delay: c.delay, ease: 'easeInOut' }}
          >
            <path
              d="M6 0v12M0 6h12M2.5 2.5l7 7M9.5 2.5l-7 7"
              stroke="rgba(224,247,255,0.95)"
              strokeWidth={1.4}
              strokeLinecap="round"
            />
          </motion.svg>
        ) : (
          <motion.span
            key={c.id}
            className="absolute rotate-45 bg-cyan-50"
            style={{
              left: c.left,
              top: c.top,
              width: c.size * 0.55,
              height: c.size * 0.55,
              boxShadow: '0 0 8px 2px rgba(207,244,255,0.8)',
            }}
            animate={{ opacity: [0, 1, 0], scale: [0.4, 1.15, 0.4] }}
            transition={{ duration: c.dur, repeat: Infinity, delay: c.delay, ease: 'easeInOut' }}
          />
        ),
      )}

      {/* gently falling snow */}
      {FLAKES.map((f) => (
        <motion.span
          key={f.id}
          className="absolute -top-3 rounded-full bg-white"
          style={{
            left: f.left,
            width: f.size * 0.5,
            height: f.size * 0.5,
            boxShadow: '0 0 6px 1px rgba(255,255,255,0.7)',
          }}
          animate={{ y: ['0vh', '105vh'], x: [0, f.drift, -f.drift * 0.5, 0], opacity: [0, 0.9, 0.9, 0] }}
          transition={{ duration: f.dur, repeat: Infinity, delay: f.delay, ease: 'linear' }}
        />
      ))}
    </div>
  );
};
