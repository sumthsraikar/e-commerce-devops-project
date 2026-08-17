# Locust Load & Performance Testing Guide

This project includes a comprehensive **Locust load testing suite** in [`locustfile.py`](file:///locustfile.py) to benchmark the Flipkart E-Commerce frontend pages, static assets, and backend microservices.

---

## 🚀 Quick Start

### 1. Start Your Services
Ensure the application is running via one of the following methods:

- **Local Microservices Orchestrator**:
  ```powershell
  node start-all.js
  ```
  *(API Gateway on `http://localhost:8000`, microservices on ports `5001`-`5005`)*

- **Kubernetes / Ingress**:
  ```powershell
  kubectl apply -f k8s/
  ```
  *(Ingress available on `http://localhost`)*

---

### 2. Run Locust with Interactive Web UI

```powershell
locust
```
1. Open your browser at **[http://localhost:8089](http://localhost:8089)**
2. Set:
   - **Number of users**: `50` (or your desired load)
   - **Ramp up (spawn rate)**: `5` users/second
   - **Host**: 
     - For Kubernetes Ingress / Nginx: `http://localhost`
     - For Direct API Gateway: `http://localhost:8000`
3. Click **Start Swarming**!

---

## 🎯 Targeted Load Testing (Using Tags & Specific User Classes)

### Test Only Frontend Pages & Assets
```powershell
locust --tags frontend --host http://localhost
```

### Test Only Catalog & Products Service
```powershell
locust --tags catalog --host http://localhost
```

### Test Only Search & Suggestions
```powershell
locust --tags search --host http://localhost
```

### Test Only Shopping Cart & Orders
```powershell
locust --tags cart order --host http://localhost
```

### Run Only Realistic End-to-End Shopper Journey
```powershell
locust EndToEndShopperUser --host http://localhost
```

---

## 🤖 Headless Mode (CLI & CI/CD Pipelines)

Run an automated 1-minute benchmark and generate an HTML report:

```powershell
locust --headless -u 100 -r 10 --run-time 1m --host http://localhost --html locust_report.html
```

---

## 📊 Test User Classes Included

| User Class | Target Area | Description |
|---|---|---|
| `FrontendUser` | Frontend Delivery | Loads `/`, `/styles.css`, `/app.js`, `/images/banner1.png`, `/images/banner2.png` |
| `CatalogServiceUser` | Catalog Service | Tests `/api/v1/products`, categories, brands, price filters, and product details |
| `SearchServiceUser` | Search Service | Tests `/api/v1/search` and live `/api/v1/search/suggestions` |
| `CartServiceUser` | Cart Service | Tests viewing cart, adding items, updating quantities, deleting items |
| `OrderServiceUser` | Order Service | Tests order history, order creation/checkout, order tracking |
| `WishlistServiceUser` | Wishlist Service | Tests viewing wishlist and toggling items |
| `ObservabilityUser` | Observability | Tests `/health` aggregated health check |
| `EndToEndShopperUser` | Full User Journey | Simulates full lifecycle: Visit -> Search -> Filter -> Wishlist -> Add to Cart -> Checkout |
