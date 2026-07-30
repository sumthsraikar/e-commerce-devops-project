# =========================================================
# Dockerfile #4: Product Catalog Microservice (Python FastAPI)
# Multi-stage security hardened Python 3.11 container
# =========================================================

# Build stage
FROM python:3.11-slim AS builder
WORKDIR /app

# Prevent python from writing pyc files and buffering stdout
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

# Final runtime stage
FROM python:3.11-slim AS runner

LABEL maintainer="DevOps Team <devops@ecommerce.internal>" \
      description="Product Catalog & Inventory Microservice" \
      version="1.0.0"

# Install curl for health check
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Create unprivileged system user
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# Copy installed python dependencies from builder
COPY --from=builder /root/.local /home/appuser/.local
COPY main.py .

# Fix environment PATH for appuser
ENV PATH=/home/appuser/.local/bin:$PATH \
    PYTHONUNBUFFERED=1 \
    PORT=5002

# Grant appuser ownership
RUN chown -R appuser:appgroup /app /home/appuser

USER appuser

EXPOSE 5002

HEALTHCHECK --interval=15s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5002/health || exit 1

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5002"]
