# =================================================================
# STAGE 1: BUILD STAGE
# =================================================================
# Use official Node.js LTS as base image for building
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy entire project
COPY . .

# Build the Vite project
RUN npm run build

# =================================================================
# STAGE 2: PRODUCTION STAGE
# =================================================================
# Use lightweight nginx image for serving
FROM nginx:alpine

# Set metadata
LABEL maintainer="DevOps Team"
LABEL description="Production-ready React Vite application served by nginx"

# Create app directory
WORKDIR /app

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy nginx configuration from build stage or local
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Create nginx cache directory
RUN mkdir -p /var/cache/nginx && \
    chown -R nginx:nginx /var/cache/nginx && \
    chmod -R 755 /var/cache/nginx

# Run nginx as root
USER root

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
