# Base Image
FROM node:14-alpine AS base

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --production

# Copy the application code
COPY . .

# Expose port
EXPOSE 3000

# Command to start the Next.js application
CMD ["npm", "run", "start"]