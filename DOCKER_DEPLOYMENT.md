# Production Deployment Guide

## Quick Commands Reference

### Build & Run (Basic)

```bash
# Build image
docker build -t elementum:latest .

# Run container
docker run -d -p 3000:3000 --name elementum elementum:latest

# Stop
docker stop elementum

# Remove
docker rm elementum
```

### Using Docker Compose

```bash
# Start services
docker-compose up -d

# View status
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Using Helper Scripts

**On macOS/Linux:**
```bash
chmod +x docker-run.sh
./docker-run.sh          # Interactive menu
./docker-run.sh build    # Direct command
./docker-run.sh run
./docker-run.sh status
./docker-run.sh logs
./docker-run.sh stop
./docker-run.sh restart
```

**On Windows (PowerShell):**
```powershell
.\docker-run.ps1    # Interactive menu
```

---

## Local Development

### Development Workflow

```bash
# Build image
docker build -t elementum:dev .

# Run with volume mount for live development
docker run -d \
  -p 3000:3000 \
  -v $(pwd)/src:/app/src \
  --name elementum-dev \
  elementum:dev

# View real-time logs
docker logs -f elementum-dev
```

### Rebuild After Changes

```bash
# Rebuild the image
docker build -t elementum:latest .

# Stop old container
docker stop elementum
docker rm elementum

# Run new container
docker run -d -p 3000:3000 --name elementum elementum:latest
```

---

## Production Deployment

### Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Build optimized for production
- [ ] Environment variables configured
- [ ] Health checks passing
- [ ] Logs configured
- [ ] Security headers enabled
- [ ] CORS configured if needed

### Docker Hub Deployment

```bash
# Tag for Docker Hub
docker tag elementum:latest username/elementum:latest

# Login to Docker Hub
docker login

# Push to Docker Hub
docker push username/elementum:latest

# Pull and run anywhere
docker run -d -p 3000:3000 username/elementum:latest
```

### AWS Deployment Options

#### Option 1: Amazon ECS (Elastic Container Service)

```bash
# Create ECR repository
aws ecr create-repository --repository-name elementum

# Get login token
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account_id>.dkr.ecr.us-east-1.amazonaws.com

# Tag image
docker tag elementum:latest <account_id>.dkr.ecr.us-east-1.amazonaws.com/elementum:latest

# Push to ECR
docker push <account_id>.dkr.ecr.us-east-1.amazonaws.com/elementum:latest

# Create ECS service via AWS Console or CLI
aws ecs create-service --cluster default --service-name elementum --task-definition elementum:1 --desired-count 1
```

#### Option 2: AWS Elastic Beanstalk

```bash
# Install EB CLI
pip install awsebcli

# Initialize application
eb init -p docker elementum

# Deploy
eb create elementum-env
eb deploy

# View status
eb status
```

### Google Cloud Deployment

```bash
# Set project
gcloud config set project PROJECT_ID

# Create Cloud Run service (serverless)
gcloud run deploy elementum \
  --source . \
  --platform managed \
  --region us-central1 \
  --port 3000 \
  --memory 512Mi

# Or push to Container Registry
docker tag elementum:latest gcr.io/PROJECT_ID/elementum:latest
docker push gcr.io/PROJECT_ID/elementum:latest

gcloud run deploy elementum \
  --image gcr.io/PROJECT_ID/elementum:latest \
  --platform managed \
  --region us-central1
```

### Azure Deployment

```bash
# Login to Azure
az login

# Create container registry
az acr create --resource-group myResourceGroup --name elementumregistry --sku Basic

# Push image
az acr build --registry elementumregistry --image elementum:latest .

# Deploy to Container Instances
az container create \
  --resource-group myResourceGroup \
  --name elementum \
  --image elementumregistry.azurecr.io/elementum:latest \
  --ports 3000 \
  --registry-login-server elementumregistry.azurecr.io
```

---

## Kubernetes Deployment

### Create Deployment YAML

```yaml
# elementum-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: elementum
  labels:
    app: elementum
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
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: elementum-service
spec:
  selector:
    app: elementum
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: LoadBalancer
```

### Deploy to Kubernetes

```bash
# Apply deployment
kubectl apply -f elementum-deployment.yaml

# Check status
kubectl get deployments
kubectl get pods
kubectl get svc

# View logs
kubectl logs -f deployment/elementum

# Scale replicas
kubectl scale deployment elementum --replicas=5

# Update image
kubectl set image deployment/elementum elementum=elementum:v2

# Rollback
kubectl rollout undo deployment/elementum
```

---

## CI/CD Pipeline Integration

### GitHub Actions Example

```yaml
# .github/workflows/docker-deploy.yml
name: Build and Deploy

on:
  push:
    branches: [main]
    tags: ['v*']

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker image
        run: docker build -t elementum:${{ github.sha }} .
      
      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
      
      - name: Push to Docker Hub
        run: docker push elementum:${{ github.sha }}
      
      - name: Deploy to production
        run: |
          # Your deployment script here
          curl -X POST ${{ secrets.DEPLOY_WEBHOOK }}
```

### GitLab CI Example

```yaml
# .gitlab-ci.yml
stages:
  - build
  - push
  - deploy

build-image:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker build -t elementum:$CI_COMMIT_SHA .

push-image:
  stage: push
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker login -u $REGISTRY_USER -p $REGISTRY_PASSWORD
    - docker tag elementum:$CI_COMMIT_SHA $REGISTRY_URL/elementum:latest
    - docker push $REGISTRY_URL/elementum:latest

deploy:
  stage: deploy
  script:
    - ./deploy.sh $CI_COMMIT_SHA
```

---

## Monitoring & Logging

### Container Health Monitoring

```bash
# Check container health
docker inspect --format='{{.State.Health.Status}}' elementum

# View container stats (CPU, memory)
docker stats elementum

# View detailed container info
docker inspect elementum
```

### Log Management

```bash
# View logs
docker logs elementum

# Follow logs in real-time
docker logs -f elementum

# View last 100 lines
docker logs --tail 100 elementum

# View logs with timestamps
docker logs -t elementum

# Export logs to file
docker logs elementum > container.log 2>&1
```

### Error Troubleshooting

```bash
# Check container exit code
docker inspect --format='{{.State.ExitCode}}' elementum

# View nginx error logs
docker exec elementum cat /var/log/nginx/error.log

# View nginx access logs
docker exec elementum cat /var/log/nginx/access.log

# Test nginx config
docker exec elementum nginx -t
```

---

## Performance Optimization

### Resource Limits

```bash
# Run with memory limit
docker run -m 512m -p 3000:3000 elementum:latest

# Run with CPU limit (0.5 = 50% of one CPU)
docker run --cpus="0.5" -p 3000:3000 elementum:latest

# Run with both limits
docker run \
  -m 512m \
  --cpus="0.5" \
  -p 3000:3000 \
  elementum:latest
```

### Image Size Optimization

```bash
# Check image size
docker images elementum

# Build with specific tag
docker build -t elementum:slim .

# Multi-stage build reduces size from 1GB+ to ~50MB
```

### Network Optimization

```bash
# Use host network (Linux only, fastest but less isolated)
docker run --network host elementum:latest

# Use specific network
docker network create app-net
docker run --network app-net -p 3000:3000 elementum:latest
```

---

## Backup & Recovery

### Container Backup

```bash
# Create image snapshot
docker commit elementum elementum-backup:latest

# Save image to file
docker save elementum:latest -o elementum-backup.tar

# Restore from file
docker load -i elementum-backup.tar
```

### Database/Data Backup

```bash
# Copy files from container
docker cp elementum:/path/to/data ./backup/

# Copy files to container
docker cp ./backup/data elementum:/path/to/
```

---

## Troubleshooting Common Issues

### Port Already in Use

```bash
# Use different port
docker run -p 8080:3000 elementum:latest

# Or kill process on port 3000
lsof -ti:3000 | xargs kill -9  # macOS/Linux
```

### Container Won't Start

```bash
# Check logs
docker logs elementum

# Check image integrity
docker inspect elementum:latest

# Rebuild image
docker build -t elementum:latest .
```

### Out of Memory

```bash
# Check memory usage
docker stats elementum

# Increase memory limit
docker run -m 1g -p 3000:3000 elementum:latest
```

### Nginx 502 Bad Gateway

```bash
# Verify nginx config
docker exec elementum nginx -t

# Check nginx error logs
docker exec elementum cat /var/log/nginx/error.log

# Verify app is running
docker exec elementum ps aux
```

---

## Security Best Practices

✅ Run container as non-root user  
✅ Use read-only filesystem where possible  
✅ Set resource limits  
✅ Use security scanning tools  
✅ Keep base images updated  
✅ Use secret management for sensitive data  

```bash
# Example: Run with security options
docker run -d \
  -p 3000:3000 \
  --read-only \
  --cap-drop=ALL \
  --security-opt=no-new-privileges:true \
  elementum:latest
```

---

## Support

For issues, check:
1. Container logs: `docker logs elementum`
2. Nginx config: `docker exec elementum nginx -t`
3. Health status: `docker inspect elementum`

