const localDatabase = require('../../server/services/localDatabase');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { method, query, body } = req;

    switch (method) {
      case 'GET':
        const { search, dishType } = query;
        let dishes;

        if (search) {
          dishes = await localDatabase.searchDishes(search);
        } else if (dishType) {
          dishes = await localDatabase.filterByDishType(dishType);
        } else {
          dishes = await localDatabase.getAllDishes();
        }

        res.status(200).json({
          success: true,
          data: dishes,
          count: dishes.length
        });
        break;

      case 'POST':
        const newDish = await localDatabase.addDish(body);
        res.status(201).json({
          success: true,
          message: 'Dish added successfully',
          data: body,
          result: newDish
        });
        break;

      default:
        res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
};
