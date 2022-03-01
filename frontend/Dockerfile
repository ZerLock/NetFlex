FROM node:16.14.0-alpine
WORKDIR /app
COPY package.json package-lock.json /app
RUN npm install
COPY . /app
EXPOSE 80
ENTRYPOINT ["npm", "start"]