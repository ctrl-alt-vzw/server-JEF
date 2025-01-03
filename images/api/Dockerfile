FROM node:current-alpine3.21

WORKDIR /usr/app

COPY package*.json ./

RUN npm i

COPY ./ ./

CMD ["npm", "run", "start"]