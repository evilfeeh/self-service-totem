FROM node:20.13.1-alpine3.19

WORKDIR /app

COPY . .

RUN npm ci \ 
  && npm install

RUN npm run build --if-present

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

