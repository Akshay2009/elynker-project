const db = require("../models");
const fs = require("fs");
const path = require("path");
const COMPANY_LOGO_PATH = path.join("/uploads/company/company_logo");

const Registration = db.registration;
const BusinessDetail = db.businessDetail;

/**
 * Controller function to update company logo .
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
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






module.exports.saveBusinessDetail = async function(req,res){
    try{
        const reg_Id = req.params.reg_id;
        let arr = req.body;
        let registration_company_name;
        for(let i=0;i<arr.length;i++){
            let {
              company_name,
              document,
              upload_date,
              is_active,
              document_name,
              document_number,
              file_location,
              file_name,
              id
            } = arr[i];
            registration_company_name = company_name,
            id = id ? id: null;
            const [record,created] = await BusinessDetail.findOrCreate({ where : {id},
                defaults:{
                    company_name,
                    document,
                    upload_date,
                    is_active,
                    document_name,
                    document_number,
                    file_location,
                    file_name,
                    registrationId: reg_Id
                }
            
            });
            if(!created){
                await BusinessDetail.update({
                  company_name: company_name,
                  document: document,
                  upload_date: upload_date,
                  is_active: is_active,
                  document_name: document_name,
                  document_number: document_number,
                  file_location: file_location,
                  file_name: file_name, 
                },{
                    where : {
                        id: id
                    }
                });
            }
        }
        const [numberOfUpdatedRows, updatedRecords] = await Registration.update(
          { company_name : registration_company_name },
          { where: { id: reg_Id } }
        );
        res.status(200).json({success : "BusinessDetails Successfully inserted"});
    }catch (err) {
        console.error(err); // Log the error for debugging
        res
        .status(500)
        .json({ error: "Internal Server Error. Error:" + err.message });
    }
}

/**
 * Controller function for get business details .
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.getBusinessDetail = async function (req, res) {
  try {
    const { reg_id } = req.params;
    console.log(reg_id);

    // Fetch the details by ID
    const businessDetails = await BusinessDetail.findAll({registrationId: reg_id});

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

