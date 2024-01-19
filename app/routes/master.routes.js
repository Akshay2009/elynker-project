const { authJwt } = require("../middleware");
const masterController = require("../controllers/master.controller");

<<<<<<< HEAD
module.exports = function(app) {
  app.use(function(req, res, next) {
=======
module.exports = function (app) {
  app.use(function (req, res, next) {
>>>>>>> b76e6b50dbf4f9ca8424f6055fcdae9d28e65cd4
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

<<<<<<< HEAD
  //city master data handling-----------------------------

  app.post("/api/citymaster/",
    // [authJwt.verifyToken],
    masterController.saveCityMaster
  );

  app.get("/api/citymaster/",
  // [authJwt.verifyToken],
  masterController.getAllCityMasters
);
app.get("/api/citymaster/:id",
// [authJwt.verifyToken],
masterController.getCityMasters
);
//updating citymaster --
app.put("/api/citymaster/:id",
// [authJwt.verifyToken],
masterController.updateCityMasterById
);
//currency master data handling------------------------------
app.get("/api/citymaster/",
// [authJwt.verifyToken],
masterController.getAllcurrencyMaster
);


}
=======
  //city master data handling------------------------------------

  app.post(
    "/api/citymaster/",
    // [authJwt.verifyToken],
    masterController.saveCityMaster
  );
  //getting city master-----------------------------------------

  app.get(
    "/api/citymaster/",
    // [authJwt.verifyToken],
    masterController.getAllCityMasters
  );

  //getting city master by id ----------------------------------------

  app.get(
    "/api/citymaster/:id",
    // [authJwt.verifyToken],
    masterController.getCityMasters
  );

  //updating citymaster ---------------------------------
  app.put(
    "/api/citymaster/:id",
    // [authJwt.verifyToken],
    masterController.updateCityMasterById
  );
  //currency master data handling------------------------------
  app.get(
    "/api/currencymaster/",
    // [authJwt.verifyToken],
    masterController.getAllcurrencyMaster
  );

  //save currency master details-----------------------
  app.post(
    "/api/currencymaster/",
    // [authJwt.verifyToken],
    masterController.createCurrencyMaster
  );

  //updating currency master details--------------------------

  app.put(
    "/api/currencymaster/:id",
    // [authJwt.verifyToken],
    masterController.updateCurrencyMasterById
  );

  //saving state master route-------------------------------

  app.post(
    "/api/statemaster/",
    // [authJwt.verifyToken],
    masterController.createStateMaster
  );

  //getting all state masters-----------------------------------
  app.get(
    "/api/statemaster/",
    // [authJwt.verifyToken],
    masterController.getAllStateMaster
  );

  //updating state masters---------------------------------------
  app.put(
    "/api/statemaster/:id",
    // [authJwt.verifyToken],
    masterController.updateStateMaster
  );
  //saving RegistrationTypeMaster------------------------
  app.get(
    "/api/RegistrationTypeMaster/",
    // [authJwt.verifyToken],
    masterController.saveRegistrationTypeMaster
  );
};
>>>>>>> b76e6b50dbf4f9ca8424f6055fcdae9d28e65cd4
