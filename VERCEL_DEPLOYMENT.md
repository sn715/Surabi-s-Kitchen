# Deploy to Vercel

This guide will help you deploy your Vegetable Dishes app to Vercel for free hosting and sharing.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account**: Your code should be in a GitHub repository
3. **Node.js**: Make sure you have Node.js installed locally

## Step 1: Prepare Your Repository

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Vegetable Dishes App"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com)** and sign in
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure the project**:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `cd client && npm install && npm run build`
   - **Output Directory**: `client/build`
   - **Install Command**: `npm run install-all`

5. **Environment Variables** (if needed):
   - `NODE_ENV`: `production`

6. **Click "Deploy"**

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project or create new
   - Set project name
   - Confirm deployment

## Step 3: Configure Domain (Optional)

1. **Go to your project dashboard** on Vercel
2. **Click "Settings"** → **"Domains"**
3. **Add your custom domain** (if you have one)
4. **Or use the provided Vercel URL** (e.g., `your-app.vercel.app`)

## Step 4: Test Your Deployment

1. **Visit your deployed URL**
2. **Test all features**:
   - Browse dishes
   - Search functionality
   - Filter by vegetable
   - Filter by dish type
   - Add new dishes

## Project Structure for Vercel

```
your-app/
├── api/                    # Serverless functions
│   ├── dishes/
│   │   ├── index.js       # GET /api/dishes, POST /api/dishes
│   │   ├── [vegetable].js # GET /api/dishes/[vegetable]
│   │   └── search/
│   │       └── [term].js  # GET /api/dishes/search/[term]
│   ├── vegetables/
│   │   └── index.js       # GET /api/vegetables
│   └── dish-types/
│       └── index.js       # GET /api/dish-types
├── client/                 # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vercel.json
├── server/                 # Local database and services
│   ├── data/
│   ├── services/
│   └── package.json
├── vercel.json            # Main Vercel config
└── package.json
```

## Features After Deployment

✅ **Fully Functional App**: All features work in production
✅ **Fast Loading**: Vercel's global CDN
✅ **Automatic HTTPS**: Secure by default
✅ **Custom Domain**: Add your own domain
✅ **Analytics**: Built-in performance monitoring
✅ **Automatic Deployments**: Deploy on every git push

## Troubleshooting

### Common Issues:

1. **Build Fails**:
   - Check that all dependencies are in package.json
   - Verify build command is correct
   - Check for syntax errors

2. **API Not Working**:
   - Verify API routes are in `/api` directory
   - Check CORS headers
   - Test endpoints individually

3. **Environment Variables**:
   - Set `NODE_ENV=production` in Vercel dashboard
   - Add any other required environment variables

### Debug Commands:

```bash
# Test locally with Vercel
vercel dev

# Check deployment status
vercel ls

# View logs
vercel logs
```

## Sharing Your App

Once deployed, you can:

1. **Share the Vercel URL** with anyone
2. **Add to your portfolio** or resume
3. **Customize the domain** for branding
4. **Monitor usage** in Vercel dashboard

## Next Steps

- **Add Analytics**: Google Analytics or Vercel Analytics
- **Custom Domain**: Add your own domain name
- **Environment Variables**: Add any additional config
- **Monitoring**: Set up error tracking

Your Vegetable Dishes app will be live and shareable! 🎉
