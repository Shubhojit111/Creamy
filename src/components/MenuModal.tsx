import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Sparkles, Flame, Check } from 'lucide-react';
import { FLAVORS } from '../data/flavors';
import type { Flavor } from '../data/flavors';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFlavor: (index: number) => void;
  onAddToCart: (flavor: Flavor, size: string) => void;
}

export const MenuModal: React.FC<MenuModalProps> = ({
  isOpen,
  onClose,
  onSelectFlavor,
  onAddToCart,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-amber-50/50 via-white to-pink-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-inner">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bubble text-2xl font-bold text-gray-900">
                    Artisanal Flavor Menu
                  </h2>
                  <p className="text-xs text-gray-500 font-medium">
                    Swedish-style light ice cream • Zero added sugar • Keto friendly
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-transform hover:rotate-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Flavors Grid */}
            <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-5">
              {FLAVORS.map((flavor, idx) => (
                <div
                  key={flavor.id}
                  style={{ borderColor: flavor.color.primary + '33' }}
                  className="group relative bg-gray-50/70 hover:bg-white rounded-2xl p-4 border transition-all duration-300 hover:shadow-lg flex items-center gap-4"
                >
                  {/* Flavor Image */}
                  <div
                    onClick={() => {
                      onSelectFlavor(idx);
                      onClose();
                    }}
                    className="cursor-pointer relative w-24 h-28 flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform"
                  >
                    <div
                      style={{ background: flavor.color.glow }}
                      className="absolute inset-2 rounded-full filter blur-md opacity-60"
                    />
                    <img
                      src={flavor.image}
                      alt={flavor.name}
                      className="w-full h-full object-contain relative z-10 drop-shadow-md"
                    />
                  </div>

                  {/* Flavor Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-bubble font-bold text-lg text-gray-900 leading-tight">
                          {flavor.name}
                        </h3>
                        <span className="font-bold text-sm text-gray-900">
                          ${flavor.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        {flavor.subname}
                      </p>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <Flame className="w-3 h-3" /> {flavor.calories} cal/pint
                        </span>
                        <span className="text-[11px] font-semibold text-gray-600 bg-gray-200/60 px-2 py-0.5 rounded-full">
                          Net Carbs: {flavor.nutrition.netCarbs}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onSelectFlavor(idx);
                          onClose();
                        }}
                        className="text-xs font-bold text-gray-700 hover:text-black py-1 px-2.5 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        Preview Hero
                      </button>
                      <button
                        onClick={() => onAddToCart(flavor, '100g')}
                        className="ml-auto inline-flex items-center gap-1 bg-gray-900 hover:bg-black text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-emerald-600" /> Free Shipping on 4+ Pints
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-emerald-600" /> Insulated Dry-Ice Delivery
                </span>
              </div>
              <span className="font-bold text-gray-900">
                100% Satisfaction Guarantee
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
