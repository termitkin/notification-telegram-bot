FROM node:18.0.0

WORKDIR /app
COPY . /app

RUN yarn install

CMD ["npm", "run", "start"]
