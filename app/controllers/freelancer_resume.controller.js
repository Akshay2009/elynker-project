const db = require('../models');
const freelancerResume = db.freelancerResume;
const Registration = db.registration;
require('dotenv').config();
const path = require('path');
const fs = require('fs');
// const { log } = require('console');
const FREELANCER_RESUME_PATH = path.join(process.env.FREELANCER_RESUME_PATH);
const serviceResponse = require('../config/serviceResponse');

/**
 * Controller function to Upload resume with provided RegistrationId
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.uploadFreelancerResume = async (req, res) => {
  try {
    if (req.fileValidationError) {
      return res.status(serviceResponse.badRequest).json({ error: req.fileValidationError });
    }
    const { registrationId } = req.params;
    const resume = req.files['resume'];
    const existingRegistration = await Registration.findByPk(registrationId);
    if (!existingRegistration) {
      fs.unlinkSync(
          path.join(
              __dirname,
              '../..',
              FREELANCER_RESUME_PATH,
              '/',
              req.files['resume'][0].filename,
          ),
      );
      return res
          .status(serviceResponse.notFound)
          .json({ error: serviceResponse.registrationNotFound });
    }
    if (existingRegistration.registration_type !== 3) {
      fs.unlinkSync(
          path.join(
              __dirname,
              '../..',
              FREELANCER_RESUME_PATH,
              '/',
              req.files['resume'][0].filename,
          ),
      );
      return res
          .status(serviceResponse.badRequest)
          .json({ error: 'Registration is not of freelancer type' });
    }
    if (resume && resume.length > 0) {
      const existingResume = await freelancerResume.findAll({
        where: { registrationId: registrationId },
      });
      if (existingResume) {
        for (let i = 0; i < existingResume.length; i++) {
          fs.unlinkSync(
              path.join(
                  __dirname,
                  '../..',
                  FREELANCER_RESUME_PATH,
                  '/',
                  existingResume[i].freelancer_resume,
              ),
          );
        }
      }
      if (existingResume) {
        await freelancerResume.destroy({
          where: { registrationId: registrationId },
        });
      }

      const uploadResume = await freelancerResume.create({
        freelancer_resume: resume[0].filename,
        registrationId: registrationId,
      });
      if (uploadResume) {
        return res.status(serviceResponse.saveSuccess).json({
          message: serviceResponse.createdMessage,
          data: uploadResume,
        });
      }
    } else {
      fs.unlinkSync(
          path.join(
              __dirname,
              '../..',
              FREELANCER_RESUME_PATH,
              '/',
              resume[0].filename,
          ),
      );
      return res.status(serviceResponse.badRequest).json({ error: 'resume not uploaded' });
    }
  } catch (error) {
    res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
  }
};

/**
 * Controller function to Get all resume associated with provided RegistrationId
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.getFreelancerResumes = async function(req, res) {
  try {
    const registrationId = req.params.registrationId;
    const freelancer_resume = await freelancerResume.findAll({
      where: { registrationId: registrationId },
    });
    if (freelancer_resume.length > 0) {
      return res.status(serviceResponse.ok).json({
        success: serviceResponse.getMessage,
        data: freelancer_resume,
      });
    } else {
      return res
          .status(serviceResponse.notFound)
          .json({ error: serviceResponse.errorNotFound });
    }
  } catch (err) {
    return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
  }
};

/**
 * Controller function to Delete resume associated with provided Resume Id
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.delFreelancerResumeById = async function(req, res) {
  try {
    const resume_id = req.params.resume_id;
    const recordToDelete = await freelancerResume.findOne({
      where: { id: resume_id },
    });
    if (!recordToDelete) {
      return res.status(serviceResponse.notFound).json({
        error: serviceResponse.errorNotFound,
      });
    }
    if (recordToDelete) {
      if (recordToDelete.freelancer_resume) {
        fs.unlinkSync(
            path.join(
                __dirname,
                '../..',
                FREELANCER_RESUME_PATH,
                '/',
                recordToDelete.freelancer_resume,
            ),
        );
      }
    }
    const deletedResume = await freelancerResume.destroy({
      where: { id: resume_id },
    });
    if (deletedResume > 0) {
      return res
          .status(serviceResponse.ok)
          .json({
            success: serviceResponse.deletedMessage,
            data: recordToDelete,
          });
    } else {
      return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
    }
  } catch (err) {
    return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
  }
};
/**
 * Controller function to Get all free lancer resume.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.getAllFreelancerResumes = async function(req, res) {
  try {
    const maxLimit = 50;
    let { page, pageSize } = req.query;
    page = page ? page : 1;
    let offset = 0;
    if (page && pageSize) {
      pageSize = pageSize <= maxLimit ? pageSize : maxLimit;
      offset = (page - 1) * pageSize;
    }

    const { count, rows } = await freelancerResume.findAndCountAll({
      limit: pageSize,
      offset: offset,
      order: [['createdAt', 'ASC']],
    });
    if (count > 0) {
      return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, totalRecords: count, data: rows });
    } else {
      return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
    }
  } catch (err) {
      console.error('Error retrieving data:', err);
      return res.status(serviceResponse.internalServerError).json({ error: 'Internal Server Error' });
  }
};


/**
 * Controller function to Get free lancer resume by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.getFreelancerResumesById = async function(req, res) {
  try {
    const id = req.params.resume_id;
    const freelancer_resume = await freelancerResume.findOne({ where: { id: id } });
    if (freelancer_resume) {
      return res.status(serviceResponse.ok).json({
        message: serviceResponse.getMessage,
        data: freelancer_resume,
      });
    } else {
      return res
          .status(serviceResponse.notFound)
          .json({ error: serviceResponse.errorNotFound });
    }
  } catch (err) {
    return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
  }
};


/**
 * Search User Banner details by fieldName and  fieldValue from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise representing the completion of the retrieval operation.
 */

module.exports.search = async function(req, res) {
  try {
    const { fieldName, fieldValue } = req.params;
    if (!freelancerResume.rawAttributes[fieldName]) {
      return res.status(serviceResponse.badRequest).json({ error: serviceResponse.fieldNotExistMessage });
    }
    const records = await freelancerResume.findAll({
      where: {
        [fieldName]: fieldValue,
      },
    });
    if (records.length > 0) {
      return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, data: records });
    } else {
      return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
    }
  } catch (err) {
    if (err instanceof Sequelize.Error) {
      return res.status(serviceResponse.badRequest).json({ error: err.message });
    }
    return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
  }
};

