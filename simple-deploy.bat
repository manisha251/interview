@echo off
echo 🚀 Simple Deployment - Reverse Interview Platform
echo ================================================

echo.
echo 📦 Step 1: Building Frontend...
cd frontend
call npm install
if %ERRORLEVEL% neq 0 (
    echo ❌ Frontend npm install failed!
    pause
    exit /b 1
)
call npm run build
if %ERRORLEVEL% neq 0 (
    echo ❌ Frontend build failed!
    pause
    exit /b 1
)
echo ✅ Frontend built successfully!

echo.
echo 📦 Step 2: Building Backend...
cd ../backend
call mvn clean package -DskipTests
if %ERRORLEVEL% neq 0 (
    echo ❌ Backend build failed!
    pause
    exit /b 1
)
echo ✅ Backend built successfully!

echo.
echo 🚀 Step 3: Starting Backend Server...
echo Starting backend on port 8080...
start "Backend Server" cmd /k "cd %CD% && java -jar target\reverse-platform-0.0.1-SNAPSHOT.jar"

echo.
echo 🚀 Step 4: Starting Frontend Server...
echo Starting frontend on port 3001...
cd ../frontend/build
start "Frontend Server" cmd /k "serve -s . -l 3001"

echo.
echo ✅ Deployment Complete!
echo.
echo 📍 Access URLs:
echo    Frontend: http://localhost:3001
echo    Backend:  http://localhost:8080
echo    API:      http://localhost:8080/api
echo.
echo ⏰ Waiting 10 seconds for servers to start...
timeout /t 10

echo.
echo 🌐 Opening application in browser...
start http://localhost:3001

echo.
echo 🎉 Your Reverse Interview Platform is now running!
echo Press any key to continue...
pause
