FROM node:20.13.1-alpine3.19

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["node", "./dist/src/Adapters/Primary/Api/app.js"]
