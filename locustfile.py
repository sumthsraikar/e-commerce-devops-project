"""
Flipkart E-Commerce Comprehensive Locust Load & Performance Testing Suite
==========================================================================
Tests all frontend pages, static assets, and all backend microservices across
all services and ports (Frontend: 80, Gateway: 8000, Catalog: 5001, Search: 5002,
Cart: 5003, Orders: 5004, Wishlist: 5005).
"""

import random
import string
import json
from locust import HttpUser, task, between, tag


class BaseEcommerceUser(HttpUser):
    """Base class ensuring clean URL normalization without double slashes."""
    abstract = True

    def on_start(self):
        if self.client.base_url and self.client.base_url.endswith('/'):
            self.client.base_url = self.client.base_url.rstrip('/')


# =============================================================================
# 🚀 ALL SERVICES & ALL PORTS LOAD TEST
# =============================================================================
class AllServicesLoadTest(BaseEcommerceUser):
    """
    Simulates concurrent traffic across all microservices and frontend assets:
      - [Port 80]     Frontend Web UI & Assets
      - [Port 8000]   API Gateway & Aggregated Health Checks
      - [Port 5001]   Catalog & Product Details (IDs 1-14)
      - [Port 5002]   Search & Live Autocomplete Suggestions
      - [Port 5003]   Shopping Cart (View, Add, Update)
      - [Port 5004]   Orders & Checkout
      - [Port 5005]   Wishlist Management
    """
    wait_time = between(0.5, 2.0)

    categories = ["Mobiles", "Electronics", "Appliances", "Fashion", "Audio", "Beauty", "All"]
    sort_options = ["popularity", "price_low", "price_high", "rating", "newest"]
    brands = ["Apple", "Samsung", "Sony", "LG", "OnePlus", "Dell", "Nike"]
    search_queries = ["iphone", "samsung", "laptop", "shoes", "sony", "headphones", "watch", "apple", "nike", "tv"]
    suggestion_queries = ["ip", "sam", "lap", "sho", "son", "head", "wat", "app", "nik"]

    # -------------------------------------------------------------------------
    # 1. FRONTEND PAGES & ASSETS (Port 80)
    # -------------------------------------------------------------------------
    @tag('frontend', 'pages')
    @task(6)
    def test_frontend_home(self):
        """Test Frontend SPA Root HTML."""
        self.client.get("/", name="[Port 80 - Frontend] GET / (Home Page)")

    @tag('frontend', 'static')
    @task(4)
    def test_frontend_static_assets(self):
        """Test Frontend CSS & JS Bundles."""
        self.client.get("/styles.css", name="[Port 80 - Frontend] GET /styles.css")
        self.client.get("/app.js", name="[Port 80 - Frontend] GET /app.js")

    @tag('frontend', 'media')
    @task(2)
    def test_frontend_images(self):
        """Test Promotional Banners."""
        self.client.get("/images/banner1.png", name="[Port 80 - Frontend] GET /images/banner1.png")
        self.client.get("/images/banner2.png", name="[Port 80 - Frontend] GET /images/banner2.png")

    # -------------------------------------------------------------------------
    # 2. SYSTEM HEALTH & OBSERVABILITY (Port 8000 / Gateway)
    # -------------------------------------------------------------------------
    @tag('gateway', 'health')
    @task(3)
    def test_aggregated_health(self):
        """Test Gateway Aggregated Health Check."""
        self.client.get("/health", name="[Port 8000 - Gateway] GET /health")

    # -------------------------------------------------------------------------
    # 3. CATALOG & PRODUCTS MICROSERVICE (Port 5001)
    # -------------------------------------------------------------------------
    @tag('catalog', 'products')
    @task(5)
    def test_catalog_all_products(self):
        """Get product catalog with default filters."""
        self.client.get("/api/v1/products", name="[Port 5001 - Catalog] GET /api/v1/products")

    @tag('catalog', 'filter')
    @task(4)
    def test_catalog_category_filter(self):
        """Get products filtered by category."""
        category = random.choice(self.categories)
        self.client.get(
            f"/api/v1/products?category={category}",
            name="[Port 5001 - Catalog] GET /api/v1/products?category=[cat]"
        )

    @tag('catalog', 'filter')
    @task(3)
    def test_catalog_price_and_sort(self):
        """Get products sorted and price-filtered."""
        sort_by = random.choice(self.sort_options)
        max_price = random.choice([5000, 20000, 50000, 100000])
        self.client.get(
            f"/api/v1/products?sort={sort_by}&maxPrice={max_price}",
            name="[Port 5001 - Catalog] GET /api/v1/products?sort=[sort]&maxPrice=[price]"
        )

    @tag('catalog', 'categories')
    @task(3)
    def test_catalog_categories_list(self):
        """Get available categories."""
        self.client.get("/api/v1/categories", name="[Port 5001 - Catalog] GET /api/v1/categories")

    @tag('catalog', 'brands')
    @task(2)
    def test_catalog_brands_list(self):
        """Get available brands."""
        self.client.get("/api/v1/brands", name="[Port 5001 - Catalog] GET /api/v1/brands")

    @tag('catalog', 'detail')
    @task(4)
    def test_catalog_product_detail(self):
        """Get product details by valid ID (IDs 1-14)."""
        product_id = random.randint(1, 14)
        self.client.get(
            f"/api/v1/products/{product_id}",
            name="[Port 5001 - Catalog] GET /api/v1/products/:id"
        )

    # -------------------------------------------------------------------------
    # 4. SEARCH & AUTOCOMPLETE MICROSERVICE (Port 5002)
    # -------------------------------------------------------------------------
    @tag('search', 'query')
    @task(5)
    def test_search_query(self):
        """Execute full-text search."""
        query = random.choice(self.search_queries)
        self.client.get(
            f"/api/v1/search?q={query}",
            name="[Port 5002 - Search] GET /api/v1/search?q=[query]"
        )

    @tag('search', 'suggestions')
    @task(5)
    def test_search_suggestions(self):
        """Get live autocomplete suggestions."""
        query = random.choice(self.suggestion_queries)
        self.client.get(
            f"/api/v1/search/suggestions?q={query}",
            name="[Port 5002 - Search] GET /api/v1/search/suggestions?q=[query]"
        )

    # -------------------------------------------------------------------------
    # 5. SHOPPING CART MICROSERVICE (Port 5003)
    # -------------------------------------------------------------------------
    @tag('cart')
    @task(4)
    def test_cart_view(self):
        """Fetch active cart contents."""
        self.client.get("/api/v1/cart", name="[Port 5003 - Cart] GET /api/v1/cart")

    @tag('cart')
    @task(4)
    def test_cart_add_item(self):
        """Add item to shopping cart."""
        product_id = random.randint(1, 14)
        payload = {
            "productId": product_id,
            "title": f"Product #{product_id}",
            "price": random.randint(500, 25000),
            "mrp": random.randint(600, 30000),
            "quantity": 1
        }
        headers = {"Content-Type": "application/json"}
        self.client.post(
            "/api/v1/cart/items",
            json=payload,
            headers=headers,
            name="[Port 5003 - Cart] POST /api/v1/cart/items"
        )

    @tag('cart')
    @task(2)
    def test_cart_update_qty(self):
        """Update item quantity in cart."""
        product_id = random.randint(1, 14)
        payload = {"quantity": random.randint(1, 3)}
        headers = {"Content-Type": "application/json"}
        with self.client.put(
            f"/api/v1/cart/items/{product_id}",
            json=payload,
            headers=headers,
            name="[Port 5003 - Cart] PUT /api/v1/cart/items/:id",
            catch_response=True
        ) as res:
            if res.status_code in [200, 404]:
                res.success()

    # -------------------------------------------------------------------------
    # 6. ORDERS MICROSERVICE (Port 5004)
    # -------------------------------------------------------------------------
    @tag('order')
    @task(4)
    def test_order_list(self):
        """Get order history."""
        self.client.get("/api/v1/orders", name="[Port 5004 - Orders] GET /api/v1/orders")

    @tag('order')
    @task(2)
    def test_order_create(self):
        """Simulate placing a new order."""
        product_id = random.randint(1, 14)
        price = random.randint(1000, 45000)
        payload = {
            "shippingAddress": "42, MG Road, Indiranagar, Bangalore - 560038",
            "paymentMethod": random.choice(["UPI / PhonePe", "Credit/Debit Card", "Cash on Delivery"]),
            "items": [
                {
                    "productId": product_id,
                    "title": f"Product #{product_id}",
                    "price": price,
                    "qty": 1
                }
            ],
            "totalAmount": price
        }
        headers = {"Content-Type": "application/json"}
        self.client.post(
            "/api/v1/orders",
            json=payload,
            headers=headers,
            name="[Port 5004 - Orders] POST /api/v1/orders"
        )

    # -------------------------------------------------------------------------
    # 7. WISHLIST MICROSERVICE (Port 5005)
    # -------------------------------------------------------------------------
    @tag('wishlist')
    @task(4)
    def test_wishlist_view(self):
        """Get all wishlist items."""
        self.client.get("/api/v1/wishlist", name="[Port 5005 - Wishlist] GET /api/v1/wishlist")

    @tag('wishlist')
    @task(3)
    def test_wishlist_toggle(self):
        """Toggle item in wishlist."""
        product_id = random.randint(1, 14)
        payload = {
            "productId": product_id,
            "product": {
                "id": product_id,
                "title": f"Wishlist Product {product_id}",
                "price": 2499
            }
        }
        headers = {"Content-Type": "application/json"}
        self.client.post(
            "/api/v1/wishlist/toggle",
            json=payload,
            headers=headers,
            name="[Port 5005 - Wishlist] POST /api/v1/wishlist/toggle"
        )
