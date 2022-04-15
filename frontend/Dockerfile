FROM node:16.14.2-alpine

WORKDIR /app
COPY package.json package-lock.json /app/

RUN npm install

COPY . /app/

ENV JWT_TOKEN=NETFLEX_SECRET_TOKEN
ENV REACT_APP_CAPTCHA_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI

EXPOSE 3000

ENTRYPOINT ["npm", "start"]