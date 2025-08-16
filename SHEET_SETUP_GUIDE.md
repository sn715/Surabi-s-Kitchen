# Linking Your Existing Google Sheet

## Step 1: Verify Your Sheet Structure

Your Google Sheet should have these columns in the first row:
- **A1**: `Dish`
- **B1**: `Vegetable` 
- **C1**: `Dish Type`

If your sheet has different column names or structure, you'll need to either:
1. Rename your columns to match this structure, OR
2. Modify the code to match your existing structure

## Step 2: Get Your Sheet ID

1. Open your Google Sheet in the browser
2. Look at the URL: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`
3. Copy the `{SHEET_ID}` part (it's a long string of letters and numbers)

## Step 3: Set Up Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

## Step 4: Create Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in:
   - **Name**: `vegetable-dishes-api`
   - **Description**: `Service account for Vegetable Dishes app`
4. Click "Create and Continue"
5. Skip optional steps, click "Done"

## Step 5: Generate Service Account Key

1. Click on your service account name
2. Go to "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose "JSON" format
5. Click "Create"
6. Download the JSON file

## Step 6: Share Your Sheet

1. In your Google Sheet, click "Share" (top right)
2. Add the service account email (found in the JSON file under `client_email`)
3. Give it "Editor" permissions
4. Click "Send" (uncheck "Notify people")

## Step 7: Configure Environment Variables

1. Copy the downloaded JSON file to the `server/` directory
2. Rename it to `service-account-key.json`
3. Create `server/.env` file:

```env
GOOGLE_SHEET_ID=your_sheet_id_here
API_KEY=your_secure_api_key_here
GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

4. Create `client/.env` file:

```env
REACT_APP_API_KEY=your_secure_api_key_here
REACT_APP_API_URL=http://localhost:3001
```

## Step 8: Test the Connection

1. Install dependencies: `npm run install-all`
2. Start the app: `npm run dev`
3. Open http://localhost:3000
4. Try adding a new dish and check if it appears in your sheet

## Troubleshooting

### "Sheet not found" error:
- Double-check your Sheet ID
- Make sure the sheet is shared with the service account email

### "Permission denied" error:
- Verify the service account has editor access
- Check that the JSON file is in the correct location

### "Invalid API key" error:
- Ensure the API_KEY matches between frontend and backend
- Check that the key is being sent in the x-api-key header
