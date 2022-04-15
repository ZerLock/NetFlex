FROM node:16.14.2-alpine

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY . /app/

ENV PORT=5001
ENV MYSQL_HOST=0.0.0.0
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=root
ENV MYSQL_DATABASE=netflex
ENV JWT_TOKEN=NETFLEX_SECRET_TOKEN

EXPOSE 5001

ENTRYPOINT ["npm", "start"]