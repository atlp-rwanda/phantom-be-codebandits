FROM node:14-alpine3.14
WORKDIR /src/app/
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000 5000
CMD [ "node", "./src/app.js" ] 
