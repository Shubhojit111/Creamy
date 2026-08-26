import React from 'react';
import { ArrowRight, Heart } from 'lucide-react';

interface PDPBrandStoryProps {
  onLearnMore: () => void;
}

export const PDPBrandStory: React.FC<PDPBrandStoryProps> = ({ onLearnMore }) => {
  return (
    <section className="w-full bg-[#FFF8EB] py-14 sm:py-20 px-6 md:px-12 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Side Copy */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          <span className="inline-block bg-[#F4E3D0] text-[#7A4026] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            Our story
          </span>

          <h2 className="font-bubble text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#2C1810] leading-tight mb-4">
            Made with passion,
            <br />
            shared with love.
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#7D6B60] leading-relaxed mb-6 max-w-md">
            Creamy was born out of a simple belief – ice cream should make you smile. We craft every pint with love and the finest ingredients to bring joy to your day.
          </p>

          <button
            onClick={onLearnMore}
            className="group inline-flex items-center gap-2 bg-[#4A2417] hover:bg-[#34180E] text-white font-bold text-xs sm:text-sm tracking-wider uppercase px-6 py-3 rounded-full shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <span>Learn more about us</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Right Side 3-Tubs Photo with Rotating Badge */}
        <div className="lg:col-span-7 relative flex items-center justify-center">
          <div className="relative w-full aspect-[16/10] rounded-[32px] sm:rounded-[48px] overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="/pdp_story_tubs.png"
              alt="Three ice cream tubs in studio"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Rotating "MADE WITH LOVE" Badge */}
          <div className="absolute -bottom-4 -left-2 sm:-bottom-5 sm:-left-5 w-20 h-20 sm:w-26 sm:h-26 rounded-full bg-white shadow-xl border-2 border-[#ECD9C0] flex items-center justify-center p-2 z-20">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full animate-[spin_12s_linear_infinite]"
            >
              <path
                id="storyBadgePath"
                d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text className="text-[9px] font-bold uppercase tracking-[2.2px] fill-[#4A2417]">
                <textPath href="#storyBadgePath">
                  ★ MADE WITH LOVE ★ MADE WITH LOVE
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[#4A2417]">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
