const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "mini blog API",
      version: "0.0.1",
      description: "The mini blog API",
    },
    servers: [{ url: "http://localhost:3000", description: "localhost" }],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
