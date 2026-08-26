import React, { useState, useRef } from 'react';
import { Star, ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface CustomerReviewsProps {
  onOpenAllReviews: () => void;
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({
  onOpenAllReviews,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const baseReviews = [
    {
      id: 1,
      rating: 5,
      quote: "The best cookies & cream ice cream I've ever had! So creamy and the cookie pieces are perfect.",
      author: 'Jessica M.',
      avatar: '/avatar1.png',
      flavor: 'Cookies & Kräm',
    },
    {
      id: 2,
      rating: 5,
      quote: "Love that it's plant-based and has no added sugar. Tastes incredibly indulgent!",
      author: 'Michael R.',
      avatar: '/avatar2.png',
      flavor: 'Mint Chokladchip',
    },
    {
      id: 3,
      rating: 5,
      quote: 'My whole family loves this flavor. We always keep a pint in the freezer!',
      author: 'Sophie L.',
      avatar: '/avatar3.png',
      flavor: 'Strawberry Swirl',
    },
    {
      id: 4,
      rating: 5,
      quote: 'Tastes like high-end Italian gelato without the blood sugar spike. Outstanding texture!',
      author: 'Henrik V.',
      avatar: '/avatar1.png',
      flavor: 'Chocolate Fudge',
    },
    {
      id: 5,
      rating: 5,
      quote: 'The salted caramel ribbons are so gooey and decadent. 100% recommended!',
      author: 'Astrid N.',
      avatar: '/avatar2.png',
      flavor: 'Salted Caramel',
    },
  ];

  const continuousReviews = [...baseReviews, ...baseReviews, ...baseReviews];

  const breakdown = [
    { stars: 5, pct: 82 },
    { stars: 4, pct: 13 },
    { stars: 3, pct: 3 },
    { stars: 2, pct: 1 },
    { stars: 1, pct: 1 },
  ];

  const handleScrollManual = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const shift = dir === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: shift, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-[#FFF8EB] py-14 sm:py-20 px-6 md:px-12 relative z-20 overflow-hidden border-t border-[#F2E0CD]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="inline-block bg-[#F4E3D0] text-[#7A4026] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              VERIFIED FEEDBACK
            </span>
            <h2 className="font-bubble text-2xl sm:text-3xl font-bold text-[#2C1810]">
              What our customers say
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAllReviews}
              className="group flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2C1810] hover:text-[#7A4026] transition-colors"
            >
              <span>View all reviews</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Manual Scroll Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScrollManual('left')}
                aria-label="Previous review"
                className="w-8 h-8 rounded-full bg-white shadow-sm text-gray-700 flex items-center justify-center hover:bg-gray-50 border border-[#ECD9C0]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleScrollManual('right')}
                aria-label="Next review"
                className="w-8 h-8 rounded-full bg-white shadow-sm text-gray-700 flex items-center justify-center hover:bg-gray-50 border border-[#ECD9C0]"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Layout: Left Breakdown Card + Right Smooth Continuous Marquee */}
        <div className="flex flex-col lg:flex-row items-stretch gap-6">
          {/* Left: Overall Score & Star Breakdown */}
          <div className="w-full lg:w-[320px] flex-shrink-0 bg-white p-6 sm:p-7 rounded-3xl border border-[#ECD9C0] shadow-sm flex flex-col justify-between text-left">
            <div>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-bubble text-4xl sm:text-5xl font-bold text-[#2C1810]">
                  4.8
                </span>
                <div>
                  <div className="flex items-center text-amber-500 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#8C7568] font-medium">
                    (12,436 reviews)
                  </span>
                </div>
              </div>

              {/* Progress Breakdown */}
              <div className="space-y-2 text-xs font-semibold text-[#7D6B60]">
                {breakdown.map((row) => (
                  <div key={row.stars} className="flex items-center gap-2.5">
                    <span className="w-6 text-left">{row.stars} ★</span>
                    <div className="flex-1 h-2 bg-[#F2E0CD] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-[11px] text-[#8C7568]">{row.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#F2E0CD]/60 text-[11px] text-[#7A4026] font-semibold">
              ✓ 99.4% Customer Recommendation Rate
            </div>
          </div>

          {/* Right: Continuous Right-to-Left Auto-Scrolling Marquee */}
          <div
            className="flex-1 overflow-hidden relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Fade Gradients on Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#FFF8EB] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#FFF8EB] to-transparent z-10 pointer-events-none" />

            <motion.div
              animate={isPaused ? {} : { x: ['0%', '-50%'] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 24,
                  ease: 'linear',
                },
              }}
              className="flex items-stretch gap-4 w-max py-1"
            >
              {continuousReviews.map((rev, idx) => (
                <div
                  key={`${rev.id}-${idx}`}
                  className="w-[280px] sm:w-[310px] bg-white rounded-3xl p-6 border border-[#ECD9C0] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between flex-shrink-0 text-left"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center text-amber-500 gap-0.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Verified
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#4A2818] leading-relaxed font-sans mb-4">
                      "{rev.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 pt-3 border-t border-[#F2E0CD]/60">
                    <img
                      src={rev.avatar}
                      alt={rev.author}
                      className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm"
                    />
                    <div>
                      <span className="block text-xs font-bold text-[#2C1810]">
                        {rev.author}
                      </span>
                      <span className="block text-[10px] text-[#8C7568]">
                        Verified Buyer • {rev.flavor}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
