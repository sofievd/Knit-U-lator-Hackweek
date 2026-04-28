FROM node:24-alpine as build
LABEL authors="Sofie"

WORKDIR /app

COPY package*.json ./

RUN npm ci

copy . .

RUN npm run build

FROM nginx:alpine

copy ngnx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/usr/share/nginx/html

EXPOSE 8080

CMD ["nginx" ,".g", "daemon off;"]
