const Joi = require('joi');
const localDatabase = require('../services/localDatabase');
const validateApiKey = require('../middleware/auth');

const dishSchema = Joi.object({
  Dish: Joi.string().required().min(1).max(100),
  Vegetable: Joi.string().required().min(1).max(50),
  'Dish Type': Joi.string().required().min(1).max(50)
});

async function routes(fastify, options) {
  // Get all dishes
  fastify.get('/', async (request, reply) => {
    try {
      const { search, dishType } = request.query;
      let dishes;

      if (search) {
        dishes = await localDatabase.searchDishes(search);
      } else if (dishType) {
        dishes = await localDatabase.filterByDishType(dishType);
      } else {
        dishes = await localDatabase.getAllDishes();
      }

      return {
        success: true,
        data: dishes,
        count: dishes.length
      };
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({
        success: false,
        error: 'Failed to fetch dishes',
        message: error.message
      });
    }
  });

  // Get dishes by vegetable
  fastify.get('/:vegetable', async (request, reply) => {
    try {
      const { vegetable } = request.params;
      const dishes = await localDatabase.getDishesByVegetable(vegetable);

      return {
        success: true,
        data: dishes,
        count: dishes.length,
        vegetable: vegetable
      };
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({
        success: false,
        error: 'Failed to fetch dishes for vegetable',
        message: error.message
      });
    }
  });

  // Add new dish
  fastify.post('/', async (request, reply) => {
    try {
      const dishData = request.body;
      
      // Validate the dish data
      const { error } = dishSchema.validate(dishData);
      if (error) {
        return reply.code(400).send({
          success: false,
          error: 'Validation error',
          message: error.details[0].message
        });
      }

      // Add the dish to local database
      const result = await localDatabase.addDish(dishData);

      return reply.code(201).send({
        success: true,
        message: 'Dish added successfully',
        data: dishData,
        result: result
      });
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({
        success: false,
        error: 'Failed to add dish',
        message: error.message
      });
    }
  });

  // Search dishes
  fastify.get('/search/:term', async (request, reply) => {
    try {
      const { term } = request.params;
      const dishes = await localDatabase.searchDishes(term);

      return {
        success: true,
        data: dishes,
        count: dishes.length,
        searchTerm: term
      };
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({
        success: false,
        error: 'Failed to search dishes',
        message: error.message
      });
    }
  });
}

module.exports = routes;
