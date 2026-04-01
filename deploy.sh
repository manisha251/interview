#!/bin/bash

echo "🚀 Deploying Reverse Interview Platform..."

echo ""
echo "📦 Building Frontend..."
cd frontend
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed!"
    exit 1
fi

echo ""
echo "📦 Building Backend..."
cd ../backend
mvn clean package -DskipTests
if [ $? -ne 0 ]; then
    echo "❌ Backend build failed!"
    exit 1
fi

echo ""
echo "✅ Build completed successfully!"
echo "📁 Frontend build: frontend/build/"
echo "📁 Backend JAR: backend/target/reverse-platform-0.0.1-SNAPSHOT.jar"

echo ""
echo "🌐 Starting production servers..."
echo "📍 Frontend: http://localhost:3001"
echo "📍 Backend: http://localhost:8080"

cd ../frontend/build
serve -s . -l 3001 &
FRONTEND_PID=$!

cd ../../backend
java -jar target/reverse-platform-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod &
BACKEND_PID=$!

echo ""
echo "🎉 Deployment complete! Servers are starting..."
echo "⏰ Please wait 10 seconds for servers to fully start..."
sleep 10

echo ""
echo "🌐 Opening production URLs..."
if command -v xdg-open > /dev/null; then
    xdg-open http://localhost:3001
    xdg-open http://localhost:8080/h2-console
elif command -v open > /dev/null; then
    open http://localhost:3001
    open http://localhost:8080/h2-console
fi

echo ""
echo "✅ Deployment successful!"
echo "🔄 To stop servers: kill $FRONTEND_PID $BACKEND_PID"
