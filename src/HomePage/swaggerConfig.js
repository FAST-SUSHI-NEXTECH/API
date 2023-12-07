const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Fast Sushi API 🍥',
            version: '0.3',
            description: 'API documentation for a Japanese restaurant based in France 🐯',
        },
    },
    apis: ['./src/MenuRequests/*.js', './src/OrderRequests/*.js', './src/UserRequests/*.js', './src/AdminRequests/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;