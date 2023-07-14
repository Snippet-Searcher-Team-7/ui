FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Production image, copy all the files
FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the rest of the application code
COPY . .

# Expose port 3000 for the application
USER nextjs

EXPOSE 3000

# Run the Next.js application
CMD ["npm", "run", "start"]