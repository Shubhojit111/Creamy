import React from 'react';
import { Truck, RotateCcw, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="w-full bg-[#FFF4E4] border-b border-[#F2E0CD] py-2.5 px-6 text-xs text-[#5C3424] font-semibold">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2 sm:gap-4">
        {/* Benefit 1 */}
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <Truck className="w-4 h-4 text-[#7A4026]" />
          <span>Free shipping on orders $40+</span>
        </div>

        <span className="hidden md:inline text-[#D9C4B0]">|</span>

        {/* Benefit 2 */}
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <RotateCcw className="w-4 h-4 text-[#7A4026]" />
          <span>30-Day hassle-free returns</span>
        </div>

        <span className="hidden md:inline text-[#D9C4B0]">|</span>

        {/* Benefit 3 */}
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <Sparkles className="w-4 h-4 text-[#7A4026]" />
          <span>Made with real ingredients</span>
        </div>
      </div>
    </div>
  );
};
