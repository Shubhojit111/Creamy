import React from 'react';
import { Heart, ShieldCheck, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { PDPFooter } from '../components/pdp/PDPFooter';

interface AboutPageProps {
  onNavigateToHome: () => void;
  onNavigateToCatalog: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAccount: () => void;
  onOpenContact: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateToHome,
  onNavigateToCatalog,
  cartCount,
  onOpenCart,
  onOpenAccount,
  onOpenContact,
}) => {
  return (
    <div className="w-full min-h-screen bg-[#FFF8EB] text-gray-900 overflow-x-hidden font-sans selection:bg-[#4A2417]/20 selection:text-[#4A2417] pt-16 md:pt-20">
      <Navbar
        activeNav="ABOUT"

        onNavClick={(item: string) => {
          if (item === 'HOME') onNavigateToHome();
          else if (item === 'MENU') onNavigateToCatalog();
          else if (item === 'ABOUT') {}
          else if (item === 'CONTACT') onOpenContact();
        }}
        cartCount={cartCount}
        onOpenCart={onOpenCart}
        onOpenAccount={onOpenAccount}
      />

      {/* Hero Header */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-10 pb-8">
        <div className="relative w-full rounded-[40px] bg-[#381E15] text-white p-8 sm:p-14 overflow-hidden shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-left z-10">
            <span className="inline-block bg-white/20 text-white text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider mb-3 border border-white/20">
              OUR MISSION
            </span>
            <h1 className="font-bubble text-3xl sm:text-5xl font-bold leading-tight mb-4">
              Ice cream that loves you back.
            </h1>
            <p className="text-xs sm:text-base text-[#F0D5C9] leading-relaxed mb-6 font-sans">
              Born in Stockholm, Sweden. We set out on a relentless journey to recreate classic, decadent, indulgent ice cream with pure cream and zero added sugars.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={onNavigateToCatalog}
                className="inline-flex items-center gap-2 bg-[#FAEED1] hover:bg-white text-[#2C1810] font-bold text-xs sm:text-sm uppercase px-7 py-3.5 rounded-full shadow-lg transition-all"
              >
                <span>Explore All Flavors</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onNavigateToHome}
                className="text-white hover:text-amber-200 text-xs sm:text-sm font-bold uppercase px-4 py-3"
              >
                Back to Home
              </button>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex items-center justify-center z-10">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
              <img
                src="/bowl_story.png"
                alt="Creamy ice cream craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pillars */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/85 p-8 rounded-3xl border border-[#ECD9C0] shadow-sm text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#7A4026] flex items-center justify-center mb-4">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-bubble text-xl font-bold text-[#2C1810] mb-2">
              Swedish Heritage
            </h3>
            <p className="text-xs sm:text-sm text-[#7D6B60] leading-relaxed">
              We practice lagom — the Swedish philosophy of balance. Rich dairy indulgence harmonized with clean, keto-friendly plant nutrition.
            </p>
          </div>

          <div className="bg-white/85 p-8 rounded-3xl border border-[#ECD9C0] shadow-sm text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bubble text-xl font-bold text-[#2C1810] mb-2">
              Zero Sugar Rush
            </h3>
            <p className="text-xs sm:text-sm text-[#7D6B60] leading-relaxed">
              Sweetened naturally with allulose, monk fruit, and birch xylitol — plant-derived sweeteners that don’t spike blood glucose.
            </p>
          </div>

          <div className="bg-white/85 p-8 rounded-3xl border border-[#ECD9C0] shadow-sm text-left">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-800 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bubble text-xl font-bold text-[#2C1810] mb-2">
              Uncompromised Cream
            </h3>
            <p className="text-xs sm:text-sm text-[#7D6B60] leading-relaxed">
              Slow-churned to velvety perfection so you get the full, silky mouthfeel of gourmet artisanal ice cream in every single bite.
            </p>
          </div>
        </div>
      </section>

      {/* Sustainable Commitment */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-10">
        <div className="bg-[#FFF4E4] rounded-3xl p-8 sm:p-12 border border-[#ECD9C0] flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7A4026]">
              ECO CONSCIOUS
            </span>
            <h3 className="font-bubble text-2xl sm:text-3xl font-bold text-[#2C1810]">
              Our Planet-First Promise
            </h3>
            <p className="text-xs sm:text-sm text-[#7D6B60] leading-relaxed">
              All Creamy pint tubs are 100% recyclable, printed with non-toxic vegetable inks, and shipped in carbon-neutral dry-ice coolers.
            </p>
          </div>
          <div className="space-y-2 text-xs font-bold text-[#381E15]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> FSC Certified Paperboard
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Zero Plastic Foam Packaging
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Carbon Neutral Shipping
            </div>
          </div>
        </div>
      </section>

      <PDPFooter
        onOpenMenu={onNavigateToCatalog}
        onOpenAbout={() => {}}
        onOpenContact={onOpenContact}
      />
    </div>
  );
};
