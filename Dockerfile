FROM node:12

RUN mkdir - p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]
