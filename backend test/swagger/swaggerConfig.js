const swaggerJsdoc = require("swagger-jsdoc");

const swagerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API DOCUMENTATION",
    },
  },
  apis: ["./router/*.js"],
};

const swaggerSpec = swaggerJsdoc(swagerOptions);

module.exports = swaggerSpec;
