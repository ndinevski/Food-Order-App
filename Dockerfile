FROM node:18 AS build

WORKDIR /app

COPY client/package*.json ./client/

RUN cd client && npm install

COPY client/ ./client/

RUN cd client && npm run build

FROM node:18

WORKDIR /app

COPY backend/package*.json ./

RUN npm install

COPY backend/ ./

COPY --from=build /app/client/dist ./dist

EXPOSE 3000

# Start the server
CMD ["node", "app.js"]
