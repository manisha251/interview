# 🚀 Complete Deployment Guide - Reverse Interview Platform

## 📋 Prerequisites
- Docker & Docker Compose installed
- Git installed
- Server with at least 2GB RAM
- Domain name (optional)

## 🌐 Deployment Options

### Option 1: Docker Compose (Recommended)
**Perfect for production with database**

```bash
# Clone the repository
git clone https://github.com/manisha251/interview.git
cd interview

# Build and start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

**Access URLs:**
- Frontend: http://localhost (or your domain)
- Backend API: http://localhost/api
- Database: localhost:3306

### Option 2: Docker Single Container
**For simple deployment**

```bash
# Build the image
docker build -t reverse-interview .

# Run the container
docker run -d \
  --name reverse-interview \
  -p 8080:8080 \
  -e SPRING_PROFILES_ACTIVE=prod \
  reverse-interview
```

### Option 3: Manual Deployment
**For custom setups**

#### Backend Deployment:
```bash
cd backend
mvn clean package -DskipTests
java -jar target/reverse-platform-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
```

#### Frontend Deployment:
```bash
cd frontend
npm run build
# Deploy the 'build' folder to your web server
```

## 🔧 Environment Configuration

### Production Environment Variables
Create `.env` file:
```env
# Database Configuration
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/reverse_platform
SPRING_DATASOURCE_USERNAME=appuser
SPRING_DATASOURCE_PASSWORD=apppassword

# Server Configuration
SPRING_PROFILES_ACTIVE=prod
SERVER_PORT=8080

# CORS Configuration
SPRING_WEB_CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### Frontend Environment
Create `frontend/.env.production`:
```env
REACT_APP_API_URL=https://yourdomain.com/api
```

## 🗄️ Database Setup

### MySQL (Production)
```bash
# Create database
mysql -u root -p
CREATE DATABASE reverse_platform;
CREATE USER 'appuser'@'%' IDENTIFIED BY 'apppassword';
GRANT ALL PRIVILEGES ON reverse_platform.* TO 'appuser'@'%';
FLUSH PRIVILEGES;
```

### H2 (Development)
Default configuration uses H2 in-memory database.

## 🔒 Security Configuration

### SSL/HTTPS Setup
```bash
# Using Nginx with Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

### Firewall Configuration
```bash
# Allow necessary ports
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 22
sudo ufw enable
```

## 📊 Monitoring & Health Checks

### Health Endpoints
- Backend: `GET /actuator/health`
- Frontend: `GET /health`

### Docker Health Checks
```bash
# Check container health
docker ps

# View health logs
docker inspect reverse-interview-backend
```

## 🚀 Cloud Deployment

### AWS ECS
```bash
# Build and push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ECR_REGISTRY
docker build -t reverse-interview .
docker tag reverse-interview:latest $ECR_REGISTRY/reverse-interview:latest
docker push $ECR_REGISTRY/reverse-interview:latest
```

### Heroku
```bash
# Install Heroku CLI
heroku login
heroku create reverse-interview

# Set environment variables
heroku config:set SPRING_PROFILES_ACTIVE=prod

# Deploy
git push heroku main
```

### DigitalOcean App Platform
1. Connect your GitHub repository
2. Configure build command: `mvn clean package -DskipTests`
3. Configure run command: `java -jar target/reverse-platform-0.0.1-SNAPSHOT.jar`
4. Set environment variables
5. Deploy

## 🔄 CI/CD Pipeline

### GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Build and Deploy
      run: |
        docker-compose up -d
```

## 📝 Troubleshooting

### Common Issues:
1. **Port Conflicts**: Change ports in docker-compose.yml
2. **Database Connection**: Check database credentials
3. **Memory Issues**: Increase JVM memory: `-Xmx2g`
4. **CORS Issues**: Update allowed origins in application.properties

### Logs and Debugging:
```bash
# View application logs
docker-compose logs backend

# View database logs
docker-compose logs mysql

# Enter container for debugging
docker exec -it reverse-interview-backend bash
```

## 🎯 Production Checklist

### Before Deployment:
- [ ] Update all passwords and secrets
- [ ] Configure SSL certificates
- [ ] Set up monitoring and alerts
- [ ] Test all functionality
- [ ] Backup strategy in place

### After Deployment:
- [ ] Verify all services are running
- [ ] Test user registration and login
- [ ] Test offer functionality
- [ ] Check database connectivity
- [ ] Monitor system resources

## 📞 Support

### Useful Commands:
```bash
# Restart services
docker-compose restart

# Update deployment
git pull origin main
docker-compose up -d --build

# Backup database
docker exec mysql mysqldump -u root -p reverse_platform > backup.sql
```

**Deployment Complete! 🎉**

Your Reverse Interview Platform is now running in production mode with:
- ✅ Secure database
- ✅ SSL support
- ✅ Monitoring
- ✅ Auto-restart
- ✅ Health checks
