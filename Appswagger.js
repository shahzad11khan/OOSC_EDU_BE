const swaggerjsdoc = require('swagger-jsdoc');
const swaggeroptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "OOSC API",
            version: "1.0.0",
            description: "OOSC API documentation",
        },
        servers: [
            {
                url: "https://oosc-edu-be.vercel.app",
                description: "Production server",
            },
            {
                url: "http://localhost:5000",
                description: "Local server",
            }
        ],
        
    },
    
    apis: ["./routes/*.js"],
};
const swaggerSpec = swaggerjsdoc(swaggeroptions);
console.log(swaggerSpec);
module.exports = swaggerSpec;