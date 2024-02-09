const db = require("../models");
const fs = require("fs");
const path = require("path");
require('dotenv').config();
const COMPANY_LOGO_PATH = path.join(process.env.COMPANY_LOGO_PATH);
const COVER_IMAGE_PATH = path.join(process.env.COVER_IMAGE_PATH);
const FREELANCER_RESUME_PATH = path.join(process.env.FREELANCER_RESUME_PATH);

const Registration = db.registration;
const BusinessDetail = db.businessDetail;
const Category = db.category;

/**
 * Controller function to update company logo .
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.updateCompanyLogo = async function (req, res) {
  try {
    let registration = await Registration.findByPk(req.params.id);
    const companyLogo = req.files["images"];

    if (companyLogo && companyLogo.length > 0) {
      if(registration.image_path){
        fs.unlinkSync(path.join(__dirname, '../..', COMPANY_LOGO_PATH,'/',registration.image_path));
      }
      registration.image_path = companyLogo[0].filename;
    }
    await registration.save();
    return res
      .status(200)
      .json({
        success: "Company Logo Updated Successfully",
        registration: registration,
      });
  } catch (err) {
    return res.status(500).json({ error: "error in updating  Company Logo" });
  }
};

/**
 * Controller function to update cover Image .
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.updateCoverImage = async function (req, res) {
  try {
    let registration = await Registration.findByPk(req.params.registrationId);
    const coverImages = req.files["images"];

    if (coverImages && coverImages.length > 0) {
      if(registration.cover_image){
        fs.unlinkSync(path.join(__dirname, '../..', COVER_IMAGE_PATH,'/',registration.cover_image));
      }
      registration.cover_image = coverImages[0].filename;
    }
    await registration.save();
    return res
      .status(200)
      .json({
        success: "Cover Image Updated Successfully",
        registration: registration,
      });
  } catch (err) {
    return res.status(500).json({ error: "error in updating  cover Image" });
  }
};

module.exports.saveBusinessDetail = async function (req, res) {
  try {
    const reg_Id = req.params.reg_id;
    const existingRegistration = await Registration.findByPk(reg_Id);

    if (!existingRegistration) {
      return res
        .status(401)
        .json({ success: "Provided registration Id does not exists!" });
    }

    let arr = req.body;
    let registration_company_name;
    if (!arr.length) {
      return res
        .status(401)
        .json({
          success: "Please provide your business data in json array[]!",
        });
    }

    const updatedArr = arr.map((item) => {
      return {
        ...item,
        registrationId: reg_Id, // Add registrationId
      };
    });
    const result = await BusinessDetail.bulkCreate(updatedArr, {
      updateOnDuplicate: [
        "company_name",
        "document",
        "is_active",
        "document_name",
        "document_number",
        "file_location",
        "file_name",
      ],
    });

    const [numberOfUpdatedRows, updatedRecords] = await Registration.update(
      { company_name: arr[0].company_name },
      { where: { id: reg_Id } }
    );
    return res
      .status(200)
      .json({ success: "BusinessDetails Successfully inserted", data: result });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res
      .status(500)
      .json({ error: "Internal Server Error. Error:" + err.message });
  }
};

/**
 * Controller function for get business details .
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.getBusinessDetail = async function (req, res) {
  try {
    const { reg_id } = req.params;
    // Fetch the details by ID
    const existingRegistration = await Registration.findByPk(reg_id);

    if (!existingRegistration) {
      return res
        .status(401)
        .json({ success: "Provided registration Id does not exists!" });
    }

    const businessDetails = await BusinessDetail.findAll({
      where: { registrationId: reg_id },
    });

    if (businessDetails) {
      // Return the details in the response
      return res.status(200).json(businessDetails);
    } else {
      return res.status(404).json({ error: "details not found" });
    }
  } catch (error) {
    console.error("Error getting by ID:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error. Error:" + err.message });
  }
};
//registration post request---------------

module.exports.putRegDetail = async function (req, res) {
  try {
    const {name,
      business_type,
      ip_address,
      registration_type,
      dob,
      latitude,
      longitude,
      steps_completed,
      active_steps,
      address1,
      address2,
      state,
      city,
      country,
      education,
      available_hrs_per_week,
      hourly_rate,
      service_fee,
      freelancer_role,
      freelancer_bio,
      language,
      currency_id,
      created_by,
      updated_by,
    } = req.body;

    const registrationId = req.params.reg_id;
    const existingRegistration = await Registration.findByPk(registrationId);

    if (!existingRegistration) {
      return res.status(404).json({ error: "Registration record not found" });
    } else if (existingRegistration) {
      const [row, record] = await Registration.update(
        { name,
          ip_address,
          business_type,
          registration_type,
          dob,
          latitude,
          longitude,
          steps_completed,
          active_steps,
          address1,
          address2,
          city,
          state,
          country,
          education,
          available_hrs_per_week,
          hourly_rate,
          service_fee,
          freelancer_role,
          freelancer_bio,
          language,
          currency_id,
          created_by,
          updated_by,
        },
        {
          where: {
            id: registrationId,
          },
          returning: true,
        }
      );
      if (row > 0) {
        return res.status(200).json({
          message: "Registration record updated successfully",
          updatedRegistration: record[0],
        });
      }
    } else {
      return res.status(400).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.error("Error updating registration record:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.updateCategoryIds = async function (req, res) {
  try {
    const registrationId = req.params.registrationId;
    const { category_ids } = req.body;
    if (!category_ids) {
      return res
        .status(401)
        .json({ error: "Category Ids for Registration Not Provided" });
    }
    const existingRegistration = await Registration.findByPk(registrationId);

    if (!existingRegistration) {
      return res.status(404).json({ error: "Registration record not found" });
    }

    // Split comma-separated category IDs into an array
    const categoryIdsArray = category_ids.split(",");
    const categories = await Category.findAll({
      where: {
        id: categoryIdsArray,
      },
    });
    if (categories.length == 0) {
      return res
        .status(401)
        .json({ error: "No category with provided Category Ids Present" });
    }
    let catArray = [];
    categories.forEach((cat) => {
      catArray.push(cat.id);
    });

    const [rowUpdated, registrationUpdated] = await Registration.update(
      {
        category_ids: catArray.join(","),
      },
      {
        where: {
          id: registrationId,
        },
        returning: true,
      }
    );
    if (rowUpdated > 0) {
      return res.status(200).json(registrationUpdated[0]);
    } else {
      return res.status(404).json({ error: "Registration record not updated" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
//free lancer resume upload controller--

module.exports.uploadFreelancerResume = async (req, res) => {
  try {
    if (req.fileValidationError) {
      return res.status(400).json({ error: req.fileValidationError });
    }
    const { registrationId } = req.params;
    const resume = req.files["resume"];
    const existingRegistration =  await Registration.findByPk(registrationId);
    if(!existingRegistration){
      return res.status(404).json({ error: "Registration not found with this id" });
    }
    if(existingRegistration.registration_type!==3){
      return res.status(404).json({ error: "Registration is not of freelancer type" });
    }

    // Assume you have a 'resumes' field in your Registration model to store file details
    if (resume && resume.length > 0) {
      if(existingRegistration.freelancer_resume){
        fs.unlinkSync(path.join(__dirname, '../..', FREELANCER_RESUME_PATH,'/',existingRegistration.freelancer_resume));
      }
      existingRegistration.freelancer_resume = resume[0].filename;
    }
    await existingRegistration.save();
    return res.status(200).json({ message: "Resume updated successfully", data: existingRegistration });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
