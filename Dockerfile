FROM node:20-alpine AS BUILD
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm ci

COPY . .
RUN pnpm run test

FROM node:20-slim
WORKDIR /app
COPY --from=BUILD /app /app
RUN ls -la

CMD ["pnpm","start"]
