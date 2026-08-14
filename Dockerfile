FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY index.html styles.css app.js ./
COPY images/ ./images/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
