const { authJwt } = require("../middleware");
const socialmedia_masterController = require("../controllers/master.controller");
const {
    uploadSocialImage,
    handleMulterError,
  } = require("../uploadUtils");

module.exports = function (app) {

    app.post(
        "/api/socialmediamaster",
        [authJwt.verifyToken],
        uploadSocialImage.fields([{ name: "image" }]),
        handleMulterError,
        socialmedia_masterController.saveSocialMedia
    );

    app.put(
        "/api/socialmediamaster/:socialMediaMasterId",
        [authJwt.verifyToken],
        uploadSocialImage.fields([{ name: "image" }]),
        handleMulterError,
        socialmedia_masterController.updateSocialMedia
    );

    app.get(
        "/api/socialmediamaster/:socialMediaMasterId",
        [authJwt.verifyToken],
        socialmedia_masterController.getSocialMediaById
    );

    app.delete(
        "/api/socialmediamaster/:socialMediaMasterId",
        [authJwt.verifyToken],
        socialmedia_masterController.delSocialMediaMaster
    );
}
