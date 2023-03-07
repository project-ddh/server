FROM node:18

WORKDIR /server

COPY . .

RUN npm i

RUN npm install pm2 -g

RUN npm run build

#COPY .env /server/dist

ENTRYPOINT [ "pm2-runtime","start","/server/dist/main.js","-i","max"]
