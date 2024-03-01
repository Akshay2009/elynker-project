const { authJwt } = require('../middleware');
const {
  uploadfreelanceResume,
  handleMulterError,
} = require('../uploadUtils');
const freelancerResumeController = require('../controllers/freelancer_resume.controller');


module.exports = function(app) {
  /**
   * Endpoint to upload file for registration on Registration Model.
   * @param {String} '/api/user/resume/:registrationId' - API endpoint path.
   * @param {Function[]} [authJwt.verifyToken,
   * @param {Function}freelancerResumeController.uploadFreelancerResume - Controller function to handle the upload resume.
   */
  app.post(
      '/api/resume/:registrationId',
      [authJwt.verifyToken],
      uploadfreelanceResume.fields([{ name: 'resume' }]),
      handleMulterError,
      freelancerResumeController.uploadFreelancerResume,
  );

  /**
   * Endpoint to get resume associated with registration id.
   * @param {String} '/api/resume/:registrationId' - API endpoint path.
   * @param {Function[]} [authJwt.verifyToken,
   * @param {Function}freelancerResumeController.getFreelancerResumes - Controller function to get resume associated with registration id.**/

  app.get(
      '/api/resume/:registrationId',
      [authJwt.verifyToken],
      freelancerResumeController.getFreelancerResumes,
  );

  /**
   * Endpoint to Delete resume associated with resume id.
   * @param {String} '/api/resume/:resume_id' - API endpoint path.
   * @param {Function[]} [authJwt.verifyToken,
   * @param {Function} freelancerResumeController.delFreelancerResumeById-to Delete resume associated with resume id.**/

  app.delete(
      '/api/resume/:resume_id',
      [authJwt.verifyToken],
      freelancerResumeController.delFreelancerResumeById,
  );

  /**
 * Endpoint to get all freelancer resume!
 * @param {String} '/api/resume/' - API endpoint path.
 * @param {Function[]} [authJwt.verifyToken,
 * @param {Function}freelancerResumeController.getFreelancerResumes - Controller function to get all freelancer resume**/

  app.get(
      '/api/resume/',
      [authJwt.verifyToken],
      freelancerResumeController.getAllFreelancerResumes,
  );


  /**
* Endpoint to get freelancer resume by Resume ID!
* @param {String} '/api/freelancer/resume/:resume_id' - API endpoint path.
* @param {Function[]} [authJwt.verifyToken,
* @param {Function}freelancerResumeController.getFreelancerResumesById - Controller function  to get freelancer resume by Resume ID**/

  app.get(
      '/api/freelancer/resume/:resume_id',
      [authJwt.verifyToken],
      freelancerResumeController.getFreelancerResumesById,
  );

  /**
* Endpoint to get freelancer resume by Value and Field Name!
* @param {String} '/api/freelancer/resume/search/:fieldName/:fieldValue' - API endpoint path.
* @param {Function[]} authJwt.verifyToken,
* @param {Function} freelancerResumeController.search - Controller function  to get freelancer resume by Resume ID**/

  app.get('/api/freelancer/resume/search/:fieldName/:fieldValue',
      [authJwt.verifyToken],
      freelancerResumeController.search,
  );
};
