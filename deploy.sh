#!/bin/bash

echo "🚀 Deploying Vegetable Dishes App to Vercel"
echo "=========================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not initialized"
    echo "Please run: git init && git add . && git commit -m 'Initial commit'"
    exit 1
fi

# Check if vercel is available
if ! command -v npx vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "✅ Vercel CLI is available"
echo ""

# Check if user is logged in to Vercel
echo "🔐 Checking Vercel login status..."
if ! npx vercel whoami &> /dev/null; then
    echo "Please login to Vercel:"
    npx vercel login
else
    echo "✅ Already logged in to Vercel"
fi

echo ""
echo "🚀 Starting deployment..."

# Deploy to Vercel
npx vercel --prod

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "Your app should now be live at the URL provided above."
echo "You can also check your Vercel dashboard for more details."
