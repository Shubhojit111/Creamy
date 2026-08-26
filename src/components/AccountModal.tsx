import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Gift, Clock, LogIn } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
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
            className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden z-10 p-6"
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <h3 className="font-bubble text-lg font-bold text-gray-900">
                  Creamy Club
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100/70 flex items-center gap-3">
                <Gift className="w-5 h-5 text-amber-700 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-xs text-amber-900">150 Scoop Points</h4>
                  <p className="text-[10px] text-amber-700">You are 50 points away from a FREE pint!</p>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <button
                  onClick={onClose}
                  className="w-full py-2 px-3 rounded-xl hover:bg-gray-50 flex items-center justify-between text-gray-700 font-medium"
                >
                  <span className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-gray-400" /> Order History
                  </span>
                  <span className="text-[10px] text-gray-400">3 orders</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2 px-3 rounded-xl hover:bg-gray-50 flex items-center justify-between text-gray-700 font-medium"
                >
                  <span className="flex items-center gap-2">
                    <Gift className="w-3.5 h-3.5 text-gray-400" /> VIP Perks & Rewards
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">Active</span>
                </button>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-gray-900 hover:bg-black text-white font-bold text-xs uppercase py-2.5 rounded-full flex items-center justify-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" /> Sign In / Account
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
