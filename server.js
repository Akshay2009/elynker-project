const express = require("express");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swagger-routes/swagger");  // Adjust the path based on your project structure
const initializeRoutes = require("./app/routes/routeInitializer")
const bodyParser = require('body-parser')
require('dotenv').config();
require('express-async-errors');
const logErrorToFile = require('./app/logger');

const app = express();
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: false,
    optionsSuccessStatus: 204,
  })
);

/**
   * Middleware to handle CORS headers for allowing specific headers in the request.
    */
app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//Initialized app to models
initializeRoutes(app);
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Nodejs application." });
});

//Swagger options
const specs = swaggerJsdoc(swaggerOptions);
app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(specs));


//Error handling
app.use((err, req, res, next) => {

    // Extracting controller and function names from the error stack
    const stack = err.stack.split('\n').slice(1);
    console.log("stack",stack)
    logErrorToFile.logErrorToFile(err);
  if (err.message === 'access denied') {
    res.status(403);
    res.json({ error: err.message });
  }else if (err.message!="") {
    res.status(500);
    res.json({ error: err.message });
  }


  next(err);
});


// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
}); 

