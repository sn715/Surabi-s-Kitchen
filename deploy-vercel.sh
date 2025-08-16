#!/bin/bash

echo "🚀 Deploying Surabi's Kitchen to Vercel with Database Access"
echo "=========================================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if we're logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "❌ Not logged in to Vercel. Please login first:"
    echo "   vercel login"
    exit 1
fi

echo "✅ Vercel CLI ready"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm run install-all
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Build the client
echo "🔨 Building client..."
cd client
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Failed to build client"
    exit 1
fi
cd ..

echo "✅ Build completed"
echo ""

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "🔗 Your app is now live!"
    echo "🧪 Test the API at: https://your-app.vercel.app/api/test"
    echo "🍽️  Main app: https://your-app.vercel.app"
    echo ""
    echo "📋 Next steps:"
    echo "1. Visit the test API to verify database access"
    echo "2. Check the main app to ensure dishes load properly"
    echo "3. Test search and filter functionality"
    echo "4. Try adding a new dish"
else
    echo "❌ Deployment failed"
    exit 1
fi
