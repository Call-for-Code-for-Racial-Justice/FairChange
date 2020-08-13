FROM node:12.16.1
COPY . /app
WORKDIR /app

RUN npm ci
RUN npm run build
CMD npm start
