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

// module.exports.getBusinessDetail = async function(req,res){
//     try{
//        const regId =  req.params.reg_id

//     }catch{

//     }
// }

module.exports.saveBusinessDetail = async function (req, res) {
  try {
    const { company_name, document } = req.body;
    const reg_Id = req.params.reg_id;

    const businessDetailRecord = await BusinessDetail.create({
      company_name: company_name,
      document: document,
      registrationId: reg_Id,
    });

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
