FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
COPY .env.production ./.env

RUN npm run clean && npm run build

EXPOSE 3000

CMD [ "node", "dist/src/index.js" ]
