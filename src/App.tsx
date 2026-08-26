import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

import { FLAVORS } from './data/flavors';
import type { Flavor } from './data/flavors';

// Standalone Pages
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductPage } from './pages/ProductPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

// Modals & Drawers
import { CartDrawer } from './components/CartDrawer';
import type { CartItem } from './components/CartDrawer';
import { ReviewsModal } from './components/ReviewsModal';
import { AccountModal } from './components/AccountModal';

export function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'catalog' | 'product' | 'about' | 'contact'>('home');
  const [activeFlavor, setActiveFlavor] = useState<Flavor>(FLAVORS[1]); // Default Cookies & Kräm

  // Drawers / Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'initial-1',
      flavor: FLAVORS[1], // Cookies & Kräm
      size: '16 oz (1 Pint)',
      quantity: 1,
    },
  ]);

  // Handle Hash Routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.startsWith('#product')) {
        const parts = hash.split('/');
        const flavorId = parts[1];
        if (flavorId) {
          const found = FLAVORS.find((f) => f.id === flavorId);
          if (found) setActiveFlavor(found);
        }
        setCurrentPage('product');
      } else if (hash.includes('#menu') || hash.includes('#shop') || hash.includes('#catalog') || hash.includes('#flavors')) {
        setCurrentPage('catalog');
      } else if (hash.includes('#about')) {
        setCurrentPage('about');
      } else if (hash.includes('#contact')) {
        setCurrentPage('contact');
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Navigation functions
  const navigateToHome = () => {
    setCurrentPage('home');
    window.location.hash = 'home';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCatalog = () => {
    setCurrentPage('catalog');
    window.location.hash = 'menu';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProduct = (flavorId?: string) => {
    const targetFlavor = flavorId ? FLAVORS.find((f) => f.id === flavorId) || FLAVORS[1] : FLAVORS[1];
    setActiveFlavor(targetFlavor);
    setCurrentPage('product');
    window.location.hash = `product/${targetFlavor.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAbout = () => {
    setCurrentPage('about');
    window.location.hash = 'about';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToContact = () => {
    setCurrentPage('contact');
    window.location.hash = 'contact';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add to cart handler
  const handleAddToCart = useCallback((flavor: any, size: string, quantity = 1) => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 },
      colors: [flavor.color?.primary || '#4A2818', '#FAEED1', '#459AB8', '#CC4663'],
    });

    const fullFlavor: Flavor =
      FLAVORS.find((f) => f.id === flavor.id) || {
        id: flavor.id || 'custom',
        name: flavor.name || 'Artisan Ice Cream',
        subname: 'Swedish Style',
        headline: 'Taste Joy in Every Bite',
        headlineLine1: 'Taste Joy in',
        headlineLine2: 'Every Bite',
        subtitle: 'Pure delicious Swedish ice cream.',
        description: flavor.description || 'Delicious ice cream crafted with love.',
        calories: flavor.calories || 270,
        caloriesLabel: '1 Pint 270 Calories',
        price: flavor.price || 6.99,
        rating: flavor.rating || 4.8,
        reviewsCount: flavor.reviewsCount || '10K+',
        reviewsTotal: 10000,
        image: flavor.image || '/cookies_transparent.png',
        heroImage: flavor.image || '/cookies_transparent.png',
        gallery: [{ id: 0, src: flavor.image || '/cookies_transparent.png', label: flavor.name }],
        color: {
          primary: '#4A2818',
          outer: '#da866c',
          card: '#4A2818',
          secondaryPill: '#28586c',
          subtext: '#f2cac0',
          accent: '#FAEED1',
          glow: 'rgba(74, 40, 24, 0.45)',
          swatch: '#4A2818',
        },
        sizes: [
          { label: '16 oz (1 Pint)', grams: '473ml', priceMultiplier: 1.0, price: 6.99, subPrice: 5.94 },
        ],
        tags: ['No Added Sugar', 'Keto Certified'],
        nutrition: { fat: '13g', netCarbs: '5g', protein: '6g', caloriesPerPint: 270, sugarAdded: '0g' },
        ingredients: 'Swedish whole cream, allulose, monk fruit, natural flavors.',
        howItsMade: 'Slow-churned to velvety Scandinavian perfection.',
        sustainability: '100% recyclable paperboard packaging.',
        story: 'Crafted with passion in Stockholm, Sweden.',
        headlineStory: 'Pure Swedish Craftsmanship',
      };

    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.flavor.id === fullFlavor.id && item.size === size
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += quantity;
        return copy;
      }
      return [
        ...prev,
        {
          id: `${fullFlavor.id}-${size}-${Date.now()}`,
          flavor: fullFlavor,
          size,
          quantity,
        },
      ];
    });
    setIsCartOpen(true);
  }, []);

  const handleBuyNow = useCallback((flavor: Flavor, size: string, quantity = 1) => {
    handleAddToCart(flavor, size, quantity);
  }, [handleAddToCart]);

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="relative min-h-screen w-full bg-[#FFF8EB]">
      {/* Dynamic Page Router */}
      {currentPage === 'home' && (
        <HomePage
          onNavigateToProduct={navigateToProduct}
          onNavigateToCatalog={navigateToCatalog}
          onNavigateToAbout={navigateToAbout}
          onNavigateToContact={navigateToContact}
          onAddToCart={(f, size) => handleAddToCart(f, size, 1)}
          cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAccount={() => setIsAccountOpen(true)}
          onOpenReviews={(f) => {
            setActiveFlavor(f);
            setIsReviewsOpen(true);
          }}
        />
      )}

      {currentPage === 'catalog' && (
        <CatalogPage
          onNavigateToProduct={navigateToProduct}
          onAddToCart={(f, size) => handleAddToCart(f, size, 1)}
          cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAccount={() => setIsAccountOpen(true)}
          onOpenAbout={navigateToAbout}
          onOpenContact={navigateToContact}
        />
      )}

      {currentPage === 'product' && (
        <ProductPage
          currentFlavor={activeFlavor}
          onSelectFlavor={(id) => navigateToProduct(id)}
          onNavigateToHome={navigateToHome}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAccount={() => setIsAccountOpen(true)}
          onOpenAbout={navigateToAbout}
          onOpenContact={navigateToContact}
          onOpenMenu={navigateToCatalog}
          onOpenReviews={() => setIsReviewsOpen(true)}
        />
      )}

      {currentPage === 'about' && (
        <AboutPage
          onNavigateToHome={navigateToHome}
          onNavigateToCatalog={navigateToCatalog}
          cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAccount={() => setIsAccountOpen(true)}
          onOpenContact={navigateToContact}
        />
      )}

      {currentPage === 'contact' && (
        <ContactPage
          onNavigateToHome={navigateToHome}
          onNavigateToCatalog={navigateToCatalog}
          cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAccount={() => setIsAccountOpen(true)}
          onOpenAbout={navigateToAbout}
        />
      )}

      {/* Global Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
      />

      <ReviewsModal
        isOpen={isReviewsOpen}
        onClose={() => setIsReviewsOpen(false)}
        flavor={activeFlavor}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />
    </div>
  );
}

export default App;
