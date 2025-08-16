# Vegetable Dishes Web App

A full-stack web application that allows users to browse and add vegetable-based dishes using Google Sheets as a backend database.

## Features

- 🥬 Browse dishes by vegetable selection
- ➕ Add new dishes through a form
- 🔍 Search dishes by name
- 🏷️ Filter by dish type (Breakfast, Dry Curry, Wet Curry, Mixed Rice, Dal, etc.)
- 📊 Local database with 50+ pre-loaded dishes

## Tech Stack

- **Frontend**: React.js with modern hooks
- **Backend**: Node.js with Fastify
- **Database**: Local JSON database
- **Styling**: CSS with modern design

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Setup Instructions

### Quick Start (Local Development)

1. **Run the start script**:
   ```bash
   ./start-local.sh
   ```

This will automatically:
- Install all dependencies
- Create environment files
- Start both frontend and backend servers

### Manual Setup

1. **Install dependencies**:
   ```bash
   npm run install-all
   ```

2. **Start the application**:
   ```bash
   npm run dev
   ```

The app will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Deployment

### Deploy to Vercel (Recommended)

1. **Quick Deploy**:
   ```bash
   ./deploy.sh
   ```

2. **Manual Deploy**:
   ```bash
   npx vercel --prod
   ```

3. **Via Vercel Dashboard**:
   - Push your code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Deploy automatically

For detailed deployment instructions, see [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md).

## API Endpoints

- `GET /api/dishes` - Get all dishes
- `GET /api/dishes/:vegetable` - Get dishes by vegetable
- `POST /api/dishes` - Add new dish
- `GET /api/vegetables` - Get unique vegetables list
- `GET /api/dish-types` - Get unique dish types

## Deployment

### Option 1: Render (Recommended)

1. **Backend Deployment**:
   - Connect your GitHub repo to Render
   - Set build command: `cd server && npm install`
   - Set start command: `cd server && npm start`
   - Add environment variables in Render dashboard

2. **Frontend Deployment**:
   - Build the React app: `npm run build`
   - Deploy the `client/build` folder to Netlify/Vercel
   - Update API base URL in frontend

### Option 2: Railway

1. Deploy both frontend and backend to Railway
2. Set environment variables in Railway dashboard
3. Configure custom domains if needed

### Option 3: Vercel (Serverless)

1. Deploy backend as Vercel serverless functions
2. Deploy frontend to Vercel
3. Configure environment variables

## Environment Variables

Create a `.env` file in the server directory:

```env
GOOGLE_SHEET_ID=your_sheet_id_here
API_KEY=your_api_key_here
GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json
PORT=3001
NODE_ENV=development
```

## Project Structure

```
vegetable-dishes-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
├── server/                 # Node.js backend
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   ├── index.js
│   └── package.json
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for your own purposes!
