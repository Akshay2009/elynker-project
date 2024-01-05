const cors = require("cors");
const express = require("express"),
  bodyParser = require("body-parser"),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");

const app = express();

var corsOptions = {
  origin: "http://172.20.2.38:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  //initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Nodejs application." });
});


// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

//Swagger options
const options = {
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
        url: "http://172.20.2.38:3000",
      },
    ],
  },
  apis: ["./swagger-routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user"
//   });
 
//   Role.create({
//     id: 2,
//     name: "moderator"
//   });
 
//   Role.create({
//     id: 3,
//     name: "admin"
//   });
// }