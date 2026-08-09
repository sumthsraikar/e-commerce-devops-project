FROM nginx:alpine
WORKDIR /usr/share/ngnix/html
COPY index.html styles.css app.js ./


EXPOSE 80