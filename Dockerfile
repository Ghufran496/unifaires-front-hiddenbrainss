# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Inject environment variables during build for client-side
ARG PORT
ARG NEXT_PUBLIC_WEB_URL
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_API_URL2
ARG NEXT_PUBLIC_API_DOCUMENTATION
ARG NEXT_PUBLIC_HOME_URL
ARG NEXT_PUBLIC_GUIDE_VIDEO_LINK
ARG JWT_KEY
ARG JWT_SECRET
ARG NEXT_PUBLIC_SOCKET_URL

# Build the app with injected build-time envs
RUN PORT=$PORT \
    NEXT_PUBLIC_WEB_URL=$NEXT_PUBLIC_WEB_URL \
    NEXTAUTH_URL=$NEXTAUTH_URL \
    NEXTAUTH_SECRET=$NEXTAUTH_SECRET \
    NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_PUBLIC_API_URL2=$NEXT_PUBLIC_API_URL2 \
    NEXT_PUBLIC_API_DOCUMENTATION=$NEXT_PUBLIC_API_DOCUMENTATION \
    NEXT_PUBLIC_HOME_URL=$NEXT_PUBLIC_HOME_URL \
    NEXT_PUBLIC_GUIDE_VIDEO_LINK=$NEXT_PUBLIC_GUIDE_VIDEO_LINK \
    JWT_KEY=$JWT_KEY \
    JWT_SECRET=$JWT_SECRET \
    NEXT_PUBLIC_SOCKET_URL=$NEXT_PUBLIC_SOCKET_URL \
    npm run build

# Production image
FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]