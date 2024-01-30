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

  /* End Point to  create a citymaster Record
        POST - /api/citymaster/ API endpoint
        masterController.saveCityMaster - Controller function to Create a citymasters record
    */

  app.post(
    "/api/citymaster/",
    [authJwt.verifyToken],
    masterController.saveCityMaster
  );
  /* End Point to  Delete a citymaster Record by id
        DELETE - /api/citymaster/:id API endpoint
        masterController.delCityMaster - Controller function to DELETE a citymasters record Id
    */
  app.delete(
    "/api/citymaster/:id",
    [authJwt.verifyToken],
    masterController.delCityMaster
  );
  /* End Point to  GET citymaster Record
        GET - /api/citymaster/ API endpoint
        masterController.getAllCityMasters - Controller function to GET citymasters record
    */

  app.get(
    "/api/citymaster/",
    [authJwt.verifyToken],
    masterController.getAllCityMasters
  );

  /* End Point to  GET citymaster Record BYid
        GET - /api/citymaster/:id API endpoint
        masterController.getCityMasters- Controller function to GET citymasters record BYID
    */

  app.get(
    "/api/citymaster/:id",
    [authJwt.verifyToken],
    masterController.getCityMasters
  );
  /* End Point to UPDATE citymaster Record BYid
        PUT- /api/citymaster/:id API endpoint
         masterController.updateCityMasterById - Controller function to UPDATE citymasters record BYID
    */
  app.put(
    "/api/citymaster/:id",
    [authJwt.verifyToken],
    masterController.updateCityMasterById
  );
  /* End Point to  GET Currency master Record
        GET- /api/currencymaster/ API endpoint
         masterController.getAllcurrencyMaster - Controller function to get currencymaster record
    */
  app.get(
    "/api/currencymaster/",
    [authJwt.verifyToken],
    masterController.getAllcurrencyMaster
  );

  /* End Point to POST Currency master Record
       POST- /api/currencymaster/ API endpoint
         masterController.createCurrencyMaster - Controller function to save currencymaster record
    */
  app.post(
    "/api/currencymaster/",
    [authJwt.verifyToken],
    masterController.createCurrencyMaster
  );

  /* End Point to UPDATE Currency master Record By Id
       PUT- /api/currencymaster/:id API endpoint
         masterController.updateCurrencyMasterById - Controller function to update currencymaster record by id
    */

  app.put(
    "/api/currencymaster/:id",
    [authJwt.verifyToken],
    masterController.updateCurrencyMasterById
  );

  /* End Point to save StateMaster Record
       POST- /api/StateMaster/ API endpoint
          masterController.createStateMaster - Controller function to save StateMaster record
    */

  app.post(
    "/api/statemaster/",
    [authJwt.verifyToken],
    masterController.createStateMaster
  );
  /* End Point to GET StateMaster Record
       GET- /api/StateMaster/ API endpoint
          masterController.getAllStateMaster - Controller function to GET StateMaster record
    */
  app.get(
    "/api/statemaster/",
    [authJwt.verifyToken],
    masterController.getAllStateMaster
  );

  /* End Point to UPDATE StateMaster Record BY id
       PUT- /api/StateMaster/:id API endpoint
          masterController.updateStateMaster - Controller function to update StateMaster record by id
    */
  app.put(
    "/api/statemaster/:id",
    [authJwt.verifyToken],
    masterController.updateStateMaster
  );
  /* End Point to save RegistrationTypeMaster Record
       POST- /api/RegistrationTypeMaster/ API endpoint
          masterController.saveRegistrationTypeMaster - Controller function to update RegistrationTypeMaster record
    */
  app.post(
    "/api/RegistrationTypeMaster/",
    [authJwt.verifyToken],
    masterController.saveRegistrationTypeMaster
  );

  /* End Point to delete Currency master Record by id
      DELETE- /api/currencymaster/:currency_id API endpoint
          masterController.delCurrencyMaster - Controller function to delete currencymaster record by id
    */
  app.delete(
    "/api/currencymaster/:currency_id",
    [authJwt.verifyToken],
    masterController.delCurrencyMaster
  );
  /* End Point to delete State master Record by id
      DELETE- "/api/statemaster/:id",state_id API endpoint
         masterController.delStateMaster - Controller function to delete State master record by id
    */
  app.delete(
    "/api/statemaster/:state_id",
    [authJwt.verifyToken],
    masterController.delStateMaster
  );
};
