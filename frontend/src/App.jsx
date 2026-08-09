import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingCart, User, Package, Check, Star, ChevronLeft, ChevronRight, X, Clock, ShieldCheck, Truck } from 'lucide-react';

const PRODUCTS_DATA = [
  {
    id: 1,
    title: "Apple iPhone 15 Pro (128 GB) - Natural Titanium",
    brand: "Apple",
    category: "Mobiles",
    price: 127990,
    mrp: 134900,
    rating: 4.7,
    ratingCount: 14230,
    assured: true,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=80",
    specs: ["128 GB ROM", "15.49 cm (6.1 inch) Super Retina XDR Display", "48MP + 12MP + 12MP | 12MP Front", "A17 Pro Chip 6 Core Processor"],
  },
  {
    id: 2,
    title: "Samsung Galaxy S24 Ultra 5G (512 GB) - Titanium Gray",
    brand: "Samsung",
    category: "Mobiles",
    price: 139999,
    mrp: 149999,
    rating: 4.8,
    ratingCount: 8910,
    assured: true,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=80",
    specs: ["512 GB ROM | 12 GB RAM", "17.27 cm (6.8 inch) Dynamic AMOLED 2X", "200MP + 50MP + 12MP + 10MP", "Snapdragon 8 Gen 3 Processor"],
  },
  {
    id: 3,
    title: "Realme 12 Pro+ 5G (256 GB) - Submarine Blue",
    brand: "Realme",
    category: "Mobiles",
    price: 29999,
    mrp: 34999,
    rating: 4.4,
    ratingCount: 45120,
    assured: true,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=80",
    specs: ["256 GB ROM | 8 GB RAM", "17.02 cm (6.7 inch) Full HD+ OLED", "64MP + 50MP + 8MP", "Snapdragon 7s Gen 2 Processor"],
  },
  {
    id: 4,
    title: "Apple MacBook Air M3 (8GB / 256GB SSD) - Starlight",
    brand: "Apple",
    category: "Electronics",
    price: 104900,
    mrp: 114900,
    rating: 4.8,
    ratingCount: 3450,
    assured: true,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=80",
    specs: ["Apple M3 Chip 8-Core CPU", "8 GB Unified Memory", "256 GB SSD Storage", "34.54 cm (13.6 inch) Liquid Retina Display"],
  },
  {
    id: 5,
    title: "ASUS ROG Strix G16 Gaming Laptop (Core i7 / RTX 4060)",
    brand: "ASUS",
    category: "Electronics",
    price: 124990,
    mrp: 154900,
    rating: 4.6,
    ratingCount: 1280,
    assured: false,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=80",
    specs: ["Intel Core i7 13th Gen", "16 GB DDR5 RAM | 1 TB NVMe SSD", "NVIDIA GeForce RTX 4060 8GB", "16-inch FHD+ 165Hz Display"],
  },
  {
    id: 6,
    title: "Sony WH-1000XM5 Noise Cancelling Headphones - Black",
    brand: "Sony",
    category: "Audio",
    price: 26990,
    mrp: 34990,
    rating: 4.6,
    ratingCount: 9840,
    assured: true,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80",
    specs: ["Auto NC Optimizer", "30-hour Battery Life", "Speak-to-Chat Technology", "Multipoint Bluetooth Connection"],
  },
  {
    id: 7,
    title: "boAt Airdopes 141 True Wireless Earbuds with 42H Playtime",
    brand: "boAt",
    category: "Audio",
    price: 1299,
    mrp: 4490,
    rating: 4.2,
    ratingCount: 185400,
    assured: true,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=80",
    specs: ["42 Hours Playback", "ENx Tech Clear Voice Calls", "ASAP Fast Charge (5 mins = 75 mins)", "IPX4 Sweat Resistance"],
  },
  {
    id: 8,
    title: "LG 139 cm (55 inches) 4K Ultra HD Smart LED TV",
    brand: "LG",
    category: "Appliances",
    price: 42990,
    mrp: 71990,
    rating: 4.5,
    ratingCount: 28900,
    assured: true,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&auto=format&fit=crop&q=80",
    specs: ["4K Ultra HD (3840x2160)", "α5 AI Processor Gen6", "WebOS 23 Smart TV Platform", "20W Speaker output with AI Sound"],
  },
  {
    id: 9,
    title: "Samsung 236L 3 Star Inverter Double Door Refrigerator",
    brand: "Samsung",
    category: "Appliances",
    price: 25990,
    mrp: 33990,
    rating: 4.4,
    ratingCount: 15670,
    assured: true,
    image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=500&auto=format&fit=crop&q=80",
    specs: ["236 Litres Capacity", "Digital Inverter Compressor", "3 Star Energy Rating", "MoistFresh Zone"],
  },
  {
    id: 10,
    title: "Nike Air Max Solo Casual Sneakers for Men",
    brand: "Nike",
    category: "Fashion",
    price: 4795,
    mrp: 7995,
    rating: 4.3,
    ratingCount: 6240,
    assured: false,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80",
    specs: ["Upper Material: Mesh & Synthetic Leather", "Sole: Max Air Unit Rubber", "Closure: Lace-up", "Color: Crimson/Black/White"],
  }
];

export default function App() {
  const [products, setProducts] = useState(PRODUCTS_DATA);
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS_DATA);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceLimit, setPriceLimit] = useState(150000);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Modals state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Banners
  const banners = ['/images/banner1.png', '/images/banner2.png'];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % banners.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Filter Engine
  useEffect(() => {
    let result = products.filter(p => {
      if (activeCategory !== 'All' && p.category !== activeCategory) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!p.title.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q)) return false;
      }
      if (p.price > priceLimit) return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
      return true;
    });

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

    setFilteredProducts(result);
  }, [activeCategory, searchQuery, priceLimit, selectedBrands, sortBy, products]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const addToCart = (productId) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item => item.id === productId ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { id: productId, qty: 1 }];
    });
    showToast('Added to Cart 🛒');
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('Removed from Wishlist');
        return prev.filter(id => id !== productId);
      }
      showToast('Added to Wishlist ❤️');
      return [...prev, productId];
    });
  };

  const totalCartCount = cart.reduce((a, b) => a + b.qty, 0);

  return (
    <div className="fk-app">
      {/* Header */}
      <header className="fk-header">
        <div className="fk-nav-container">
          <a href="#" className="fk-logo" onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}>
            <div className="fk-logo-text">Flipkart</div>
            <div className="fk-logo-sub">
              Explore <span>Plus</span>
            </div>
          </a>

          <div className="fk-search-wrapper">
            <div className="fk-search-box">
              <input 
                type="text" 
                className="fk-search-input" 
                placeholder="Search for products, brands and more" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <button className="fk-search-btn"><Search size={18} /></button>
            </div>
          </div>

          <div className="fk-nav-actions">
            <button className="fk-login-btn" onClick={() => setIsLoginOpen(true)}>Login</button>

            <div className="fk-nav-item" onClick={() => setIsWishlistOpen(true)}>
              <Heart size={20} />
              <span>Wishlist</span>
              {wishlist.length > 0 && <span className="fk-badge">{wishlist.length}</span>}
            </div>

            <div className="fk-nav-item" onClick={() => setIsOrdersOpen(true)}>
              <Package size={20} />
              <span>Orders</span>
            </div>

            <div className="fk-nav-item" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart size={20} />
              <span>Cart</span>
              {totalCartCount > 0 && <span className="fk-badge">{totalCartCount}</span>}
            </div>
          </div>
        </div>
      </header>

      {/* Category Bar */}
      <nav className="fk-cat-bar">
        <div className="fk-cat-container">
          {['All', 'Mobiles', 'Electronics', 'Appliances', 'Fashion', 'Audio'].map(cat => (
            <div 
              key={cat} 
              className={`fk-cat-item ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              <div className="fk-cat-icon">{cat === 'Mobiles' ? '📱' : cat === 'Electronics' ? '💻' : cat === 'Fashion' ? '👕' : '⚡'}</div>
              <div className="fk-cat-title">{cat}</div>
            </div>
          ))}
        </div>
      </nav>

      {/* Main Container */}
      <main className="fk-main-container">
        {/* Banner Slider */}
        <section className="fk-carousel-wrapper">
          <div className="fk-carousel-slides" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
            {banners.map((b, i) => (
              <div className="fk-slide" key={i}>
                <img src={b} alt="Banner" />
              </div>
            ))}
          </div>
          <button className="fk-carousel-btn prev" onClick={() => setActiveSlide((activeSlide - 1 + banners.length) % banners.length)}><ChevronLeft /></button>
          <button className="fk-carousel-btn next" onClick={() => setActiveSlide((activeSlide + 1) % banners.length)}><ChevronRight /></button>
        </section>

        {/* Content Layout */}
        <div className="fk-content-layout">
          {/* Sidebar */}
          <aside className="fk-sidebar">
            <div className="fk-filter-header">
              <span className="fk-filter-title">Filters</span>
              <button className="fk-clear-btn" onClick={() => { setActiveCategory('All'); setSearchQuery(''); setPriceLimit(150000); }}>CLEAR ALL</button>
            </div>

            <div className="fk-filter-group">
              <div className="fk-filter-label">Max Price: ₹{priceLimit.toLocaleString('en-IN')}</div>
              <input type="range" min="1000" max="150000" step="5000" value={priceLimit} onChange={e => setPriceLimit(Number(e.target.value))} className="fk-range-slider" />
            </div>
          </aside>

          {/* Product Grid */}
          <section className="fk-products-container">
            <div className="fk-sort-bar">
              <span className="fk-sort-label">Sort By:</span>
              <span className={`fk-sort-opt ${sortBy === 'relevance' ? 'active' : ''}`} onClick={() => setSortBy('relevance')}>Relevance</span>
              <span className={`fk-sort-opt ${sortBy === 'price-low' ? 'active' : ''}`} onClick={() => setSortBy('price-low')}>Price Low to High</span>
              <span className={`fk-sort-opt ${sortBy === 'price-high' ? 'active' : ''}`} onClick={() => setSortBy('price-high')}>Price High to Low</span>
              <span style={{ marginLeft: 'auto', fontSize: '13px', color: '#878787' }}>{filteredProducts.length} Items</span>
            </div>

            <div className="fk-product-grid">
              {filteredProducts.map(p => {
                const isWished = wishlist.includes(p.id);
                return (
                  <div key={p.id} className="fk-card">
                    <button className={`fk-card-wish ${isWished ? 'active' : ''}`} onClick={() => toggleWishlist(p.id)}>
                      <Heart size={18} fill={isWished ? 'currentColor' : 'none'} />
                    </button>
                    <div className="fk-card-img-wrap" onClick={() => setSelectedProduct(p)}>
                      <img src={p.image} alt={p.title} />
                    </div>
                    <div className="fk-card-brand">{p.brand}</div>
                    <div className="fk-card-title" onClick={() => setSelectedProduct(p)}>{p.title}</div>

                    <div className="fk-card-rating-row">
                      <div className="fk-rating-chip">{p.rating} ★</div>
                      <span className="fk-rating-count">({p.ratingCount})</span>
                    </div>

                    <div className="fk-price-row">
                      <span className="fk-price-curr">₹{p.price.toLocaleString('en-IN')}</span>
                      <span className="fk-price-mrp">₹{p.mrp.toLocaleString('en-IN')}</span>
                    </div>

                    <button className="fk-card-btn" onClick={() => addToCart(p.id)}>
                      <ShoppingCart size={16} /> Add to Cart
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      {/* Toast */}
      {toastMsg && <div className="fk-toast-container"><div className="fk-toast">{toastMsg}</div></div>}
    </div>
  );
}
