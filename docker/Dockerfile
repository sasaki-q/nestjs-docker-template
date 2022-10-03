FROM node:16-alpine3.15 AS builder

WORKDIR /app

COPY --chown=node:node package*.json ./
RUN npm ci

COPY --chown=node:node . .
RUN npm run build

ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force

USER node

FROM node:16-alpine3.15 AS production

WORKDIR /app

COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/node_modules ./node_modules

ENV PORT=3001
EXPOSE 3001

CMD [ "node", "dist/main" ]