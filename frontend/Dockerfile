# =========================================================
# Dockerfile #2: Frontend Web Application (React + Vite + Nginx)
# Multi-stage production container
# Stage 1: Build static assets using Node.js
# Stage 2: Serve static files with Nginx Alpine
# =========================================================

# --- STAGE 1: Build Stage ---
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependency descriptors
COPY package*.json ./

# Install dependencies cleanly
RUN npm ci

# Copy application source
COPY . .

# Build production distribution bundle
RUN npm run build

# --- STAGE 2: Runtime Stage ---
FROM nginx:1.25-alpine AS runner

LABEL maintainer="DevOps Team <devops@ecommerce.internal>" \
      description="Production Frontend SPA for E-Commerce" \
      version="1.0.0"

RUN apk add --no-cache wget

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Grant non-root user permissions
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid /var/cache/nginx /var/log/nginx /usr/share/nginx/html

USER nginx

EXPOSE 80

HEALTHCHECK --interval=15s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
