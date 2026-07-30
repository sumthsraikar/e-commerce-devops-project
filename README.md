# Production-Grade E-Commerce Microservices Platform (5 Dockerfiles)

A production-ready, security-hardened microservices architecture built for scale, resilience, and multi-container Docker Compose deployment.

---

## 🏗 System Architecture & 5 Dockerfiles

```
                                  +-----------------------+
                                  |   HTTP Client / App   |
                                  +-----------+-----------+
                                              |
                                              v
                              +-------------------------------+
                              |  1. API Gateway (Nginx)       |
                              |  [api-gateway/Dockerfile]     |
                              +---------------+---------------+
                                              |
             +--------------------------------+--------------------------------+
             |                                |                                |
             v                                v                                v
+--------------------------+    +--------------------------+    +--------------------------+
|  2. Auth Service (Node)  |    | 3. Product Catalog (Py)  |    | 4. Order Service (Node)  |
|  [auth-service/Dockerfile|    | [product-service/Docker] |    | [order-service/Dockerfile|
+--------------------------+    +--------------------------+    +--------------------------+
                                              ^
                                              |
                              +---------------+---------------+
                              |  5. Frontend App (React/Vite) |
                              |  [frontend/Dockerfile]        |
                              +-------------------------------+
```

### Breakdown of the 5 Dockerfiles

| Container Service | Path | Tech Stack | Base Image | Highlights |
| :--- | :--- | :--- | :--- | :--- |
| **1. API Gateway** | `api-gateway/Dockerfile` | Nginx 1.25 Alpine | `nginx:1.25-alpine` | Reverse proxy, rate limiting (10r/s), healthchecks, non-root user |
| **2. Frontend Web App** | `frontend/Dockerfile` | React + Vite + Nginx | Multi-stage (`node:18-alpine` -> `nginx:1.25-alpine`) | Production static bundle optimization, Gzip enabled, SPA routing |
| **3. Auth Service** | `auth-service/Dockerfile` | Node.js + Express + JWT | `node:18-alpine` | Unprivileged `appuser`, JWT token validation, password hashing |
| **4. Product Catalog** | `product-service/Dockerfile` | Python 3.11 + FastAPI | `python:3.11-slim` | Uvicorn ASGI server, Pydantic schemas, category filtering, search |
| **5. Order & Cart** | `order-service/Dockerfile` | Node.js + Express | `node:18-alpine` | Shopping cart processing, order generation, UUID management |

---

## 🚀 Quick Start (Docker Compose)

Launch all 5 containers simultaneously with a single command:

```bash
docker compose up --build
```

Access the application components:
- 🌐 **Web Interface**: [http://localhost](http://localhost) (routed via API Gateway)
- 🔒 **Auth Service Health**: [http://localhost/api/v1/auth/health](http://localhost/api/v1/auth/health)
- 📦 **Product Catalog API**: [http://localhost/api/v1/products/health](http://localhost/api/v1/products/health)
- 🛒 **Order Service API**: [http://localhost/api/v1/orders/health](http://localhost/api/v1/orders/health)

---

## 🔒 Security Best Practices Implemented
- **Non-Root Execution**: All containers execute processes as unprivileged system users (`appuser` / `nginx`).
- **Multi-Stage Builds**: Minimal image footprints to minimize attack surface area.
- **Health Monitoring**: Native Docker `HEALTHCHECK` directives built into every Dockerfile.
- **Rate-Limiting**: Gateway rate limiting protects backend microservices from DDoS spikes.
