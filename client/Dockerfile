FROM node:14.17.3
RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
COPY yarn.lock /app
COPY . /app

RUN yarn install

CMD ["yarn", "start"]