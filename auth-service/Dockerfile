# =========================================================
# Dockerfile #3: Auth Microservice (Node.js + JWT + Express)
# Production security hardened Alpine container
# =========================================================

# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev

# Final runtime stage
FROM node:18-alpine AS runner

LABEL maintainer="DevOps Team <devops@ecommerce.internal>" \
      description="JWT Authentication & User Management Microservice" \
      version="1.0.0"

# Install curl for healthcheck
RUN apk add --no-cache curl

WORKDIR /app

# Create unprivileged system user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy dependencies and application source
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
COPY src ./src

# Set ownership to non-root user
RUN chown -R appuser:appgroup /app

USER appuser

ENV NODE_ENV=production \
    PORT=5001

EXPOSE 5001

HEALTHCHECK --interval=15s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5001/health || exit 1

CMD ["node", "src/server.js"]
