const fastify = require('fastify')({ logger: true });
require('dotenv').config();

// Register plugins
fastify.register(require('@fastify/cors'), {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
});

fastify.register(require('@fastify/helmet'));

// Import routes
const dishesRoutes = require('./routes/dishes');
const vegetablesRoutes = require('./routes/vegetables');
const dishTypesRoutes = require('./routes/dishTypes');

// Register routes
fastify.register(dishesRoutes, { prefix: '/api/dishes' });
fastify.register(vegetablesRoutes, { prefix: '/api/vegetables' });
fastify.register(dishTypesRoutes, { prefix: '/api/dish-types' });

// Health check endpoint
fastify.get('/health', async (request, reply) => {
  return { status: 'OK', timestamp: new Date().toISOString() };
});

// Start server
const start = async () => {
  try {
    const port = process.env.PORT || 3001;
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`Server running on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
