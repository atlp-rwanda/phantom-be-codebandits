FROM node:16-alpine3.12
WORKDIR /src/app/
COPY package*.json ./
RUN npm install 
COPY . .
EXPOSE 5000:5000
ENV DB_PORT 6000
ENV DB_USER phantom
ENV DB_PASS '1234'
ENV DB phantom
ENV DB_HOST localhost
ENV NODE_ENV production
ENV EMAIL_PASS 'ADEODATUS002'
ENV EMAIL_USER 'adeoabdul.b@gmail.com'
ENV ACCESS_TOKEN_SECRET 27219441075f8cbcc77b578b22c66feeeda015fb2d856d4ea55b630d26f07d34ceab71681ae76f25b5188ee9230b57b7e0801ab6fc7e753a9e114efc3e932fc6
ENV REFRESH_TOKEN_SECRET c5bd3f757952747f4a64a31a46ddf398ef1cbf21f3cd59cbcda5a52b9f0e430b1ce156acf637dac61406812fa6fd1bdd833eac2cd0d8da00ccdd91862eac20eb
ENV JWT_REFRESH_EXPIRATION 7000
ENV BASE_URL "http://localhost:5000"
ENV LOGIN_URL="http://localhost:3000/login"
ENV REDIS_URL="redis://localhost:6379"
ENV RESET_URL="http://192.168.0.113:3000/accounts/reset-password"
ENV SERVER_URL "http://localhost:5000"
CMD [ "node", "./src/app.js" ] 
