import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-gradient-to-b from-[#381E15] via-[#4A2818] to-[#2E170F]"
        >
          {/* Floating ice cream scoops animation */}
          <div className="relative w-32 h-32 mb-8">
            {/* Ring 1 */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            {/* Ring 2 */}
            <motion.div
              className="absolute inset-3 rounded-full border-2 border-dashed border-[#FAEED1]/30"
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
            {/* Center ice cream emoji */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center text-5xl"
              animate={{ y: [0, -8, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              🍦
            </motion.div>
          </div>

          {/* Brand name */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="font-bubble text-4xl font-bold text-white tracking-tight mb-2"
          >
            Creamy
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xs text-[#FAEED1]/70 font-medium tracking-wider uppercase mb-6"
          >
            Taste Joy in Every Bite
          </motion.p>

          {/* Loading bar */}
          <div className="w-40 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#FAEED1] to-[#E53935] rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};