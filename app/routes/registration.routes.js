const multer = require("multer");
const path = require("path");
const COMPANY_LOGO_PATH = path.join("/uploads/company/company_logo");

let storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, path.join(__dirname, "..", COMPANY_LOGO_PATH));
  },
  filename: function (req, res, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 100);
    cb(null, "logo" + "-" + uniqueSuffix);
  },
});

const { authJwt } = require("../middleware");
const registrationController = require("../controllers/registration.controller");

module.exports = function (app) {

  app.put(
    "/api/update/company/:id", //here id is of Registration Table to update the company logo
    [authJwt.verifyToken, multer({ storage }).single("company_logo")],
    registrationController.updateCompanyLogo
  );

  app.get(
    "/api/business/:reg_id",
    [authJwt.verifyToken],
    registrationController.getBusinessDetail
  );

  app.post(
    "/api/business/:reg_id", // here reg_id is the id of Registration Table
    [authJwt.verifyToken],
    registrationController.saveBusinessDetail
  );
  app.put(
    "/api/business/:id", // here id is of BusinessDetail table
    [authJwt.verifyToken],
    registrationController.updateBusinessDetail
  );
};
