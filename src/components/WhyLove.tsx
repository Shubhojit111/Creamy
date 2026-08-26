import React from 'react';
import { Leaf, Ban, Heart, Smile } from 'lucide-react';

export const WhyLove: React.FC = () => {
  const features = [
    {
      icon: Leaf,
      title: 'Made with',
      subtitle: 'Real Ingredients',
      description: 'We use real ingredients you can pronounce.',
    },
    {
      icon: Ban,
      title: 'No Added',
      subtitle: 'Sugar',
      description: 'Delicious ice cream without the guilt.',
    },
    {
      icon: Heart,
      title: 'Good for You,',
      subtitle: 'Better for Earth',
      description: 'Sustainable choices for a better tomorrow.',
    },
    {
      icon: Smile,
      title: '100% Taste,',
      subtitle: '0% Compromise',
      description: 'Creamy, dreamy and absolutely delicious.',
    },
  ];

  return (
    <section className="w-full bg-[#FFF8EB] py-10 sm:py-14 lg:py-18 px-4 sm:px-6 md:px-12 relative z-20 border-b border-[#F4E6D0]">
      <div className="max-w-7xl mx-auto">
        {/* Mobile: Horizontal Marquee — logo + text format */}
        <div className="md:hidden overflow-hidden">
          <div className="flex items-center gap-3 animate-marquee whitespace-nowrap">
            {[...features, ...features, ...features].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 flex-shrink-0 px-3 py-2 bg-[#FFF4E4] rounded-full border border-[#F2E0CD]"
                >
                  <div className="w-7 h-7 rounded-full bg-[#F5E7D3] flex items-center justify-center text-[#4A2818] shadow-sm flex-shrink-0">
                    <Icon className="w-4 h-4 stroke-[1.8]" />
                  </div>
                  <span className="font-bubble text-[10px] font-bold text-[#2C1810] leading-tight">
                    {feat.title} {feat.subtitle}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop: Original Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y sm:divide-y-0 lg:divide-x divide-[#ECD9C0]">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center px-4 md:px-8 py-3 first:pt-0 lg:first:pt-3 transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Icon Circle */}
                <div className="w-14 h-14 rounded-full bg-[#F5E7D3] flex items-center justify-center text-[#4A2818] mb-3.5 shadow-sm transition-transform duration-300 hover:scale-110">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>

                {/* Title */}
                <h3 className="font-bubble text-base md:text-lg font-bold text-[#2C1810] leading-snug mb-1.5">
                  <span>{feat.title}</span>
                  <br />
                  <span className="text-[#3D2216]">{feat.subtitle}</span>
                </h3>

                {/* Description */}
                <p className="text-xs md:text-sm text-[#7D6B60] leading-relaxed max-w-[210px]">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
