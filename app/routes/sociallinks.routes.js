const { authJwt } = require("../middleware");
const sociallinksController = require("../controllers/sociallinks.controller");

module.exports = function (app) {


  app.post(
    "/api/sociallinks/",
    //  [authJwt.verifyToken],
    sociallinksController.createSociallinks
  );
  
  
  
  app.get(
      "/api/sociallinks/",
      //  [authJwt.verifyToken],
      sociallinksController.getSociallinks
    );



    app.get(
        "/api/sociallinks/:social_id",
        //  [authJwt.verifyToken],
        sociallinksController.getSociallinksById
      );

      app.put(
        "/api/sociallinks/:social_id",
        //  [authJwt.verifyToken],
        sociallinksController.updateSociallinksById
      );


};
