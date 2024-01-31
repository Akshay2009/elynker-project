const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {

  /**
   * Middleware to handle CORS headers for allowing specific headers in the request.
   *
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /**
   * Endpoint for user signup.
   * Validates duplicate username or email and checks if roles exist.
   *
   * @param {String} "/api/auth/signup" - API endpoint path for user signup.
   * @param {Function[]} [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted] - Middleware functions.
   * @param {Function} controller.signup - Controller function to handle user signup.
   */
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkMobileNumberExist,
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  /**
   * Endpoint for user signin.
   *
   * @param {String} "/api/auth/signin" - API endpoint path for user signin.
   * @param {Function} controller.signin - Controller function to handle user signin.
   */
  app.post("/api/auth/signin", controller.signin);
};
