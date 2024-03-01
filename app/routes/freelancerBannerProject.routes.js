const { authJwt } = require('../middleware');

const {
  uploadBannerImage,
  handleMulterError,
} = require('../uploadUtils');


const freelancerBannerProjectController = require('../controllers/freelancerBannerProjects.controller');


module.exports = function(app) {
  /* End Point to  create a UserBanner Record
        POST - /api/user/banners/:registrationId
        usersBannersController.createUsersBanner - Controller function to Create Records UsersBanner Table with provided registrationId
    */
  app.post('/api/user/banners/:registrationId',
      [authJwt.verifyToken],
      uploadBannerImage.fields([
        { name: 'images' },
      ]),
      handleMulterError, freelancerBannerProjectController.createUsersBanner,
  );

  /* End Point to  update UsersBanner
        PUT - /api/user/banners/:userBannerId
        usersBannersController.updateUsersBanner - Controller function to update Record only banner_name and banner_image
    */
  app.put('/api/user/banners/:userBannerId',
      [authJwt.verifyToken],
      uploadBannerImage.fields([
        { name: 'images' },
      ]),
      handleMulterError, freelancerBannerProjectController.updateUsersBanner,
  );

  /* End Point to  get UsersBanner record based on userBannerId
        GET - /api/user/banner/:userBannerId
        usersBannersController.getUsersBannerById - Controller function to get UsersBanner record based on userBannerId
    */
  app.get('/api/user/banner/:userBannerId',
      [authJwt.verifyToken],
      freelancerBannerProjectController.getUsersBannerById,
  );


  /* End Point to  get UsersBanner record based on registrationId
        GET - /api/user/banners/:registrationId
        usersBannersController.getUsersBannerByRegistrationId - Controller function to get all UsersBanner record based on registrationId
    */
  app.get('/api/user/banners/:registrationId',
      [authJwt.verifyToken],
      freelancerBannerProjectController.getUsersBannerByRegistrationId,
  );

  /* End Point to  delete a UsersBanners Record
        DELETE  - /api/user/banner/:userBannerId
        usersBannersController.deleteUsersBanner - Controller function to delete UsersBanner Record based on userBannerId
    */
  app.delete('/api/user/banner/:userBannerId',
      [authJwt.verifyToken],
      freelancerBannerProjectController.deleteUsersBanner,
  );

  /**
   * Search user banner details by fieldName and  fieldValue from the database.
  */
  app.get('/api/user/banners/search/:fieldName/:fieldValue',
      [authJwt.verifyToken],
      freelancerBannerProjectController.search,
  );

  /**
    * Get all user banner details from the database.
    *
    */
  app.get('/api/user/banners',
      [authJwt.verifyToken],
      freelancerBannerProjectController.getAll,
  );
};
