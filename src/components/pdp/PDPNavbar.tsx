import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, ChevronDown } from 'lucide-react';

interface PDPNavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onSelectFlavorMenu: () => void;
}

export const PDPNavbar: React.FC<PDPNavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenAccount,
  onSelectFlavorMenu,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#2E170F]/95 backdrop-blur-md shadow-lg py-2.5'
          : 'bg-[#381E15] py-3.5'
      } text-white px-6 md:px-12`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Brand Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <span className="font-bubble text-2xl sm:text-3xl font-bold text-white tracking-tight drop-shadow-sm transition-transform duration-200 group-hover:scale-105">
            Creamy
          </span>
        </a>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wider text-[#E8D4C8]">
          <a href="/" className="hover:text-white transition-colors">
            Home
          </a>
          <button
            onClick={onSelectFlavorMenu}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <span>Flavors</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <a href="#shop" onClick={onSelectFlavorMenu} className="hover:text-white transition-colors">
            Shop
          </a>
          <a href="#about" className="hover:text-white transition-colors">
            About Us
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Contact
          </a>
        </nav>

        {/* Right Search Bar & Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Bar Input */}
          <div className="relative hidden sm:flex items-center">
            <Search className="absolute left-3.5 w-3.5 h-3.5 text-[#C4AFA5]" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search flavors..."
              className="w-44 md:w-56 bg-[#4A281B]/80 hover:bg-[#4A281B] focus:bg-[#4A281B] text-white placeholder:text-[#C4AFA5] text-xs pl-9 pr-4 py-2 rounded-full border border-white/10 focus:outline-none focus:border-white/30 transition-all"
            />
          </div>

          {/* Account Icon */}
          <button
            onClick={onOpenAccount}
            aria-label="Account"
            className="w-8 h-8 rounded-full bg-[#4A281B]/70 hover:bg-[#4A281B] text-white flex items-center justify-center transition-all hover:scale-105"
          >
            <User className="w-4 h-4 stroke-[2]" />
          </button>

          {/* Cart Icon with Badge */}
          <button
            onClick={onOpenCart}
            aria-label="Cart"
            className="relative w-8 h-8 rounded-full bg-[#4A281B]/70 hover:bg-[#4A281B] text-white flex items-center justify-center transition-all hover:scale-105"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D32F2F] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-pulse-subtle">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
