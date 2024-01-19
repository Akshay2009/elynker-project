const cors = require("cors");
const https = require('https');
const fs = require("fs");
const express = require("express"),
  bodyParser = require("body-parser"),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");


  const server = https.createServer({
    key: fs.readFileSync('/etc/ssl/private/server.key'),
    cert: fs.readFileSync('/etc/ssl/certs/server.crt'),
}, app);

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: false,
    optionsSuccessStatus: 204,
  })
);

//app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const path = require("path");
const Role = db.role;

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Database with { alter: true }");
  // initial();
});

//to set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app", "views"));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Nodejs application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/registration.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/master.routes")(app);

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
        url: "http://14.140.202.210:3000",
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

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));


// set port, listen for requests
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}