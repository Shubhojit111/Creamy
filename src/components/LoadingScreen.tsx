import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOAD_FLAVORS = [
  { img: '/strawberry_transparent.png', name: 'Strawberry Swirl' },
  { img: '/cookies_transparent.png', name: 'Cookies & Kräm' },
  { img: '/mint_transparent.png', name: 'Mint Chokladchip' },
];

const CRUMBS = Array.from({ length: 14 }).map((_, i) => ({
  id: i,
  left: `${8 + ((i * 67) % 84)}%`,
  top: `${10 + ((i * 41) % 75)}%`,
  size: 4 + ((i * 7) % 8),
  delay: (i % 7) * 0.28,
  dur: 2.2 + ((i % 5) * 0.45),
}));

/** Snowflakes dropping from the top while loading */
const SNOW = Array.from({ length: 22 }).map((_, i) => ({
  id: i,
  left: `${2 + ((i * 47) % 96)}%`,
  size: 8 + ((i * 7) % 12),
  delay: -((i * 13) % 40) / 10,
  dur: 2.6 + ((i % 6) * 0.5),
  drift: 18 + ((i * 11) % 36),
  opacity: 0.35 + ((i % 5) * 0.13),
}));

export const LoadingScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [flavorIdx, setFlavorIdx] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const DURATION = 2300;
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      // ease out for natural fill
      const eased = 1 - Math.pow(1 - t, 2.2);
      setProgress(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const flavorTimer = setInterval(() => setFlavorIdx((p) => (p + 1) % LOAD_FLAVORS.length), 750);
    const done = setTimeout(() => setIsLoading(false), 2450);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(flavorTimer);
      clearTimeout(done);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%', borderBottomLeftRadius: 48, borderBottomRightRadius: 48 }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background:
              'radial-gradient(900px 500px at 50% 30%, rgba(237,91,125,0.35), transparent 65%), linear-gradient(180deg, #3A1C14 0%, #2E150F 55%, #21100B 100%)',
          }}
        >
          {/* falling snowflakes */}
          {SNOW.map((s) => (
            <motion.svg
              key={`snow-${s.id}`}
              viewBox="0 0 12 12"
              className="absolute -top-4"
              style={{ left: s.left, width: s.size, height: s.size, opacity: s.opacity }}
              animate={{
                y: ['-3vh', '104vh'],
                x: [0, s.drift, -s.drift * 0.6, 0],
                rotate: [0, 220, 360],
              }}
              transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: 'linear' }}
            >
              <path
                d="M6 0v12M0 6h12M2.2 2.2l7.6 7.6M9.8 2.2L2.2 9.8"
                stroke={s.id % 3 === 0 ? '#CFF4FF' : '#FFFFFF'}
                strokeWidth={1.3}
                strokeLinecap="round"
              />
            </motion.svg>
          ))}

          {/* floating crumbs */}
          {CRUMBS.map((c) => (
            <motion.span
              key={c.id}
              className="absolute rounded-full"
              style={{
                left: c.left,
                top: c.top,
                width: c.size,
                height: c.size,
                background: c.id % 3 === 0 ? '#FFC9D6' : c.id % 3 === 1 ? '#FAEED1' : 'rgba(255,255,255,0.5)',
              }}
              animate={{ y: [0, -26, 0], opacity: [0.2, 0.9, 0.2], scale: [1, 1.4, 1] }}
              transition={{ duration: c.dur, repeat: Infinity, delay: c.delay, ease: 'easeInOut' }}
            />
          ))}

          {/* ===== 3D STAGE ===== */}
          <div style={{ perspective: 1200 }} className="relative flex items-center justify-center w-[240px] h-[240px] mb-2">
            {/* halo */}
            <motion.div
              className="absolute w-56 h-56 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(237,91,125,0.55), transparent 70%)' }}
              animate={{ scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* orbit ring back */}
            <motion.div
              className="absolute w-52 h-52 rounded-full border border-white/15"
              style={{ transform: 'rotateX(72deg)', transformStyle: 'preserve-3d' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            >
              <span className="absolute -top-1.5 left-1/2 w-3 h-3 -ml-1.5 rounded-full bg-[#FFC9D6] shadow-[0_0_12px_rgba(255,201,214,0.9)]" />
              <span className="absolute top-1/2 -right-1 w-2 h-2 rounded-full bg-[#FAEED1] shadow-[0_0_10px_rgba(250,238,209,0.9)]" />
            </motion.div>
            {/* orbit ring front */}
            <motion.div
              className="absolute w-40 h-40 rounded-full border border-dashed border-white/25"
              style={{ transform: 'rotateX(72deg)' }}
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            >
              <span className="absolute top-0 left-1/2 w-2.5 h-2.5 -ml-1 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
            </motion.div>

            {/* ground shadow */}
            <motion.div
              className="absolute bottom-4 w-36 h-6 rounded-[100%] bg-black/50 blur-md"
              animate={{ scaleX: [1, 0.82, 1], opacity: [0.55, 0.35, 0.55] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* spinning tub — true 3D rotateY */}
            <div style={{ transformStyle: 'preserve-3d' }} className="relative z-10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={LOAD_FLAVORS[flavorIdx].img}
                  src={LOAD_FLAVORS[flavorIdx].img}
                  alt="Creamy ice cream"
                  initial={{ opacity: 0, scale: 0.7, rotateY: -90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.85, rotateY: 90 }}
                  transition={{ duration: 0.45, ease: [0.34, 1.3, 0.64, 1] }}
                  className="w-36 h-36 object-contain"
                  style={{
                    filter: 'drop-shadow(0 26px 28px rgba(0,0,0,0.45))',
                    transformStyle: 'preserve-3d',
                  }}
                  draggable={false}
                />
              </AnimatePresence>
              {/* continuous float + tilt wrapper */}
              <motion.div
                className="absolute inset-0 -z-10"
                animate={{ rotateY: [0, 18, 0, -18, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* float the whole tub */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Brand — per-letter 3D flip in */}
          <h1 className="font-bubble text-5xl font-bold text-white tracking-tight flex overflow-hidden" style={{ perspective: 600 }}>
            {'Creamy'.split('').map((ch, i) => (
              <motion.span
                key={i}
                initial={{ rotateX: 90, y: 24, opacity: 0 }}
                animate={{ rotateX: 0, y: 0, opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.07, type: 'spring', stiffness: 260, damping: 20 }}
                className="inline-block"
                style={{ textShadow: '0 4px 0 rgba(0,0,0,0.25), 0 12px 28px rgba(0,0,0,0.4)' }}
              >
                {ch}
              </motion.span>
            ))}
          </h1>

          {/* flavor ticker */}
          <div className="h-5 mt-2 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={flavorIdx}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-[11px] text-[#FFC9D6] font-bold tracking-[0.22em] uppercase"
              >
                Churning {LOAD_FLAVORS[flavorIdx].name}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* progress */}
          <div className="w-52 mt-5">
            <div className="h-[6px] bg-white/10 rounded-full overflow-hidden border border-white/10">
              <motion.div
                className="h-full rounded-full relative"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #FFF3D6, #FF8FAB 60%, #ED5B7D)',
                  boxShadow: '0 0 16px rgba(237,91,125,0.8)',
                  transition: 'width 0.1s linear',
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent rounded-full" />
              </motion.div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase">Scooping joy</span>
              <span className="text-xs font-bold text-white tabular-nums">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
