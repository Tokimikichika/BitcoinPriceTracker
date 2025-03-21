FROM node:18
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
CMD ["node", "index.js"]