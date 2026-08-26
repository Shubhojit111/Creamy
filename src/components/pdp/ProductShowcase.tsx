import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Plus,
  Minus,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Award,
  Maximize2,
  ChevronUp,
  ChevronDown,
  Check,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FLAVORS } from '../../data/flavors';
import type { Flavor } from '../../data/flavors';

interface ProductShowcaseProps {
  currentFlavor: Flavor;
  onSelectFlavor: (flavorId: string) => void;
  onAddToCart: (flavor: Flavor, size: string, quantity: number) => void;
  onBuyNow: (flavor: Flavor, size: string, quantity: number) => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  currentFlavor,
  onSelectFlavor,
  onAddToCart,
  onBuyNow,
}) => {
  const [activeThumbIdx, setActiveThumbIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(currentFlavor.sizes[0].label);
  const [purchaseType, setPurchaseType] = useState<'onetime' | 'subscribe'>('onetime');
  const [quantity, setQuantity] = useState(1);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const gallery = currentFlavor.gallery || [
    { id: 0, src: currentFlavor.heroImage || currentFlavor.image, label: currentFlavor.name },
  ];
  const currentMainImage = gallery[Math.min(activeThumbIdx, gallery.length - 1)]?.src || currentFlavor.heroImage || currentFlavor.image;

  const currentPriceObj = currentFlavor.sizes.find((s) => s.label === selectedSize) || currentFlavor.sizes[0];
  const unitPrice = purchaseType === 'onetime' ? currentPriceObj.price : currentPriceObj.subPrice;

  const handleAdd = () => {
    confetti({
      particleCount: 65,
      spread: 65,
      origin: { y: 0.5 },
      colors: [currentFlavor.color.primary, '#FAEED1', '#459AB8', '#CC4663'],
    });

    setAddedAnimation(true);
    onAddToCart(currentFlavor, selectedSize, quantity);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-6 relative z-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* =========================================================================
            LEFT COLUMN: GALLERY (Vertical Thumbnails + Main Image Card)
            ========================================================================= */}
        <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4 items-start w-full">
          {/* Vertical Thumbnails Column */}
          <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 w-full sm:w-20 flex-shrink-0">
            <button
              onClick={() =>
                setActiveThumbIdx((prev) => (prev > 0 ? prev - 1 : gallery.length - 1))
              }
              className="hidden sm:flex w-full items-center justify-center py-1 text-[#8C7568] hover:text-black transition-colors"
            >
              <ChevronUp className="w-4 h-4" />
            </button>

            {gallery.map((t, idx) => {
              const isActive = activeThumbIdx === idx;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveThumbIdx(idx)}
                  className={`relative w-14 h-14 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 flex-shrink-0 bg-white hover:scale-105 ${
                    isActive
                      ? 'border-[#4A2818] shadow-md scale-105 ring-2 ring-[#4A2818]/25'
                      : 'border-[#ECD9C0] hover:border-[#8C7568] opacity-85 hover:opacity-100'
                  }`}
                >
                  <img src={t.src} alt={t.label} className="w-full h-full object-cover" />
                </button>
              );
            })}

            <button
              onClick={() =>
                setActiveThumbIdx((prev) => (prev < gallery.length - 1 ? prev + 1 : 0))
              }
              className="hidden sm:flex w-full items-center justify-center py-1 text-[#8C7568] hover:text-black transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Main Hero Product Image Showcase with Clip-path Reveal */}
          <div className="relative flex-1 w-full aspect-[4/5] rounded-[32px] sm:rounded-[40px] overflow-hidden bg-[#2D160E] border-2 border-[#ECD9C0] shadow-2xl group">
            {/* Ambient Lighting */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none z-10" />

            {/* Main Image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={currentMainImage}
                src={currentMainImage}
                alt={currentFlavor.name}
                initial={{ opacity: 0.8, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.8 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </AnimatePresence>

            {/* Lightbox Zoom Button */}
            <button
              onClick={() => setIsZoomOpen(true)}
              aria-label="Zoom image"
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 active:scale-90"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: UNIFIED PRODUCT DETAILS & INTEGRATED PURCHASE PANEL
            ========================================================================= */}
        <div className="lg:col-span-6 flex flex-col items-start text-left w-full space-y-5">
          {/* 1. Header: Badge, Title & Rating */}
          <div className="w-full">
            <span className="inline-block bg-[#381E15] text-white text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2.5 shadow-sm">
              BEST SELLER
            </span>

            <h1 className="font-bubble text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#2C1810] leading-tight">
              {currentFlavor.name}
            </h1>

            {/* Star Rating Row */}
            <div className="flex items-center gap-2.5 mt-2">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-[#381E15]">{currentFlavor.rating}</span>
              <span className="text-xs text-[#8C7568] font-medium">({currentFlavor.reviewsCount} reviews)</span>
            </div>
          </div>

          {/* 2. Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#2C1810]">
              ${unitPrice.toFixed(2)}
            </span>
            {purchaseType === 'subscribe' && (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Save 15% with subscription
              </span>
            )}
          </div>

          {/* 3. Short Description */}
          <p className="text-xs sm:text-sm text-[#7D6B60] leading-relaxed font-sans">
            {currentFlavor.description}
          </p>

          {/* 4. Feature Badges with Minimal Icons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full pt-1">
            <div className="bg-[#FFF4E4] p-2.5 rounded-2xl border border-[#F2E0CD] flex flex-col items-center text-center transition-transform hover:scale-105">
              <span className="text-sm mb-1">🌿</span>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#381E15]">Plant-Based</span>
            </div>
            <div className="bg-[#FFF4E4] p-2.5 rounded-2xl border border-[#F2E0CD] flex flex-col items-center text-center transition-transform hover:scale-105">
              <span className="text-sm mb-1">🚫</span>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#381E15]">No Added Sugar</span>
            </div>
            <div className="bg-[#FFF4E4] p-2.5 rounded-2xl border border-[#F2E0CD] flex flex-col items-center text-center transition-transform hover:scale-105">
              <span className="text-sm mb-1">🌾</span>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#381E15]">Gluten Free</span>
            </div>
            <div className="bg-[#FFF4E4] p-2.5 rounded-2xl border border-[#F2E0CD] flex flex-col items-center text-center transition-transform hover:scale-105">
              <span className="text-sm mb-1">🤍</span>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#381E15]">Made in Sweden</span>
            </div>
          </div>

          {/* 5. Size Selector */}
          <div className="w-full pt-1">
            <span className="block text-xs font-bold uppercase tracking-wider text-[#381E15] mb-2">
              SIZE
            </span>
            <div className="flex items-center gap-2.5 flex-wrap">
              {currentFlavor.sizes.map((s) => {
                const isSelected = selectedSize === s.label;
                return (
                  <button
                    key={s.label}
                    onClick={() => setSelectedSize(s.label)}
                    className={`text-xs font-bold px-4 py-2 rounded-full border transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#FFF4E4] text-[#381E15] border-[#4A2818] shadow-sm ring-1 ring-[#4A2818] scale-102'
                        : 'bg-white/80 hover:bg-white text-[#7D6B60] border-[#ECD9C0]'
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6. Dynamic Flavor Swatches (Switches flavor dynamically!) */}
          <div className="w-full pt-1">
            <span className="block text-xs font-bold uppercase tracking-wider text-[#381E15] mb-2">
              FLAVOR:{' '}
              <span className="font-normal text-[#7D6B60] normal-case">{currentFlavor.name}</span>
            </span>
            <div className="flex items-center gap-3">
              {FLAVORS.map((f) => {
                const isSelected = currentFlavor.id === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => {
                      onSelectFlavor(f.id);
                      setActiveThumbIdx(0);
                    }}
                    style={{ backgroundColor: f.color.swatch || f.color.primary }}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-white scale-125 ring-2 ring-[#4A2818] shadow-md'
                        : 'border-white/50 opacity-80 hover:opacity-100 hover:scale-110'
                    }`}
                    title={f.name}
                  />
                );
              })}
            </div>
          </div>

          {/* 7. Purchase Options: One-time vs Subscribe */}
          <div className="w-full space-y-2 pt-2">
            {/* Radio 1: One-Time Purchase */}
            <div
              onClick={() => setPurchaseType('onetime')}
              className={`cursor-pointer p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                purchaseType === 'onetime'
                  ? 'bg-[#FFF4E4] border-[#4A2818] shadow-sm ring-1 ring-[#4A2818]'
                  : 'bg-white border-[#ECD9C0] hover:bg-[#FFF9F0]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    purchaseType === 'onetime' ? 'border-[#4A2818] bg-[#4A2818]' : 'border-[#B8A296]'
                  }`}
                >
                  {purchaseType === 'onetime' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-[#2C1810]">One-time purchase</span>
                  <p className="text-[11px] text-[#8C7568]">Enjoy your favorite anytime</p>
                </div>
              </div>
              <span className="font-bold text-sm text-[#2C1810]">${currentPriceObj.price.toFixed(2)}</span>
            </div>

            {/* Radio 2: Subscribe & Save */}
            <div
              onClick={() => setPurchaseType('subscribe')}
              className={`cursor-pointer p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                purchaseType === 'subscribe'
                  ? 'bg-[#FFF4E4] border-[#4A2818] shadow-sm ring-1 ring-[#4A2818]'
                  : 'bg-white border-[#ECD9C0] hover:bg-[#FFF9F0]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    purchaseType === 'subscribe' ? 'border-[#4A2818] bg-[#4A2818]' : 'border-[#B8A296]'
                  }`}
                >
                  {purchaseType === 'subscribe' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-[#2C1810]">Subscribe & Save 15%</span>
                  <p className="text-[11px] text-emerald-700 font-medium">Free delivery • Cancel anytime</p>
                </div>
              </div>
              <span className="font-bold text-sm text-[#2C1810]">${currentPriceObj.subPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* 8. Quantity & Primary Action Buttons */}
          <div className="w-full space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity Counter */}
              <div className="flex items-center border border-[#ECD9C0] rounded-2xl overflow-hidden bg-white p-1 shadow-sm">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-9 flex items-center justify-center hover:bg-[#FFF4E4] text-[#381E15] transition-colors rounded-xl"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-bold text-[#2C1810]">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-9 flex items-center justify-center hover:bg-[#FFF4E4] text-[#381E15] transition-colors rounded-xl"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAdd}
                className={`flex-1 inline-flex items-center justify-center gap-2 font-bold text-xs sm:text-sm uppercase tracking-wider py-3.5 px-6 rounded-2xl shadow-lg transition-all duration-200 ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white scale-98'
                    : 'bg-[#4A2417] hover:bg-[#34180E] text-white hover:scale-[1.02] active:scale-[0.97]'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to cart — ${(unitPrice * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Buy It Now Button */}
            <button
              onClick={() => onBuyNow(currentFlavor, selectedSize, quantity)}
              className="w-full bg-[#FFF4E4] hover:bg-[#FFE8CC] text-[#4A2417] font-bold text-xs sm:text-sm uppercase tracking-wider py-3.5 rounded-2xl border border-[#ECD9C0] shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              Buy it now
            </button>
          </div>

          {/* 9. Trust Badges & Free Shipping Callout */}
          <div className="w-full bg-[#FFF4E4]/80 rounded-2xl p-4 border border-[#F2E0CD] space-y-3">
            <div className="flex items-center gap-2.5 text-xs text-[#5C3424]">
              <Truck className="w-4 h-4 text-[#7A4026] flex-shrink-0" />
              <span>
                <strong className="text-[#381E15]">Free shipping</strong> on orders $40+ (Delivery in 2–4 business days)
              </span>
            </div>

            <div className="pt-2 border-t border-[#ECD9C0]/60 grid grid-cols-3 gap-2 text-center text-[10px] sm:text-[11px] font-semibold text-[#7D6B60]">
              <div className="flex items-center justify-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-[#7A4026]" />
                <span>30-Day Returns</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7A4026]" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#7A4026]" />
                <span>Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Zoom Modal with Clear Cross Close Button */}
      <AnimatePresence>
        {isZoomOpen && (
          <div
            onClick={() => setIsZoomOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh] bg-transparent rounded-3xl overflow-hidden"
            >
              {/* Prominent High-Contrast Cross Close Button */}
              <button
                onClick={() => setIsZoomOpen(false)}
                aria-label="Close zoom preview"
                className="absolute top-4 right-4 z-30 w-11 h-11 rounded-full bg-white text-gray-900 shadow-2xl flex items-center justify-center hover:bg-gray-100 hover:scale-110 active:scale-95 transition-all border-2 border-black/10 cursor-pointer"
              >
                <X className="w-6 h-6 stroke-[2.5]" />
              </button>

              <img
                src={currentMainImage}
                alt="Zoomed view"
                className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
