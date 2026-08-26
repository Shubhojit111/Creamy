import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Utensils, Activity, Sparkles, Globe, ChevronDown } from 'lucide-react';
import type { Flavor } from '../../data/flavors';

interface ProductInfoTabsProps {
  currentFlavor: Flavor;
}

export const ProductInfoTabs: React.FC<ProductInfoTabsProps> = ({
  currentFlavor,
}) => {
  const [activeTab, setActiveTab] = useState<'desc' | 'ing' | 'nutr' | 'how' | 'sust'>('desc');
  const [openAccordion, setOpenAccordion] = useState<string | null>('desc');

  const tabs = [
    { id: 'desc', label: 'Description', icon: FileText },
    { id: 'ing', label: 'Ingredients', icon: Utensils },
    { id: 'nutr', label: 'Nutritional Info', icon: Activity },
    { id: 'how', label: "How It's Made", icon: Sparkles },
    { id: 'sust', label: 'Sustainability', icon: Globe },
  ];

  const contentMap = {
    desc: {
      title: 'Description',
      text: currentFlavor.description,
      calories: currentFlavor.calories,
      protein: currentFlavor.nutrition.protein,
      sugar: currentFlavor.nutrition.sugarAdded,
    },
    ing: {
      title: 'Ingredients',
      text: currentFlavor.ingredients,
      calories: currentFlavor.calories,
      protein: currentFlavor.nutrition.protein,
      sugar: currentFlavor.nutrition.sugarAdded,
    },
    nutr: {
      title: 'Nutritional Facts',
      text: `Per 1 Pint (473ml): Calories ${currentFlavor.calories}, Fat ${currentFlavor.nutrition.fat}, Net Carbs ${currentFlavor.nutrition.netCarbs}, Protein ${currentFlavor.nutrition.protein}, Added Sugar ${currentFlavor.nutrition.sugarAdded}. Keto certified and gluten-free.`,
      calories: currentFlavor.calories,
      protein: currentFlavor.nutrition.protein,
      sugar: currentFlavor.nutrition.sugarAdded,
    },
    how: {
      title: "How It's Made",
      text: currentFlavor.howItsMade,
      calories: currentFlavor.calories,
      protein: currentFlavor.nutrition.protein,
      sugar: currentFlavor.nutrition.sugarAdded,
    },
    sust: {
      title: 'Sustainability',
      text: currentFlavor.sustainability,
      calories: currentFlavor.calories,
      protein: currentFlavor.nutrition.protein,
      sugar: currentFlavor.nutrition.sugarAdded,
    },
  };

  const activeContent = contentMap[activeTab];

  return (
    <section className="w-full bg-[#FFF8EB] py-12 sm:py-16 px-4 sm:px-6 md:px-12 relative z-20 border-t border-[#F2E0CD]">
      <div className="max-w-7xl mx-auto">
        {/* Mobile: Accordion */}
        <div className="lg:hidden space-y-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isOpen = openAccordion === tab.id;
            const content = contentMap[tab.id as keyof typeof contentMap];
            return (
              <div
                key={tab.id}
                className={`bg-white/80 rounded-2xl border overflow-hidden transition-all duration-200 ${
                  isOpen ? 'border-[#4A2818]/30 shadow-md' : 'border-[#ECD9C0]'
                }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => setOpenAccordion(isOpen ? null : tab.id)}
                  className={`w-full flex items-center gap-2.5 px-4 py-3.5 text-left transition-colors ${
                    isOpen ? 'bg-[#FFF4E4]' : 'bg-white/50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#7A4026] flex-shrink-0" />
                  <span className={`flex-1 text-sm font-bold ${isOpen ? 'text-[#381E15]' : 'text-[#7D6B60]'}`}>
                    {tab.label}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#7A4026] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Accordion Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-2 space-y-3">
                        <p className="text-xs text-[#7D6B60] leading-relaxed font-sans">
                          {content.text}
                        </p>
                        {/* Nutrition badges */}
                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#ECD9C0]/60">
                          <div className="bg-[#FFF4E4] p-2 rounded-xl border border-[#F2E0CD] text-center">
                            <span className="block font-bubble text-lg font-bold text-[#2C1810]">
                              {content.calories}
                            </span>
                            <span className="block text-[9px] font-bold text-[#7A4026] uppercase">Calories</span>
                          </div>
                          <div className="bg-[#FFF4E4] p-2 rounded-xl border border-[#F2E0CD] text-center">
                            <span className="block font-bubble text-lg font-bold text-[#2C1810]">
                              {content.protein}
                            </span>
                            <span className="block text-[9px] font-bold text-[#7A4026] uppercase">Protein</span>
                          </div>
                          <div className="bg-[#FFF4E4] p-2 rounded-xl border border-[#F2E0CD] text-center">
                            <span className="block font-bubble text-lg font-bold text-[#2C1810]">
                              {content.sugar}
                            </span>
                            <span className="block text-[9px] font-bold text-[#7A4026] uppercase">Sugar</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Desktop: Tab Layout */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch">
          {/* Left Vertical Tabs Pill Menu */}
          <div className="col-span-3 flex flex-col gap-2 bg-white/70 p-3 rounded-3xl border border-[#ECD9C0] shadow-sm">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 text-left whitespace-nowrap ${
                    isActive
                      ? 'bg-[#FFF4E4] text-[#381E15] shadow-sm ring-1 ring-[#4A2818]/30 font-extrabold scale-[1.02]'
                      : 'text-[#7D6B60] hover:text-[#381E15] hover:bg-white'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#7A4026] flex-shrink-0" />
                  <span className="flex-1">{tab.label}</span>
                  {isActive && <span className="text-xs text-[#7A4026]">+</span>}
                </button>
              );
            })}
          </div>

          {/* Middle Content Panel with Nutrition Stat Badges */}
          <div className="col-span-5 bg-white/80 rounded-3xl p-8 border border-[#ECD9C0] shadow-sm flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <h3 className="font-bubble text-2xl font-bold text-[#2C1810]">
                  {activeContent.title}
                </h3>
                <p className="text-sm text-[#7D6B60] leading-relaxed font-sans">
                  {activeContent.text}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* 3 Nutrition Stat Badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#ECD9C0]/60 mt-6">
              <div className="bg-[#FFF4E4] p-3 rounded-2xl border border-[#F2E0CD] text-center">
                <span className="block font-bubble text-3xl font-bold text-[#2C1810]">
                  {activeContent.calories}
                </span>
                <span className="block text-[11px] font-bold text-[#7A4026] uppercase">
                  Calories
                </span>
                <span className="block text-[9px] text-[#8C7568]">per pint</span>
              </div>

              <div className="bg-[#FFF4E4] p-3 rounded-2xl border border-[#F2E0CD] text-center">
                <span className="block font-bubble text-3xl font-bold text-[#2C1810]">
                  {activeContent.protein}
                </span>
                <span className="block text-[11px] font-bold text-[#7A4026] uppercase">
                  Protein
                </span>
                <span className="block text-[9px] text-[#8C7568]">per pint</span>
              </div>

              <div className="bg-[#FFF4E4] p-3 rounded-2xl border border-[#F2E0CD] text-center">
                <span className="block font-bubble text-3xl font-bold text-[#2C1810]">
                  {activeContent.sugar}
                </span>
                <span className="block text-[11px] font-bold text-[#7A4026] uppercase">
                  Added
                </span>
                <span className="block text-[9px] text-[#8C7568]">Sugar</span>
              </div>
            </div>
          </div>

          {/* Right Product Lifestyle Image Card */}
          <div className="col-span-4 rounded-3xl overflow-hidden shadow-lg border-2 border-[#ECD9C0] relative min-h-[260px] aspect-[4/3] lg:aspect-auto">
            <img
              src="/cookies_bowl.png"
              alt="Artisan ice cream bowl"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};