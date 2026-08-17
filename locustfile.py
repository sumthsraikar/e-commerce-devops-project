"""
Flipkart E-Commerce Comprehensive Locust Load & Performance Testing Suite
==========================================================================
Tests all frontend assets/pages and microservices via API Gateway / Ingress.

Microservices covered:
  - Frontend / Web Delivery (Static assets, SPA root)
  - System & Observability (/health)
  - Catalog Service (/api/v1/products, /api/v1/categories, /api/v1/brands)
  - Search Service (/api/v1/search, /api/v1/search/suggestions)
  - Cart Service (/api/v1/cart, /api/v1/cart/items)
  - Order Service (/api/v1/orders, /api/v1/orders/:id)
  - Wishlist Service (/api/v1/wishlist, /api/v1/wishlist/toggle)
"""

import random
import string
import json
from locust import HttpUser, TaskSet, task, between, tag, events


class BaseEcommerceUser(HttpUser):
    """Base class ensuring clean URL normalization without double slashes."""
    abstract = True

    def on_start(self):
        if self.client.base_url and self.client.base_url.endswith('/'):
            self.client.base_url = self.client.base_url.rstrip('/')


# -----------------------------------------------------------------------------
# 1. FRONTEND USER - Tests HTML, CSS, JS, and Static Assets
# -----------------------------------------------------------------------------
class FrontendUser(BaseEcommerceUser):
    """Simulates users visiting the web application and downloading static assets."""
    wait_time = between(1, 3)
    weight = 3

    @tag('frontend', 'pages')
    @task(4)
    def load_home_page(self):
        """Test root storefront HTML."""
        with self.client.get("/", name="[Frontend] GET / (Home Page)", catch_response=True) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"Failed to load Home Page: {response.status_code}")

    @tag('frontend', 'static')
    @task(3)
    def load_styles_and_scripts(self):
        """Test main styles and JS bundle."""
        self.client.get("/styles.css", name="[Frontend] GET /styles.css")
        self.client.get("/app.js", name="[Frontend] GET /app.js")

    @tag('frontend', 'media')
    @task(2)
    def load_banner_images(self):
        """Test static promotional banners."""
        self.client.get("/images/banner1.png", name="[Frontend] GET /images/banner1.png")
        self.client.get("/images/banner2.png", name="[Frontend] GET /images/banner2.png")


# -----------------------------------------------------------------------------
# 2. CATALOG SERVICE USER - Tests Product Listing, Categories, Details, Filters
# -----------------------------------------------------------------------------
class CatalogServiceUser(BaseEcommerceUser):
    """Simulates browsing catalog products, filtering by categories, brands, price."""
    wait_time = between(0.5, 2)
    weight = 4

    categories = ["Mobiles", "Electronics", "Appliances", "Fashion", "Audio", "Beauty", "All"]
    sort_options = ["popularity", "price_low", "price_high", "rating", "newest"]
    brands = ["Apple", "Samsung", "Sony", "LG", "OnePlus", "Dell", "Nike"]

    @tag('catalog', 'products')
    @task(5)
    def get_products_default(self):
        """Get product catalog with default filters."""
        self.client.get("/api/v1/products", name="[Catalog] GET /api/v1/products")

    @tag('catalog', 'filter')
    @task(3)
    def get_products_filtered_by_category(self):
        """Get product catalog filtered by category."""
        category = random.choice(self.categories)
        self.client.get(
            f"/api/v1/products?category={category}",
            name="[Catalog] GET /api/v1/products?category=[cat]"
        )

    @tag('catalog', 'filter')
    @task(2)
    def get_products_filtered_and_sorted(self):
        """Get product catalog with sorting and max price filter."""
        sort_by = random.choice(self.sort_options)
        max_price = random.choice([5000, 20000, 50000, 100000])
        self.client.get(
            f"/api/v1/products?sort={sort_by}&maxPrice={max_price}",
            name="[Catalog] GET /api/v1/products?sort=[sort]&maxPrice=[price]"
        )

    @tag('catalog', 'categories')
    @task(2)
    def get_categories(self):
        """Fetch categories list."""
        self.client.get("/api/v1/categories", name="[Catalog] GET /api/v1/categories")

    @tag('catalog', 'brands')
    @task(2)
    def get_brands(self):
        """Fetch brands list."""
        self.client.get("/api/v1/brands", name="[Catalog] GET /api/v1/brands")

    @tag('catalog', 'detail')
    @task(4)
    def get_product_by_id(self):
        """Fetch product details for a specific item (IDs 1-20)."""
        product_id = random.randint(1, 20)
        self.client.get(
            f"/api/v1/products/{product_id}",
            name="[Catalog] GET /api/v1/products/:id"
        )


# -----------------------------------------------------------------------------
# 3. SEARCH SERVICE USER - Tests Search & Live Autocomplete
# -----------------------------------------------------------------------------
class SearchServiceUser(BaseEcommerceUser):
    """Simulates live queries in search bar and suggestion popups."""
    wait_time = between(0.3, 1.5)
    weight = 3

    search_queries = ["iphone", "samsung", "laptop", "shoes", "sony", "headphones", "watch", "apple", "nike", "tv"]
    suggestion_queries = ["ip", "sam", "lap", "sho", "son", "head", "wat", "app", "nik"]

    @tag('search', 'query')
    @task(4)
    def search_products(self):
        """Perform search query."""
        query = random.choice(self.search_queries)
        self.client.get(
            f"/api/v1/search?q={query}",
            name="[Search] GET /api/v1/search?q=[query]"
        )

    @tag('search', 'suggestions')
    @task(5)
    def search_suggestions(self):
        """Fetch live auto-complete suggestions."""
        query = random.choice(self.suggestion_queries)
        self.client.get(
            f"/api/v1/search/suggestions?q={query}",
            name="[Search] GET /api/v1/search/suggestions?q=[query]"
        )


# -----------------------------------------------------------------------------
# 4. CART SERVICE USER - Tests Add to Cart, View Cart, Modify Quantity, Remove
# -----------------------------------------------------------------------------
class CartServiceUser(BaseEcommerceUser):
    """Simulates shopping cart operations."""
    wait_time = between(1, 3)
    weight = 2

    @tag('cart')
    @task(4)
    def view_cart(self):
        """View current cart state."""
        self.client.get("/api/v1/cart", name="[Cart] GET /api/v1/cart")

    @tag('cart')
    @task(3)
    def add_to_cart(self):
        """Add product to shopping cart."""
        product_id = random.randint(1, 15)
        payload = {
            "productId": product_id,
            "title": f"Product #{product_id}",
            "price": random.randint(500, 25000),
            "mrp": random.randint(600, 30000),
            "quantity": 1
        }
        headers = {"Content-Type": "application/json"}
        self.client.post("/api/v1/cart/items", json=payload, headers=headers, name="[Cart] POST /api/v1/cart/items")

    @tag('cart')
    @task(2)
    def update_cart_item(self):
        """Update quantity of an item in cart."""
        product_id = random.randint(1, 10)
        payload = {"quantity": random.randint(1, 4)}
        headers = {"Content-Type": "application/json"}
        self.client.put(
            f"/api/v1/cart/items/{product_id}",
            json=payload,
            headers=headers,
            name="[Cart] PUT /api/v1/cart/items/:id"
        )

    @tag('cart')
    @task(1)
    def remove_cart_item(self):
        """Remove a product from cart."""
        product_id = random.randint(1, 10)
        self.client.delete(
            f"/api/v1/cart/items/{product_id}",
            name="[Cart] DELETE /api/v1/cart/items/:id"
        )


# -----------------------------------------------------------------------------
# 5. ORDER SERVICE USER - Tests View Orders, Place Order, View Details
# -----------------------------------------------------------------------------
class OrderServiceUser(BaseEcommerceUser):
    """Simulates placing and tracking customer orders."""
    wait_time = between(1, 4)
    weight = 2

    @tag('order')
    @task(4)
    def list_orders(self):
        """List past orders."""
        self.client.get("/api/v1/orders", name="[Order] GET /api/v1/orders")

    @tag('order')
    @task(2)
    def place_order(self):
        """Place a simulated checkout order."""
        product_id = random.randint(1, 10)
        price = random.randint(1000, 50000)
        order_payload = {
            "shippingAddress": "Flat 101, Prestige Tech Park, Bangalore, Karnataka - 560103",
            "paymentMethod": random.choice(["UPI / PhonePe", "Credit/Debit Card", "Cash on Delivery", "Net Banking"]),
            "items": [
                {
                    "productId": product_id,
                    "title": f"Load Test Product #{product_id}",
                    "price": price,
                    "qty": 1
                }
            ],
            "totalAmount": price
        }
        headers = {"Content-Type": "application/json"}
        with self.client.post(
            "/api/v1/orders",
            json=order_payload,
            headers=headers,
            name="[Order] POST /api/v1/orders",
            catch_response=True
        ) as response:
            if response.status_code in [200, 201]:
                response.success()
            else:
                response.failure(f"Order placement failed: {response.status_code}")

    @tag('order')
    @task(1)
    def get_order_by_id(self):
        """Fetch order details."""
        self.client.get("/api/v1/orders/ODR-98231024", name="[Order] GET /api/v1/orders/:id")


# -----------------------------------------------------------------------------
# 6. WISHLIST SERVICE USER - Tests Wishlist Viewing and Toggling
# -----------------------------------------------------------------------------
class WishlistServiceUser(BaseEcommerceUser):
    """Simulates user wishlist operations."""
    wait_time = between(1, 3)
    weight = 2

    @tag('wishlist')
    @task(3)
    def get_wishlist(self):
        """Get all wishlist items."""
        self.client.get("/api/v1/wishlist", name="[Wishlist] GET /api/v1/wishlist")

    @tag('wishlist')
    @task(3)
    def toggle_wishlist_item(self):
        """Toggle an item in the wishlist."""
        product_id = random.randint(1, 20)
        payload = {
            "productId": product_id,
            "product": {
                "id": product_id,
                "title": f"Wishlist Product {product_id}",
                "price": 1999
            }
        }
        headers = {"Content-Type": "application/json"}
        self.client.post(
            "/api/v1/wishlist/toggle",
            json=payload,
            headers=headers,
            name="[Wishlist] POST /api/v1/wishlist/toggle"
        )


# -----------------------------------------------------------------------------
# 7. OBSERVABILITY & HEALTH MONITORING USER
# -----------------------------------------------------------------------------
class ObservabilityUser(BaseEcommerceUser):
    """Simulates monitoring probes hitting health endpoints."""
    wait_time = between(2, 5)
    weight = 1

    @tag('health', 'system')
    @task(5)
    def check_gateway_aggregated_health(self):
        """Check API Gateway aggregated system health."""
        self.client.get("/health", name="[Health] GET /health (Aggregated)")


# -----------------------------------------------------------------------------
# 8. END-TO-END SHOPPER JOURNEY - Realistic Complete User Workflow
# -----------------------------------------------------------------------------
class EndToEndShopperUser(BaseEcommerceUser):
    """
    Simulates a realistic customer workflow:
    1. Visits Home Page & loads assets
    2. Searches for a product & checks suggestions
    3. Browses category / views product detail
    4. Adds item to Wishlist
    5. Adds item to Cart
    6. Reviews Cart
    7. Places an Order
    """
    wait_time = between(1, 3)
    weight = 5

    @tag('e2e', 'journey')
    @task
    def complete_shopping_journey(self):
        # Step 1: Visit Storefront
        self.client.get("/", name="[E2E] 1. Visit Storefront")
        self.client.get("/styles.css", name="[E2E] 1. Load CSS")
        self.client.get("/app.js", name="[E2E] 1. Load JS")

        # Step 2: Search for items
        keyword = random.choice(["iphone", "samsung", "shoes", "sony", "laptop"])
        self.client.get(f"/api/v1/search/suggestions?q={keyword[:3]}", name="[E2E] 2. Search Autocomplete")
        self.client.get(f"/api/v1/search?q={keyword}", name="[E2E] 2. Execute Search")

        # Step 3: Browse Category and Product Details
        category = random.choice(["Mobiles", "Electronics", "Fashion", "Appliances"])
        self.client.get(f"/api/v1/products?category={category}", name="[E2E] 3. Browse Category")
        
        product_id = random.randint(1, 15)
        self.client.get(f"/api/v1/products/{product_id}", name="[E2E] 3. View Product Detail")

        # Step 4: Toggle Wishlist
        wishlist_payload = {
            "productId": product_id,
            "product": {"id": product_id, "title": f"Product #{product_id}", "price": 4999}
        }
        self.client.post(
            "/api/v1/wishlist/toggle",
            json=wishlist_payload,
            headers={"Content-Type": "application/json"},
            name="[E2E] 4. Add/Toggle Wishlist"
        )

        # Step 5: Add to Cart
        cart_payload = {
            "productId": product_id,
            "title": f"Product #{product_id}",
            "price": 4999,
            "quantity": 1
        }
        self.client.post(
            "/api/v1/cart/items",
            json=cart_payload,
            headers={"Content-Type": "application/json"},
            name="[E2E] 5. Add to Cart"
        )

        # Step 6: View Cart
        self.client.get("/api/v1/cart", name="[E2E] 6. Review Cart")

        # Step 7: Place Order (Checkout)
        order_payload = {
            "shippingAddress": "42, MG Road, Indiranagar, Bangalore - 560038",
            "paymentMethod": "UPI / PhonePe",
            "items": [{"productId": product_id, "title": f"Product #{product_id}", "price": 4999, "qty": 1}],
            "totalAmount": 4999
        }
        self.client.post(
            "/api/v1/orders",
            json=order_payload,
            headers={"Content-Type": "application/json"},
            name="[E2E] 7. Place Order"
        )
