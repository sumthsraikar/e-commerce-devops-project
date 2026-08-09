# ==========================================
# STAGE 1: Asset Preparation & Verification
# ==========================================
FROM alpine:latest AS preparer

WORKDIR /staging

# Copy raw source files
COPY index.html styles.css app.js ./
COPY images/ ./images/

# Optional: Run HTML/CSS checks or image compression here


# ==========================================
# STAGE 2: Final Production Web Server
# ==========================================
FROM nginx:alpine AS production

WORKDIR /usr/share/nginx/html

# Clean default Nginx html files
RUN rm -rf ./*

# Copy verified files from the preparer stage
COPY --from=preparer /staging ./

EXPOSE 80
