#!/bin/bash

echo "🥬 Starting Vegetable Dishes App (Local Database)"
echo "================================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js is installed"
echo ""

# Install dependencies if needed
if [ ! -d "server/node_modules" ] || [ ! -d "client/node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm run install-all
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
    echo "✅ Dependencies installed"
    echo ""
fi

# Create simple .env files if they don't exist
if [ ! -f "server/.env" ]; then
    echo "🔧 Creating server environment file..."
    cat > server/.env << EOF
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
EOF
    echo "✅ Server environment file created"
fi

if [ ! -f "client/.env" ]; then
    echo "🔧 Creating client environment file..."
    cat > client/.env << EOF
REACT_APP_API_URL=http://localhost:3001
EOF
    echo "✅ Client environment file created"
fi

echo ""
echo "🚀 Starting the application..."
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop the application"
echo ""

# Start the application
npm run dev
