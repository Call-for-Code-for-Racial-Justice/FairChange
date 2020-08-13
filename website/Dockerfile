FROM node:12.16.1

RUN apt-get update
RUN apt install nginx --assume-yes

COPY . /app
WORKDIR /app

RUN npm ci
RUN npm run build

RUN mkdir -p /var/log/nginx
RUN mkdir -p /var/lib/nginx

RUN chmod 777 /var/log/nginx
RUN chmod 777 /var/lib/nginx
RUN rm -rf /var/log/nginx/error.log
RUN rm -rf /var/log/nginx/access.log

CMD /usr/sbin/nginx -c /app/nginx.conf -g "daemon off;"
