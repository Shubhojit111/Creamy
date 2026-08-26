import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { FLAVORS } from '../../data/flavors';
import type { Flavor } from '../../data/flavors';

export interface RelatedItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface RelatedProductsProps {
  onSelectProduct: (flavorId: string) => void;
  onAddToCart: (product: Flavor | any, size: string) => void;
  onOpenMenu: () => void;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  onSelectProduct,
  onAddToCart,
  onOpenMenu,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const relatedList: RelatedItem[] = [
    {
      id: 'mint',
      name: 'Mint Chokladchip',
      price: 6.99,
      image: '/mint_transparent.png',
    },
    {
      id: 'strawberry',
      name: 'Strawberry Swirl',
      price: 6.99,
      image: '/strawberry_transparent.png',
    },
    {
      id: 'fudge',
      name: 'Chocolate Fudge Brownie',
      price: 6.99,
      image: '/fudge_transparent.png',
    },
    {
      id: 'caramel',
      name: 'Salted Caramel',
      price: 6.99,
      image: '/caramel_transparent.png',
    },
    {
      id: 'vanilla',
      name: 'Swedish Vanilla',
      price: 6.99,
      image: '/vanilla_transparent.png',
    },
  ];

  const handleScroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const shift = dir === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: shift, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-[#FFF8EB] py-14 sm:py-20 px-6 md:px-12 relative z-20 border-t border-[#F2E0CD]">
      <div className="max-w-7xl mx-auto">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <h2 className="font-bubble text-2xl sm:text-3xl font-bold text-[#2C1810]">
            You may also love
          </h2>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenMenu}
              className="group flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2C1810] hover:text-[#7A4026] transition-colors"
            >
              <span>View all flavors</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Carousel Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScroll('left')}
                aria-label="Previous flavor"
                className="w-8 h-8 rounded-full bg-white shadow-sm text-gray-700 flex items-center justify-center hover:bg-gray-50 border border-[#ECD9C0]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                aria-label="Next flavor"
                className="w-8 h-8 rounded-full bg-white shadow-sm text-gray-700 flex items-center justify-center hover:bg-gray-50 border border-[#ECD9C0]"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Track */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 px-1 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {relatedList.map((item) => {
            const fullFlavor = FLAVORS.find((f) => f.id === item.id) || FLAVORS[0];
            return (
              <div
                key={item.id}
                className="flex-shrink-0 w-[200px] sm:w-[220px] md:w-[235px] bg-[#FFF4E4] hover:bg-white rounded-[26px] p-4 border border-[#F2E0CD] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group/card snap-start"
              >
                <div
                  onClick={() => onSelectProduct(item.id)}
                  className="cursor-pointer relative w-full h-44 sm:h-48 flex items-center justify-center pt-2 overflow-visible"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-36 sm:w-40 h-auto max-h-44 object-contain drop-shadow-md transition-transform duration-300 group-hover/card:scale-108 group-hover/card:-translate-y-1.5"
                  />
                </div>

                <div className="mt-2 pt-3 border-t border-[#F2E0CD]/70 text-left">
                  <h3
                    onClick={() => onSelectProduct(item.id)}
                    className="cursor-pointer font-bubble font-bold text-sm sm:text-base text-[#2C1810] hover:text-[#7A4026] mb-1 truncate transition-colors"
                  >
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm sm:text-base text-[#2C1810]">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(fullFlavor, '16 oz (1 Pint)');
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
    </section>
  );
};
