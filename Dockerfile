FROM nginx:alpine
WORKDIR /urs/share/ngnix/html
COPY index.html styles.css app.js ./


EXPOSE 80