FROM --platform=linux/x86_64 node:current-alpine3.21

WORKDIR /usr/app

COPY package*.json ./

RUN npm i

COPY ./ ./

CMD ["npm", "run", "start"]
