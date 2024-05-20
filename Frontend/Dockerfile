FROM node:16-alpine as build

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install --force

COPY ./src /app/src
COPY ./public /app/public
COPY ./index.html /app/index.html


RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
