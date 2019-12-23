FROM node:erbium-alpine

EXPOSE 4000

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

CMD ["yarn", "run", "start"]
