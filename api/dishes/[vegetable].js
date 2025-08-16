const localDatabase = require('../../server/services/localDatabase');

module.exports = async (req, res) => {
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
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { vegetable } = req.query;
    const dishes = await localDatabase.getDishesByVegetable(vegetable);

    res.status(200).json({
      success: true,
      data: dishes,
      count: dishes.length,
      vegetable: vegetable
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dishes for vegetable',
      message: error.message
    });
  }
};
