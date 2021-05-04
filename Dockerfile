FROM node:14.12.0

WORKDIR /usr/src

COPY package.json /usr/src

RUN npm install && npm rebuild node-sass --force

COPY . .

# EXPOSE 8000 8443

CMD ["npm", "start"]