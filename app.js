// Flipkart Web Application Core JavaScript

// Sample Product Database
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
    highlights: ["Grade 5 Titanium design with textured matte glass back", "Action button for quick shortcuts", "USB-C support with USB 3 speeds"]
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
    highlights: ["Built-in S Pen included", "Galaxy AI feature suite", "Armor Aluminum & Gorilla Glass Armor"]
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
    highlights: ["64MP Periscope Portrait Camera", "Luxury Watch Design by Ollivier Savéo", "67W SUPERVOOC Charge"]
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
    highlights: ["Up to 18 hours battery life", "MagSafe 3 charging port", "Silent fanless design"]
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
    highlights: ["ROG Intelligent Cooling", "Per-key RGB keyboard", "MUX Switch with Advanced Optimus"]
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
    highlights: ["Industry leading noise canceling", "Magnificent sound engineered with HD Noise Canceling Processor QN1"]
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
    highlights: ["8mm dynamic drivers", "Beast Mode low latency for gaming"]
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
    highlights: ["Game Optimizer & ALLM", "Magic Remote control included"]
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
    highlights: ["Stabilizer free operation (100V - 300V)", "Coolpack feature keeps cooling for up to 12 hours during power outages"]
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
    highlights: ["Classic Air Max heel cushioning", "Lightweight breathable upper mesh"]
  },
  {
    id: 11,
    title: "Levi's Men's 511 Slim Fit Stretch Denim Jeans",
    brand: "Levi's",
    category: "Fashion",
    price: 2199,
    mrp: 3999,
    rating: 4.2,
    ratingCount: 12500,
    assured: true,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop&q=80",
    specs: ["Material: 99% Cotton, 1% Elastane", "Fit: Modern Slim", "Wash: Dark Indigo Blue", "Zip Fly with Button closure"],
    highlights: ["Iconic 5-pocket styling", "Flex stretch for all-day comfort"]
  },
  {
    id: 12,
    title: "Fastrack Limitless FS1 Smartwatch - 1.95\" HD Display",
    brand: "Fastrack",
    category: "Electronics",
    price: 1999,
    mrp: 4995,
    rating: 4.1,
    ratingCount: 34100,
    assured: true,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80",
    specs: ["1.95\" Horizon Curve Display", "Single-Sync BT Calling", "100+ Sports Modes", "24x7 Heart Rate & SpO2 Monitor"],
    highlights: ["Built-in Alexa Voice Assistant", "Up to 7 days battery life"]
  },
  {
    id: 13,
    title: "Philips HD9200/90 Air Fryer - Rapid Air Technology",
    brand: "Philips",
    category: "Appliances",
    price: 6499,
    mrp: 9995,
    rating: 4.5,
    ratingCount: 21300,
    assured: true,
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=80",
    specs: ["4.1 Liter Pan Capacity", "1400W Power Consumption", "Up to 90% Less Fat", "Timer & Adjustable Temperature Control"],
    highlights: ["NutriU App recipe integration", "Dishwasher safe removable parts"]
  },
  {
    id: 14,
    title: "Sony PlayStation 5 Console (Slim Disc Edition)",
    brand: "Sony",
    category: "Electronics",
    price: 54990,
    mrp: 54990,
    rating: 4.9,
    ratingCount: 7830,
    assured: true,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&auto=format&fit=crop&q=80",
    specs: ["1 TB Custom Ultra-High Speed SSD", "4K-TV Gaming Support", "DualSense Wireless Controller with Haptic Feedback", "Tempest 3D AudioTech"],
    highlights: ["Compact slim chassis design", "Ray Tracing graphics capability"]
  }
];

// App State Management
let state = {
  products: [...PRODUCTS_DATA],
  filteredProducts: [...PRODUCTS_DATA],
  cart: JSON.parse(localStorage.getItem('fk_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('fk_wishlist')) || [],
  orders: JSON.parse(localStorage.getItem('fk_orders')) || [],
  activeCategory: 'All',
  searchQuery: '',
  priceLimit: 150000,
  selectedBrands: [],
  minRating: 0,
  assuredOnly: false,
  sortBy: 'relevance',
  selectedProductModal: null,
  activeSlide: 0,
  couponDiscount: 0
};

// API Gateway Base URL
const API_GATEWAY_URL = 'http://localhost:8000/api/v1';

// Synchronize with Microservices via API Gateway
async function initMicroservicesData() {
  try {
    const res = await fetch(`${API_GATEWAY_URL}/products`);
    if (res.ok) {
      const data = await res.json();
      if (data.products && data.products.length > 0) {
        state.products = data.products;
        state.filteredProducts = [...data.products];
        renderDeals();
        renderProducts();
        console.log('✔ Connected to Catalog Microservice via Gateway');
      }
    }
  } catch (err) {
    console.log('ℹ Running in standalone/fallback mode (Gateway offline)');
  }
}

// DOM Content Loaded Initializer
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  initCountdownTimer();
  renderDeals();
  renderProducts();
  updateHeaderCounters();
  setupEventListeners();
  initMicroservicesData();
});

// Save State to LocalStorage
function saveState() {
  localStorage.setItem('fk_cart', JSON.stringify(state.cart));
  localStorage.setItem('fk_wishlist', JSON.stringify(state.wishlist));
  localStorage.setItem('fk_orders', JSON.stringify(state.orders));
  updateHeaderCounters();
}

// Update Header Counters
function updateHeaderCounters() {
  const cartCountEl = document.getElementById('cartCount');
  const wishCountEl = document.getElementById('wishCount');
  const mobCartCountEl = document.getElementById('mobCartCount');

  const totalCartItems = state.cart.reduce((acc, item) => acc + item.qty, 0);
  if (cartCountEl) cartCountEl.textContent = totalCartItems;
  if (wishCountEl) wishCountEl.textContent = state.wishlist.length;
  if (mobCartCountEl) mobCartCountEl.textContent = totalCartItems;
}

// Banner Carousel Logic
function initCarousel() {
  const slidesTrack = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  if (!slidesTrack || !dotsContainer) return;

  const slidesCount = 2; // total banner slides
  dotsContainer.innerHTML = '';

  for (let i = 0; i < slidesCount; i++) {
    const dot = document.createElement('div');
    dot.className = `fk-dot ${i === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  // Auto slide interval
  setInterval(() => {
    state.activeSlide = (state.activeSlide + 1) % slidesCount;
    goToSlide(state.activeSlide);
  }, 4500);
}

function goToSlide(index) {
  const slidesTrack = document.getElementById('carouselTrack');
  const dots = document.querySelectorAll('.fk-dot');
  if (!slidesTrack) return;
  state.activeSlide = index;
  slidesTrack.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === index);
  });
}

function prevSlide() {
  state.activeSlide = (state.activeSlide - 1 + 2) % 2;
  goToSlide(state.activeSlide);
}

function nextSlide() {
  state.activeSlide = (state.activeSlide + 1) % 2;
  goToSlide(state.activeSlide);
}

// Deals Countdown Timer
function initCountdownTimer() {
  const timerEl = document.getElementById('dealsTimer');
  if (!timerEl) return;

  let totalSeconds = 5 * 3600 + 42 * 60 + 18; // 5 hours 42 mins 18 secs

  setInterval(() => {
    if (totalSeconds > 0) totalSeconds--;
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const s = String(totalSeconds % 60).padStart(2, '0');
    timerEl.textContent = `${h}h : ${m}m : ${s}s`;
  }, 1000);
}

// Render Flash Deals
function renderDeals() {
  const track = document.getElementById('dealsTrack');
  if (!track) return;

  const dealProducts = state.products.slice(0, 6);
  track.innerHTML = dealProducts.map(p => `
    <div class="fk-deal-item" onclick="openProductModal(${p.id})">
      <img src="${p.image}" alt="${p.title}" />
      <div class="fk-deal-title">${p.title}</div>
      <div class="fk-deal-offer">From ₹${p.price.toLocaleString('en-IN')}</div>
      <div style="font-size:11px; color:#878787;">Up to ${Math.round(((p.mrp - p.price) / p.mrp) * 100)}% Off</div>
    </div>
  `).join('');
}

// Main Products Filtering & Sorting Engine
function filterProducts() {
  let result = state.products.filter(p => {
    // Category Filter
    if (state.activeCategory !== 'All' && p.category !== state.activeCategory) return false;
    // Search Query
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      const matches = p.title.toLowerCase().includes(q) ||
                      p.brand.toLowerCase().includes(q) ||
                      p.category.toLowerCase().includes(q);
      if (!matches) return false;
    }
    // Price Range
    if (p.price > state.priceLimit) return false;
    // Brand Checkboxes
    if (state.selectedBrands.length > 0 && !state.selectedBrands.includes(p.brand)) return false;
    // Rating
    if (state.minRating > 0 && p.rating < state.minRating) return false;
    // Assured
    if (state.assuredOnly && !p.assured) return false;

    return true;
  });

  // Sorting
  if (state.sortBy === 'price-low') {
    result.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-high') {
    result.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  } else if (state.sortBy === 'discount') {
    result.sort((a, b) => ((b.mrp - b.price)/b.mrp) - ((a.mrp - a.price)/a.mrp));
  }

  state.filteredProducts = result;
  renderProducts();
}

// Render Products Grid
function renderProducts() {
  const grid = document.getElementById('productGrid');
  const countEl = document.getElementById('productCount');
  if (!grid) return;

  if (countEl) countEl.textContent = state.filteredProducts.length;

  if (state.filteredProducts.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 48px 16px;">
        <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/error-no-search-results_a63e93.png" style="width:160px; margin-bottom:16px;" />
        <h3>Sorry, no products found</h3>
        <p style="color:#878787; font-size:14px; margin-top:8px;">Try refining your filters or search keywords.</p>
        <button onclick="resetFilters()" style="margin-top:16px; background:var(--primary); color:#fff; padding:8px 24px; border-radius:4px; font-weight:600;">Reset Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = state.filteredProducts.map(p => {
    const isWished = state.wishlist.includes(p.id);
    const discPct = Math.round(((p.mrp - p.price) / p.mrp) * 100);

    return `
      <div class="fk-card">
        <button class="fk-card-wish ${isWished ? 'active' : ''}" onclick="toggleWishlist(event, ${p.id})" title="Add to Wishlist">
          <svg width="18" height="18" fill="${isWished ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>

        <div class="fk-card-img-wrap" onclick="openProductModal(${p.id})">
          <img src="${p.image}" alt="${p.title}" loading="lazy" />
        </div>

        <div class="fk-card-brand">${p.brand}</div>
        <div class="fk-card-title" onclick="openProductModal(${p.id})">${p.title}</div>

        <div class="fk-card-rating-row">
          <div class="fk-rating-chip">
            ${p.rating} ★
          </div>
          <span class="fk-rating-count">(${p.ratingCount.toLocaleString()})</span>
          ${p.assured ? `
            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" class="fk-assured-tag" alt="Flipkart Assured" />
          ` : ''}
        </div>

        <div class="fk-price-row">
          <span class="fk-price-curr">₹${p.price.toLocaleString('en-IN')}</span>
          <span class="fk-price-mrp">₹${p.mrp.toLocaleString('en-IN')}</span>
          <span class="fk-price-disc">${discPct}% off</span>
        </div>

        <button class="fk-card-btn" onclick="addToCart(event, ${p.id})">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          Add to Cart
        </button>
      </div>
    `;
  }).join('');
}

// Search Suggestions Autocomplete
function setupEventListeners() {
  const searchInput = document.getElementById('searchInput');
  const suggestionsBox = document.getElementById('suggestionsList');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      state.searchQuery = val;

      if (val.length > 0) {
        const matches = state.products.filter(p =>
          p.title.toLowerCase().includes(val.toLowerCase()) ||
          p.brand.toLowerCase().includes(val.toLowerCase()) ||
          p.category.toLowerCase().includes(val.toLowerCase())
        ).slice(0, 5);

        if (matches.length > 0 && suggestionsBox) {
          suggestionsBox.innerHTML = matches.map(m => `
            <div class="fk-suggestion-item" onclick="selectSuggestion('${m.title.replace(/'/g, "\\'")}')">
              <img src="${m.image}" />
              <div>
                <div style="font-weight:600; font-size:13px;">${m.title}</div>
                <div style="font-size:11px; color:#878787;">in ${m.category} • ₹${m.price.toLocaleString('en-IN')}</div>
              </div>
            </div>
          `).join('');
          suggestionsBox.classList.add('active');
        } else if (suggestionsBox) {
          suggestionsBox.classList.remove('active');
        }
      } else if (suggestionsBox) {
        suggestionsBox.classList.remove('active');
      }

      filterProducts();
    });

    document.addEventListener('click', (e) => {
      if (suggestionsBox && !e.target.closest('.fk-search-wrapper')) {
        suggestionsBox.classList.remove('active');
      }
    });
  }

  // Price range slider listener
  const priceSlider = document.getElementById('priceRangeSlider');
  const priceVal = document.getElementById('priceRangeVal');
  if (priceSlider) {
    priceSlider.addEventListener('input', (e) => {
      state.priceLimit = parseInt(e.target.value, 10);
      if (priceVal) priceVal.textContent = `₹${state.priceLimit.toLocaleString('en-IN')}`;
      filterProducts();
    });
  }
}

function selectSuggestion(title) {
  const searchInput = document.getElementById('searchInput');
  const suggestionsBox = document.getElementById('suggestionsList');
  if (searchInput) searchInput.value = title;
  state.searchQuery = title;
  if (suggestionsBox) suggestionsBox.classList.remove('active');
  filterProducts();
}

// Category Toggle
function setCategory(cat) {
  state.activeCategory = cat;
  document.querySelectorAll('.fk-cat-item').forEach(item => {
    item.classList.toggle('active', item.dataset.cat === cat);
  });
  filterProducts();
}

// Brand Filter Toggle
function toggleBrandFilter(brand) {
  const idx = state.selectedBrands.indexOf(brand);
  if (idx > -1) {
    state.selectedBrands.splice(idx, 1);
  } else {
    state.selectedBrands.push(brand);
  }
  filterProducts();
}

// Rating Filter Toggle
function setMinRating(rating) {
  state.minRating = state.minRating === rating ? 0 : rating;
  filterProducts();
}

// Flipkart Assured Filter Toggle
function toggleAssuredFilter() {
  state.assuredOnly = !state.assuredOnly;
  filterProducts();
}

// Sort Handler
function setSortBy(sortType) {
  state.sortBy = sortType;
  document.querySelectorAll('.fk-sort-opt').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.sort === sortType);
  });
  filterProducts();
}

// Reset All Filters
function resetFilters() {
  state.activeCategory = 'All';
  state.searchQuery = '';
  state.priceLimit = 150000;
  state.selectedBrands = [];
  state.minRating = 0;
  state.assuredOnly = false;
  state.sortBy = 'relevance';

  const input = document.getElementById('searchInput');
  if (input) input.value = '';

  const slider = document.getElementById('priceRangeSlider');
  if (slider) slider.value = 150000;

  const priceVal = document.getElementById('priceRangeVal');
  if (priceVal) priceVal.textContent = '₹1,50,000';

  document.querySelectorAll('.fk-filter-checkbox input').forEach(cb => cb.checked = false);

  filterProducts();
  showToast('Filters reset successfully');
}

// Wishlist Action
function toggleWishlist(e, productId) {
  if (e) e.stopPropagation();
  const idx = state.wishlist.indexOf(productId);
  if (idx > -1) {
    state.wishlist.splice(idx, 1);
    showToast('Removed from Wishlist');
  } else {
    state.wishlist.push(productId);
    showToast('Added to Wishlist ❤️');
  }
  saveState();
  renderProducts();
  renderWishlistModal();
}

// Cart Action
function addToCart(e, productId, openDrawerAfter = false) {
  if (e) e.stopPropagation();
  const existing = state.cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ id: productId, qty: 1 });
  }
  saveState();
  showToast('Added to Cart 🛒');

  if (openDrawerAfter) {
    closeProductModal();
    toggleCartDrawer(true);
  }
}

function updateCartQty(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    state.cart = state.cart.filter(i => i.id !== productId);
    showToast('Item removed from Cart');
  }
  saveState();
  renderCartDrawer();
}

// Product Details Modal
function openProductModal(productId) {
  const p = state.products.find(item => item.id === productId);
  if (!p) return;
  state.selectedProductModal = p;

  const modalOverlay = document.getElementById('productDetailModal');
  const modalContent = document.getElementById('pdModalContent');
  if (!modalOverlay || !modalContent) return;

  const discPct = Math.round(((p.mrp - p.price) / p.mrp) * 100);

  modalContent.innerHTML = `
    <div class="fk-pd-layout">
      <div class="fk-pd-gallery">
        <img src="${p.image}" class="fk-pd-main-img" alt="${p.title}" />
        <div class="fk-pd-actions">
          <button class="fk-btn-yellow" onclick="addToCart(null, ${p.id}, true)">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            ADD TO CART
          </button>
          <button class="fk-btn-orange" onclick="buyNowDirect(${p.id})">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            BUY NOW
          </button>
        </div>
      </div>

      <div>
        <div style="font-size:12px; color:#878787; text-transform:uppercase; font-weight:700;">${p.brand}</div>
        <div class="fk-pd-title">${p.title}</div>

        <div class="fk-card-rating-row" style="margin-bottom:12px;">
          <div class="fk-rating-chip">${p.rating} ★</div>
          <span style="font-size:13px; color:#878787; font-weight:600;">${p.ratingCount.toLocaleString()} Ratings & Reviews</span>
          ${p.assured ? `<img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" class="fk-assured-tag" />` : ''}
        </div>

        <div class="fk-price-row" style="margin-bottom:16px;">
          <span style="font-size:24px; font-weight:800;">₹${p.price.toLocaleString('en-IN')}</span>
          <span style="font-size:14px; color:#878787; text-decoration:line-through;">₹${p.mrp.toLocaleString('en-IN')}</span>
          <span style="font-size:16px; font-weight:700; color:var(--green);">${discPct}% off</span>
        </div>

        <div class="fk-pd-offers">
          <div style="font-size:14px; font-weight:700; margin-bottom:8px;">Available Offers</div>
          <div class="fk-pd-offer-item">
            <span class="fk-pd-offer-tag">Bank Offer</span>
            10% Instant Discount on HDFC Bank Credit Card Txns up to ₹1,500.
          </div>
          <div class="fk-pd-offer-item">
            <span class="fk-pd-offer-tag">Special Price</span>
            Get extra 15% off (price inclusive of cashback/coupon).
          </div>
          <div class="fk-pd-offer-item">
            <span class="fk-pd-offer-tag">Partner Offer</span>
            Sign-up for Flipkart Pay Later and get ₹500 Gift Card.
          </div>
        </div>

        <div style="margin-bottom:16px;">
          <div style="font-size:13px; font-weight:700; color:#878787; margin-bottom:6px;">Delivery Check</div>
          <div class="fk-pincode-box">
            <input type="text" id="pincodeInput" class="fk-pincode-input" placeholder="Enter Pincode" maxlength="6" value="400001" />
            <button class="fk-pincode-btn" onclick="checkPincode()">Check</button>
          </div>
          <div id="pincodeResult" style="font-size:12px; color:var(--green); font-weight:600;">Delivery by 2 Days | Free Delivery</div>
        </div>

        <div style="margin-bottom:16px;">
          <div style="font-size:14px; font-weight:700; margin-bottom:8px;">Specifications</div>
          <ul style="padding-left:18px; font-size:13px; color:#444;">
            ${p.specs.map(s => `<li style="margin-bottom:4px;">${s}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;

  modalOverlay.classList.add('active');
}

function closeProductModal() {
  const modalOverlay = document.getElementById('productDetailModal');
  if (modalOverlay) modalOverlay.classList.remove('active');
}

function checkPincode() {
  const pin = document.getElementById('pincodeInput').value;
  const res = document.getElementById('pincodeResult');
  if (!pin || pin.length !== 6 || isNaN(pin)) {
    res.style.color = 'var(--red)';
    res.textContent = 'Please enter a valid 6-digit Pincode';
    return;
  }
  res.style.color = 'var(--green)';
  res.textContent = `Express Delivery available for ${pin} by Tomorrow | FREE`;
}

function buyNowDirect(productId) {
  addToCart(null, productId, false);
  closeProductModal();
  openCheckoutModal();
}

// Cart Drawer Rendering
function toggleCartDrawer(open) {
  const drawer = document.getElementById('cartDrawer');
  if (!drawer) return;

  if (open) {
    renderCartDrawer();
    drawer.classList.add('active');
  } else {
    drawer.classList.remove('active');
  }
}

function renderCartDrawer() {
  const body = document.getElementById('cartDrawerBody');
  if (!body) return;

  if (state.cart.length === 0) {
    body.innerHTML = `
      <div style="text-align:center; padding:48px 16px;">
        <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/dvh-empty-cart_119420.png" style="width:160px; margin-bottom:16px;" />
        <h3>Your cart is empty!</h3>
        <p style="color:#878787; font-size:13px; margin-top:8px;">Explore our categories and add items to your cart.</p>
        <button onclick="toggleCartDrawer(false)" style="margin-top:16px; background:var(--primary); color:#fff; padding:10px 24px; border-radius:4px; font-weight:700;">Shop Now</button>
      </div>
    `;
    return;
  }

  let totalMRP = 0;
  let totalSellingPrice = 0;

  const itemsHTML = state.cart.map(item => {
    const p = state.products.find(prod => prod.id === item.id);
    if (!p) return '';

    totalMRP += p.mrp * item.qty;
    totalSellingPrice += p.price * item.qty;

    return `
      <div class="fk-cart-item">
        <img src="${p.image}" class="fk-cart-img" />
        <div class="fk-cart-info">
          <div style="font-size:14px; font-weight:600;">${p.title}</div>
          <div style="font-size:12px; color:#878787; margin-top:2px;">Seller: RetailNet</div>
          <div style="display:flex; align-items:baseline; gap:6px; margin-top:4px;">
            <span style="font-size:15px; font-weight:800;">₹${(p.price * item.qty).toLocaleString('en-IN')}</span>
            <span style="font-size:12px; color:#878787; text-decoration:line-through;">₹${(p.mrp * item.qty).toLocaleString('en-IN')}</span>
          </div>

          <div class="fk-qty-ctrl">
            <button class="fk-qty-btn" onclick="updateCartQty(${p.id}, -1)">-</button>
            <span style="font-weight:700; font-size:14px;">${item.qty}</span>
            <button class="fk-qty-btn" onclick="updateCartQty(${p.id}, 1)">+</button>
            <button onclick="updateCartQty(${p.id}, -${item.qty})" style="background:none; color:var(--red); font-size:12px; font-weight:600; margin-left:auto;">Remove</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const discountMRP = totalMRP - totalSellingPrice;
  const finalPayable = Math.max(0, totalSellingPrice - state.couponDiscount);

  body.innerHTML = `
    <div>${itemsHTML}</div>

    <div style="margin-top:16px;">
      <div style="font-size:13px; font-weight:700; margin-bottom:6px;">Have a Promo Coupon?</div>
      <div style="display:flex; gap:8px;">
        <input type="text" id="couponInput" placeholder="Try: FLIP100 or BIGSAVINGS" style="flex:1; border:1px solid var(--border); border-radius:4px; padding:8px; font-size:13px; text-transform:uppercase;" />
        <button onclick="applyCoupon()" style="background:var(--primary); color:#fff; font-weight:700; padding:8px 16px; border-radius:4px; font-size:13px;">Apply</button>
      </div>
      ${state.couponDiscount > 0 ? `<div style="font-size:12px; color:var(--green); font-weight:600; margin-top:4px;">Coupon Discount Applied: ₹${state.couponDiscount}!</div>` : ''}
    </div>

    <div class="fk-price-summary">
      <div style="font-size:14px; font-weight:700; border-bottom:1px solid var(--border); padding-bottom:8px; margin-bottom:12px;">PRICE DETAILS</div>
      <div class="fk-price-row-item">
        <span>Price (${state.cart.reduce((a,b)=>a+b.qty,0)} items)</span>
        <span>₹${totalMRP.toLocaleString('en-IN')}</span>
      </div>
      <div class="fk-price-row-item" style="color:var(--green);">
        <span>Discount on MRP</span>
        <span>- ₹${discountMRP.toLocaleString('en-IN')}</span>
      </div>
      ${state.couponDiscount > 0 ? `
        <div class="fk-price-row-item" style="color:var(--green);">
          <span>Coupon Discount</span>
          <span>- ₹${state.couponDiscount}</span>
        </div>
      ` : ''}
      <div class="fk-price-row-item">
        <span>Delivery Charges</span>
        <span style="color:var(--green); font-weight:700;">FREE</span>
      </div>
      <div class="fk-price-row-item fk-total-row">
        <span>Total Amount</span>
        <span>₹${finalPayable.toLocaleString('en-IN')}</span>
      </div>
      <div style="font-size:12px; color:var(--green); font-weight:700; margin-top:8px;">
        You will save ₹${(discountMRP + state.couponDiscount).toLocaleString('en-IN')} on this order!
      </div>
    </div>

    <button onclick="openCheckoutModal()" class="fk-btn-orange" style="width:100%; margin-top:16px; font-size:16px;">
      PLACE ORDER
    </button>
  `;
}

function applyCoupon() {
  const code = document.getElementById('couponInput').value.trim().toUpperCase();
  if (code === 'FLIP100') {
    state.couponDiscount = 100;
    showToast('Coupon FLIP100 Applied: ₹100 Off!');
  } else if (code === 'BIGSAVINGS') {
    state.couponDiscount = 500;
    showToast('Coupon BIGSAVINGS Applied: ₹500 Off!');
  } else {
    showToast('Invalid Coupon Code. Try FLIP100');
    return;
  }
  renderCartDrawer();
}

// Checkout Modal
function openCheckoutModal() {
  toggleCartDrawer(false);

  const modalOverlay = document.getElementById('checkoutModal');
  const content = document.getElementById('checkoutContent');
  if (!modalOverlay || !content) return;

  let totalSellingPrice = 0;
  state.cart.forEach(item => {
    const p = state.products.find(prod => prod.id === item.id);
    if (p) totalSellingPrice += p.price * item.qty;
  });
  const payable = Math.max(0, totalSellingPrice - state.couponDiscount);

  content.innerHTML = `
    <div style="padding:24px;">
      <h2 style="margin-bottom:20px; font-size:20px;">Checkout</h2>

      <div style="margin-bottom:20px; border-bottom:1px solid var(--border); padding-bottom:16px;">
        <h4 style="margin-bottom:10px;">1. Delivery Address</h4>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
          <input type="text" placeholder="Full Name" value="Sumit Shraikar" style="padding:10px; border:1px solid var(--border); border-radius:4px;" />
          <input type="text" placeholder="10-digit Mobile" value="9876543210" style="padding:10px; border:1px solid var(--border); border-radius:4px;" />
          <input type="text" placeholder="Pincode" value="400001" style="padding:10px; border:1px solid var(--border); border-radius:4px;" />
          <input type="text" placeholder="Locality / Town" value="Marine Drive" style="padding:10px; border:1px solid var(--border); border-radius:4px;" />
          <input type="text" placeholder="Address (House No, Building, Street)" value="Flat 402, Sea Crest Apartments" style="grid-column: 1/-1; padding:10px; border:1px solid var(--border); border-radius:4px;" />
        </div>
      </div>

      <div style="margin-bottom:20px;">
        <h4 style="margin-bottom:12px;">2. Select Payment Method</h4>
        <div class="fk-pay-option active" onclick="selectPayOption(this, 'upi')">
          <input type="radio" name="payMethod" checked />
          <div>
            <div style="font-weight:700;">UPI (Google Pay / PhonePe / Paytm / BHIM)</div>
            <div style="font-size:12px; color:#878787;">Instant payment via UPI ID or QR</div>
          </div>
        </div>
        <div class="fk-pay-option" onclick="selectPayOption(this, 'card')">
          <input type="radio" name="payMethod" />
          <div>
            <div style="font-weight:700;">Credit / Debit / ATM Card</div>
            <div style="font-size:12px; color:#878787;">Visa, MasterCard, RuPay, Maestro</div>
          </div>
        </div>
        <div class="fk-pay-option" onclick="selectPayOption(this, 'cod')">
          <input type="radio" name="payMethod" />
          <div>
            <div style="font-weight:700;">Cash on Delivery (COD)</div>
            <div style="font-size:12px; color:#878787;">Pay cash at your doorstep upon delivery</div>
          </div>
        </div>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; background:#f8fafc; padding:16px; border-radius:8px;">
        <div>
          <div style="font-size:12px; color:#878787;">Total Payable Amount</div>
          <div style="font-size:22px; font-weight:800; color:var(--text-main);">₹${payable.toLocaleString('en-IN')}</div>
        </div>
        <button onclick="confirmOrder(${payable})" class="fk-btn-orange" style="padding:12px 32px; font-size:16px;">
          CONFIRM & PAY
        </button>
      </div>
    </div>
  `;

  modalOverlay.classList.add('active');
}

function selectPayOption(el, method) {
  document.querySelectorAll('.fk-pay-option').forEach(opt => {
    opt.classList.remove('active');
    opt.querySelector('input').checked = false;
  });
  el.classList.add('active');
  el.querySelector('input').checked = true;
}

function closeCheckoutModal() {
  const modalOverlay = document.getElementById('checkoutModal');
  if (modalOverlay) modalOverlay.classList.remove('active');
}

// Confirm Order
async function confirmOrder(amount) {
  const newOrder = {
    id: 'OD' + Math.floor(1000000000 + Math.random() * 9000000000),
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    items: [...state.cart],
    totalAmount: amount,
    status: 'Packed', // Step 2 in tracker
    estimatedDelivery: 'In 2 Days'
  };

  // Asynchronously dispatch to Order Microservice
  try {
    fetch(`${API_GATEWAY_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: state.cart,
        totalAmount: amount,
        paymentMethod: 'UPI'
      })
    }).catch(e => console.log('Order Service sync optional fallback:', e.message));
  } catch (e) {
    // Graceful offline handling
  }

  state.orders.unshift(newOrder);
  state.cart = [];
  state.couponDiscount = 0;
  saveState();

  closeCheckoutModal();
  showOrderSuccessModal(newOrder);
}

function showOrderSuccessModal(order) {
  const modalOverlay = document.getElementById('successModal');
  const content = document.getElementById('successContent');
  if (!modalOverlay || !content) return;

  content.innerHTML = `
    <div style="padding:32px; text-align:center;">
      <div style="width:70px; height:70px; background:var(--green-bg); color:var(--green); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 16px; font-size:36px;">✓</div>
      <h2 style="color:var(--green); font-size:22px; margin-bottom:8px;">Order Placed Successfully!</h2>
      <p style="color:#878787; font-size:14px; margin-bottom:20px;">Order ID: <strong>${order.id}</strong></p>

      <div class="fk-timeline">
        <div class="fk-step completed">
          <div class="fk-step-icon">✓</div>
          <div class="fk-step-text">Ordered</div>
        </div>
        <div class="fk-step completed">
          <div class="fk-step-icon">✓</div>
          <div class="fk-step-text">Packed</div>
        </div>
        <div class="fk-step">
          <div class="fk-step-icon">3</div>
          <div class="fk-step-text">Shipped</div>
        </div>
        <div class="fk-step">
          <div class="fk-step-icon">4</div>
          <div class="fk-step-text">Delivered</div>
        </div>
      </div>

      <p style="font-size:14px; margin-bottom:24px;">Your package will be delivered by <strong>${order.estimatedDelivery}</strong>.</p>

      <div style="display:flex; justify-content:center; gap:12px;">
        <button onclick="closeSuccessModal(); openOrdersModal();" style="background:var(--primary); color:#fff; font-weight:700; padding:10px 24px; border-radius:4px;">View My Orders</button>
        <button onclick="closeSuccessModal();" style="background:#f1f2f6; color:var(--text-main); font-weight:700; padding:10px 24px; border-radius:4px;">Continue Shopping</button>
      </div>
    </div>
  `;

  modalOverlay.classList.add('active');
}

function closeSuccessModal() {
  const modalOverlay = document.getElementById('successModal');
  if (modalOverlay) modalOverlay.classList.remove('active');
}

// My Orders Modal
function openOrdersModal() {
  const modalOverlay = document.getElementById('ordersModal');
  const content = document.getElementById('ordersContent');
  if (!modalOverlay || !content) return;

  if (state.orders.length === 0) {
    content.innerHTML = `
      <div style="padding:48px 16px; text-align:center;">
        <h3>No orders placed yet!</h3>
        <p style="color:#878787; font-size:14px; margin-top:8px;">Start shopping to place your first order.</p>
      </div>
    `;
  } else {
    content.innerHTML = `
      <div style="padding:24px;">
        <h2 style="margin-bottom:20px; font-size:20px;">My Orders Tracker</h2>
        ${state.orders.map(order => `
          <div style="border:1px solid var(--border); border-radius:8px; padding:16px; margin-bottom:16px;">
            <div style="display:flex; justify-content:space-between; border-bottom:1px solid #f0f0f0; padding-bottom:8px; margin-bottom:12px;">
              <div>
                <span style="font-weight:700;">Order ID: ${order.id}</span>
                <span style="color:#878787; font-size:12px; margin-left:10px;">Placed on ${order.date}</span>
              </div>
              <span style="font-weight:800; color:var(--primary);">₹${order.totalAmount.toLocaleString('en-IN')}</span>
            </div>

            <div class="fk-timeline">
              <div class="fk-step completed">
                <div class="fk-step-icon">✓</div>
                <div class="fk-step-text">Ordered</div>
              </div>
              <div class="fk-step completed">
                <div class="fk-step-icon">✓</div>
                <div class="fk-step-text">Packed</div>
              </div>
              <div class="fk-step">
                <div class="fk-step-icon">3</div>
                <div class="fk-step-text">Shipped</div>
              </div>
              <div class="fk-step">
                <div class="fk-step-icon">4</div>
                <div class="fk-step-text">Delivered</div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  modalOverlay.classList.add('active');
}

function closeOrdersModal() {
  const modalOverlay = document.getElementById('ordersModal');
  if (modalOverlay) modalOverlay.classList.remove('active');
}

// Wishlist Modal Rendering
function renderWishlistModal() {
  const modalOverlay = document.getElementById('wishlistModal');
  const content = document.getElementById('wishlistContent');
  if (!modalOverlay || !content) return;

  if (state.wishlist.length === 0) {
    content.innerHTML = `
      <div style="padding:48px 16px; text-align:center;">
        <h3>Your Wishlist is Empty</h3>
        <p style="color:#878787; font-size:14px; margin-top:8px;">Save your favorite items here.</p>
      </div>
    `;
  } else {
    content.innerHTML = `
      <div style="padding:24px;">
        <h2 style="margin-bottom:20px; font-size:20px;">My Wishlist ❤️</h2>
        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap:16px;">
          ${state.wishlist.map(id => {
            const p = state.products.find(item => item.id === id);
            if (!p) return '';
            return `
              <div class="fk-card">
                <div class="fk-card-img-wrap"><img src="${p.image}" /></div>
                <div class="fk-card-title">${p.title}</div>
                <div class="fk-price-curr" style="margin-bottom:8px;">₹${p.price.toLocaleString('en-IN')}</div>
                <button onclick="addToCart(null, ${p.id}, true)" class="fk-card-btn">Move to Cart</button>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }
}

function openWishlistModal() {
  renderWishlistModal();
  const modalOverlay = document.getElementById('wishlistModal');
  if (modalOverlay) modalOverlay.classList.add('active');
}

function closeWishlistModal() {
  const modalOverlay = document.getElementById('wishlistModal');
  if (modalOverlay) modalOverlay.classList.remove('active');
}

// Login Modal
function openLoginModal() {
  const modalOverlay = document.getElementById('loginModal');
  if (modalOverlay) modalOverlay.classList.add('active');
}

function closeLoginModal() {
  const modalOverlay = document.getElementById('loginModal');
  if (modalOverlay) modalOverlay.classList.remove('active');
}

function handleLoginSubmit(e) {
  e.preventDefault();
  closeLoginModal();
  showToast('Logged in successfully! Welcome back.');
}

// Toast Notification Helper
function showToast(msg) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'fk-toast';
  toast.textContent = msg;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2500);
}
