const {
  uploadCoverImages,
  uploadCompanyLogo,
  handleMulterError,
} = require('../uploadUtils');

const { authJwt } = require('../middleware');
const registrationController = require('../controllers/registration.controller');

module.exports = function(app) {
  /**
   * Endpoint to update the company logo.
   * Requires authentication and uses multer for handling file uploads.
   *
   * @param {String} "/api/update/company/:id" - API endpoint path.
   * @param {Function[]} [authJwt.verifyToken, multer({ storage }).single("company_logo")] - Middleware functions.
   * @param {Function} registrationController.updateCompanyLogo - Controller function to handle the update.
   */
  app.put(
      '/api/update/companyLogo/:id',
      [authJwt.verifyToken],
      uploadCompanyLogo.fields([{ name: 'images' }]),
      handleMulterError,
      registrationController.updateCompanyLogo,
  );
  /**
   * Endpoint to update the cover Image.
   * Requires authentication and uses multer for handling file uploads.
   *
   * @param {String} '/api/update/coverImage/:registrationId' - API endpoint path.
   * @param {Function[]} [authJwt.verifyToken, multer({ storage }).single("company_logo")] - Middleware functions.
   * @param {Function} registrationController.updateCoverImage - Controller function to handle the update.
   */
  app.put(
      '/api/update/coverImage/:registrationId',
      [authJwt.verifyToken],
      uploadCoverImages.fields([{ name: 'images' }]),
      handleMulterError,
      registrationController.updateCoverImage,
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
      '/api/business/:reg_id',
      [authJwt.verifyToken],
      registrationController.getBusinessDetail,
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
      '/api/business/:reg_id',
      [authJwt.verifyToken],
      registrationController.saveBusinessDetail,
  );
  // post registration details--
  /**
   * Endpoint to update Registration Record.
   * Requires authentication.
   *
   * @param {String} "/api/registration/:reg_id" - API endpoint path.
   * @param {Function[]} [authJwt.verifyToken] - Middleware functions.
   * @param {Function} registrationController.putRegDetail - Controller function to save Registration Record.
   */
  app.put(
      '/api/registration/:reg_id',
      [authJwt.verifyToken],
      registrationController.putRegDetail,
  );

  /**
   * Endpoint to update the Category ids on Registration Model.
   * @param {String} '/api/update/coverImage/:registrationId' - API endpoint path.
   * @param {Function[]} [authJwt.verifyToken,
   * @param {Function} registrationController.updateCategoryIds - Controller function to handle the update.
   */
  app.put(
      '/api/update/categoryIds/:registrationId',
      [authJwt.verifyToken],
      registrationController.updateCategoryIds,
  );


  /**
   * Endpoint to Get registration details as per user id passed in params:
   * @param {String} '/api/registration/:user_id' - API endpoint path.
   * @param {Function[]} [authJwt.verifyToken,
   * @param {Function} registrationController.getRegById -getRegById Controller function to handle get request.
   */
  app.get('/api/registration/:user_id',
      [authJwt.verifyToken],
      registrationController.getRegById,
  );


  /**
   * Search Registration details by fieldName and  fieldValue from the database.
  */
  app.get('/api/registration/search/:fieldName/:fieldValue',
      [authJwt.verifyToken],
      registrationController.search,
  );

  /**
   * Get all Registration details from the database.
   *
   */
  app.get('/api/registration',
      [authJwt.verifyToken],
      registrationController.getAll,
  );

  /**
   * Search Business details by fieldName and  fieldValue from the database.
  */
  app.get('/api/business/search/:fieldName/:fieldValue',
      [authJwt.verifyToken],
      registrationController.searchBusiness,
  );
};
