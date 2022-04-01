FROM node:16.14.2-alpine
WORKDIR ./
RUN npm install -g npm@8.5.5
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN node json_to_db.js
EXPOSE 5001
ENTRYPOINT ["npm", "start"]