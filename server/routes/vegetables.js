const localDatabase = require('../services/localDatabase');
const validateApiKey = require('../middleware/auth');

async function routes(fastify, options) {
  // Get all unique vegetables
  fastify.get('/', {
  }, async (request, reply) => {
    try {
      const vegetables = await localDatabase.getUniqueVegetables();

      return {
        success: true,
        data: vegetables,
        count: vegetables.length
      };
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({
        success: false,
        error: 'Failed to fetch vegetables',
        message: error.message
      });
    }
  });
}

module.exports = routes;
