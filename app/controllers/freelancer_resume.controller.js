const db = require("../models");
const Freelancer_Resume = db.freelancer_resume;
const Registration = db.registration;
require("dotenv").config();
const path = require("path");
const fs = require('fs');
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
      const uploadResume = await Freelancer_Resume.create({
        freelancer_resume: resume[0].filename,
        registrationId: registrationId,
      });
      if (uploadResume) {
        return res.status(200).json({
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
      return res.status(404).json({ error: "resume not uploaded" });
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
      return res
        .status(200)
        .json({
          success: "resume details fetched successfully",
          freelancer_resume,
        });
    } else {
      return res
        .status(404)
        .json({ error: "No Resume found with this Registration ID" });
    }
  } catch (err) {
    console.error("Error fetching Freelancer Resume", err);
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
    const recordToDelete = await Freelancer_Resume.findOne({ where : { id: resume_id}});
    if (!recordToDelete) {
      return res
        .status(404)
        .json({
          error:
            "Requested Resume Id not found kindly provide valid resume id !",
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
    if (deletedResume>0) {
      return res.status(200).json({ success: "Resume deleted successfully!", data : recordToDelete });
    } else {
      return res.status(404).json({ error: "Resume not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error in delete" });
  }
};
