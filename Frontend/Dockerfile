FROM node:16-alpine as build

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install --force

COPY ./src /app/src
COPY ./public /app/public
COPY ./index.html /app/index.html
COPY ./.env /app/.env
COPY ./vite.config.js /app/vite.config.js


RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]
