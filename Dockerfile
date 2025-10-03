FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx:latest
RUN mkdir /app
COPY ./dist/pwhui/browser /app
COPY nginx.conf /etc/nginx/nginx.conf
USER nginx
