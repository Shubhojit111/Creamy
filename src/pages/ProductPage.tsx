import React, { useEffect } from 'react';
import type { Flavor } from '../data/flavors';
import { Navbar } from '../components/Navbar';
import { ProductShowcase } from '../components/pdp/ProductShowcase';
import { ProductInfoTabs } from '../components/pdp/ProductInfoTabs';
import { CustomerReviews } from '../components/pdp/CustomerReviews';
import { RelatedProducts } from '../components/pdp/RelatedProducts';
import { WhyLoveBanner } from '../components/pdp/WhyLoveBanner';
import { PDPBrandStory } from '../components/pdp/PDPBrandStory';
import { Newsletter } from '../components/Newsletter';
import { PDPFooter } from '../components/pdp/PDPFooter';

interface ProductPageProps {
  currentFlavor: Flavor;
  onSelectFlavor: (flavorId: string) => void;
  onNavigateToHome: () => void;
  onAddToCart: (flavor: Flavor, size: string, quantity?: number) => void;
  onBuyNow: (flavor: Flavor, size: string, quantity?: number) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAccount: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onOpenMenu: () => void;
  onOpenReviews: () => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  currentFlavor,
  onSelectFlavor,
  onNavigateToHome,
  onAddToCart,
  onBuyNow,
  cartCount,
  onOpenCart,
  onOpenAccount,
  onOpenAbout,
  onOpenContact,
  onOpenMenu,
  onOpenReviews,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentFlavor.id]);

  return (
    <div className="w-full min-h-screen bg-[#FFF8EB] text-gray-900 overflow-x-hidden font-sans selection:bg-[#4A2417]/20 selection:text-[#4A2417] pt-24 md:pt-28">
      {/* 1. Header / Navbar */}
      <Navbar
        activeNav="MENU"
        forceSolid
        onOrderNow={() => document.getElementById('pdp-add-to-cart')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
        onNavClick={(item: string) => {
          if (item === 'HOME') onNavigateToHome();
          else if (item === 'MENU') onOpenMenu();
          else if (item === 'ABOUT') onOpenAbout();
          else if (item === 'CONTACT') onOpenContact();
        }}
        cartCount={cartCount}
        onOpenCart={onOpenCart}
        onOpenAccount={onOpenAccount}
      />

      {/* 3. Breadcrumbs Navigation (Clickable) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-6 pb-2 text-xs font-semibold text-[#8C7568] flex items-center gap-1.5">
        <button
          onClick={onNavigateToHome}
          className="hover:text-[#381E15] transition-colors underline-offset-2 hover:underline"
        >
          Home
        </button>
        <span className="text-[#B8A296]">&gt;</span>
        <button
          onClick={onOpenMenu}
          className="hover:text-[#381E15] transition-colors"
        >
          Flavors
        </button>
        <span className="text-[#B8A296]">&gt;</span>
        <span className="text-[#381E15] font-bold">{currentFlavor.name}</span>
      </div>

      {/* 4. Main Product Showcase (Clean Unified 2-Column: Left Gallery + Right Unified Details & Cart) */}
      <ProductShowcase
        currentFlavor={currentFlavor}
        onSelectFlavor={onSelectFlavor}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* 5. Product Information Tabs & Nutrition Counters */}
      <ProductInfoTabs currentFlavor={currentFlavor} />

      {/* 6. Customer Reviews & Star Breakdown */}
      <CustomerReviews onOpenAllReviews={onOpenReviews} />

      {/* 7. "You May Also Love" Related Products Carousel */}
      <RelatedProducts
        onSelectProduct={onSelectFlavor}
        onAddToCart={(item) => onAddToCart(item, '16 oz (1 Pint)')}
        onOpenMenu={onOpenMenu}
      />

      {/* 8. Why You'll Love It (Dark Banner with Large Scoop) */}
      <WhyLoveBanner />

      {/* 9. Brand Story (Made with Passion, Shared with Love) */}
      <PDPBrandStory onLearnMore={onOpenAbout} />

      {/* 10. Newsletter (Stay in the Loop) */}
      <Newsletter />

      {/* 11. Editorial Footer */}
      <PDPFooter
        onOpenMenu={onOpenMenu}
        onOpenAbout={onOpenAbout}
        onOpenContact={onOpenContact}
      />
    </div>
  );
};

