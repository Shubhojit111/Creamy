import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { FLAVORS } from '../data/flavors';
import type { Flavor } from '../data/flavors';

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  image: string;
  calories: number;
}

interface CustomerFavoritesProps {
  onSelectProduct: (productId: string) => void;
  onAddToCart: (product: Flavor | any, size: string) => void;
  onOpenMenu: () => void;
}

export const CustomerFavorites: React.FC<CustomerFavoritesProps> = ({
  onSelectProduct,
  onAddToCart,
  onOpenMenu,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const products: ProductItem[] = [
    {
      id: 'cookies',
      name: 'Cookies & Kräm',
      price: 6.99,
      image: '/cookies_transparent.png',
      calories: 280,
    },
    {
      id: 'mint',
      name: 'Mint Chokladchip',
      price: 6.99,
      image: '/mint_transparent.png',
      calories: 270,
    },
    {
      id: 'strawberry',
      name: 'Strawberry Swirl',
      price: 6.99,
      image: '/strawberry_transparent.png',
      calories: 270,
    },
    {
      id: 'fudge',
      name: 'Chocolate Fudge Brownie',
      price: 6.99,
      image: '/fudge_transparent.png',
      calories: 290,
    },
    {
      id: 'caramel',
      name: 'Salted Caramel',
      price: 6.99,
      image: '/caramel_transparent.png',
      calories: 260,
    },
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="w-full bg-[#FFF8EB] py-14 sm:py-20 px-6 md:px-12 relative z-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="inline-block bg-[#F4E3D0] text-[#7A4026] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              BEST SELLERS
            </span>
            <h2 className="font-bubble text-3xl sm:text-4xl font-bold text-[#2C1810]">
              Customer Favorites
            </h2>
          </div>

          <button
            onClick={onOpenMenu}
            className="group flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2C1810] hover:text-[#7A4026] transition-colors self-start sm:self-auto"
          >
            <span>View all flavors</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Carousel Container with Left/Right Arrow Buttons */}
        <div className="relative group">
          {/* Arrow Left - hidden on mobile */}
          <button
            onClick={() => handleScroll('left')}
            aria-label="Scroll left"
            className="hidden sm:flex absolute -left-3 sm:-left-16 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white shadow-lg text-gray-700 items-center justify-center hover:bg-gray-50 hover:scale-110 active:scale-95 transition-all border border-gray-100"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Arrow Right - hidden on mobile */}
          <button
            onClick={() => handleScroll('right')}
            aria-label="Scroll right"
            className="hidden sm:flex absolute -right-3 sm:-right-16 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white shadow-lg text-gray-700 items-center justify-center hover:bg-gray-50 hover:scale-110 active:scale-95 transition-all border border-gray-100"
          >
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Cards Scroll Track */}
          <div
            ref={scrollContainerRef}
            className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto pb-4 pt-2 px-1 scrollbar-none snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((item) => {
              const fullFlavor = FLAVORS.find((f) => f.id === item.id) || FLAVORS[0];
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectProduct(item.id)}
                  className="flex-shrink-0 w-[200px] sm:w-[220px] md:w-[235px] bg-[#FFF4E4] hover:bg-white rounded-[26px] p-4 border border-[#F2E0CD] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group/card snap-start cursor-pointer"
                >
                  {/* Product Image Area */}
                  <div className="relative w-full h-44 sm:h-48 flex items-center justify-center pt-2 overflow-visible">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-36 sm:w-40 h-auto max-h-44 object-contain drop-shadow-md transition-transform duration-300 group-hover/card:scale-108 group-hover/card:-translate-y-1.5"
                    />
                  </div>

                  {/* Info & Action */}
                  <div className="mt-2 pt-3 border-t border-[#F2E0CD]/70">
                    <h3 className="font-bubble font-bold text-sm sm:text-base text-[#2C1810] group-hover/card:text-[#7A4026] transition-colors mb-1 truncate">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm sm:text-base text-[#2C1810]">
                        ${item.price.toFixed(2)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(fullFlavor, '100g');
                        }}
                        aria-label={`Add ${item.name} to bag`}
                        className="w-8 h-8 rounded-full bg-[#FAF0E1] hover:bg-[#2C1810] text-[#7A4026] hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-110 active:scale-95"
                      >
                        <ShoppingBag className="w-4 h-4 stroke-[2]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Arrows — mobile only, right-aligned */}
        <div className="flex sm:hidden items-center justify-end gap-2 mt-4">
          <button
            onClick={() => handleScroll('left')}
            aria-label="Previous flavor"
            className="w-8 h-8 rounded-full bg-white shadow-sm text-gray-700 flex items-center justify-center hover:bg-gray-50 border border-[#ECD9C0] active:scale-90 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            aria-label="Next flavor"
            className="w-8 h-8 rounded-full bg-white shadow-sm text-gray-700 flex items-center justify-center hover:bg-gray-50 border border-[#ECD9C0] active:scale-90 transition-all"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
