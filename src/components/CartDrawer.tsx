import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Flavor } from '../data/flavors';

export interface CartItem {
  id: string;
  flavor: Flavor;
  size: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [isOrdered, setIsOrdered] = useState(false);

  const subtotal = items.reduce(
    (acc, item) => acc + item.flavor.price * item.quantity,
    0
  );
  const freeShippingThreshold = 25.0;
  const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remaining = Math.max(0, freeShippingThreshold - subtotal);

  const handleCheckout = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#459ab8', '#9c5c47', '#4ea162', '#cc4663', '#faeed1'],
    });
    setIsOrdered(true);
    setTimeout(() => {
      onClearCart();
      setIsOrdered(false);
      onClose();
    }, 2800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bubble text-lg font-bold text-gray-900">
                    Your Ice Cream Bag
                  </h3>
                  <p className="text-[11px] text-gray-500 font-medium">
                    {items.reduce((acc, i) => acc + i.quantity, 0)} items selected
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

            {/* Free Shipping Progress Bar */}
            <div className="px-6 py-3 bg-amber-50/70 border-b border-amber-100/60">
              <div className="flex items-center justify-between text-xs font-semibold text-amber-900 mb-1.5">
                <span>
                  {remaining > 0
                    ? `Add $${remaining.toFixed(2)} more for FREE dry-ice shipping`
                    : '🎉 You unlocked FREE dry-ice delivery!'}
                </span>
                <span className="text-[11px] font-bold">{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-2 bg-amber-200/50 rounded-full overflow-hidden">
                <div
                  style={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-500"
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 divide-y divide-gray-100">
              {isOrdered ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 animate-bounce" />
                  </div>
                  <h4 className="font-bubble text-2xl font-bold text-gray-900">
                    Order Placed!
                  </h4>
                  <p className="text-sm text-gray-600 max-w-xs">
                    Your creamy Swedish indulgence is being packed in dry ice and rushed to your doorstep!
                  </p>
                </div>
              ) : items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-bubble text-xl font-bold text-gray-800">
                    Your Bag is Empty
                  </h4>
                  <p className="text-xs text-gray-500 max-w-xs">
                    Choose your favorite Swedish Vanilj, Cookies and Kräm, or Mint Chokladchip to get started!
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="py-4 flex items-center gap-3.5 first:pt-0 last:pb-0">
                    {/* Item Image */}
                    <div
                      style={{ background: item.flavor.color.primary + '18' }}
                      className="w-16 h-16 rounded-2xl flex items-center justify-center p-1.5 flex-shrink-0"
                    >
                      <img
                        src={item.flavor.image}
                        alt={item.flavor.name}
                        className="w-full h-full object-contain drop-shadow-sm"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bubble font-bold text-sm text-gray-900 truncate">
                        {item.flavor.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-0.5">
                        <span className="bg-gray-100 px-1.5 py-0.5 rounded font-medium">
                          Size: {item.size}
                        </span>
                        <span>•</span>
                        <span className="font-bold text-gray-900">
                          ${(item.flavor.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-gray-200 rounded-full overflow-hidden bg-gray-50">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-6 h-6 flex items-center justify-center hover:bg-gray-200 text-gray-700"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-6 h-6 flex items-center justify-center hover:bg-gray-200 text-gray-700"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {!isOrdered && items.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-4">
                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dry-Ice Insulated Packaging</span>
                    <span className="text-emerald-700 font-semibold">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#181818] hover:bg-black text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
