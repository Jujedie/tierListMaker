import { Express } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  // Chemin où se trouvent les fichiers avec les annotations Swagger
  apis: ['./src/routes/*.ts'], // Chemin vers les fichiers .ts de tes routes
  definition: {
    components: {
      securitySchemes: {
        BearerAuth: {
          bearerFormat: 'JWT',
          scheme: 'bearer',
          type: 'http',
        },
      },
    },
    info: {
      description: 'API documentation for our TierList service',
      title: 'API Documentation',
      version: '1.0.0',
    },
    openapi: '3.0.0',
    security: [
      {
        BearerAuth: [],
      },
    ],
    servers: [
      {
        url: 'http://localhost:5000/',
      },
    ],
  },
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const swaggerDocs = (app: Express): void => {
  app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec as Record<string, unknown>)
  );
};

export default swaggerDocs;
