#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Vegetable Dishes App Setup');
console.log('=======================================\n');

// Check if .env files exist
console.log('📁 Checking environment files...');

const serverEnvPath = path.join(__dirname, 'server', '.env');
const clientEnvPath = path.join(__dirname, 'client', '.env');
const serviceAccountPath = path.join(__dirname, 'server', 'service-account-key.json');

let allGood = true;

if (!fs.existsSync(serverEnvPath)) {
  console.log('❌ server/.env file not found');
  console.log('   Create it with:');
  console.log('   GOOGLE_SHEET_ID=your_sheet_id_here');
  console.log('   API_KEY=your_api_key_here');
  console.log('   GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json');
  console.log('   PORT=3001');
  console.log('   NODE_ENV=development');
  console.log('   CORS_ORIGIN=http://localhost:3000\n');
  allGood = false;
} else {
  console.log('✅ server/.env file exists');
}

if (!fs.existsSync(clientEnvPath)) {
  console.log('❌ client/.env file not found');
  console.log('   Create it with:');
  console.log('   REACT_APP_API_KEY=your_api_key_here');
  console.log('   REACT_APP_API_URL=http://localhost:3001\n');
  allGood = false;
} else {
  console.log('✅ client/.env file exists');
}

if (!fs.existsSync(serviceAccountPath)) {
  console.log('❌ server/service-account-key.json not found');
  console.log('   Download from Google Cloud Console and place in server/ directory\n');
  allGood = false;
} else {
  console.log('✅ service-account-key.json exists');
  
  // Try to parse the JSON to verify it's valid
  try {
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    console.log('✅ Service account JSON is valid');
    console.log(`   Service account email: ${serviceAccount.client_email}`);
  } catch (error) {
    console.log('❌ Service account JSON is invalid');
    allGood = false;
  }
}

// Check if node_modules exist
console.log('\n📦 Checking dependencies...');
const serverNodeModules = path.join(__dirname, 'server', 'node_modules');
const clientNodeModules = path.join(__dirname, 'client', 'node_modules');

if (!fs.existsSync(serverNodeModules)) {
  console.log('❌ server/node_modules not found');
  console.log('   Run: npm run install-all');
  allGood = false;
} else {
  console.log('✅ server dependencies installed');
}

if (!fs.existsSync(clientNodeModules)) {
  console.log('❌ client/node_modules not found');
  console.log('   Run: npm run install-all');
  allGood = false;
} else {
  console.log('✅ client dependencies installed');
}

console.log('\n📋 Summary:');
if (allGood) {
  console.log('🎉 All checks passed! You can now run: npm run dev');
} else {
  console.log('⚠️  Some issues found. Please fix them before running the app.');
  console.log('\n📚 For detailed setup instructions, see:');
  console.log('   - SHEET_SETUP_GUIDE.md');
  console.log('   - GOOGLE_SHEETS_SETUP.md');
}

console.log('\n🚀 Next steps:');
console.log('1. Fix any issues above');
console.log('2. Run: npm run dev');
console.log('3. Open: http://localhost:3000');
console.log('4. Test adding a dish to verify Google Sheets integration');
