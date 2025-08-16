# Troubleshooting Vercel Deployment

## Issue: "Failed to fetch dishes" Error

### Root Cause
The app is deployed on Vercel but the API routes aren't properly configured for the serverless environment.

### Solutions Applied

1. **Created `vercel.json`** - Proper configuration for serverless functions
2. **Updated API base URL** - Fixed the client to use correct API endpoints
3. **Added debugging** - Console logs to track API calls
4. **Created test endpoint** - `/api/test` to verify API functionality

### Steps to Fix

1. **Redeploy with fixes**:
   ```bash
   ./redeploy-vercel.sh
   ```

2. **Test the API**:
   - Visit: `https://your-app.vercel.app/api/test`
   - Should return: `{"success": true, "message": "API is working!"}`

3. **Check Vercel logs**:
   - Go to Vercel dashboard
   - Click on your project
   - Go to "Functions" tab
   - Check for any errors

### Common Issues

#### 1. API Routes Not Found
- **Symptom**: 404 errors for API calls
- **Solution**: Ensure `vercel.json` has correct routing

#### 2. CORS Errors
- **Symptom**: Browser console shows CORS errors
- **Solution**: API routes already have CORS headers configured

#### 3. Build Failures
- **Symptom**: Deployment fails during build
- **Solution**: Check that all dependencies are in `package.json`

### Debugging Steps

1. **Test API directly**:
   ```bash
   curl https://your-app.vercel.app/api/test
   ```

2. **Check browser console**:
   - Open Developer Tools
   - Look for network errors
   - Check console logs

3. **Verify environment**:
   - Ensure `NODE_ENV=production` is set
   - Check that API base URL is correct

### Expected Behavior After Fix

✅ API calls work without errors  
✅ Dishes load properly  
✅ Search and filter functionality works  
✅ Add dish functionality works  

### If Issues Persist

1. **Check Vercel Function Logs**:
   - Go to Vercel dashboard
   - Functions tab
   - Look for error messages

2. **Verify File Structure**:
   ```
   api/
   ├── dishes/
   │   ├── index.js
   │   ├── [vegetable].js
   │   └── search/
   │       └── [term].js
   ├── vegetables/
   │   └── index.js
   ├── dish-types/
   │   └── index.js
   └── test.js
   ```

3. **Test Locally First**:
   ```bash
   npm run dev
   ```
   - Verify local development works
   - Then deploy to Vercel
