const dishes = require('../data/dishes');

class LocalDatabaseService {
  constructor() {
    this.dishes = [...dishes]; // Create a copy to allow modifications
  }

  async getAllDishes() {
    return this.dishes;
  }

  async getDishesByVegetable(vegetable) {
    return this.dishes.filter(dish => 
      dish.Vegetable.toLowerCase() === vegetable.toLowerCase()
    );
  }

  async addDish(dishData) {
    const newDish = {
      id: this.dishes.length + 1,
      ...dishData
    };
    this.dishes.push(newDish);
    return newDish;
  }

  async searchDishes(searchTerm) {
    const term = searchTerm.toLowerCase();
    return this.dishes.filter(dish => 
      dish.Dish.toLowerCase().includes(term) ||
      dish.Vegetable.toLowerCase().includes(term) ||
      dish['Dish Type'].toLowerCase().includes(term)
    );
  }

  async filterByDishType(dishType) {
    return this.dishes.filter(dish => 
      dish['Dish Type'].toLowerCase() === dishType.toLowerCase()
    );
  }

  async getUniqueVegetables() {
    const vegetables = this.dishes.map(dish => dish.Vegetable);
    return [...new Set(vegetables)].sort();
  }

  async getUniqueDishTypes() {
    const dishTypes = this.dishes.map(dish => dish['Dish Type']);
    return [...new Set(dishTypes)].sort();
  }

  // Method to reset to original data (useful for testing)
  async resetToOriginal() {
    this.dishes = [...dishes];
  }

  // Method to get statistics
  async getStats() {
    return {
      totalDishes: this.dishes.length,
      uniqueVegetables: (await this.getUniqueVegetables()).length,
      uniqueDishTypes: (await this.getUniqueDishTypes()).length,
      dishesByType: this.dishes.reduce((acc, dish) => {
        acc[dish['Dish Type']] = (acc[dish['Dish Type']] || 0) + 1;
        return acc;
      }, {}),
      dishesByVegetable: this.dishes.reduce((acc, dish) => {
        acc[dish.Vegetable] = (acc[dish.Vegetable] || 0) + 1;
        return acc;
      }, {})
    };
  }
}

module.exports = new LocalDatabaseService();
