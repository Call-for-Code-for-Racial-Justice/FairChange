FROM node:12.16.1
COPY . /app
WORKDIR /app

RUN mkdir -p /tmp/my-uploads
RUN chmod 777 /tmp/my-uploads

RUN npm ci
RUN npm run build
CMD npm start
