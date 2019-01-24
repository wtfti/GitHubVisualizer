FROM node:10
COPY package.json .
COPY . .
RUN npm install
WORKDIR /ui
RUN npm install
WORKDIR /
RUN npm run prestart
EXPOSE 8001
ENTRYPOINT ["node", "/dist/index.js"]