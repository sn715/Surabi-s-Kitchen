#!/bin/bash

echo "🚀 Redeploying Surabi's Kitchen to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Build the client
echo "📦 Building client..."
cd client
npm install
npm run build
cd ..

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "🔗 Your app should be available at the Vercel URL"
echo "🧪 Test the API at: https://your-app.vercel.app/api/test"
