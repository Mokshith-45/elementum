# =================================================================
# STAGE 1: BUILD STAGE
# =================================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project source
COPY . .

# Build the Vite project
RUN npm run build

# =================================================================
# STAGE 2: PRODUCTION STAGE
# =================================================================
FROM nginx:alpine

# Metadata
LABEL maintainer="Mokshith"
LABEL description="Production-ready React Vite application served by nginx"

# Remove default nginx config and copy custom config
RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Run as non-root user for security
USER nginx

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/index.html || exit 1

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
