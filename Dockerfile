FROM nginx:alpine
COPY default.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
COPY index.html styles.css app.js ./
COPY images/ ./images/


EXPOSE 80