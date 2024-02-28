const db = require("../models");
const Freelancer_Resume = db.freelancer_resume;
const Registration = db.registration;
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const { log } = require("console");
const FREELANCER_RESUME_PATH = path.join(process.env.FREELANCER_RESUME_PATH);
/**
 * Controller function to Upload resume with provided RegistrationId
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.uploadFreelancerResume = async (req, res) => {
  try {
    if (req.fileValidationError) {
      return res.status(400).json({ error: req.fileValidationError });
    }
    const { registrationId } = req.params;
    const resume = req.files["resume"];
    const existingRegistration = await Registration.findByPk(registrationId);
    if (!existingRegistration) {
      fs.unlinkSync(
        path.join(
          __dirname,
          "../..",
          FREELANCER_RESUME_PATH,
          "/",
          req.files["resume"][0].filename
        )
      );
      return res
        .status(404)
        .json({ error: "Registration not found with this id" });
    }
    if (existingRegistration.registration_type !== 3) {
      fs.unlinkSync(
        path.join(
          __dirname,
          "../..",
          FREELANCER_RESUME_PATH,
          "/",
          req.files["resume"][0].filename
        )
      );
      return res
        .status(404)
        .json({ error: "Registration is not of freelancer type" });
    }
    if (resume && resume.length > 0) {
      const existingResume = await Freelancer_Resume.findAll({
        where: { registrationId: registrationId },
      });
      if (existingResume) {
        for (let i = 0; i < existingResume.length; i++) {
          fs.unlinkSync(
            path.join(
              __dirname,
              "../..",
              FREELANCER_RESUME_PATH,
              "/",
              existingResume[i].freelancer_resume
            )
          );
        }
      }
      if (existingResume) {
        await Freelancer_Resume.destroy({
          where: { registrationId: registrationId },
        });
      }

      const uploadResume = await Freelancer_Resume.create({
        freelancer_resume: resume[0].filename,
        registrationId: registrationId,
      });
      if (uploadResume) {
        return res.status(201).json({
          message: "Resume Uploaded Successfully",
          data: uploadResume,
        });
      }
    } else {
      fs.unlinkSync(
        path.join(
          __dirname,
          "../..",
          FREELANCER_RESUME_PATH,
          "/",
          resume[0].filename
        )
      );
      return res.status(400).json({ error: "resume not uploaded" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Controller function to Get all resume associated with provided RegistrationId
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.getFreelancerResumes = async function (req, res) {
  try {
    const registrationId = req.params.registrationId;
    const freelancer_resume = await Freelancer_Resume.findAll({
      where: { registrationId: registrationId },
    });
    if (freelancer_resume.length > 0) {
      return res.status(200).json({
        success: "resume details fetched successfully",
        data:freelancer_resume,
      });
    } else {
      return res
        .status(404)
        .json({ error: "No Resume found with this Registration ID" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Controller function to Delete resume associated with provided Resume Id
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.delFreelancerResumeById = async function (req, res) {
  try {
    const resume_id = req.params.resume_id;
    const recordToDelete = await Freelancer_Resume.findOne({
      where: { id: resume_id },
    });
    if (!recordToDelete) {
      return res.status(404).json({
        error: "Requested Resume Id not found kindly provide valid resume id !",
      });
    }
    if (recordToDelete) {
      if (recordToDelete.freelancer_resume) {
        fs.unlinkSync(
          path.join(
            __dirname,
            "../..",
            FREELANCER_RESUME_PATH,
            "/",
            recordToDelete.freelancer_resume
          )
        );
      }
    }
    const deletedResume = await Freelancer_Resume.destroy({
      where: { id: resume_id },
    });
    if (deletedResume > 0) {
      return res
        .status(200)
        .json({
          success: "Resume deleted successfully!",
          data: recordToDelete,
        });
    } else {
      return res.status(404).json({ error: "Resume not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error in delete" });
  }
};
/**
 * Controller function to Get all free lancer resume.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.getAllFreelancerResumes = async function (req, res) {
  try {
    const freelancer_resume = await Freelancer_Resume.findAll({});
    if (freelancer_resume.length>0) {
      return res.status(200).json({
        message: "resume details fetched successfully",
        data:freelancer_resume,
      });
    } else {
      return res
        .status(404)
        .json({ error: "No Resumes found " });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


/**
 * Controller function to Get free lancer resume by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.getFreelancerResumesById = async function (req, res) {
  try {
    const id = req.params.resume_id;
    const freelancer_resume = await Freelancer_Resume.findOne({where:{id:id}});
    if (freelancer_resume) {
      return res.status(200).json({
        message: "resume details fetched successfully",
        data:freelancer_resume,
      });
    } else {
      return res
        .status(404)
        .json({ error: "No Resumes found with this ID" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error " });
  }
};



/**
 * Search User Banner details by fieldName and  fieldValue from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise representing the completion of the retrieval operation.
 */

module.exports.search = async function (req, res) {
  try {
      const { fieldName, fieldValue } = req.params
      if (!Freelancer_Resume.rawAttributes[fieldName]) {
          return res.status(400).json({ error: 'Invalid field name' });
      }
      const records = await Freelancer_Resume.findAll({
          where: {
              [fieldName]: fieldValue,
          },
      });
      if (records.length > 0) {
          return res.status(200).json({ message: 'Fetched Records', data: records })
      } else {
          return res.status(404).json({ error: 'No record found' })
      }

  } catch (err) {
      if (err instanceof Sequelize.Error) {
          return res.status(400).json({ error: err.message })
      }
      return res.status(500).json({ error: 'Internal Server Error' })
  }
}

