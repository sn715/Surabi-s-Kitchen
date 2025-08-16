const Joi = require('joi');

const apiKeySchema = Joi.object({
  'x-api-key': Joi.string().required()
});

const validateApiKey = async (request, reply) => {
  try {
    const apiKey = request.headers['x-api-key'];
    
    if (!apiKey) {
      return reply.code(401).send({
        error: 'API key is required',
        message: 'Please provide an API key in the x-api-key header'
      });
    }

    if (apiKey !== process.env.API_KEY) {
      return reply.code(401).send({
        error: 'Invalid API key',
        message: 'The provided API key is not valid'
      });
    }

    return;
  } catch (error) {
    return reply.code(500).send({
      error: 'Authentication error',
      message: 'An error occurred during authentication'
    });
  }
};

module.exports = validateApiKey;
