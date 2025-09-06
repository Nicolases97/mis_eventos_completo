FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build || cat /root/.npm/_logs/*-debug-*.log

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
