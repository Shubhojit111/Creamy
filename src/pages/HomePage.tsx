import React, { useState, useEffect, useCallback, useRef } from "react";
import { FLAVORS } from "../data/flavors";
import type { Flavor } from "../data/flavors";
import { Navbar } from "../components/Navbar";
import { HeroContent } from "../components/HeroContent";
import { SizeSelector } from "../components/SizeSelector";
import { IceCreamCarousel } from "../components/IceCreamCarousel";
import { BottomControls, WaveBar } from "../components/BottomControls";
import { CreamWave } from "../components/CreamWave";
import { IcySparkles } from "../components/IcySparkles";
import { WhyLove } from "../components/WhyLove";
import { CustomerFavorites } from "../components/CustomerFavorites";
import { LimitedOffer } from "../components/LimitedOffer";
import { BrandStory } from "../components/BrandStory";
import { SweetMoments } from "../components/SweetMoments";
import { FlavorExperience } from "../components/FlavorExperience";
import { Newsletter } from "../components/Newsletter";
import { Footer } from "../components/Footer";

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
  const [selectedSize, setSelectedSize] = useState("100g");
  const [activeNav, setActiveNav] = useState("HOME");
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

  const handleSelectFlavor = useCallback(
    (index: number) => {
      setDirection(index > flavorIndex ? 1 : -1);
      setFlavorIndex(index);
    },
    [flavorIndex],
  );

  // Keyboard navigation for hero carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.body.style.overflow !== "hidden") {
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  const handleNavClick = (navItem: string) => {
    setActiveNav(navItem);
    if (navItem === "HOME") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (navItem === "MENU") {
      onNavigateToCatalog();
    } else if (navItem === "ABOUT") {
      onNavigateToAbout();
    } else if (navItem === "CONTACT") {
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
        className="w-full min-h-[640px] sm:min-h-[720px] lg:h-screen lg:min-h-[740px] lg:max-h-[920px] relative flex flex-col transition-colors duration-700 bg-transition overflow-hidden z-10"
      >
        {/* Rich premium lighting like the reference — soft glows + light streaks */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/15" />
          <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-white/15 blur-[100px]" />
          <div className="absolute top-0 right-[-120px] w-[520px] h-[520px] rounded-full bg-white/20 blur-[110px]" />
          <div className="absolute bottom-[-140px] left-[-80px] w-[380px] h-[380px] rounded-full bg-black/10 blur-[80px]" />
          {/* silky light streaks */}
          <div className="absolute top-[-60px] left-[8%] w-[220px] h-[420px] rotate-[18deg] bg-gradient-to-b from-white/25 to-transparent blur-[28px] rounded-full" />
          <div className="absolute top-[-40px] right-[24%] w-[90px] h-[380px] rotate-[-14deg] bg-gradient-to-b from-white/20 to-transparent blur-[22px] rounded-full" />
        </div>

        {/* Navbar — fixed, morphs to white sticky pill on scroll */}
        <Navbar
          activeNav={activeNav}
          onNavClick={handleNavClick}
          cartCount={cartCount}
          onOpenCart={onOpenCart}
          onOpenAccount={onOpenAccount}
          onOrderNow={() => onNavigateToProduct(currentFlavor.id)}
        />

        {/* Main Hero Content Area — lifted higher */}
        <div className="relative flex-1 w-full max-w-7xl mx-auto flex flex-col px-5 sm:px-6 md:px-12 z-20 min-h-0 justify-start pt-[78px] md:pt-[92px] pb-28 md:pb-32">
          {/* Top-Right Size Selector (50g, 75g, 100g) */}
          <div className="absolute top-[74px] md:top-[90px] right-5 sm:right-6 md:right-12 z-30">
            <SizeSelector
              sizes={currentFlavor.sizes}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
              accentColor={currentFlavor.color.accent}
            />
          </div>

          {/* Grid Layout: Left Hero Text + Right Product Stage */}
          <div className="relative flex-1 grid grid-cols-1 md:grid-cols-12 h-full items-start md:items-center gap-2 md:gap-0">
            {/* Left Hero Column — starts at top */}
            <div className="md:col-span-6 h-full flex flex-col justify-start relative z-20 pt-8 md:pt-6">
              <HeroContent
                currentFlavor={currentFlavor}
                onOrderNow={() => onNavigateToProduct(currentFlavor.id)}
                onSeeMenu={onNavigateToCatalog}
                onOpenReviews={() => onOpenReviews(currentFlavor)}
              />
            </div>

            {/* Right Hero Column: Product tubs (unchanged images) */}
            <div className="md:col-span-6 h-full w-full flex flex-col items-center justify-center relative z-10 min-h-[380px] sm:min-h-[500px] md:min-h-[560px] md:-mt-8">
              {/* icy frost glow */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[70%] h-40 rounded-full bg-cyan-100/20 blur-3xl pointer-events-none" />
              {/* flavor glow pedestal */}
              <div
                key={currentFlavor.id + "-glow"}
                className="absolute bottom-24 md:bottom-24 left-1/2 -translate-x-1/2 w-[78%] h-16 rounded-[100%] blur-2xl opacity-60 pointer-events-none"
                style={{ background: currentFlavor.color.glow }}
              />
              <div className="absolute bottom-[104px] md:bottom-[104px] left-1/2 -translate-x-1/2 w-[62%] h-10 rounded-[100%] bg-black/25 blur-xl pointer-events-none" />
              <div className="relative flex-1 w-full flex items-center justify-center">
                <IceCreamCarousel
                  flavors={FLAVORS}
                  currentIndex={flavorIndex}
                  direction={direction}
                  onSelectFlavor={handleSelectFlavor}
                  onNext={handleNext}
                  onPrev={handlePrev}
                />
              </div>

                {/* Previous arrow pill — bottom of the ice creams */}
                <div className="absolute -bottom-10 -right-20 z-30 pb-16 md:pb-20 pt-1">
                  <BottomControls onPrev={handlePrev} onNext={handleNext} />
                </div>

              {/* Real Fruit Flavour handwritten note */}
              <div className="absolute top-6 md:top-20 right-0 md:right-2 z-30 hidden sm:flex items-start gap-1.5 rotate-[4deg] pointer-events-none">
                <svg
                  className="w-10 h-10 mt-4 text-white/90"
                  viewBox="0 0 40 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                >
                  <path d="M32 6c-8 0-16 6-19 16" />
                  <path d="M13 22l-2.5 4L15 25" />
                </svg>
                <span className="font-bubble italic text-white text-[15px] md:text-base leading-[1.15] drop-shadow-md">
                  Real
                  <br />
                  Fruit
                  <br />
                  Flavour
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Icy frost sparkles over the whole hero */}
        <IcySparkles />

        {/* Bottom Cream Wave Transition */}
        <div className="absolute bottom-[-1px] left-0 right-0 z-10 pointer-events-none">
          <CreamWave fillColor="#FFF8EB" className="h-28 sm:h-40 md:h-48" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-30">
          <WaveBar />
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
        onAddToCart={(item) => onAddToCart(item, "100g")}
        onOpenMenu={onNavigateToCatalog}
      />

      {/* =========================================================================
          SECTION 4: LIMITED TIME OFFER (Buy 2 Get 1 Free!)
          ========================================================================= */}
      <LimitedOffer onOrderNow={() => onNavigateToProduct("cookies")} />

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
