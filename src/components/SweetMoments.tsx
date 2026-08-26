import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

export const SweetMoments: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const galleryItems = [
    {
      id: 1,
      image: '/gallery_1.png',
      caption: 'Cookies and Kräm on fresh marble ✨',
      tag: '#CreamyMoments',
    },
    {
      id: 2,
      image: '/gallery_2.png',
      caption: 'Lineup of pure Swedish joy 🍦',
      tag: '#ZeroSugarGuilt',
    },
    {
      id: 3,
      image: '/gallery_3.png',
      caption: 'Strawbäri Swirl summer vibes 🍓',
      tag: '#NordicTaste',
    },
    {
      id: 4,
      image: '/gallery_4.png',
      caption: 'The ultimate dessert bowl 🍨',
      tag: '#KetoFriendly',
    },
    {
      id: 5,
      image: '/gallery_5.png',
      caption: 'Fresh Mint Chokladchip refresh 🌿',
      tag: '#CleanIngredients',
    },
  ];

  const handleScroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const shift = dir === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: shift, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-[#FFF8EB] py-14 sm:py-20 px-6 md:px-12 relative z-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="inline-block bg-[#F4E3D0] text-[#7A4026] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              FOLLOW US @CREAMY
            </span>
            <h2 className="font-bubble text-3xl sm:text-4xl font-bold text-[#2C1810]">
              Sweet Moments
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2C1810] hover:text-[#7A4026] transition-colors self-start sm:self-auto"
          >
            <span>View all</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Arrow Left */}
          <button
            onClick={() => handleScroll('left')}
            aria-label="Scroll left"
            className="absolute -left-3 sm:-left-16 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white shadow-lg text-gray-700 flex items-center justify-center hover:bg-gray-50 hover:scale-110 active:scale-95 transition-all border border-gray-100"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Arrow Right */}
          <button
            onClick={() => handleScroll('right')}
            aria-label="Scroll right"
            className="absolute -right-3 sm:-right-16 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white shadow-lg text-gray-700 flex items-center justify-center hover:bg-gray-50 hover:scale-110 active:scale-95 transition-all border border-gray-100"
          >
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Scrollable Cards Track */}
          <div
            ref={scrollRef}
            className="flex items-center gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 px-1 scrollbar-none snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {galleryItems.map((item) => (
              <a
                key={item.id}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group/item relative flex-shrink-0 w-[200px] sm:w-[230px] md:w-[245px] aspect-[4/5] rounded-[24px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 snap-start block"
              >
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-white text-left">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-1">
                    <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                    <span>{item.tag}</span>
                  </div>
                  <p className="text-xs text-white/90 font-medium leading-snug line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
