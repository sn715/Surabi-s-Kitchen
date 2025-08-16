# Deployment Guide

This guide covers deploying the Vegetable Dishes app to various hosting platforms.

## Prerequisites

Before deploying, ensure you have:
- Google Sheets API set up (see `GOOGLE_SHEETS_SETUP.md`)
- Environment variables configured
- Service account JSON file ready

## Option 1: Render (Recommended)

### Backend Deployment

1. **Connect to GitHub**:
   - Push your code to GitHub
   - Connect your repository to Render

2. **Create Web Service**:
   - Click "New Web Service"
   - Connect your GitHub repository
   - Configure settings:
     - **Name**: `vegetable-dishes-api`
     - **Root Directory**: `server`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Environment**: `Node`

3. **Environment Variables**:
   ```
   GOOGLE_SHEET_ID=your_sheet_id
   API_KEY=your_api_key
   GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json
   NODE_ENV=production
   CORS_ORIGIN=https://your-frontend-domain.com
   ```

4. **Upload Service Account Key**:
   - In Render dashboard, go to "Files"
   - Upload your `service-account-key.json` file

### Frontend Deployment

1. **Create Static Site**:
   - Click "New Static Site"
   - Connect your GitHub repository
   - Configure settings:
     - **Name**: `vegetable-dishes-frontend`
     - **Root Directory**: `client`
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: `build`

2. **Environment Variables**:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   REACT_APP_API_KEY=your_api_key
   ```

## Option 2: Railway

1. **Connect Repository**:
   - Push code to GitHub
   - Connect repository to Railway

2. **Deploy Backend**:
   - Create new service from GitHub repo
   - Set root directory to `server`
   - Add environment variables
   - Upload service account JSON file

3. **Deploy Frontend**:
   - Create another service for frontend
   - Set root directory to `client`
   - Configure build settings

## Option 3: Vercel (Serverless)

### Backend (API Routes)

1. **Create Vercel Project**:
   ```bash
   npm i -g vercel
   vercel login
   ```

2. **Configure for Serverless**:
   - Move server code to `api/` directory
   - Update imports and paths
   - Set environment variables in Vercel dashboard

3. **Deploy**:
   ```bash
   vercel --prod
   ```

### Frontend

1. **Deploy to Vercel**:
   ```bash
   cd client
   vercel --prod
   ```

## Option 4: Netlify + Heroku

### Backend (Heroku)

1. **Create Heroku App**:
   ```bash
   heroku create your-app-name
   ```

2. **Configure Build**:
   - Set buildpack to Node.js
   - Configure environment variables
   - Upload service account JSON

3. **Deploy**:
   ```bash
   git subtree push --prefix server heroku main
   ```

### Frontend (Netlify)

1. **Build and Deploy**:
   ```bash
   cd client
   npm run build
   # Drag build folder to Netlify
   ```

2. **Configure Environment**:
   - Set environment variables in Netlify dashboard
   - Configure redirects for React Router

## Environment Variables for Production

### Backend (.env)
```env
GOOGLE_SHEET_ID=your_production_sheet_id
API_KEY=your_secure_production_api_key
GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-domain.com
REACT_APP_API_KEY=your_secure_production_api_key
```

## Security Considerations

1. **API Key Security**:
   - Use strong, unique API keys
   - Rotate keys regularly
   - Never expose keys in client-side code

2. **CORS Configuration**:
   - Only allow your frontend domain
   - Use HTTPS in production
   - Configure proper headers

3. **Google Sheets Security**:
   - Use production Google Cloud project
   - Limit service account permissions
   - Monitor API usage

## Monitoring and Logging

1. **Set up monitoring**:
   - Use platform-specific monitoring (Render, Railway, etc.)
   - Set up error tracking (Sentry, LogRocket)
   - Monitor API response times

2. **Logging**:
   - Implement structured logging
   - Log API requests and errors
   - Set up log aggregation

## Performance Optimization

1. **Frontend**:
   - Enable gzip compression
   - Use CDN for static assets
   - Implement caching strategies

2. **Backend**:
   - Add response caching
   - Implement rate limiting
   - Optimize database queries

## Troubleshooting Deployment

### Common Issues:

1. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for missing environment variables

2. **Runtime Errors**:
   - Check logs for detailed error messages
   - Verify Google Sheets API setup
   - Test API endpoints manually

3. **CORS Issues**:
   - Verify CORS_ORIGIN is set correctly
   - Check frontend API URL configuration
   - Test with browser developer tools

### Debug Commands:

```bash
# Check environment variables
echo $GOOGLE_SHEET_ID
echo $API_KEY

# Test API locally
curl -H "x-api-key: your-api-key" http://localhost:3001/health

# Check Google Sheets access
curl -H "x-api-key: your-api-key" http://localhost:3001/api/dishes
```

## Post-Deployment Checklist

- [ ] Test all API endpoints
- [ ] Verify Google Sheets integration
- [ ] Check CORS configuration
- [ ] Test frontend functionality
- [ ] Monitor error logs
- [ ] Set up monitoring alerts
- [ ] Document deployment process
- [ ] Create backup strategy
