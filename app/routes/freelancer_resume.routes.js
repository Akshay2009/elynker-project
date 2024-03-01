const { authJwt } = require('../middleware');
const {
  uploadfreelanceResume,
  handleMulterError,
} = require('../uploadUtils');
const freelancer_resumeController = require('../controllers/freelancer_resume.controller');


module.exports = function(app) {
  /**
   * Endpoint to upload file for registration on Registration Model.
   * @param {String} '/api/user/resume/:registrationId' - API endpoint path.
   * @param {Function[]} [authJwt.verifyToken,
   * @param {Function}freelancer_resumeController.uploadFreelancerResume - Controller function to handle the upload resume.
   */
  app.post(
      '/api/resume/:registrationId',
      [authJwt.verifyToken],
      uploadfreelanceResume.fields([{ name: 'resume' }]),
      handleMulterError,
      freelancer_resumeController.uploadFreelancerResume,
  );

  /**
   * Endpoint to get resume associated with registration id.
   * @param {String} '/api/resume/:registrationId' - API endpoint path.
   * @param {Function[]} [authJwt.verifyToken,
   * @param {Function}freelancer_resumeController.getFreelancerResumes - Controller function to get resume associated with registration id.**/

  app.get(
      '/api/resume/:registrationId',
      [authJwt.verifyToken],
      freelancer_resumeController.getFreelancerResumes,
  );

  /**
   * Endpoint to Delete resume associated with resume id.
   * @param {String} '/api/resume/:resume_id' - API endpoint path.
   * @param {Function[]} [authJwt.verifyToken,
   * @param {Function} freelancer_resumeController.delFreelancerResumeById-to Delete resume associated with resume id.**/

  app.delete(
      '/api/resume/:resume_id',
      [authJwt.verifyToken],
      freelancer_resumeController.delFreelancerResumeById,
  );

  /**
 * Endpoint to get all freelancer resume!
 * @param {String} '/api/resume/' - API endpoint path.
 * @param {Function[]} [authJwt.verifyToken,
 * @param {Function}freelancer_resumeController.getFreelancerResumes - Controller function to get all freelancer resume**/

  app.get(
      '/api/resume/',
      [authJwt.verifyToken],
      freelancer_resumeController.getAllFreelancerResumes,
  );


  /**
* Endpoint to get freelancer resume by Resume ID!
* @param {String} '/api/freelancer/resume/:resume_id' - API endpoint path.
* @param {Function[]} [authJwt.verifyToken,
* @param {Function}freelancer_resumeController.getFreelancerResumesById - Controller function  to get freelancer resume by Resume ID**/

  app.get(
      '/api/freelancer/resume/:resume_id',
      [authJwt.verifyToken],
      freelancer_resumeController.getFreelancerResumesById,
  );

  /**
* Endpoint to get freelancer resume by Value and Field Name!
* @param {String} '/api/freelancer/resume/search/:fieldName/:fieldValue' - API endpoint path.
* @param {Function[]} authJwt.verifyToken,
* @param {Function} freelancer_resumeController.search - Controller function  to get freelancer resume by Resume ID**/

  app.get('/api/freelancer/resume/search/:fieldName/:fieldValue',
      [authJwt.verifyToken],
      freelancer_resumeController.search,
  );
};
