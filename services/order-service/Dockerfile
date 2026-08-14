FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

USER node

EXPOSE 5004
CMD ["node", "server.js"]