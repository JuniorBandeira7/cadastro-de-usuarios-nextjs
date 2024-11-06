FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json* ./ 

RUN npm install
COPY . .

RUN npm run build

FROM node:18 AS production

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3000

CMD ["npm", "start"]
