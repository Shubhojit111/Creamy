import React, { useState } from 'react';
import { User, ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  activeNav: string;
  onNavClick: (item: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAccount: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeNav,
  onNavClick,
  cartCount,
  onOpenCart,
  onOpenAccount,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = ['HOME', 'MENU', 'ABOUT', 'CONTACT'];

  const handleNavItemClick = (item: string) => {
    onNavClick(item);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="w-full flex items-center justify-between px-4 sm:px-6 md:px-20 py-3 sm:py-4 relative z-40">
        {/* Brand Logo */}
        <button
          onClick={() => onNavClick('HOME')}
          className="group flex items-center gap-1.5 text-left focus:outline-none"
        >
          <span className="font-bubble text-xl sm:text-2xl md:text-[28px] font-bold text-white tracking-tight drop-shadow-sm transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
            Creamy
          </span>
        </button>

        {/* Center Nav Capsule - Desktop only */}
        <nav className="hidden md:flex bg-white/95 backdrop-blur-md rounded-full px-1.5 py-1 shadow-md border border-white/60 items-center">
          {navItems.map((item) => {
            const isActive = activeNav === item;
            return (
              <button
                key={item}
                onClick={() => onNavClick(item)}
                className={`text-xs font-bold tracking-wider uppercase transition-all duration-200 rounded-full ${
                  isActive
                    ? 'bg-[#181818] text-white px-4 py-1.5 shadow-sm'
                    : 'text-[#444444] hover:text-black px-3 py-1.5 hover:bg-black/5'
                }`}
              >
                {item}
              </button>
            );
          })}
        </nav>

        {/* Right Icons - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenAccount}
            aria-label="User Account"
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/35 active:scale-95 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/30 shadow-sm"
          >
            <User className="w-4 h-4 stroke-[2.2]" />
          </button>
          <button
            onClick={onOpenCart}
            aria-label="Shopping Cart"
            className="relative w-8 h-8 rounded-full bg-white/20 hover:bg-white/35 active:scale-95 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/30 shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#E53935] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-pulse-subtle">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile: Cart + Hamburger only */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenCart}
            aria-label="Shopping Cart"
            className="relative w-8 h-8 rounded-full bg-white/20 hover:bg-white/35 active:scale-95 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/30 shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#E53935] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-sm animate-pulse-subtle">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/35 active:scale-95 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/30 shadow-sm"
          >
            <Menu className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>
      </header>

      {/* Mobile Slide-in Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 z-[70] h-full w-[68%] max-w-[300px] bg-[#2E170F] shadow-2xl flex flex-col md:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <span className="font-bubble text-xl font-bold text-white">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close Menu"
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-all"
                >
                  <X className="w-4 h-4 stroke-[2.2]" />
                </button>
              </div>

              {/* Nav Items */}
              <div className="flex flex-col py-3">
                {navItems.map((item, idx) => {
                  const isActive = activeNav === item;
                  return (
                    <motion.button
                      key={item}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + idx * 0.06 }}
                      onClick={() => handleNavItemClick(item)}
                      className={`text-left px-5 py-3.5 text-sm font-bold tracking-wider uppercase transition-all duration-200 ${
                        isActive
                          ? 'bg-white/10 text-white border-l-2 border-white'
                          : 'text-white/70 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                      }`}
                    >
                      {item}
                    </motion.button>
                  );
                })}
              </div>

              {/* Account Button */}
              <div className="mt-auto px-5 py-4 border-t border-white/10">
                <button
                  onClick={() => {
                    onOpenAccount();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2.5 text-white/80 hover:text-white text-sm font-semibold transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Account</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};