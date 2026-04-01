#!/bin/bash

echo "🚀 Simple Deployment - Reverse Interview Platform"
echo "================================================"

echo ""
echo "📦 Step 1: Building Frontend..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Frontend npm install failed!"
    exit 1
fi
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed!"
    exit 1
fi
echo "✅ Frontend built successfully!"

echo ""
echo "📦 Step 2: Building Backend..."
cd ../backend
mvn clean package -DskipTests
if [ $? -ne 0 ]; then
    echo "❌ Backend build failed!"
    exit 1
fi
echo "✅ Backend built successfully!"

echo ""
echo "🚀 Step 3: Starting Backend Server..."
echo "Starting backend on port 8080..."
java -jar target/reverse-platform-0.0.1-SNAPSHOT.jar &
BACKEND_PID=$!

echo ""
echo "🚀 Step 4: Starting Frontend Server..."
echo "Starting frontend on port 3001..."
cd ../frontend/build
serve -s . -l 3001 &
FRONTEND_PID=$!

echo ""
echo "✅ Deployment Complete!"
echo ""
echo "📍 Access URLs:"
echo "    Frontend: http://localhost:3001"
echo "    Backend:  http://localhost:8080"
echo "    API:      http://localhost:8080/api"
echo ""
echo "⏰ Waiting 10 seconds for servers to start..."
sleep 10

echo ""
echo "🌐 Opening application in browser..."
if command -v xdg-open > /dev/null; then
    xdg-open http://localhost:3001
elif command -v open > /dev/null; then
    open http://localhost:3001
fi

echo ""
echo "🎉 Your Reverse Interview Platform is now running!"
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "To stop servers: kill $BACKEND_PID $FRONTEND_PID"
