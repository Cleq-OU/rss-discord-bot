FROM node:20-bullseye-slim AS builder

WORKDIR /app

COPY package.json package-lock.json* tsconfig.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20-bullseye-slim AS runtime
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json* ./
RUN npm install --production

COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production

CMD ["node", "dist/index.js"]
