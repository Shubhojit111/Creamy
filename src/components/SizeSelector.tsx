import React from 'react';

interface SizeSelectorProps {
  sizes: { label: string; grams: string; priceMultiplier: number }[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
  accentColor?: string;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  selectedSize,
  onSelectSize,
}) => {
  const heroSizes = ['50g', '75g', '100g'];

  return (
    <div className="flex items-center gap-2 z-30">
      {heroSizes.map((s) => {
        const isSelected = selectedSize === s || (selectedSize.includes('16') && s === '100g') || (selectedSize.includes('50') && s === '50g');
        return (
          <button
            key={s}
            onClick={() => onSelectSize(s)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold transition-all duration-200 border shadow-sm ${
              isSelected
                ? 'bg-white text-gray-900 border-white scale-110 shadow-md ring-2 ring-white/50'
                : 'bg-white/25 hover:bg-white/40 text-white border-white/30 backdrop-blur-sm'
            }`}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
};
