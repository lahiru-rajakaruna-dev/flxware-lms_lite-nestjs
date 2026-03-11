FROM node:20-alpine AS BUILD
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm@latest-10
RUN pnpm install
COPY . .
RUN pnpm run build

FROM node:20-slim
WORKDIR /app
RUN npm install -g pnpm@latest-10
COPY --from=BUILD /app/dist /app/dist
COPY --from=BUILD /app/node_modules /app/node_modules
COPY package.json pnpm-lock.yaml tsconfig.json tsconfig.build.json ./
RUN ls -la

CMD ["pnpm","start"]
