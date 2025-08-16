# Google Sheets API Setup Guide

This guide will walk you through setting up Google Sheets API for the Vegetable Dishes app.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" at the top of the page
3. Click "New Project"
4. Enter a project name (e.g., "Vegetable Dishes App")
5. Click "Create"

## Step 2: Enable Google Sheets API

1. In your Google Cloud project, go to "APIs & Services" > "Library"
2. Search for "Google Sheets API"
3. Click on "Google Sheets API"
4. Click "Enable"

## Step 3: Create Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details:
   - **Service account name**: `vegetable-dishes-api`
   - **Service account ID**: Will be auto-generated
   - **Description**: `Service account for Vegetable Dishes app`
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

## Step 4: Generate Service Account Key

1. In the Credentials page, find your service account and click on it
2. Go to the "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose "JSON" format
5. Click "Create"
6. The JSON file will be downloaded automatically

## Step 5: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it "Vegetable Dishes Database"
4. Set up the headers in the first row:
   - **A1**: `Dish`
   - **B1**: `Vegetable`
   - **C1**: `Dish Type`
5. Add some sample data (optional):
   ```
   A2: Aloo Gobi
   B2: Potato
   C2: Dry Curry
   
   A3: Baingan Bharta
   B3: Eggplant
   C3: Wet Curry
   
   A4: Vegetable Biryani
   B4: Mixed Vegetables
   C4: Mixed Rice
   ```

## Step 6: Share Sheet with Service Account

1. In your Google Sheet, click "Share" (top right)
2. Add the service account email (found in the JSON file under `client_email`)
3. Give it "Editor" permissions
4. Click "Send" (you can uncheck "Notify people")

## Step 7: Get Sheet ID

1. From your Google Sheet URL, copy the Sheet ID
2. The URL format is: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`
3. Copy the `{SHEET_ID}` part

## Step 8: Configure Environment Variables

1. Copy the downloaded JSON file to the `server/` directory
2. Rename it to `service-account-key.json`
3. Create a `.env` file in the `server/` directory:

```env
GOOGLE_SHEET_ID=your_sheet_id_here
API_KEY=your_secure_api_key_here
GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

4. For the frontend, create a `.env` file in the `client/` directory:

```env
REACT_APP_API_KEY=your_secure_api_key_here
REACT_APP_API_URL=http://localhost:3001
```

## Step 9: Test the Setup

1. Install dependencies:
   ```bash
   npm run install-all
   ```

2. Start the application:
   ```bash
   npm run dev
   ```

3. Open http://localhost:3000 in your browser
4. Try adding a new dish and verify it appears in your Google Sheet

## Troubleshooting

### Common Issues:

1. **"Invalid API key" error**:
   - Make sure the API_KEY in your .env file matches between frontend and backend
   - Ensure the API key is being sent in the `x-api-key` header

2. **"Google Sheets API not enabled" error**:
   - Go back to Google Cloud Console and ensure Google Sheets API is enabled
   - Check that you're using the correct project

3. **"Permission denied" error**:
   - Verify the service account email has editor access to the Google Sheet
   - Check that the service account JSON file is in the correct location

4. **"Sheet not found" error**:
   - Verify the GOOGLE_SHEET_ID is correct
   - Make sure the sheet is shared with the service account email

### Security Notes:

- Never commit the `service-account-key.json` file to version control
- Use a strong, unique API key for production
- Consider using environment-specific API keys
- Regularly rotate your API keys

## Production Deployment

For production deployment:

1. Set up environment variables on your hosting platform
2. Use a production Google Cloud project
3. Configure CORS origins for your production domain
4. Use HTTPS in production
5. Consider implementing rate limiting
6. Set up monitoring and logging

## Sample Data

Here's some sample data you can add to your Google Sheet to test the application:

| Dish | Vegetable | Dish Type |
|------|-----------|-----------|
| Aloo Gobi | Potato | Dry Curry |
| Baingan Bharta | Eggplant | Wet Curry |
| Vegetable Biryani | Mixed Vegetables | Mixed Rice |
| Palak Paneer | Spinach | Wet Curry |
| Bhindi Masala | Okra | Dry Curry |
| Carrot Halwa | Carrot | Dessert |
| Mushroom Curry | Mushroom | Wet Curry |
| Sweet Potato Fries | Sweet Potato | Snack |
| Cauliflower Rice | Cauliflower | Mixed Rice |
| Broccoli Stir Fry | Broccoli | Dry Curry |
