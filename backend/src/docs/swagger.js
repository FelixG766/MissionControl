import swaggerJsDoc from 'swagger-jsdoc';
import TaskSwaggerSchema from './schemas/taskSchema.js';
import UserSwaggerSchema from './schemas/userSchema.js';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation for the project',
        },
        components: {
            schemas: {
                Task: TaskSwaggerSchema,
                User: UserSwaggerSchema
            },
        },
        servers: [
            {
                url: 'http://localhost:8000/api/v1',
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
