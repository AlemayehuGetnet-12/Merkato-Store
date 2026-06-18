"use client";
import { useState, useMemo, useEffect, useRef } from 'react';
import { Heart, Star, ArrowUpDown, ChevronDown, SlidersHorizontal, ChevronRight, ArrowLeft, Smartphone, Shirt, Sparkles, Apple, Home, Gem } from 'lucide-react';

const PRODUCTS = [
  { id: 1, brand: "SONIX", name: "Aurora Wireless Noise-Cancelling Headphones", rating: 4.8, reviews: 1264, price: 129.99, originalPrice: 199.99, discount: "-35%", category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80", bgType: "warm", stockText: "Only 3 left!" },
  { id: 2, brand: "MARAKESH", name: "Heritage Gold Automatic Wristwatch", rating: 4.7, reviews: 642, price: 249.00, originalPrice: 399.99, discount: "-38%", category: "Accessories", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80", bgType: "warm" },
  { id: 3, brand: "PACE", name: "Emerald Runner Performance Sneakers", rating: 4.6, reviews: 2310, price: 89.50, originalPrice: 129.99, discount: "-31%", category: "Fashion", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80", bgType: "warm" },
  { id: 4, brand: "LUMIÈRE", name: "Pure Glow Vitamin C Brightening Serum", rating: 4.9, reviews: 4120, price: 34.00, originalPrice: 49.00, discount: "-31%", category: "Beauty", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80", bgType: "warm" },
  { id: 5, brand: "LAGOS LOOM", name: "Royal Ankara Print Wax Fabric — 6 yards", rating: 4.8, reviews: 880, price: 59.00, originalPrice: 79.00, discount: "-25%", category: "Fashion", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80", bgType: "warm" },
  { id: 6, brand: "NOVA", name: "Nova X12 Pro Smartphone 256GB", rating: 4.7, reviews: 1860, price: 549.00, originalPrice: 699.99, discount: "-21%", category: "Electronics", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80", bgType: "emerald", stockText: "Only 5 left!" },
  { id: 7, brand: "SONIX", name: "Aurora Wireless Noise-Cancelling Headphones — Edition 2", rating: 4.8, reviews: 1184, price: 138.49, originalPrice: 199.99, discount: "-30%", category: "Electronics", image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80", bgType: "warm", stockText: "Only 3 left!" },
  { id: 8, brand: "MARAKESH", name: "Heritage Gold Automatic Wristwatch — Edition 2", rating: 4.7, reviews: 542, price: 261.45, originalPrice: 419.99, discount: "-38%", category: "Accessories", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80", bgType: "warm" },
];

const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Beauty', 'Groceries', 'Home & Living', 'Accessories'];
const BRANDS = ['All', 'Nova', 'Marakesh', 'Lumière', 'Sonix', 'Pace', 'Lagos Loom'];
const SORT_MODES = ['Most popular', 'Price: low to high', 'Price: high to low', 'Highest rated'];

// Layout configuration mapped directly from image_e1c080.png mock
const CATEGORY_MOCK_DATA = [
  { id: 'Electronics', label: 'Electronics', desc: 'Latest tech, unbeatable prices.', meta: '12,400+ ITEMS · 8 FEATURED', icon: Smartphone },
  { id: 'Fashion', label: 'Fashion', desc: 'Style from every corner of the region.', meta: '28,900+ ITEMS · 8 FEATURED', icon: Shirt },
  { id: 'Beauty', label: 'Beauty', desc: "Glow with the world's best beauty brands.", meta: '9,200+ ITEMS · 4 FEATURED', icon: Sparkles },
  { id: 'Groceries', label: 'Groceries', desc: 'Daily essentials delivered fast.', meta: '5,300+ ITEMS · 0 FEATURED', icon: Apple },
  { id: 'Home & Living', label: 'Home & Living', desc: 'Transform your space.', meta: '14,100+ ITEMS · 0 FEATURED', icon: Home },
  { id: 'Accessories', label: 'Accessories', desc: 'Finish your look.', meta: '7,650+ ITEMS · 4 FEATURED', icon: Gem },
];

export default function ProductCatalogSection() {
  const [currentView, setCurrentView] = useState('catalog'); // 'catalog' or 'categories'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [maxPrice, setMaxPrice] = useState(800);
  const [localPrice, setLocalPrice] = useState(800);
  const [favorites, setFavorites] = useState(new Set([2, 4]));
  const [sortIdx, setSortIdx] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMaxPrice(localPrice);
    }, 40);
    return () => clearTimeout(timer);
  }, [localPrice]);

  useEffect(() => {
    if (maxPrice === 800 && localPrice !== 800) {
      setLocalPrice(800);
    }
  }, [maxPrice]);

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const visibleProducts = useMemo(() => {
    let list = PRODUCTS.filter(p => {
      const catOk = selectedCategory === 'All' || p.category === selectedCategory;
      const brandOk = selectedBrand === 'All' || p.brand.toUpperCase() === selectedBrand.toUpperCase();
      const priceOk = p.price <= maxPrice;
      return catOk && brandOk && priceOk;
    });
    if (sortIdx === 1) list = [...list].sort((a, b) => a.price - b.price);
    else if (sortIdx === 2) list = [...list].sort((a, b) => b.price - a.price);
    else if (sortIdx === 3) list = [...list].sort((a, b) => b.rating - a.rating);
    else list = [...list].sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [selectedCategory, selectedBrand, maxPrice, sortIdx]);

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedBrand('All');
    setLocalPrice(800);
    setMaxPrice(800);
  };

  // Styled Category View mapping from image_e1c080.png layout cards
  const CategoriesView = () => (
    <div className="w-full max-w-7xl mx-auto px-6 py-6 transition-all duration-300">
      <button 
        onClick={() => setCurrentView('catalog')}
        className="flex items-center gap-2 text-xs font-bold text-[#005A36] mb-8 hover:underline"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Catalog
      </button>
      
      <div className="mb-10">
        <span className="text-[10px] uppercase tracking-widest text-[#005A36] font-extrabold block mb-1">Browse</span>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Shop by Category</h1>
        <p className="text-sm text-gray-400 font-medium">
          Discover handpicked products organized by what you love.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CATEGORY_MOCK_DATA.map((cat) => {
          const IconComponent = cat.icon;
          return (
            <div 
              key={cat.id} 
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentView('catalog');
              }}
              className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md cursor-pointer hover:-translate-y-0.5 transition-all flex flex-col justify-between h-48 relative overflow-hidden group"
            >
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#005A36] to-[#014329] flex items-center justify-center text-white shrink-0 shadow-sm">
                  <IconComponent className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-black text-gray-900 group-hover:text-[#005A36] transition-colors">{cat.label}</h3>
                  <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-[200px]">{cat.desc}</p>
                  <p className="text-[9px] font-black text-[#005A36] tracking-wider pt-1">{cat.meta}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-t border-gray-100 pt-4 w-full">
                <span className="text-xs font-bold text-gray-600 group-hover:text-gray-900 transition-colors">Explore</span>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-[#005A36] group-hover:translate-x-0.5 transition-all" />
              </div>
              
              {/* Soft visual background circle detail */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gray-50 rounded-full -z-10 group-hover:bg-emerald-50/40 transition-colors" />
            </div>
          );
        })}
      </div>
    </div>
  );

  const Sidebar = () => {
    const min = 20;
    const max = 800;
    const percentage = ((localPrice - min) / (max - min)) * 100;

    return (
      <aside className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm h-fit">
        <div className="mb-5">
          <h3 className="text-[9px] font-black tracking-widest text-gray-400 uppercase mb-3">Category</h3>
          <div className="space-y-2">
            {CATEGORIES.map(cat => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === cat}
                  onChange={() => setSelectedCategory(cat)}
                  className="h-3.5 w-3.5 accent-[#005A36] cursor-pointer"
                />
                <span className={`text-xs font-bold ${selectedCategory === cat ? 'text-gray-900 font-black' : 'text-gray-500'}`}>
                  {cat}
                </span>
              </label>
            ))}
          </div>
        </div>

        <hr className="border-gray-100 my-4" />

        <div className="mb-5">
          <h3 className="text-[9px] font-black tracking-widest text-gray-400 uppercase mb-3">Brand</h3>
          <div className="space-y-2">
            {BRANDS.map(brand => (
              <label key={brand} className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="radio"
                  name="brand"
                  checked={selectedBrand === brand}
                  onChange={() => setSelectedBrand(brand)}
                  className="h-3.5 w-3.5 accent-[#005A36] cursor-pointer"
                />
                <span className={`text-xs font-bold ${selectedBrand === brand ? 'text-gray-900 font-black' : 'text-gray-500'}`}>
                  {brand}
                </span>
              </label>
            ))}
          </div>
        </div>

        <hr className="border-gray-100 my-4" />

        <div className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[10px] font-black text-gray-500 tracking-widest uppercase select-none">
              MAX PRICE: ${localPrice}
            </h3>
          </div>
          <div className="relative flex items-center w-full min-h-[20px]">
            <input
              type="range"
              min={min}
              max={max}
              step="1"
              value={localPrice}
              onChange={(e) => setLocalPrice(Number(e.target.value))}
              style={{
                background: `linear-gradient(to right, #005A36 0%, #005A36 ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`
              }}
              className="w-full h-[5px] rounded-full appearance-none cursor-pointer outline-none active:cursor-grabbing
                [&::-webkit-slider-runnable-track]:bg-transparent
                [&::-webkit-slider-thumb]:appearance-none 
                [&::-webkit-slider-thumb]:h-3.5 
                [&::-webkit-slider-thumb]:w-3.5 
                [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:bg-[#005A36]"
            />
          </div>
        </div>

        <button
          onClick={clearFilters}
          className="w-full py-2.5 bg-transparent hover:bg-gray-50 border border-gray-200 rounded-full text-xs font-bold text-gray-500 transition-colors mt-4"
        >
          Clear filters
        </button>
      </aside>
    );
  };

  return (
    <div className="w-full text-[#0A1828] font-sans antialiased pb-20">

      {/* Breadcrumb
      <div className="w-full pt-5 px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-400 mb-4">
          <span onClick={() => setCurrentView('catalog')} className="hover:text-gray-600 cursor-pointer transition-colors">Home</span>
          <ChevronRight className="h-3 w-3" />
          <span 
            onClick={() => setCurrentView('catalog')} 
            className={`cursor-pointer transition-colors ${currentView === 'catalog' ? 'text-gray-700 font-bold' : 'hover:text-gray-600'}`}
          >
            All Products
          </span>
          {currentView === 'categories' && (
            <>
              <ChevronRight className="h-3 w-3" />
              <span className="text-gray-700 font-bold">Categories</span>
            </>
          )}
        </div>
      </div> */}

      {/* Main View Manager Router Toggle */}
      {currentView === 'categories' ? (
        <CategoriesView />
      ) : (
        <>
          {/* Header */}
          <div className="w-full pb-4 px-6 max-w-7xl mx-auto">
            <span className="text-[10px] uppercase tracking-widest text-[#005A36] font-extrabold block mb-1">Catalog</span>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-1">All Products</h1>
            <p className="text-xs text-gray-400 font-medium">
              {visibleProducts.length} of {PRODUCTS.length} items from trusted sellers
            </p>
          </div>

          {/* Divider */}
          <div className="w-full border-t border-gray-200 mb-6" />

          <div className="max-w-7xl w-full mx-auto px-6 flex flex-col lg:grid lg:grid-cols-12 gap-6">

            {/* Mobile filter toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setFiltersOpen(o => !o)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 shadow-sm"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filters
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
              </button>
              {filtersOpen && (
                <div className="mt-3">
                  <Sidebar />
                </div>
              )}
            </div>

            {/* Desktop sidebar */}
            <aside className="hidden lg:block lg:col-span-3 sticky top-4 self-start">
              <Sidebar />
            </aside>

            {/* Vertical divider + product grid */}
            <div className="lg:col-span-9 flex gap-6">

              {/* Vertical divider */}
              <div className="hidden lg:block w-px bg-gray-200 self-stretch" />

              <main className="flex-1 space-y-4">

                {/* Toolbar — right-aligned */}
                <div className="flex justify-end items-center gap-3">
                  <p className="text-xs font-semibold text-gray-400">
                    <span className="text-gray-900 font-bold">{visibleProducts.length}</span> products
                  </p>
                  <div className="relative" ref={sortRef}>
                    <button
                      onClick={() => setSortOpen(o => !o)}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
                    >
                      <ArrowUpDown className="h-3.5 w-3.5 text-gray-400" />
                      {SORT_MODES[sortIdx]}
                      <ChevronDown className={`h-3.5 w-3.5 text-gray-400 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {sortOpen && (
                      <div className="absolute right-0 top-full mt-1.5 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                        {SORT_MODES.map((mode, i) => (
                          <button
                            key={mode}
                            onClick={() => { setSortIdx(i); setSortOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors ${
                              i === sortIdx ? 'bg-[#005A36]/8 text-[#005A36]' : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Cards Grid & Center Action Area */}
                {visibleProducts.length === 0 ? (
                  <div className="text-center py-20 text-gray-400 text-sm">
                    No products match your filters.
                  </div>
                ) : (
                  <div className="space-y-12">
                    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                      {visibleProducts.map(product => {
                        const isEmerald = product.bgType === 'emerald';
                        return (
                          <div
                            key={product.id}
                            className="bg-white border border-gray-200/60 rounded-[1.4rem] flex flex-col shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group relative"
                          >
                            {/* Image */}
                            <div className={`h-56 relative overflow-hidden ${isEmerald ? 'bg-[#005A36]' : 'bg-[#F9E2D8]'}`}>
                              <span className={`absolute top-2.5 left-2.5 text-[9px] font-black px-2.5 py-1 rounded-full z-10 ${
                                isEmerald ? 'bg-white/20 text-white backdrop-blur-sm' : 'bg-[#F9E2D8] text-[#D95F39]'
                              }`}>
                                {product.discount}
                              </span>

                              <button
                                onClick={() => toggleFavorite(product.id)}
                                className="absolute top-2.5 right-2.5 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm z-10 hover:scale-110 transition-transform"
                              >
                                <Heart className={`h-3.5 w-3.5 ${favorites.has(product.id) ? 'fill-[#D95F39] stroke-[#D95F39]' : 'stroke-gray-300'}`} />
                              </button>

                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>

                            {/* Quick Add Overlay */}
                            <div
                              className="absolute inset-x-0 flex justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 z-20"
                              style={{ bottom: 'calc(110px - 14px)' }}
                            >
                              <button
                                onClick={e => e.stopPropagation()}
                                className="flex items-center gap-1.5 px-5 py-2 rounded-full text-[11px] font-black shadow-lg bg-[#014329] text-white hover:bg-[#0a7b4e] active:scale-95 transition-transform"
                              >
                                + Quick Add
                              </button>
                            </div>

                            {/* Card Info */}
                            <div className="px-2 pt-3 pb-3 flex flex-col flex-1">
                              <span className="text-[8.5px] font-black tracking-wider text-gray-400 uppercase block mb-1">
                                {product.brand}
                              </span>
                              <h2 className="text-[11px] font-bold text-gray-800 line-clamp-2 leading-snug mb-2 min-h-8">
                                {product.name}
                              </h2>

                              <div className="flex items-center gap-1 mb-2">
                                <Star className="h-3 w-3 fill-amber-400 stroke-amber-400" />
                                <span className="text-[11px] font-black text-gray-800">{product.rating}</span>
                                <span className="text-[10px] text-gray-400 font-medium">({product.reviews.toLocaleString()})</span>
                              </div>

                              <div className="mt-auto">
                                <div className="flex items-baseline gap-1.5 mb-0.5">
                                  <span className="text-sm font-black text-[#D95F39]">${product.price.toFixed(2)}</span>
                                  <span className="text-[10px] text-gray-400 font-bold line-through">${product.originalPrice.toFixed(2)}</span>
                                </div>
                                <span className="text-[9.5px] text-red-500 font-extrabold block min-h-3.5">
                                  {product.stockText || ''}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Explore all categories Action Button */}
                    <div className="flex justify-center pt-2">
                      <button 
                        onClick={() => setCurrentView('categories')}
                        className="flex items-center gap-2 px-6 py-2 bg-transparent hover:bg-gray-50 border border-gray-300 rounded-full text-xs font-bold text-gray-700 transition-all shadow-sm active:scale-95"
                      >
                        Explore all categories 
                        <span className="text-sm font-light leading-none relative -top-[0.5px]">→</span>
                      </button>
                    </div>
                  </div>
                )}
              </main>
            </div>
          </div>
        </>
      )}
    </div>
  );
}