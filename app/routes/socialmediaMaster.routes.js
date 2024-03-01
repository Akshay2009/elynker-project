const { authJwt } = require('../middleware');
const socialMediaMaster = require('../controllers/master.controller');
const {
  uploadSocialImage,
  handleMulterError,
} = require('../uploadUtils');


module.exports = function(app) {
  /* End Point to  create a Social Media master Record
        POST - /api/socialmediamaster
         socialMediaMaster.saveSocialMedia- Controller function to  create a Social Media master Record
    */
  app.post(
      '/api/socialmediamaster',
      [authJwt.verifyToken],
      uploadSocialImage.fields([{ name: 'image' }]),
      handleMulterError,
      socialMediaMaster.saveSocialMedia,
  );


  /* End Point to Update a Social Media master Record by Social media ID
      PUT - /api/socialmediamaster/:socialMediaMasterId
       socialMediaMaster.updateSocialMedia- Controller function to Update a Social Media master Record by Social media ID
    */
  app.put(
      '/api/socialmediamaster/:socialMediaMasterId',
      [authJwt.verifyToken],
      uploadSocialImage.fields([{ name: 'image' }]),
      handleMulterError,
      socialMediaMaster.updateSocialMedia,
  );


  /* End Point to Get all Social Media master Record
        GET - /api/socialmediamaster/
         socialMediaMaster.getSocialMedia- Controller function to Get all Social Media master Record
    */
  app.get(
      '/api/socialmediamaster/',
      [authJwt.verifyToken],
      socialMediaMaster.getSocialMedia,
  );


  /* End Point to Delete a Social Media master Record by Social media ID
      DELETE - /api/socialmediamaster/:socialMediaMasterId
       socialMediaMaster.delSocialMediaMaster- Controller function to Delete a Social Media master Record by Social media ID
    */
  app.delete(
      '/api/socialmediamaster/:socialMediaMasterId',
      [authJwt.verifyToken],
      socialMediaMaster.delSocialMediaMaster,
  );


  /* End Point to Get a Social Media master Record by Social media ID
    GET - /api/socialmediamaster/:social_id
     socialMediaMaster.getSocialMediaById- Controller function to Get a Social Media master Record by Social media ID
    */
  app.get(
      '/api/socialmediamaster/:social_id',
      [authJwt.verifyToken],
      socialMediaMaster.getSocialMediaById,
  );

  /**
   * Search Social Media details by fieldName and  fieldValue from the database.
  */
  app.get('/api/socialmediamaster/search/:fieldName/:fieldValue',
      [authJwt.verifyToken],
      socialMediaMaster.searchSocialMediaMaster,
  );
};
