FROM node:20.11.1 as builder

WORKDIR /app

COPY . /app/

RUN npm install

RUN npm run build
# RUN npm install react-scripts@3.4.1 -g --silent

FROM nginx:alpine

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY /nginx/default.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3000