# Builder
FROM node:24-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
ENV DATABASE_URL=postgresql://postgres:postgres@db:5432/home_library?schema=public
RUN npx prisma generate
RUN npm run build


# Runtime
FROM node:18-alpine AS runner
WORKDIR /usr/src/app
# Copy production node_modules and built app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY package.json ./
# Entrypoint that runs migrations then starts the app (will be used for production containers)
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
EXPOSE 4000
CMD ["docker-entrypoint.sh"]