FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches
RUN corepack enable && corepack prepare pnpm@10.4.1 --activate && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3010
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches
RUN corepack enable && corepack prepare pnpm@10.4.1 --activate && pnpm install --prod --frozen-lockfile
COPY --from=builder /app/dist /app/dist
EXPOSE 3010
CMD ["node","dist/index.js"]
