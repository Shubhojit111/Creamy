import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShieldCheck, Sparkles, Award } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 p-6 md:p-8"
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <span className="font-bubble text-3xl font-bold text-gray-900">
                  About Creamy
                </span>
                <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  Swedish Style
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-transform hover:rotate-90"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-6 space-y-4 text-sm text-gray-600 leading-relaxed">
              <p className="text-base text-gray-800 font-medium">
                Creamy crafts ultra-indulgent, Swedish-style light ice cream made with real dairy, pure Madagascar bourbon vanilla, and zero added refined sugars.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-100/70 text-center">
                  <Heart className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-bold text-xs text-gray-900 uppercase">Real Ingredients</h4>
                  <p className="text-[11px] text-gray-500 mt-1">Rich fresh cream and natural botanicals without junk fillers.</p>
                </div>
                <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100/70 text-center">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-bold text-xs text-gray-900 uppercase">Keto & Low Cal</h4>
                  <p className="text-[11px] text-gray-500 mt-1">Only 240-280 calories per entire pint with 5g net carbs.</p>
                </div>
                <div className="bg-pink-50/70 p-4 rounded-2xl border border-pink-100/70 text-center">
                  <Award className="w-6 h-6 text-pink-600 mx-auto mb-2" />
                  <h4 className="font-bold text-xs text-gray-900 uppercase">Award Winning</h4>
                  <p className="text-[11px] text-gray-500 mt-1">Rated 4.9/5 across over 10,000 verified reviews nationwide.</p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <p className="text-xs text-gray-700">
                  Engineered with sweet Swedish love so you can eat the whole pint without a second thought.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={onClose}
                className="bg-gray-900 hover:bg-black text-white font-bold text-xs uppercase px-6 py-2.5 rounded-full"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
