import React from 'react';
import { User, ShoppingBag } from 'lucide-react';

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
  const navItems = ['HOME', 'MENU', 'ABOUT', 'CONTACT'];

  return (
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

      {/* Center Nav Capsule - Responsive */}
      <nav className="bg-white/95 backdrop-blur-md rounded-full px-1 sm:px-1.5 py-0.5 sm:py-1 shadow-md border border-white/60 flex items-center">
        {navItems.map((item) => {
          const isActive = activeNav === item;
          return (
            <button
              key={item}
              onClick={() => onNavClick(item)}
              className={`text-[9px] sm:text-[11px] md:text-xs font-bold tracking-wider uppercase transition-all duration-200 rounded-full ${
                isActive
                  ? 'bg-[#181818] text-white px-2.5 sm:px-4 py-1 sm:py-1.5 shadow-sm'
                  : 'text-[#444444] hover:text-black px-1.5 sm:px-3 py-1 sm:py-1.5 hover:bg-black/5'
              }`}
            >
              {item}
            </button>
          );
        })}
      </nav>

      {/* Right User & Cart Icons */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* User Profile */}
        <button
          onClick={onOpenAccount}
          aria-label="User Account"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/35 active:scale-95 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/30 shadow-sm"
        >
          <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
        </button>

        {/* Shopping Cart with Badge */}
        <button
          onClick={onOpenCart}
          aria-label="Shopping Cart"
          className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/35 active:scale-95 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/30 shadow-sm"
        >
          <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#E53935] text-white text-[9px] sm:text-[10px] font-bold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center shadow-sm animate-pulse-subtle">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
