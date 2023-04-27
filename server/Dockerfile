FROM node:18-alpine as client

WORKDIR /app/client

COPY client/package*.json .

RUN npm install

COPY client/ .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

COPY --from=client /app/client/build /app/client

EXPOSE 8080

CMD [ "npm", "start" ]