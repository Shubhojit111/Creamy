import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, CheckCircle, ThumbsUp } from 'lucide-react';
import type { Flavor } from '../data/flavors';

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  flavor: Flavor;
}

export const ReviewsModal: React.FC<ReviewsModalProps> = ({
  isOpen,
  onClose,
  flavor,
}) => {
  const reviews = [
    {
      name: 'Emma Lindqvist',
      rating: 5,
      date: '2 days ago',
      title: 'Legit tastes like full-fat gourmet ice cream!',
      content:
        'I cannot believe this is only 240 calories for the entire pint. The texture is so creamy and velvety smooth without any icy artificial aftertaste. 10/10 will buy in bulk!',
      verified: true,
      helpful: 48,
    },
    {
      name: 'David Miller',
      rating: 5,
      date: '1 week ago',
      title: 'Cookies and Kräm is my new obsession',
      content:
        'The cookie-to-cream ratio is perfection. As someone following a ketogenic diet, this has completely cured my sweet tooth cravings. Absolutely delicious.',
      verified: true,
      helpful: 36,
    },
    {
      name: 'Sofia Berg',
      rating: 5,
      date: '2 weeks ago',
      title: 'The mint chocolate chip is refreshing and crisp',
      content:
        'Very authentic natural peppermint extract with rich dark chocolate chips that melt in your mouth. Best healthy ice cream brand on the market by far.',
      verified: true,
      helpful: 29,
    },
  ];

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
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-amber-50/40">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-amber-400 text-black px-2.5 py-1 rounded-full font-bold text-sm shadow-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{flavor.rating}</span>
                </div>
                <div>
                  <h3 className="font-bubble text-xl font-bold text-gray-900">
                    {flavor.reviewsCount} Verified Customer Reviews
                  </h3>
                  <p className="text-xs text-gray-500">
                    Showing feedback for {flavor.name} and top favorites
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-transform hover:rotate-90"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Reviews List */}
            <div className="p-6 overflow-y-auto space-y-4 divide-y divide-gray-100">
              {reviews.map((rev, i) => (
                <div key={i} className="pt-4 first:pt-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-gray-900">
                        {rev.name}
                      </span>
                      {rev.verified && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
                          <CheckCircle className="w-3 h-3" /> Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{rev.date}</span>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400 mb-1.5">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <h4 className="font-bold text-xs text-gray-900 mb-1">
                    {rev.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed mb-2">
                    {rev.content}
                  </p>

                  <div className="flex items-center gap-1 text-[11px] text-gray-400">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{rev.helpful} people found this helpful</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span>99.4% would recommend to a friend</span>
              <button
                onClick={onClose}
                className="bg-gray-900 hover:bg-black text-white font-bold px-5 py-2 rounded-full"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
