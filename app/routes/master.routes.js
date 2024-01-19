const { authJwt } = require("../middleware");
const masterController = require("../controllers/master.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

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