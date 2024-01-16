const db = require("../models");
const fs = require("fs");
const path = require("path");
const COMPANY_LOGO_PATH = path.join("/uploads/company/company_logo");

const Registration = db.registration;
const BusinessDetail = db.businessDetail;

module.exports.updateCompanyLogo = async function (req, res) {
  if (req.userId) {
    try {
      let registration = await Registration.findByPk(req.params.id);
      if (req.file) {
        if (registration.image_path) {
          fs.unlinkSync(path.join(__dirname, "..", registration.image_path));
        }
        registration.image_path = COMPANY_LOGO_PATH + "/" + req.file.filename;
      }
      await registration.save();
      res.redirect("back");
    } catch (err) {
      res.status(500).json({ error: "error in updating company logo" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};


module.exports.saveBusinessDetail = async function (req, res) {
  try {
    const { company_name, document } = req.body;
    const reg_Id = req.params.reg_id;

    const businessDetailRecord = await BusinessDetail.create({
      company_name: company_name,
      document: document,
      registrationId: reg_Id,
    });

    // Perform the update operation and get the number of updated rows
    const [numberOfUpdatedRows, updatedRecords] = await Registration.update(
      { company_name },
      { where: { id: reg_Id } }
    );

    res.status(200).json(businessDetailRecord);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res
      .status(500)
      .json({ error: "Internal Server Error. Error:" + err.message });
  }
};

module.exports.getBusinessDetail = async function (req, res) {
  try {
    const { reg_id } = req.params;
    console.log(reg_id);

    // Fetch the details by ID
    const businessDetails = await BusinessDetail.findByPk(reg_id);

    if (businessDetails) {
      // Return the details in the response
      res.status(200).json(businessDetails);
    } else {
      res.status(404).json({ error: "details not found" });
    }
  } catch (error) {
    console.error("Error getting by ID:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error. Error:" + err.message });
  }
};


/**
 * Controller function for updating business details and company name on registration .
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.updateBusinessDetail = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { company_name, document } = req.body;

    //Perform the update operation and get the number of updated rows
    const [numberOfUpdatedRows, updatedRecords] = await BusinessDetail.update(
      { company_name, document },
      { where: { id: id }, returning: true }
    );

    if (updatedRecords) {
      // Perform the update operation and get the number of updated rows
      const returns = await Registration.update(
        { company_name },
        { where: { id: updatedRecords[0].registrationId } }
      );

      res.json({
        message: "Business Details updated successfully",
        businessdetails: updatedRecords,
      });
    } else {
      res.status(404).json({ error: "Business Details not found" });
    }
  } catch (error) {
    console.error("Error updating business details:", error);
    res.status(500).json({ error: "Internal Server Error: " + error.message });
  }
};
