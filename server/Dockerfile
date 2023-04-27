FROM node:18-alpine as client

WORKDIR /app/client

COPY ${PWD}/../client/package*.json /app/client/

RUN npm install

COPY ${PWD}/../client /app/client/

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY ./server/package*.json /app/

RUN npm install

COPY ./server .

COPY --from=client /app/client/build /app/client

EXPOSE 8080

CMD [ "npm", "start" ]