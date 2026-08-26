import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Cookie, Heart, Globe } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WhyLoveBannerProps {
  images?: string[];
}

export const WhyLoveBanner: React.FC<WhyLoveBannerProps> = ({
  images = [
    '/cookie_scoop.png',
    '/cookies_bowl.png',
    '/cookies_hero_pdp.png',
    '/pdp_story_tubs.png',
    '/gallery_1.png',
  ],
}) => {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const points = [
    {
      icon: Sparkles,
      title: 'Decadent & Creamy',
      desc: 'Rich, smooth texture in every scoop.',
    },
    {
      icon: Cookie,
      title: 'Crunchy Cookie Pieces',
      desc: 'Loaded with real chocolate cookies.',
    },
    {
      icon: Heart,
      title: 'Better For You',
      desc: '100% plant-based with no added sugar.',
    },
    {
      icon: Globe,
      title: 'Sustainable Choice',
      desc: 'Better for you and better for the planet.',
    },
  ];

  // Auto-cycle through product thumbnail images every 3.5 seconds with fluid animations
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIdx((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pdp-why-point',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const bgTints = [
    '#381E15',
    '#442318',
    '#2E1810',
    '#4A281B',
    '#3C1F15',
  ];

  return (
    <section ref={sectionRef} className="w-full bg-[#FFF8EB] py-8 sm:py-12 px-0 md:px-6 lg:px-12 relative z-20">
      <div className="max-w-7xl mx-auto px-0 md:px-0">
        <div
          style={{ backgroundColor: bgTints[currentImgIdx % bgTints.length] }}
          className="relative w-full rounded-none sm:rounded-[32px] lg:rounded-[44px] overflow-hidden p-5 sm:p-10 lg:p-12 shadow-2xl text-white flex flex-col lg:flex-row items-center justify-between gap-8 transition-colors duration-1000"
        >
          {/* Ambient Lighting */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/35 pointer-events-none" />

          {/* Left: 4 Points Columns */}
          <div className="w-full lg:w-7/12 grid grid-cols-2 sm:grid-cols-2 gap-6 z-10">
            <div className="col-span-full mb-1">
              <span className="font-bubble text-2xl sm:text-3xl font-bold text-white">
                Why you'll love it
              </span>
            </div>

            {points.map((pt, i) => {
              const Icon = pt.icon;
              return (
                <div key={i} className="pdp-why-point flex flex-col items-start text-left">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 mb-2.5 border border-white/15">
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-white mb-1">
                    {pt.title}
                  </h4>
                  <p className="text-xs text-[#D9C4B0] leading-relaxed">
                    {pt.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right: Dynamic Cycling Product Photo with Smooth Motion */}
          <div className="w-full lg:w-5/12 flex items-center justify-center relative z-10 min-h-[260px] sm:min-h-[300px]">
            <div className="relative w-64 sm:w-72 md:w-80 aspect-square rounded-full overflow-hidden shadow-2xl border-4 border-white/20 bg-black/20 flex items-center justify-center">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={images[currentImgIdx]}
                  src={images[currentImgIdx]}
                  alt="Product view"
                  initial={{ opacity: 0, scale: 1.15, rotate: -4 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.88, rotate: 4 }}
                  transition={{ duration: 0.8, ease: [0.34, 1.25, 0.64, 1] }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

            {/* Thumbnail Indicator Dots */}
            <div className="absolute -bottom-3 flex items-center gap-1.5 z-20 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImgIdx(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentImgIdx === idx ? 'bg-amber-300 w-5' : 'bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
