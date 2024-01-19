FROM node:lts-alpine
WORKDIR /app
COPY web/package*.json ./
RUN npm install
COPY web/. .
RUN npm run build