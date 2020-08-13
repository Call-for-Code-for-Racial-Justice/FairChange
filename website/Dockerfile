FROM node:12.16.1

RUN apt-get update
RUN apt install nginx --assume-yes

COPY . /app
WORKDIR /app

RUN npm ci
RUN npm run build

CMD "usr/sbin/nginx", "-c", "/app/nginx.conf", "-g", "daemon off;"
