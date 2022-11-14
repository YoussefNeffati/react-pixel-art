FROM node:10-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
COPY yarn.lock /app
COPY . /app

RUN yarn global add nodemon
RUN yarn install

CMD ["yarn", "start"]