const localDatabase = require('../server/services/localDatabase');

module.exports = async (req, res) => {
  console.log('Test API called');
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Test database access
    const dishes = await localDatabase.getAllDishes();
    const vegetables = await localDatabase.getUniqueVegetables();
    const dishTypes = await localDatabase.getUniqueDishTypes();
    const stats = await localDatabase.getStats();

    res.status(200).json({
      success: true,
      message: 'API and database are working!',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: {
        totalDishes: dishes.length,
        totalVegetables: vegetables.length,
        totalDishTypes: dishTypes.length,
        stats: stats
      },
      sampleData: {
        firstDish: dishes[0],
        firstVegetable: vegetables[0],
        firstDishType: dishTypes[0]
      }
    });
  } catch (error) {
    console.error('Test API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Test API failed',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
