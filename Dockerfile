FROM node:10
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN cd ui && npm install 
RUN cd /usr/src/app && npm run prestart
EXPOSE 4201
ENTRYPOINT ["node", "/usr/src/app/dist/index.js"]