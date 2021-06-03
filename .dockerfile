FROM node:alpine

WORKDIR 'usr/src/app'

COPY package.json .

RUN apt-get install -y lame build-essentials
RUN npm install 

CMD ["node","."]

COPY . .

