const localDatabase = require('../services/localDatabase');
const validateApiKey = require('../middleware/auth');

async function routes(fastify, options) {
  // Get all unique dish types
  fastify.get('/', {
  }, async (request, reply) => {
    try {
      const dishTypes = await localDatabase.getUniqueDishTypes();

      return {
        success: true,
        data: dishTypes,
        count: dishTypes.length
      };
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({
        success: false,
        error: 'Failed to fetch dish types',
        message: error.message
      });
    }
  });
}

module.exports = routes;
