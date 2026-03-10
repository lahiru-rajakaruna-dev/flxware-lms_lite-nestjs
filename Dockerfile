FROM node:20-alpine AS BUILD
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm@latest-10
RUN pnpm install

COPY . .
RUN pnpm run test

FROM node:20-slim
WORKDIR /app
RUN npm install -g pnpm@latest-10
COPY --from=BUILD /app /app
RUN ls -la

CMD ["pnpm","start"]
