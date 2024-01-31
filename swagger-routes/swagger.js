// swaggerOptions.js
require('dotenv').config();
const apiRoot = process.env.API_ROOT
const port = process.env.PORT;
module.exports = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Elynker: NodeJs & Express API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Elynker",
          url: "https://Elynker.com",
          email: "info@Elynkeremail.com",
        },
      },
      servers: [
        {
          url: `http://${apiRoot}:${port}`,
        },
      ],
    },
    components: {
      securitySchemes: {
        api_key: {
          type: 'apiKey',
          in: 'header',
          name: 'x-access-token',
        },
      },
    },
    apis: ["./swagger-routes/*.js"],
  };
  