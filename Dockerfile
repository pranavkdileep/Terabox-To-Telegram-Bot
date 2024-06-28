FROM node:lts-bullseye

WORKDIR /app
COPY . /app
RUN npm i
EXPOSE 3000
CMD [ "node","main.mjs" ]