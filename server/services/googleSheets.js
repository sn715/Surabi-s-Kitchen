const { google } = require('googleapis');
const path = require('path');

class GoogleSheetsService {
  constructor() {
    this.sheets = google.sheets({ version: 'v4' });
    this.sheetId = process.env.GOOGLE_SHEET_ID;
    this.auth = null;
    this.initAuth();
  }

  async initAuth() {
    try {
      const auth = new google.auth.GoogleAuth({
        keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
      this.auth = await auth.getClient();
    } catch (error) {
      console.error('Error initializing Google Auth:', error);
      throw error;
    }
  }

  async readSheet(range = 'A:C') {
    try {
      if (!this.auth) {
        await this.initAuth();
      }

      const response = await this.sheets.spreadsheets.values.get({
        auth: this.auth,
        spreadsheetId: this.sheetId,
        range: range,
      });

      const rows = response.data.values;
      if (!rows || rows.length === 0) {
        return [];
      }

      // Skip header row and convert to objects
      const headers = rows[0];
      const data = rows.slice(1).map((row, index) => {
        const obj = {};
        headers.forEach((header, i) => {
          obj[header] = row[i] || '';
        });
        obj.id = index + 1; // Add row ID
        return obj;
      });

      return data;
    } catch (error) {
      console.error('Error reading sheet:', error);
      throw error;
    }
  }

  async appendRow(dishData) {
    try {
      if (!this.auth) {
        await this.initAuth();
      }

      const values = [
        [
          dishData.Dish,
          dishData.Vegetable,
          dishData['Dish Type']
        ]
      ];

      const response = await this.sheets.spreadsheets.values.append({
        auth: this.auth,
        spreadsheetId: this.sheetId,
        range: 'A:C',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
          values: values,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error appending row:', error);
      throw error;
    }
  }

  async getUniqueValues(columnIndex) {
    try {
      const data = await this.readSheet();
      const values = data.map(row => {
        const keys = Object.keys(row);
        return row[keys[columnIndex]];
      }).filter(Boolean);
      
      return [...new Set(values)].sort();
    } catch (error) {
      console.error('Error getting unique values:', error);
      throw error;
    }
  }

  async getDishesByVegetable(vegetable) {
    try {
      const data = await this.readSheet();
      return data.filter(dish => 
        dish.Vegetable.toLowerCase() === vegetable.toLowerCase()
      );
    } catch (error) {
      console.error('Error getting dishes by vegetable:', error);
      throw error;
    }
  }

  async searchDishes(searchTerm) {
    try {
      const data = await this.readSheet();
      const term = searchTerm.toLowerCase();
      return data.filter(dish => 
        dish.Dish.toLowerCase().includes(term) ||
        dish.Vegetable.toLowerCase().includes(term) ||
        dish['Dish Type'].toLowerCase().includes(term)
      );
    } catch (error) {
      console.error('Error searching dishes:', error);
      throw error;
    }
  }

  async filterByDishType(dishType) {
    try {
      const data = await this.readSheet();
      return data.filter(dish => 
        dish['Dish Type'].toLowerCase() === dishType.toLowerCase()
      );
    } catch (error) {
      console.error('Error filtering by dish type:', error);
      throw error;
    }
  }
}

module.exports = new GoogleSheetsService();
