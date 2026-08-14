FROM node:22-alpine

WORKDIR /app

# Default Microservice Container URLs inside Docker network
ENV CATALOG_SERVICE_URL=http://catalog-service:5001 \
    SEARCH_SERVICE_URL=http://search-service:5002 \
    CART_SERVICE_URL=http://cart-service:5003 \
    ORDER_SERVICE_URL=http://order-service:5004 \
    WISHLIST_SERVICE_URL=http://wishlist-service:5005
COPY package*.json ./

RUN npm install

COPY . .

USER node

EXPOSE 8000
CMD ["node", "server.js"]