FROM node

WORKDIR /app
COPY . .
RUN npm install
RUN npm i -g mocha
RUN npm i supertest
RUN mocha
EXPOSE 3000
CMD ["node", "src/index.js"]
