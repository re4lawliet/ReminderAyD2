FROM node

WORKDIR /app

COPY . .
RUN npm install
RUN npm i -g mocha
RUN npm i supertest

EXPOSE 3000

CMD ["node", "src/index.js"]