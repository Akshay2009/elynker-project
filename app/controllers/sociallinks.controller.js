const db = require("../models");
const { Op, DataTypes, Sequelize } = require("sequelize");
const Sociallinks = db.sociallinks;
const Registration = db.registration;
//creating certificate---

module.exports.bulkCreateSociallinks = async function (req, res) {
  try {
    const socialLinkArray = req.body;
    const registrationId = req.params.registrationId;
    if(socialLinkArray.length ==0){
      return res.status(400).json({error : 'Please provide data in array'});
    }
    if (!registrationId || registrationId === "") {
      return res.status(404).json({
        message:
          "registration id not found,kindly provide correct registration id",
      });
    }
    const regRecord = await Registration.findByPk(registrationId);
    if(!regRecord){
      return res.status(404).json({
        message: "Registration Id not found",
      });
    }

    const newSociallinks = socialLinkArray.map((item) => {
      return {
        ...item,
        registrationId: registrationId, // Add registrationId
      };
    });
    const result = await Sociallinks.bulkCreate(newSociallinks, {
      updateOnDuplicate: ["social_name", "social_url"],
    });

    if (result) {
      return res.status(201).json({
        message: "Sociallinks created successfully",
        result,
      });
    } else {
      return res.status(401).json({
        message: "Error updating socialLinks..",
      });
    }
  } catch (error) {
    console.error("Error creating Sociallinks:", error);
    return res.status(500).json({ error: "Failed to create Sociallinks" });
  }
};

module.exports.createSociallinks = async function (req, res) {
  try {
    const { social_name, social_url, created_by, modified_by, registrationId } =
      req.body;
    if (!registrationId || registrationId === "") {
      return res.status(404).json({
        message:
          "registration id not found,kindly provide correct registration id",
      });
    }

    const newSociallinks = await Sociallinks.create({
      social_name,
      social_url,
      created_by,
      modified_by,
      registrationId,
    });
    if(newSociallinks){
      return res.status(201).json({
        message: "Sociallinks created successfully",
        newSociallinks,
      });
    }else{
      return res.status(500).json({
        message: "Sociallinks not created"
      });
    }
    
  } catch (error) {
    console.error("Error creating Sociallinks:", error);
    return res.status(500).json({ error: "Failed to create Sociallinks" });
  }
};

///getting all sociallinks --

module.exports.getSociallinks = async function (req, res) {
  try {
    const sociallinks = await Sociallinks.findAll({});
    if (sociallinks) {
     return  res.status(200).json(sociallinks);
    } else {
      return res.status(404).json({ error: "No social links Returned" });
    }
  } catch (err) {
    console.error("Error fetching social links details", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getSociallinksByRegistrationId = async function (req, res) {
  try {
    const registrationId = req.params.registrationId;
    const sociallinks = await Sociallinks.findAll({
      where: { registrationId: registrationId}
    });
    if (sociallinks.length>0) {
      return res.status(200).json(sociallinks);
    } else {
      return res.status(404).json({ error: "No social links with this Registration ID" });
    }
  } catch (err) {
    console.error("Error fetching social links details", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

///getting all sociallinks by id----
module.exports.getSociallinksById = async function (req, res) {
  try {
    const { social_id } = req.params;
    const SociallinksDetails = await Sociallinks.findOne({
      where: { id: social_id },
    });

    if (SociallinksDetails) {
      return res.status(200).json(SociallinksDetails);
    } else {
      return res.status(404).json({ error: "Social Links Details not found" });
    }
  } catch (error) {
    console.error("Error getting by ID:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error. Error:" + error.message });
  }
};

//update social links by id--

module.exports.updateSociallinksById = async function (req, res) {
  try {
    const { social_id } = req.params;
    const { social_name, social_url, created_by, modified_by, registrationId } =
      req.body;
    if (!registrationId || registrationId === "") {
      return res.status(404).json({ error: "registration is not found" });
    }
    const regRecord = await Registration.findByPk(registrationId);
    if(!regRecord){
      return res.status(404).json({
        message: "This Registration Id Doesnot exist",
      });
    }
    const existingSociallinks = await Sociallinks.findByPk(social_id);
    if (!existingSociallinks) {
      return res.status(404).json({ error: "Social Links not found" });
    }
    await existingSociallinks.update({
      social_name,
      social_url,
      created_by,
      modified_by,
      registrationId,
    });
    return res.status(200).json({
      message: "Social links record updated successfully",
      updatedSociallinksRecord: existingSociallinks.toJSON(),
    });
  } catch (error) {
    console.error("Error updating social links details:", error);
    return res.status(500).json({ error: "Failed to update social links record" });
  }
};

/**
 * Controller function to Delete social links by id .
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.delSociallinksById = async function (req, res) {
  try {
    const { social_id } = req.params;
    const delSocialLink = await Sociallinks.destroy({
      where: { id: social_id },
    });
    if (delSocialLink === 0) {
      return res.status(404).json({ error: "Social link not found" });
    }
    return res.status(200).json({ message: "Social link deleted successfully" });
  } catch (error) {
    console.error("Error deleting social link:", error);
    return res.status(500).json({ error: "Failed to delete social link" });
  }
};

/**
 * Controller function to Delete all social links by registration Id .
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.delSociallinksByRegId = async function (req, res) {
  try {
    const { reg_id } = req.params;
    const delSocialLink = await Sociallinks.destroy({
      where: { registrationId: reg_id },
    });
    if (delSocialLink === 0) {
      return res.status(404).json({ error: "No records found for provided regstration Id" });
    }
    return res.status(200).json({ message: " Social link deleted successfully with Provided Registration Id" });
  } catch (error) {
    console.error("Error deleting social link:", error);
    return res.status(500).json({ error: "Failed to delete social link" });
  }
};
