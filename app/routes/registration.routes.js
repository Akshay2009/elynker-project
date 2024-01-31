const multer = require("multer");
const path = require("path");
const COMPANY_LOGO_PATH = path.join("/uploads/company/company_logo");

// Multer storage configuration for handling company logo uploads
let storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, path.join(__dirname, "..", COMPANY_LOGO_PATH));
  },
  filename: function (req, res, cb) {
    // Generate a unique filename for the uploaded logo
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 100);
    cb(null, "logo" + "-" + uniqueSuffix);
  },
});

const { authJwt } = require("../middleware");
const registrationController = require("../controllers/registration.controller");


module.exports = function (app) {

  /**
   * Endpoint to update the company logo.
   * Requires authentication and uses multer for handling file uploads.
   *
   * @param {String} "/api/update/company/:id" - API endpoint path.
   * @param {Function[]} [authJwt.verifyToken, multer({ storage }).single("company_logo")] - Middleware functions.
   * @param {Function} registrationController.updateCompanyLogo - Controller function to handle the update.
   */
  app.put(
    "/api/update/companyLogo/:id",
    [authJwt.verifyToken, multer({ storage }).single("company_logo")],
    registrationController.updateCompanyLogo
  );



  /**
   * Endpoint to get business details by registration ID.
   * Requires authentication.
   *
   * @param {String} "/api/business/:reg_id" - API endpoint path.
   * @param {Function[]} [authJwt.verifyToken] - Middleware functions.
   * @param {Function} registrationController.getBusinessDetail - Controller function to get business details.
   */
  app.get(
    "/api/business/:reg_id",
     [authJwt.verifyToken],
    registrationController.getBusinessDetail
  );


  /**
   * Endpoint to save business details by registration ID.
   * Requires authentication.
   *
   * @param {String} "/api/business/:reg_id" - API endpoint path.
   * @param {Function[]} [authJwt.verifyToken] - Middleware functions.
   * @param {Function} registrationController.saveBusinessDetail - Controller function to save business details.
   */
  app.post(
    "/api/business/:reg_id",
     [authJwt.verifyToken],
    registrationController.saveBusinessDetail
  );
  //post registration details--
  /**
   * Endpoint to update Registration Record.
   * Requires authentication.
   *
   * @param {String} "/api/registration/:reg_id" - API endpoint path.
   * @param {Function[]} [authJwt.verifyToken] - Middleware functions.
   * @param {Function} registrationController.putRegDetail - Controller function to save Registration Record.
   */
  app.put(
    "/api/registration/:reg_id",
    [authJwt.verifyToken],
    registrationController.putRegDetail
  );
};
