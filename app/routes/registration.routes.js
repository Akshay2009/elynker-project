const multer = require("multer");
const path = require("path");
const COMPANY_LOGO_PATH = path.join("/uploads/company/company_logo");
const COVER_IMAGE_PATH = path.join("/uploads/cover/cover_images");

// Multer storage configuration for handling company logo uploads
let storageCompanyLogo = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', COMPANY_LOGO_PATH));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

let storageCoverImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', COVER_IMAGE_PATH));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const fileFilterImage = function (req, file, cb) {
  try {
    const allowedFileTypes = /jpeg|jpg|png/;
    const mimetype = allowedFileTypes.test(file.mimetype);
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }

    const error = new Error('Only JPEG, JPG, and PNG files are allowed!');
    error.status = 400; // Set the status code for the error

    cb(error);
  } catch (err) {
    console.log('error in fileFilter function', err.message);
  }
};
const uploadCoverImages = multer({
  storage: storageCoverImage,
  fileFilter: fileFilterImage,
  limits: {
    fileSize: 1024 * 1024 //1MB
  }
});
const uploadCompanyLogo = multer({
  storage: storageCompanyLogo,
  fileFilter: fileFilterImage,
  limits: {
    fileSize: 1024 * 1024 //1MB
  }
});
const handleMulterError = function (err, req, res, next) {
  if (err) {
    console.error('Multer error:', err.message);
    res.status(err.status || 500).json({ error: err.message });
  } else {
    next();
  }
};

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
    [authJwt.verifyToken],
    uploadCompanyLogo.fields([
      { name: 'images' },
    ]),
    handleMulterError,registrationController.updateCompanyLogo
  );
  /**
   * Endpoint to update the cover Image.
   * Requires authentication and uses multer for handling file uploads.
   *
   * @param {String} '/api/update/coverImage/:registrationId' - API endpoint path.
   * @param {Function[]} [authJwt.verifyToken, multer({ storage }).single("company_logo")] - Middleware functions.
   * @param {Function} registrationController.updateCoverImage - Controller function to handle the update.
   */
  app.put('/api/update/coverImage/:registrationId',
    [authJwt.verifyToken],
    uploadCoverImages.fields([
      { name: 'images' },
    ]),
    handleMulterError, registrationController.updateCoverImage
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

  /**
   * Endpoint to update the Category ids on Registration Model.
   * @param {String} '/api/update/coverImage/:registrationId' - API endpoint path.
   * @param {Function[]} [authJwt.verifyToken,
   * @param {Function} registrationController.updateCategoryIds - Controller function to handle the update.
   */
  app.put('/api/update/categoryIds/:registrationId',
    [authJwt.verifyToken],
    registrationController.updateCategoryIds
  );
};
