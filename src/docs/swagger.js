const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API Estacionamento',
        version: '1.0.0',
        description: 'Documentação da API'
    },
    servers: [
        {
            url: 'http://localhost:3001'
        }
    ]
};

const options = {
    swaggerDefinition,
    apis: ['./src/route/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
    swaggerUi,
    swaggerSpec
};