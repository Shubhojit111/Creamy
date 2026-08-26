import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FLAVORS } from '../data/flavors';
import type { Flavor } from '../data/flavors';
import { Navbar } from '../components/Navbar';
import { HeroContent } from '../components/HeroContent';
import { SizeSelector } from '../components/SizeSelector';
import { IceCreamCarousel } from '../components/IceCreamCarousel';
import { BottomControls } from '../components/BottomControls';
import { CreamWave } from '../components/CreamWave';
import { WhyLove } from '../components/WhyLove';
import { CustomerFavorites } from '../components/CustomerFavorites';
import { LimitedOffer } from '../components/LimitedOffer';
import { BrandStory } from '../components/BrandStory';
import { SweetMoments } from '../components/SweetMoments';
import { FlavorExperience } from '../components/FlavorExperience';
import { Newsletter } from '../components/Newsletter';
import { Footer } from '../components/Footer';

interface HomePageProps {
  onNavigateToProduct: (flavorId?: string) => void;
  onNavigateToCatalog: () => void;
  onNavigateToAbout: () => void;
  onNavigateToContact: () => void;
  onAddToCart: (flavor: Flavor, size: string, quantity?: number) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAccount: () => void;
  onOpenReviews: (flavor: Flavor) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigateToProduct,
  onNavigateToCatalog,
  onNavigateToAbout,
  onNavigateToContact,
  onAddToCart,
  cartCount,
  onOpenCart,
  onOpenAccount,
  onOpenReviews,
}) => {
  const [flavorIndex, setFlavorIndex] = useState(1); // Default to Cookies & Kräm
  const [direction, setDirection] = useState(1);
  const [selectedSize, setSelectedSize] = useState('100g');
  const [activeNav, setActiveNav] = useState('HOME');
  const heroRef = useRef<HTMLDivElement>(null);

  const currentFlavor = FLAVORS[flavorIndex];

  const handleNext = useCallback(() => {
    setDirection(1);
    setFlavorIndex((prev) => (prev + 1) % FLAVORS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setFlavorIndex((prev) => (prev - 1 + FLAVORS.length) % FLAVORS.length);
  }, []);

  const handleSelectFlavor = useCallback((index: number) => {
    setDirection(index > flavorIndex ? 1 : -1);
    setFlavorIndex(index);
  }, [flavorIndex]);

  // Keyboard navigation for hero carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.body.style.overflow !== 'hidden') {
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const handleNavClick = (navItem: string) => {
    setActiveNav(navItem);
    if (navItem === 'HOME') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (navItem === 'MENU') {
      onNavigateToCatalog();
    } else if (navItem === 'ABOUT') {
      onNavigateToAbout();
    } else if (navItem === 'CONTACT') {
      onNavigateToContact();
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FFF8EB] text-gray-900 overflow-x-hidden font-sans selection:bg-[#4A2417]/20 selection:text-[#4A2417]">
      {/* =========================================================================
          SECTION 1: HERO SECTION (Full Width Viewport, Exact Design)
          ========================================================================= */}
      <section
        ref={heroRef}
        style={{
          backgroundColor: currentFlavor.color.card,
        }}
        className="w-full min-h-[660px] lg:h-screen lg:min-h-[700px] lg:max-h-[880px] relative flex flex-col justify-between transition-colors duration-700 bg-transition overflow-hidden z-10"
      >
        {/* Subtle radial lighting for 3D depth & floating background cookie crumbs */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/15 via-transparent to-white/10 pointer-events-none z-0" />

        {/* Floating chocolate/flavor crumbs */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-black/20 rounded-sm rotate-45 pointer-events-none animate-float-slow" />
        <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-black/15 rounded-sm -rotate-12 pointer-events-none animate-float-slow" />
        <div className="absolute top-2/3 left-1/3 w-2.5 h-2.5 bg-black/20 rounded-sm rotate-12 pointer-events-none animate-float-slow" />

        {/* Navbar */}
        <Navbar
          activeNav={activeNav}
          onNavClick={handleNavClick}
          cartCount={cartCount}
          onOpenCart={onOpenCart}
          onOpenAccount={onOpenAccount}
        />

        {/* Main Hero Content Area */}
        <div className="relative flex-1 w-full max-w-7xl mx-auto flex flex-col px-6 md:px-12 z-20 min-h-0 justify-center">
          {/* Top-Right Size Selector (50g, 75g, 100g) */}
          <div className="absolute top-10 right-6 md:right-12 z-30">
            <SizeSelector
              sizes={currentFlavor.sizes}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
              accentColor={currentFlavor.color.accent}
            />
          </div>

          {/* Grid Layout: Left Hero Text + Center/Right Interactive Carousel */}
          <div className="relative flex-1 grid grid-cols-1 md:grid-cols-12 h-full items-center gap-6 md:gap-0 pb-8 md:pb-0">
            {/* Left Hero Column */}
            <div className="md:col-span-5 h-full flex flex-col justify-center relative z-20 pt-4 md:pt-0">
              <HeroContent
                currentFlavor={currentFlavor}
                onOrderNow={() => onNavigateToProduct(currentFlavor.id)}
                onSeeMenu={onNavigateToCatalog}
                onOpenReviews={() => onOpenReviews(currentFlavor)}
              />
            </div>

            {/* Right Hero Column: Central 3D Ice Cream Carousel Stage */}
            <div className="md:col-span-7 h-full flex items-center justify-center relative z-10 min-h-[340px] sm:min-h-[400px]">
              <IceCreamCarousel
                flavors={FLAVORS}
                currentIndex={flavorIndex}
                direction={direction}
                onSelectFlavor={handleSelectFlavor}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            </div>
          </div>
        </div>

        {/* Bottom Cream Wave Transition */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
          <CreamWave fillColor="#FFF8EB" className="h-36 sm:h-44 md:h-52" />
        </div>

        {/* Bottom Controls (Carousel Arrows & Social Links) */}
        <div className="relative z-30 max-w-7xl mx-auto w-full">
          <BottomControls onPrev={handlePrev} onNext={handleNext} />
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: WHY YOU'LL LOVE IT (Pure Ingredients. Pure Happiness.)
          ========================================================================= */}
      <WhyLove />

      {/* =========================================================================
          SECTION 3: CUSTOMER FAVORITES (Best Sellers Carousel)
          ========================================================================= */}
      <CustomerFavorites
        onSelectProduct={onNavigateToProduct}
        onAddToCart={(item) => onAddToCart(item, '100g')}
        onOpenMenu={onNavigateToCatalog}
      />

      {/* =========================================================================
          SECTION 4: LIMITED TIME OFFER (Buy 2 Get 1 Free!)
          ========================================================================= */}
      <LimitedOffer onOrderNow={() => onNavigateToProduct('cookies')} />

      {/* =========================================================================
          SECTION 5: BRAND STORY (Made with Passion, Shared with Love.)
          ========================================================================= */}
      <BrandStory onLearnMore={onNavigateToAbout} />

      {/* =========================================================================
          SECTION 6: SWEET MOMENTS (Instagram Gallery)
          ========================================================================= */}
      <SweetMoments />

      {/* =========================================================================
          SECTION 7: PRODUCT EXPERIENCE / FLAVOR STORY
          ========================================================================= */}
      <FlavorExperience
        onSelectFlavor={(f) => onNavigateToProduct(f.id)}
        onAddToCart={(f, size) => onAddToCart(f, size)}
      />

      {/* =========================================================================
          SECTION 8: NEWSLETTER (Stay in the Loop)
          ========================================================================= */}
      <Newsletter />

      {/* =========================================================================
          SECTION 9: EDITORIAL FOOTER
          ========================================================================= */}
      <Footer
        onOpenMenu={onNavigateToCatalog}
        onOpenAbout={onNavigateToAbout}
        onOpenContact={onNavigateToContact}
      />
    </div>
  );
};
