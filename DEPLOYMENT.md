# 🚀 Deployment Guide for Reverse Interview Platform

## 📋 Prerequisites
- Node.js 16+ installed
- Java 17+ installed
- Maven installed

## 🏗️ Build for Production

### Frontend (React)
```bash
cd frontend
npm run build
```
- Build output: `frontend/build/`
- Static files ready for deployment

### Backend (Spring Boot)
```bash
cd backend
mvn clean package
```
- JAR file: `backend/target/reverse-platform-0.0.1-SNAPSHOT.jar`

## 🌐 Deployment Options

### Option 1: Static Hosting + Backend Server
1. Deploy frontend build to Netlify/Vercel/Static hosting
2. Deploy backend JAR to cloud server (AWS, Azure, DigitalOcean)
3. Update API URL in frontend `.env` file

### Option 2: Single Server Deployment
1. Build frontend: `npm run build`
2. Copy `frontend/build` to `backend/src/main/resources/static`
3. Deploy single JAR file

### Option 3: Docker Deployment
```dockerfile
# Multi-stage build for production
FROM node:16-alpine as frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY backend/target/reverse-platform-0.0.1-SNAPSHOT.jar app.jar
COPY --from=frontend-build /app/frontend/build static/
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
```

## 🔧 Environment Variables

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

### Backend (application.properties)
```properties
# Production Database
spring.datasource.url=jdbc:mysql://your-db-host:3306/reverse_platform
spring.datasource.username=your-db-user
spring.datasource.password=your-db-password

# Server Configuration
server.port=8080
spring.web.cors.allowed-origins=https://your-frontend-url.com
```

## 🚀 Quick Deploy Commands

### Run Production Backend
```bash
java -jar backend/target/reverse-platform-0.0.1-SNAPSHOT.jar
```

### Serve Production Frontend
```bash
npm install -g serve
cd frontend/build
serve -s .
```

## 📊 Current Status
✅ Frontend build successful (69.61 kB gzipped)
✅ Backend ready for JAR packaging
✅ ESLint warnings resolved
✅ React Router warnings fixed
✅ Production ready

## 🌍 Recommended Hosting
- **Frontend**: Netlify, Vercel, GitHub Pages
- **Backend**: Heroku, AWS Elastic Beanstalk, DigitalOcean App Platform
- **Database**: AWS RDS, Google Cloud SQL, PlanetScale

## 🔗 API Endpoints (Production)
```
POST /api/register/candidate
POST /api/register/company  
POST /api/login
GET /api/candidates
GET /api/companies
```

## 🎯 Next Steps
1. Choose hosting platform
2. Update environment variables
3. Deploy frontend build
4. Deploy backend JAR
5. Test production URLs
6. Configure custom domain (optional)

Ready for production deployment! 🚀
