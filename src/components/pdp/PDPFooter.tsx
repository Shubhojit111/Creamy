import React from 'react';

interface PDPFooterProps {
  onOpenMenu: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
}

export const PDPFooter: React.FC<PDPFooterProps> = ({
  onOpenMenu,
  onOpenAbout,
  onOpenContact,
}) => {
  return (
    <footer className="w-full bg-[#FFF8EB] pt-12 pb-10 px-6 md:px-12 relative z-20 text-[#4A2818]">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 pb-10 border-b border-[#ECD9C0]">
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-4 flex flex-col items-start">
            <span className="font-bubble text-3xl font-bold text-[#4A2818] tracking-tight mb-2">
              Creamy
            </span>
            <p className="text-xs sm:text-sm text-[#7D6B60] leading-relaxed max-w-xs">
              Made with love.
              <br />
              Enjoyed by all.
            </p>
          </div>

          {/* Column 1: SHOP */}
          <div className="col-span-1 md:col-span-2 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C1810]">
              Shop
            </h4>
            <ul className="space-y-1.5 text-xs text-[#7D6B60]">
              <li>
                <button
                  onClick={onOpenMenu}
                  className="hover:text-black transition-colors"
                >
                  All Flavors
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenMenu}
                  className="hover:text-black transition-colors"
                >
                  Best Sellers
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenMenu}
                  className="hover:text-black transition-colors"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenMenu}
                  className="hover:text-black transition-colors"
                >
                  Gift Cards
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: COMPANY */}
          <div className="col-span-1 md:col-span-2 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C1810]">
              Company
            </h4>
            <ul className="space-y-1.5 text-xs text-[#7D6B60]">
              <li>
                <button
                  onClick={onOpenAbout}
                  className="hover:text-black transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAbout}
                  className="hover:text-black transition-colors"
                >
                  Our Ingredients
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAbout}
                  className="hover:text-black transition-colors"
                >
                  Sustainability
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-black transition-colors"
                >
                  Careers
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: HELP */}
          <div className="col-span-1 md:col-span-2 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C1810]">
              Help
            </h4>
            <ul className="space-y-1.5 text-xs text-[#7D6B60]">
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-black transition-colors"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-black transition-colors"
                >
                  Shipping & Returns
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-black transition-colors"
                >
                  Track Order
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-black transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: FOLLOW US */}
          <div className="col-span-1 md:col-span-2 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C1810]">
              Follow Us
            </h4>
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-7 h-7 rounded-full bg-[#4A2417] hover:bg-black text-white flex items-center justify-center transition-all hover:scale-110"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-7 h-7 rounded-full bg-[#4A2417] hover:bg-black text-white flex items-center justify-center transition-all hover:scale-110"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-7 h-7 rounded-full bg-[#4A2417] hover:bg-black text-white flex items-center justify-center transition-all hover:scale-110"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-7 h-7 rounded-full bg-[#4A2417] hover:bg-black text-white flex items-center justify-center transition-all hover:scale-110"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9B897E] gap-3">
          <p>© 2025 Creamy. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-black transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-black transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
