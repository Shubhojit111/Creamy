import React, { useState, useEffect } from 'react';
import { User, ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  activeNav: string;
  onNavClick: (item: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAccount: () => void;
  /** Force the white sticky look (use on catalog / product / about / contact pages) */
  forceSolid?: boolean;
  /** Called when the sticky "Order Now" button is clicked */
  onOrderNow?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeNav,
  onNavClick,
  cartCount,
  onOpenCart,
  onOpenAccount,
  forceSolid = false,
  onOrderNow,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(forceSolid);

  useEffect(() => {
    if (forceSolid) {
      setScrolled(true);
      return;
    }
    const onScroll = () => {
      setScrolled(window.scrollY > 48);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [forceSolid]);

  const navItems = [
    { id: 'HOME', label: 'Home' },
    { id: 'MENU', label: 'Menu' },
    { id: 'ABOUT', label: 'About' },
    { id: 'CONTACT', label: 'Contact' },
  ];

  const handleNavItemClick = (item: string) => {
    onNavClick(item);
    setIsMobileMenuOpen(false);
  };

  const isSolid = scrolled;

  return (
    <>
      {/* Fixed wrapper — padding animates so the bar floats down smoothly */}
      <motion.header
        initial={false}
        animate={{
          paddingTop: isSolid ? 12 : 0,
          paddingLeft: isSolid ? 12 : 0,
          paddingRight: isSolid ? 12 : 0,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 30, mass: 0.9 }}
        className="fixed top-0 left-0 right-0 z-[999] flex justify-center pointer-events-none"
      >
        {/* Morphing bar — transparent over hero, white floating pill after scroll */}
        <motion.div
          initial={false}
          animate={{
            backgroundColor: isSolid ? 'rgba(255,253,248,0.96)' : 'rgba(255,255,255,0)',
            boxShadow: isSolid
              ? '0 16px 40px rgba(60,20,30,0.16), 0 2px 8px rgba(60,20,30,0.08), inset 0 1px 0 rgba(255,255,255,0.9)'
              : '0 0px 0px rgba(0,0,0,0)',
            borderColor: isSolid ? 'rgba(201,58,92,0.20)' : 'rgba(255,255,255,0)',
          }}
          transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          className="pointer-events-auto w-full max-w-7xl flex items-center justify-between gap-2 border"
          style={{
            borderRadius: isSolid ? 9999 : 0,
            paddingTop: isSolid ? 8 : 14,
            paddingBottom: isSolid ? 8 : 14,
            paddingLeft: isSolid ? 18 : 20,
            paddingRight: isSolid ? 10 : 20,
            backdropFilter: isSolid ? 'blur(16px)' : 'none',
            WebkitBackdropFilter: isSolid ? 'blur(16px)' : 'none',
            transition: 'border-radius 0.45s cubic-bezier(0.32,0.72,0,1), padding 0.45s cubic-bezier(0.32,0.72,0,1)',
          }}
        >
          {/* Brand Logo */}
          <button
            onClick={() => onNavClick('HOME')}
            className="group flex items-center gap-1.5 text-left focus:outline-none shrink-0 pl-1"
          >
            <span
              className="font-bubble text-[22px] sm:text-2xl md:text-[27px] font-bold tracking-tight transition-colors duration-500 group-hover:scale-[1.04] group-active:scale-95 inline-block"
              style={{ color: isSolid ? '#C93A5C' : '#ffffff', textShadow: isSolid ? 'none' : '0 2px 12px rgba(0,0,0,0.18)' }}
            >
              Creamy
            </span>
          </button>

          {/* Center Nav — glass capsule on hero, flat on sticky */}
          <nav
            className="hidden md:flex items-center transition-all duration-500 rounded-full"
            style={{
              backgroundColor: isSolid ? 'rgba(0,0,0,0)' : undefined,
              backgroundImage: isSolid
                ? undefined
                : 'linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0.10))',
              border: isSolid ? '1px solid transparent' : '1px solid rgba(255,255,255,0.28)',
              backdropFilter: isSolid ? 'none' : 'blur(14px)',
              WebkitBackdropFilter: isSolid ? 'none' : 'blur(14px)',
              padding: '4px',
              gap: 2,
              boxShadow: isSolid
                ? 'none'
                : '0 4px 18px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.35)',
            }}
          >
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavClick(item.id)}
                  className="relative rounded-full text-[13px] font-semibold tracking-wide px-5 py-2 transition-colors duration-500 outline-none"
                  style={{ color: isActive ? (isSolid ? '#ffffff' : '#2B1610') : isSolid ? '#3d3d3d' : 'rgba(255,255,255,0.88)' }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-full"
                      style={{
                        backgroundColor: isSolid ? '#C93A5C' : '#ffffff',
                        boxShadow: isSolid
                          ? '0 4px 14px rgba(201,58,92,0.45), inset 0 1px 0 rgba(255,255,255,0.35)'
                          : '0 4px 14px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.8)',
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenAccount}
              aria-label="User Account"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 active:scale-95 hover:scale-105"
              style={{
                backgroundColor: isSolid ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.16)',
                border: isSolid ? '1px solid transparent' : '1px solid rgba(255,255,255,0.28)',
                color: isSolid ? '#2B1610' : '#ffffff',
                backdropFilter: isSolid ? 'none' : 'blur(10px)',
              }}
            >
              <User className="w-[17px] h-[17px] stroke-[2.2]" />
            </button>
            <button
              onClick={onOpenCart}
              aria-label="Shopping Cart"
              className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 active:scale-95 hover:scale-105"
              style={{
                backgroundColor: isSolid ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.16)',
                border: isSolid ? '1px solid transparent' : '1px solid rgba(255,255,255,0.28)',
                color: isSolid ? '#2B1610' : '#ffffff',
                backdropFilter: isSolid ? 'none' : 'blur(10px)',
              }}
            >
              <ShoppingBag className="w-[17px] h-[17px] stroke-[2.2]" />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.4 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                  className="absolute -top-1 -right-1 bg-[#FF3B5D] text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center shadow-md border-2 border-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Order Now — smoothly expands in after scroll */}
            <AnimatePresence initial={false}>
              {isSolid && (
                <motion.button
                  key="order-now"
                  initial={{ opacity: 0, scale: 0.7, width: 0, marginLeft: -10 }}
                  animate={{ opacity: 1, scale: 1, width: 'auto', marginLeft: 2 }}
                  exit={{ opacity: 0, scale: 0.7, width: 0, marginLeft: -10 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  onClick={() => (onOrderNow ? onOrderNow() : onNavClick('MENU'))}
                  className="group relative overflow-hidden whitespace-nowrap rounded-full text-white text-[13px] font-semibold px-5 py-2.5 hover:brightness-105 active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #F27394, #E14A6E)',
                    boxShadow:
                      '0 6px 18px rgba(237,91,125,0.45), inset 0 1px 0 rgba(255,255,255,0.4)',
                  }}
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  <span className="relative">Order Now</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile: cart + hamburger (colors morph too) */}
          <div className="flex md:hidden items-center gap-2 shrink-0">
            <button
              onClick={onOpenCart}
              aria-label="Shopping Cart"
              className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 active:scale-95"
              style={{
                backgroundColor: isSolid ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.16)',
                border: isSolid ? '1px solid transparent' : '1px solid rgba(255,255,255,0.28)',
                color: isSolid ? '#2B1610' : '#ffffff',
              }}
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.4 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                  className="absolute -top-1 -right-1 bg-[#FF3B5D] text-white text-[9px] font-bold min-w-[16px] h-4 px-0.5 rounded-full flex items-center justify-center border-2 border-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 active:scale-95"
              style={{
                backgroundColor: isSolid ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.16)',
                border: isSolid ? '1px solid transparent' : '1px solid rgba(255,255,255,0.28)',
                color: isSolid ? '#2B1610' : '#ffffff',
              }}
            >
              <Menu className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>
        </motion.div>
      </motion.header>

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
              className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 z-[1001] h-full w-[68%] max-w-[300px] bg-[#2E170F] shadow-2xl flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <span className="font-bubble text-xl font-bold text-white">Creamy</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close Menu"
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-all"
                >
                  <X className="w-4 h-4 stroke-[2.2]" />
                </button>
              </div>

              <div className="flex flex-col py-3">
                {navItems.map((item, idx) => {
                  const isActive = activeNav === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + idx * 0.06 }}
                      onClick={() => handleNavItemClick(item.id)}
                      className={`text-left px-5 py-3.5 text-sm font-bold tracking-wider transition-all duration-200 flex items-center gap-2.5 ${
                        isActive
                          ? 'bg-white/10 text-white border-l-2 border-white'
                          : 'text-white/70 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                          isActive ? 'bg-[#FF8FAB] shadow-[0_0_8px_rgba(255,143,171,0.9)]' : 'bg-transparent'
                        }`}
                      />
                      {item.label}
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-auto px-5 py-4 border-t border-white/10 space-y-3">
                <button
                  onClick={() => (onOrderNow ? onOrderNow() : handleNavItemClick('MENU'))}
                  className="w-full rounded-full text-white text-[13px] font-semibold px-5 py-2.5"
                  style={{ backgroundColor: '#ED5B7D' }}
                >
                  Order Now
                </button>
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
