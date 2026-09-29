import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  Star,
  Filter,
  ChevronRight,
  ChevronLeft,
  X,
} from 'lucide-react';
import { CATALOG_PRODUCTS } from '../data/catalog';
import { Navbar } from '../components/Navbar';
import { Newsletter } from '../components/Newsletter';

interface CatalogPageProps {
  onNavigateToProduct: (productId: string) => void;
  onNavigateToHome: () => void;
  onAddToCart: (product: any, size: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAccount: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  onNavigateToProduct,
  onNavigateToHome,
  onAddToCart,
  cartCount,
  onOpenCart,
  onOpenAccount,
  onOpenAbout,
  onOpenContact,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedFlavorProfile, setSelectedFlavorProfile] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(35);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);

  const categoryPills = [
    { id: 'all', label: 'All Products', icon: '🍨' },
    { id: 'pints', label: 'Pints & Tubs', icon: '🍧' },
    { id: 'bars', label: 'Ice Cream Bars', icon: '🍫' },
    { id: 'sandwiches', label: 'Sandwiches', icon: '🥪' },
    { id: 'cones', label: 'Cones', icon: '🍦' },
    { id: 'shakes', label: 'Shakes & Drinks', icon: '🥤' },
    { id: 'desserts', label: 'Desserts', icon: '🍰' },
    { id: 'packs', label: 'Gift Packs', icon: '🎁' },
  ];

  const dietaryOptions = [
    'No Added Sugar',
    'Low Calorie',
    'Gluten Free',
    'Keto Friendly',
    'Vegan',
    'Plant-Based',
  ];

  const flavorColors = [
    { id: 'chocolate', label: 'Chocolate', color: '#4A2818' },
    { id: 'mint', label: 'Mint', color: '#4EA162' },
    { id: 'strawberry', label: 'Strawberry', color: '#CC4663' },
    { id: 'vanilla', label: 'Vanilla', color: '#E8D49E' },
    { id: 'coffee', label: 'Coffee', color: '#7E5233' },
    { id: 'caramel', label: 'Caramel', color: '#B87C3A' },
    { id: 'cookies', label: 'Cookies', color: '#2B1A12' },
    { id: 'fruit', label: 'Fruit', color: '#F27A8F' },
  ];

  const sizeOptions = ['Pint (16 oz)', '2 Pint (32 oz)', '4 Pint (64 oz)'];

  const toggleDietary = (tag: string) => {
    setSelectedDietary((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedDietary([]);
    setSelectedFlavorProfile(null);
    setSelectedSize(null);
    setMaxPrice(35);
    setSearchQuery('');
  };

  const filteredProducts = useMemo(() => {
    return CATALOG_PRODUCTS.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (selectedFlavorProfile && item.flavorProfile !== selectedFlavorProfile) return false;
      if (selectedSize && !item.sizes.some((s) => s.toLowerCase().includes(selectedSize.toLowerCase().split(' ')[0]))) return false;
      if (item.price > maxPrice) return false;
      if (selectedDietary.length > 0 && !selectedDietary.every((d) => item.dietary.includes(d))) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'calories') return a.calories - b.calories;
      return b.reviewsTotal - a.reviewsTotal;
    });
  }, [selectedCategory, searchQuery, selectedFlavorProfile, selectedSize, maxPrice, selectedDietary, sortBy]);

  return (
    <div className="w-full min-h-screen bg-[#FFF8EB] text-gray-900 overflow-x-hidden font-sans selection:bg-[#4A2417]/20 selection:text-[#4A2417] pt-24 md:pt-28">
      {/* 1. Header & Announcement Bar */}
      <Navbar
        activeNav="MENU"
        forceSolid
        onOrderNow={() => onNavigateToProduct('cookies')}
        onNavClick={(item: string) => {
          if (item === 'HOME') onNavigateToHome();
          else if (item === 'MENU') {}
          else if (item === 'ABOUT') onOpenAbout();
          else if (item === 'CONTACT') onOpenContact();
        }}
        cartCount={cartCount}
        onOpenCart={onOpenCart}
        onOpenAccount={onOpenAccount}
      />

      {/* 2. Top Hero Banner */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-8 pb-4">
        <div className="relative w-full rounded-[36px] bg-gradient-to-r from-[#FFF0DB] via-[#FFF5E4] to-[#FFEEDB] border border-[#F2E0CD] p-8 sm:p-12 overflow-hidden shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-left z-10">
            <span className="inline-block bg-[#F4E3D0] text-[#7A4026] text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider mb-3 shadow-sm">
              ALL PRODUCTS
            </span>
            <h1 className="font-bubble text-3xl sm:text-4xl lg:text-[50px] font-bold text-[#2C1810] leading-[1.08] mb-3">
              Sweet Choices.
              <br />
              Endless Joy.
            </h1>
            <p className="text-xs sm:text-sm text-[#7D6B60] leading-relaxed max-w-md font-sans">
              Explore our full range of delicious treats made with real ingredients and creamy Swedish perfection. Zero added sugar, 100% pleasure.
            </p>
          </div>

          <div className="relative w-full lg:w-1/2 flex items-center justify-center lg:justify-end z-10">
            <div className="relative flex items-center -space-x-8 sm:-space-x-12">
              <img
                src="/cookies_transparent.png"
                alt="Cookies and Kräm"
                className="w-28 sm:w-40 md:w-48 h-auto object-contain drop-shadow-lg -rotate-6 transition-transform hover:scale-105"
              />
              <img
                src="/strawberry_transparent.png"
                alt="Strawberry Swirl"
                className="w-32 sm:w-44 md:w-52 h-auto object-contain drop-shadow-2xl z-20 scale-108 transition-transform hover:scale-115"
              />
              <img
                src="/mint_transparent.png"
                alt="Mint Chokladchip"
                className="w-28 sm:w-40 md:w-48 h-auto object-contain drop-shadow-lg rotate-6 transition-transform hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Horizontal Category Filter Pills Carousel */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-4">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {categoryPills.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentPageNum(1);
                }}
                className={`flex flex-col items-center justify-center min-w-[100px] sm:min-w-[110px] py-3.5 px-3 rounded-2xl border transition-all duration-200 shadow-sm flex-shrink-0 ${
                  isSelected
                    ? 'bg-[#FFF4E4] border-[#4A2818] shadow-md ring-2 ring-[#4A2818]/20 text-[#381E15] font-extrabold'
                    : 'bg-white hover:bg-[#FFF9F0] border-[#ECD9C0] text-[#7D6B60]'
                }`}
              >
                <span className="text-xl mb-1">{cat.icon}</span>
                <span className="text-[11px] sm:text-xs tracking-tight">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Main Catalog Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar */}
          <aside className="lg:col-span-3 bg-white/85 rounded-3xl p-6 border border-[#ECD9C0] shadow-sm space-y-6 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#ECD9C0]">
              <div className="flex items-center gap-2 font-bold text-sm text-[#2C1810]">
                <Filter className="w-4 h-4 text-[#7A4026]" />
                <span>Filters</span>
              </div>
              <button
                onClick={clearAllFilters}
                className="text-xs text-[#7A4026] hover:text-black font-semibold underline underline-offset-2"
              >
                Clear all
              </button>
            </div>

            <div className="space-y-2.5">
              <span className="block text-xs font-bold uppercase tracking-wider text-[#381E15]">
                CATEGORY
              </span>
              <div className="space-y-2 text-xs text-[#5C3424]">
                {categoryPills.map((c) => (
                  <label
                    key={c.id}
                    className="flex items-center gap-2.5 cursor-pointer hover:text-black"
                  >
                    <input
                      type="radio"
                      name="catRadio"
                      checked={selectedCategory === c.id}
                      onChange={() => setSelectedCategory(c.id)}
                      className="accent-[#4A2818]"
                    />
                    <span>{c.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-[#ECD9C0]/60">
              <span className="block text-xs font-bold uppercase tracking-wider text-[#381E15]">
                DIETARY
              </span>
              <div className="space-y-2 text-xs text-[#5C3424]">
                {dietaryOptions.map((tag) => {
                  const checked = selectedDietary.includes(tag);
                  return (
                    <label
                      key={tag}
                      className="flex items-center gap-2.5 cursor-pointer hover:text-black"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleDietary(tag)}
                        className="accent-[#4A2818] rounded"
                      />
                      <span>{tag}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-[#ECD9C0]/60">
              <span className="block text-xs font-bold uppercase tracking-wider text-[#381E15]">
                FLAVOR
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs text-[#5C3424]">
                {flavorColors.map((flv) => {
                  const isSelected = selectedFlavorProfile === flv.id;
                  return (
                    <button
                      key={flv.id}
                      onClick={() =>
                        setSelectedFlavorProfile((prev) => (prev === flv.id ? null : flv.id))
                      }
                      className={`flex items-center gap-2 p-1.5 rounded-xl border transition-all text-left ${
                        isSelected
                          ? 'bg-[#FFF4E4] border-[#4A2818] font-bold text-[#381E15]'
                          : 'bg-gray-50/50 hover:bg-gray-100 border-transparent text-[#7D6B60]'
                      }`}
                    >
                      <span
                        style={{ backgroundColor: flv.color }}
                        className="w-3.5 h-3.5 rounded-full border border-black/10 flex-shrink-0"
                      />
                      <span className="truncate text-[11px]">{flv.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-[#ECD9C0]/60">
              <span className="block text-xs font-bold uppercase tracking-wider text-[#381E15]">
                SIZE
              </span>
              <div className="space-y-2 text-xs text-[#5C3424]">
                {sizeOptions.map((s) => (
                  <label key={s} className="flex items-center gap-2.5 cursor-pointer hover:text-black">
                    <input
                      type="radio"
                      name="sizeRadio"
                      checked={selectedSize === s}
                      onChange={() =>
                        setSelectedSize((prev) => (prev === s ? null : s))
                      }
                      className="accent-[#4A2818]"
                    />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-[#ECD9C0]/60">
              <div className="flex items-center justify-between text-xs font-bold text-[#381E15]">
                <span>PRICE RANGE</span>
                <span className="text-[#7A4026]">${maxPrice}</span>
              </div>
              <input
                type="range"
                min={4}
                max={35}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#4A2818]"
              />
              <div className="flex justify-between text-[10px] text-[#8C7568]">
                <span>$4</span>
                <span>$35+</span>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="lg:col-span-9 w-full space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/70 p-4 rounded-2xl border border-[#ECD9C0]">
              <span className="text-xs font-semibold text-[#7D6B60]">
                Showing {filteredProducts.length} results
              </span>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter products..."
                    className="text-xs bg-gray-50 pl-8 pr-3 py-1.5 rounded-full border border-gray-200 focus:outline-none focus:bg-white"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <div className="relative flex items-center">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-xs font-bold bg-[#FFF4E4] text-[#381E15] px-3.5 py-1.5 rounded-full border border-[#ECD9C0] focus:outline-none cursor-pointer"
                  >
                    <option value="popular">Sort by: Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating: High to Low</option>
                    <option value="calories">Calories: Low to High</option>
                  </select>
                </div>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center space-y-3 border border-[#ECD9C0]">
                <span className="text-4xl">🍦</span>
                <h3 className="font-bubble text-xl font-bold text-gray-800">
                  No treats matched your filters
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Try clearing some filter criteria to explore more delicious Swedish flavors!
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-[#4A2417] text-white text-xs font-bold px-6 py-2.5 rounded-full"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {filteredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => onNavigateToProduct(prod.id)}
                    className="group relative bg-[#FFF4E4] hover:bg-white rounded-[26px] p-4 border border-[#F2E0CD] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                  >
                    {prod.isBestSeller && (
                      <span className="absolute top-3 left-3 z-10 bg-[#381E15] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        BEST SELLER
                      </span>
                    )}
                    {prod.isNew && (
                      <span className="absolute top-3 left-3 z-10 bg-emerald-700 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        NEW
                      </span>
                    )}

                    <div className="relative w-full h-40 sm:h-44 flex items-center justify-center pt-2">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-32 sm:w-36 h-auto max-h-40 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-108 group-hover:-translate-y-1.5"
                      />
                    </div>

                    <div className="mt-2 pt-3 border-t border-[#F2E0CD]/70 text-left">
                      <h3 className="font-bubble font-bold text-xs sm:text-sm text-[#2C1810] group-hover:text-[#7A4026] transition-colors truncate mb-1">
                        {prod.name}
                      </h3>

                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="flex items-center text-amber-500">
                          <Star className="w-3 h-3 fill-current" />
                        </div>
                        <span className="text-[11px] font-bold text-[#381E15]">{prod.rating}</span>
                        <span className="text-[10px] text-[#8C7568]">({prod.reviewsCount})</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm sm:text-base text-[#2C1810]">
                          ${prod.price.toFixed(2)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(prod, 'Pint (16 oz)');
                          }}
                          aria-label={`Add ${prod.name} to cart`}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#4A2417] hover:bg-[#2C1810] text-white flex items-center justify-center transition-all shadow-sm hover:scale-110 active:scale-95"
                        >
                          <Plus className="w-4 h-4 stroke-[2.5]" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center gap-1.5 pt-6 pb-2">
              <button
                disabled={currentPageNum === 1}
                onClick={() => setCurrentPageNum((p) => Math.max(1, p - 1))}
                className="w-8 h-8 rounded-full bg-white text-gray-700 flex items-center justify-center border border-[#ECD9C0] hover:bg-[#FFF4E4] disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPageNum(num)}
                  className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                    currentPageNum === num
                      ? 'bg-[#4A2417] text-white shadow-md'
                      : 'bg-white text-[#7D6B60] hover:bg-[#FFF4E4] border border-[#ECD9C0]'
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => setCurrentPageNum((p) => Math.min(5, p + 1))}
                className="w-8 h-8 rounded-full bg-white text-gray-700 flex items-center justify-center border border-[#ECD9C0] hover:bg-[#FFF4E4]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </main>
        </div>
      </section>

      {/* 5. Benefits Bar */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8">
        <div className="bg-white/80 rounded-3xl p-6 border border-[#ECD9C0] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-1">🌿</span>
            <h4 className="font-bold text-xs text-[#2C1810]">Made with Real Ingredients</h4>
            <p className="text-[11px] text-[#7D6B60]">Simple, honest ingredients you can pronounce.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-1">🚫</span>
            <h4 className="font-bold text-xs text-[#2C1810]">No Added Sugar</h4>
            <p className="text-[11px] text-[#7D6B60]">Delicious ice cream without the sugar spike.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-1">🤍</span>
            <h4 className="font-bold text-xs text-[#2C1810]">Good for You, Better for Earth</h4>
            <p className="text-[11px] text-[#7D6B60]">Sustainable choices for a better tomorrow.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-1">😊</span>
            <h4 className="font-bold text-xs text-[#2C1810]">100% Taste, 0% Compromise</h4>
            <p className="text-[11px] text-[#7D6B60]">Creamy, dreamy and velvety smooth.</p>
          </div>
        </div>
      </section>

      {/* 6. Newsletter */}
      <Newsletter />

      {/* 7. Footer with Payment Badges */}
      <footer className="w-full bg-[#FFF8EB] pt-12 pb-10 px-4 sm:px-6 md:px-12 relative z-20 text-[#4A2818]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-8 pb-10 border-b border-[#ECD9C0]">
            <div className="col-span-2 md:col-span-4 flex flex-col items-start">
              <span className="font-bubble text-3xl font-bold text-[#4A2818] tracking-tight mb-2">
                Creamy
              </span>
              <p className="text-xs sm:text-sm text-[#7D6B60] leading-relaxed max-w-xs text-left">
                Made with love.
                <br />
                Enjoyed by all.
              </p>
            </div>

            <div className="col-span-1 md:col-span-2 space-y-2.5 text-left">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C1810]">
                SHOP
              </h4>
              <ul className="space-y-1.5 text-xs text-[#7D6B60]">
                <li><a href="#all" onClick={() => setSelectedCategory('all')} className="hover:text-black">All Products</a></li>
                <li><a href="#pints" onClick={() => setSelectedCategory('pints')} className="hover:text-black">Pints & Tubs</a></li>
                <li><a href="#bars" onClick={() => setSelectedCategory('bars')} className="hover:text-black">Ice Cream Bars</a></li>
                <li><a href="#sandwiches" onClick={() => setSelectedCategory('sandwiches')} className="hover:text-black">Sandwiches</a></li>
                <li><a href="#cones" onClick={() => setSelectedCategory('cones')} className="hover:text-black">Cones</a></li>
                <li><a href="#shakes" onClick={() => setSelectedCategory('shakes')} className="hover:text-black">Shakes & Drinks</a></li>
                <li><a href="#desserts" onClick={() => setSelectedCategory('desserts')} className="hover:text-black">Desserts</a></li>
                <li><a href="#packs" onClick={() => setSelectedCategory('packs')} className="hover:text-black">Gift Packs</a></li>
              </ul>
            </div>

            <div className="col-span-1 md:col-span-2 space-y-2.5 text-left">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C1810]">
                COMPANY
              </h4>
              <ul className="space-y-1.5 text-xs text-[#7D6B60]">
                <li><button onClick={onOpenAbout} className="hover:text-black">About Us</button></li>
                <li><button onClick={onOpenAbout} className="hover:text-black">Our Ingredients</button></li>
                <li><button onClick={onOpenAbout} className="hover:text-black">Sustainability</button></li>
                <li><button onClick={onOpenContact} className="hover:text-black">Careers</button></li>
              </ul>
            </div>

            <div className="col-span-1 md:col-span-2 space-y-2.5 text-left">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C1810]">
                HELP
              </h4>
              <ul className="space-y-1.5 text-xs text-[#7D6B60]">
                <li><button onClick={onOpenContact} className="hover:text-black">FAQ's</button></li>
                <li><button onClick={onOpenContact} className="hover:text-black">Shipping & Returns</button></li>
                <li><button onClick={onOpenContact} className="hover:text-black">Track Order</button></li>
                <li><button onClick={onOpenContact} className="hover:text-black">Contact Us</button></li>
              </ul>
            </div>

            <div className="col-span-1 md:col-span-2 space-y-2.5 text-left">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C1810]">
                WE ACCEPT
              </h4>
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <span className="bg-white px-2 py-1 rounded text-[10px] font-bold text-blue-900 border border-gray-200">VISA</span>
                <span className="bg-white px-2 py-1 rounded text-[10px] font-bold text-red-600 border border-gray-200">MC</span>
                <span className="bg-white px-2 py-1 rounded text-[10px] font-bold text-blue-600 border border-gray-200">AMEX</span>
                <span className="bg-white px-2 py-1 rounded text-[10px] font-bold text-blue-800 border border-gray-200">PayPal</span>
                <span className="bg-white px-2 py-1 rounded text-[10px] font-bold text-gray-800 border border-gray-200">Pay</span>
                <span className="bg-white px-2 py-1 rounded text-[10px] font-bold text-gray-800 border border-gray-200">GPay</span>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9B897E] gap-3">
            <p>© 2025 Creamy. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#privacy" className="hover:text-black">Privacy Policy</a>
              <a href="#terms" className="hover:text-black">Terms of Service</a>
              <a href="#cookies" className="hover:text-black">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

