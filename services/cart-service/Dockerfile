FROM node:22-alpine

ENV NODE_ENV=development
WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . .

USER node

EXPOSE 5003
CMD ["node", "server.js"]