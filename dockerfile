FROM ubuntu:latest

WORKDIR 'usr/src/app'   
USER root
COPY package.json .

RUN apt-get update
RUN apt-get -y install curl gnupg lame git
RUN curl -sL https://deb.nodesource.com/setup_14.x  | bash -
RUN apt-get -y install nodejs
RUN npm install

CMD ["node","."]

COPY . .

