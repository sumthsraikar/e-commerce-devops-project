# =========================================================
# Dockerfile #1: API Gateway (Nginx Reverse Proxy)
# Multi-stage security hardened Nginx alpine image
# =========================================================
FROM nginx:1.25-alpine

LABEL maintainer="DevOps Team <devops@ecommerce.internal>" \
      description="Production API Gateway for E-Commerce Microservices" \
      version="1.0.0"

# Install wget for container healthcheck
RUN apk add --no-cache wget

# Remove default configuration and copy custom config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Set permissions for non-root execution support
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid /var/cache/nginx /var/log/nginx /etc/nginx

USER nginx

EXPOSE 80

# Production Healthcheck
HEALTHCHECK --interval=15s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
