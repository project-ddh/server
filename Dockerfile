# 베이스 지정 
FROM node:19


#COPY NODE
# COPY [파일명] ./[복사될 도커 경로]
COPY package.json ./, .env ./

# docker run 실행시 되는
RUN npm i

# App 실행
CMD [npm run start]

