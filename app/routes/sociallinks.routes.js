const { authJwt } = require("../middleware");
const sociallinksController = require("../controllers/sociallinks.controller");

module.exports = function (app) {
  /* End Point to  create a social link Record
        POST - /api/sociallinks/ API endpoint
        sociallinksController.createSociallinks - Controller function to Create a social links record*/

  app.post(
    "/api/sociallinks/",
    [authJwt.verifyToken],
    sociallinksController.createSociallinks
  );

  
  /* End Point to  get social link Record
        POST - /api/sociallinks/ API endpoint
        sociallinksController.getSociallinks - Controller function to get social links record*/

  app.get(
    "/api/sociallinks/",
    [authJwt.verifyToken],
    sociallinksController.getSociallinks
  );

  /* End Point to  get social link Record by Id
        POST - /api/sociallinks/:social_id API endpoint
        sociallinksController.getSociallinksById- Controller function to get a social links record by social id*/

  app.get(
    "/api/sociallinks/:social_id",
    [authJwt.verifyToken],
    sociallinksController.getSociallinksById
  );


  /* End Point to update a social link Record
        POST - /api/sociallinks/:social_id API endpoint
        sociallinksController.updateSociallinksById - Controller function to update social links record*/
  app.put(
    "/api/sociallinks/:social_id",
    [authJwt.verifyToken],
    sociallinksController.updateSociallinksById
  );
};
