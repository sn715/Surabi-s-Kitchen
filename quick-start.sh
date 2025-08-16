#!/bin/bash

echo "🥬 Vegetable Dishes App - Quick Start"
echo "====================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm run install-all

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"
echo ""

# Check for environment files
echo "🔧 Checking environment configuration..."

if [ ! -f "server/.env" ]; then
    echo "⚠️  server/.env file not found"
    echo "   Please create server/.env file with your configuration:"
    echo "   See server/env.example for reference"
    echo ""
fi

if [ ! -f "client/.env" ]; then
    echo "⚠️  client/.env file not found"
    echo "   Please create client/.env file with your configuration:"
    echo "   REACT_APP_API_KEY=your_api_key_here"
    echo "   REACT_APP_API_URL=http://localhost:3001"
    echo ""
fi

if [ ! -f "server/service-account-key.json" ]; then
    echo "⚠️  server/service-account-key.json not found"
    echo "   Please download your Google Sheets service account key"
    echo "   and place it in the server/ directory"
    echo "   See GOOGLE_SHEETS_SETUP.md for instructions"
    echo ""
fi

echo "🚀 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Configure your environment variables (see above warnings)"
echo "2. Set up Google Sheets API (see GOOGLE_SHEETS_SETUP.md)"
echo "3. Run 'npm run dev' to start the application"
echo ""
echo "The app will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:3001"
echo ""
echo "Happy coding! 🎉"
