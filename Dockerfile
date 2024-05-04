FROM node:alpine

WORKDIR /src

COPY . /src/

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
