FROM node

WORKDIR /app
COPY . .
RUN npm install
<<<<<<< Updated upstream
=======
RUN npm i -g mocha
RUN npm i supertest

>>>>>>> Stashed changes
EXPOSE 3000
CMD ["node", "src/index.js"]
