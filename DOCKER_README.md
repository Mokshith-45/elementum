# Docker Setup for Elementum React Application

## Overview

This is a production-ready Docker configuration for the Elementum React Vite application. It uses a multi-stage build process to minimize the final image size and includes nginx for serving the application with optimal caching and SPA routing.

---

## Architecture

### Multi-Stage Build

**Stage 1: Builder (Node.js Alpine)**
- Install dependencies
- Build the React Vite application
- Output: Optimized production build in `dist/`

**Stage 2: Production (Nginx Alpine)**
- Serve optimized build files only
- No dependencies or build tools
- Minimal final image size (~50MB vs 1GB+ with full Node)

---

## Quick Start

### Prerequisites

- Docker 20.10+
- Docker Compose (optional)

### Build the Docker Image

```bash
# Standard build with default tag
docker build -t elementum:latest .

# Build with specific version tag
docker build -t elementum:1.0.0 .

# Build with multiple tags
docker build -t elementum:latest -t elementum:1.0.0 .
```

### Run the Container

```bash
# Basic run - port 3000
docker run -p 3000:3000 elementum:latest

# Run in background (detached)
docker run -d -p 3000:3000 --name elementum elementum:latest

# Run with environment variable
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  elementum:latest

# Run with custom restart policy
docker run -d \
  -p 3000:3000 \
  --restart unless-stopped \
  --name elementum \
  elementum:latest
```

### Access the Application

Once running, open your browser:
```
http://localhost:3000
```

---

## Docker Compose (Optional)

### Using Docker Compose

Create a `docker-compose.yml` in the project root:

```yaml
version: '3.8'

services:
  elementum:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: elementum-app
    ports:
      - "3000:3000"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000/"]
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 5s
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

Then run:

```bash
# Start the service
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the service
docker-compose down
```

---

## File Structure

```
elementum/
├── Dockerfile           # Multi-stage production build
├── .dockerignore        # Excludes unnecessary files
├── nginx.conf          # Nginx configuration with SPA routing
├── docker-compose.yml  # (Optional) Docker Compose setup
├── package.json
├── vite.config.js
├── src/
│   ├── components/
│   ├── assets/
│   └── App.jsx
└── dist/               # Build output (generated)
```

---

## Configuration Details

### Dockerfile Features

✅ **Multi-stage build** - Reduces final image from 1GB+ to ~50MB  
✅ **Alpine Linux** - Lightweight base images  
✅ **npm ci** - Consistent dependency installation  
✅ **Non-root user** - Runs as nginx user for security  
✅ **Health checks** - Automatic container health monitoring  
✅ **Metadata labels** - For container tracking  

### Nginx Configuration Features

✅ **SPA routing** - URL fallback to `index.html` for React Router  
✅ **Asset caching** - 30-day cache for images/fonts, 365-day for Vite hashes  
✅ **Gzip compression** - Reduces transfer size by 60-80%  
✅ **Security headers** - XSS, Content-Security-Policy, CORS protection  
✅ **Cache strategies** - Immutable assets, must-revalidate for HTML  
✅ **Logging** - Access and error logs for monitoring  

### .dockerignore Excludes

- Dependencies (`node_modules/`, `.npm/`)
- Build artifacts (`dist/`, `build/`, `.vite/`)
- Git files (`.git/`, `.github/`)
- Config files (`.env`, Docker files)
- Tests and CI/CD workflows
- Documentation

---

## Performance Optimizations

### Image Size Reduction

- **Builder stage**: Full Node + dependencies
- **Production stage**: Only Vite build output (~5-10MB)
- **Alpine Linux**: 5MB base vs 900MB+ with regular distros

### Caching Strategy

| Content | Cache Duration | Strategy |
|---------|----------------|----------|
| Vite hashed assets | 365 days | `public, immutable` |
| Images/fonts | 30 days | `public` |
| HTML files | No cache | `must-revalidate` |

### Network Optimization

- **Gzip compression** - Enabled for text/CSS/JS
- **Asset versioning** - Vite auto-hashes builds
- **Security headers** - CSP reduces XSS attacks

---

## Common Commands

### Build and Run

```bash
# Build image
docker build -t elementum:latest .

# Run container
docker run -d -p 3000:3000 --name elementum elementum:latest

# View real-time logs
docker logs -f elementum

# Inspect container
docker inspect elementum

# Check health
docker ps --format "table {{.Names}}\t{{.Status}}"
```

### Debugging

```bash
# Execute shell in running container
docker exec -it elementum /bin/sh

# Check nginx config
docker exec elementum nginx -t

# View access logs
docker exec elementum cat /var/log/nginx/access.log

# View error logs
docker exec elementum cat /var/log/nginx/error.log
```

### Container Management

```bash
# Stop container
docker stop elementum

# Restart container
docker restart elementum

# Remove container
docker rm elementum

# Remove image
docker rmi elementum:latest

# Remove all unused images/containers
docker system prune
```

---

## Ports and Networking

| Port | Service | Protocol |
|------|---------|----------|
| 3000 | Nginx/React App | HTTP |

### Network Modes

```bash
# Default (bridge network)
docker run -p 3000:3000 elementum:latest

# Host network (Linux only, fastest)
docker run --network host elementum:latest

# Custom network
docker network create app-net
docker run -p 3000:3000 --network app-net elementum:latest
```

---

## Health Monitoring

The container includes a built-in health check:

```bash
# View health status
docker ps --format "table {{.Names}}\t{{.Status}}"

# Example output:
# NAMES       STATUS
# elementum   Up 2 minutes (healthy)
```

---

## Troubleshooting

### Container won't start

```bash
# Check logs
docker logs elementum

# Verify image
docker inspect elementum:latest

# Test nginx config
docker run --rm elementum:latest nginx -t
```

### Port already in use

```bash
# Find process on port 3000
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Use different port
docker run -p 8080:3000 elementum:latest
```

### Slow performance

```bash
# Check container resources
docker stats elementum

# Increase memory limit
docker run -m 512m -p 3000:3000 elementum:latest
```

---

## Security Best Practices

✅ **Non-root user** - Runs as nginx user, not root  
✅ **Security headers** - XSS-Protection, X-Frame-Options, CSP  
✅ **Immutable assets** - Hash-based versioning prevents cache attacks  
✅ **Minimal surface** - Alpine Linux + nginx only  
✅ **Read-only files** - Nginx files are read-only  

---

## Production Deployment

### AWS ECS

```bash
# Push to ECR
aws ecr get-login-password | docker login --username AWS --password-stdin <aws_account>.dkr.ecr.us-east-1.amazonaws.com
docker tag elementum:latest <aws_account>.dkr.ecr.us-east-1.amazonaws.com/elementum:latest
docker push <aws_account>.dkr.ecr.us-east-1.amazonaws.com/elementum:latest
```

### Docker Hub

```bash
# Tag and push
docker tag elementum:latest username/elementum:latest
docker push username/elementum:latest
```

### Kubernetes

```bash
# Create deployment
kubectl apply -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: elementum
spec:
  replicas: 3
  selector:
    matchLabels:
      app: elementum
  template:
    metadata:
      labels:
        app: elementum
    spec:
      containers:
      - name: elementum
        image: elementum:latest
        ports:
        - containerPort: 3000
        readinessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 10
EOF
```

---

## Version Information

- **Node.js**: 20 (Alpine)
- **Nginx**: latest Alpine
- **React**: 18.2.0
- **Vite**: 5.2.0

---

## Support and Issues

For issues or questions:

1. Check Docker logs: `docker logs elementum`
2. Verify nginx config: `docker exec elementum nginx -t`
3. Test connectivity: `docker exec elementum wget -O- http://localhost:3000`

---

## License

Same as the main project.
