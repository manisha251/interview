# Multi-stage build for production deployment
FROM node:16-alpine as frontend-build

# Frontend build stage
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install --production=false
COPY frontend/ ./
RUN npm run build

# Backend build stage
FROM openjdk:17-jdk-slim as backend-build

WORKDIR /app/backend
COPY backend/pom.xml ./
RUN mvn dependency:resolve
COPY backend/src ./src
RUN mvn clean package -DskipTests

# Production stage
FROM openjdk:17-jre-slim

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the backend JAR
COPY --from=backend-build /app/backend/target/*.jar app.jar

# Copy the frontend build
COPY --from=frontend-build /app/frontend/build ./static

# Create non-root user for security
RUN addgroup --system appgroup && adduser --system appuser --ingroup appgroup
USER appuser

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# Start the application
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=prod"]
