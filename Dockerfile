
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
COPY yarn.lock* ./

RUN npm install --silent

COPY . .

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "3000"]

EXPOSE 3000
