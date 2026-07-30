# =========================================================
# Dockerfile #5: Order & Cart Processing Microservice
# Multi-stage production container
# =========================================================

# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev

# Final runtime stage
FROM node:18-alpine AS runner

LABEL maintainer="DevOps Team <devops@ecommerce.internal>" \
      description="Order Fulfillment & Cart Microservice" \
      version="1.0.0"

# Install curl for container healthcheck
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
    PORT=5003

EXPOSE 5003

HEALTHCHECK --interval=15s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5003/health || exit 1

CMD ["node", "src/server.js"]
