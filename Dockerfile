FROM node

WORKDIR /app

COPY . .
RUN npm install
EXPOSE 3000
RUN mocha
CMD ["node", "src/index.js"]
