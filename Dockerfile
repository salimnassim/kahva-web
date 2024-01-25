FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_BACKEND_BASE_URL
ENV VITE_BACKEND_BASE_URL $VITE_BACKEND_BASE_URL
RUN npm run build