@echo off
echo 🚀 Deploying Reverse Interview Platform...

echo.
echo 📦 Building Frontend...
cd frontend
call npm run build
if %ERRORLEVEL% neq 0 (
    echo ❌ Frontend build failed!
    pause
    exit /b 1
)

echo.
echo 📦 Building Backend...
cd ../backend
call mvn clean package -DskipTests
if %ERRORLEVEL% neq 0 (
    echo ❌ Backend build failed!
    pause
    exit /b 1
)

echo.
echo ✅ Build completed successfully!
echo 📁 Frontend build: frontend/build/
echo 📁 Backend JAR: backend/target/reverse-platform-0.0.1-SNAPSHOT.jar

echo.
echo 🌐 Starting production servers...
echo 📍 Frontend: http://localhost:3001
echo 📍 Backend: http://localhost:8080

cd ../frontend/build
start "Frontend Production Server" cmd /k "serve -s . -l 3001"

cd ../../backend
start "Backend Production Server" cmd /k "java -jar target/reverse-platform-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod"

echo.
echo 🎉 Deployment complete! Servers are starting...
echo ⏰ Please wait 10 seconds for servers to fully start...
timeout /t 10

echo.
echo 🌐 Opening production URLs...
start http://localhost:3001
start http://localhost:8080/h2-console

echo.
echo ✅ Deployment successful! Check the browser windows.
pause
