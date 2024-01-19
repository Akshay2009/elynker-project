const { authJwt } = require("../middleware");
const masterController = require("../controllers/master.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //city master data handling------------------------------------

  app.post(
    "/api/citymaster/",
   [authJwt.verifyToken],
    masterController.saveCityMaster
  );
  //getting city master-----------------------------------------

  app.get(
    "/api/citymaster/",
   [authJwt.verifyToken],
    masterController.getAllCityMasters
  );

  //getting city master by id ----------------------------------------

  app.get(
    "/api/citymaster/:id",
   [authJwt.verifyToken],
    masterController.getCityMasters
  );

  //updating citymaster ---------------------------------
  app.put(
    "/api/citymaster/:id",
   [authJwt.verifyToken],
    masterController.updateCityMasterById
  );
  //currency master data handling------------------------------
  app.get(
    "/api/currencymaster/",
    [authJwt.verifyToken],
    masterController.getAllcurrencyMaster
  );

  //save currency master details-----------------------
  app.post(
    "/api/currencymaster/",
    [authJwt.verifyToken],
    masterController.createCurrencyMaster
  );

  //updating currency master details--------------------------

  app.put(
    "/api/currencymaster/:id",
     [authJwt.verifyToken],
    masterController.updateCurrencyMasterById
  );

  //saving state master route-------------------------------

  app.post(
    "/api/statemaster/",
     [authJwt.verifyToken],
    masterController.createStateMaster
  );

  //getting all state masters-----------------------------------
  app.get(
    "/api/statemaster/",
     [authJwt.verifyToken],
    masterController.getAllStateMaster
  );

  //updating state masters---------------------------------------
  app.put(
    "/api/statemaster/:id",
    [authJwt.verifyToken],
    masterController.updateStateMaster
  );
  //saving RegistrationTypeMaster------------------------
  app.get(
    "/api/RegistrationTypeMaster/",
     [authJwt.verifyToken],
    masterController.saveRegistrationTypeMaster
  );

//saving registration master---
// app.put(
//   "/api/Registration/:id",
//   // [authJwt.verifyToken],
//   masterController.putRegDetail
// );
};
