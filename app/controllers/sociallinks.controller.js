const db = require("../models");
const { Op, DataTypes, Sequelize } = require("sequelize");
const Sociallinks = db.sociallinks;
//creating certificate---

module.exports.createSociallinks = async function (req, res) {
  try {
    const { social_name, social_url, created_by, modified_by, registrationId } =
      req.body;
    if (!registrationId || registrationId === "") {
      return res.status(404).json({
        message: "registration id not found,kindly provide correct registration id",
      });
    }

    const newSociallinks = await Sociallinks.create({
      social_name,
      social_url,
      created_by,
      modified_by,
      registrationId,
    });
    res.status(201).json({
      message: "Sociallinks created successfully",
      newSociallinks,
    });
  } catch (error) {
    console.error("Error creating Sociallinks:", error);
    res.status(500).json({ error: "Failed to create Sociallinks" });
  }
};

///getting all sociallinks --

module.exports.getSociallinks = async function (req, res) {
  try {
    const sociallinks = await Sociallinks.findAll({});
    if (sociallinks) {
      res.status(200).json(sociallinks);
    } else {
      res.status(404).json({ error: "No social links Returned" });
    }
  } catch (err) {
    console.error("Error fetching social links details", err);
    res.status(500).json({ error: "Internal Server Error" });
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
      res.status(200).json(SociallinksDetails);
    } else {
      res.status(404).json({ error: "Social Links Details not found" });
    }
  } catch (error) {
    console.error("Error getting by ID:", error);
    res
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
      if (!registrationId || registrationId===""){
        return res.status(404).json({error:"registration is not found"})
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
    res.status(200).json({
      message: "Social links record updated successfully",
      updatedSociallinksRecord: existingSociallinks.toJSON(),
    });
  } catch (error) {
    console.error("Error updating social links details:", error);
    res.status(500).json({ error: "Failed to update social links record" });
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
    res.status(200).json({ message: "link deleted successfully" });
  } catch (error) {
    console.error("Error deleting social link:", error);
    res.status(500).json({ error: "Failed to delete social link" });
  }
};
