const db = require('../models');
const FreelancerBannerProject = db.freelancerBannerProject;
const Registration = db.registration;
const path = require('path');
const fs = require('fs');
const { error } = require('console');
require('dotenv').config();
const USERS_BANNER_PATH = path.join(process.env.USERS_BANNER_PATH);


/**
 * Controller function to Create Records UsersBanner Table with provided registrationIds
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.createUsersBanner = async function(req, res) {
  const registrationId = req.params.registrationId;
  const registrationRecord = await Registration.findByPk(registrationId);
  if (!registrationRecord || registrationRecord.registration_type !== 3) {
    if (req.files['images']) {
      fs.unlinkSync(path.join(__dirname, '../..', USERS_BANNER_PATH, '/', req.files['images'][0].filename));
    }
    return res.status(404).json({ error: 'Registration not exist or Registration is not freelancer type' });
  }
  const { banner_name } = req.body;
  if (!banner_name) {
    fs.unlinkSync(path.join(__dirname, '../..', USERS_BANNER_PATH, '/', req.files['images'][0].filename));
    return res.status(400).json({ error: 'Please Provide Banner Name' });
  }
  let bannerImages;
  if (req.files['images']) {
    bannerImages = req.files['images'];
  }

  if (bannerImages && bannerImages.length > 0) {
    const userBanner = await FreelancerBannerProject.create({
      banner_name: banner_name,
      banner_image: bannerImages[0].filename,
      registrationId: registrationId,
    });
    if (userBanner) {
      return res.status(201).json({ message: 'Banner Record Created', data: userBanner });
    } else {
      return res.status(400).json({ error: 'Banner Record not created' });
    }
  } else {
    return res.status(400).json({ error: 'Banner Image not provided' });
  }
};

/**
 *
 * Controller function to update Record only banner_name and banner_image based on userBannerId
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.updateUsersBanner = async function(req, res) {
  const userBannerId = req.params.userBannerId;
  const userBanner = await FreelancerBannerProject.findByPk(userBannerId);
  if (!userBanner) {
    return res.status(404).json({ error: 'No record found with provided userBannerId' });
  }
  const { banner_name, registrationId } = req.body;

  const registrationRecord = await Registration.findByPk(registrationId);
  if (!registrationRecord || registrationRecord.registration_type !== 3) {
    if (req.files['images']) {
      fs.unlinkSync(path.join(__dirname, '../..', USERS_BANNER_PATH, '/', req.files['images'][0].filename));
    }
    return res.status(404).json({ error: 'Registration not exist or Registration is not freelancer type' });
  }

  let bannerImages;
  if (req.files['images']) {
    bannerImages = req.files['images'];
  }
  if (bannerImages && bannerImages.length > 0) {
    if (userBanner.banner_image) {
      fs.unlinkSync(path.join(__dirname, '../..', USERS_BANNER_PATH, '/', userBanner.banner_image));
    }
    const [row, bannerRecord] = await FreelancerBannerProject.update({
      banner_image: bannerImages[0].filename,
      banner_name: banner_name,
      registrationId: registrationId,
    }, {
      where: {
        id: userBannerId,
      },
      returning: true,
    });
    if (row>0) {
      return res.status(200).json({ message: 'UserBanner Updated Successfully', data: bannerRecord[0] });
    } else {
      return res.status(400).json({ error: 'Record not updated' });
    }
  } else {
    const [row, bannerRecord] = await FreelancerBannerProject.update({
      banner_name: banner_name,
      registrationId: registrationId,
    }, {
      where: {
        id: userBannerId,
      },
      returning: true,
    });
    if (row>0) {
      return res.status(200).json({ message: 'UserBanner Updated Successfully', data: bannerRecord[0] });
    } else {
      return res.status(400).json({ error: 'Record not updated' });
    }
  }
};

/**
 * Controller function to get UsersBanner record based on userBannerId
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.getUsersBannerById = async function(req, res) {
  const userBannerId = req.params.userBannerId;
  const bannerUserRecord = await FreelancerBannerProject.findOne({
    where: {
      id: userBannerId,
    },
  });
  if (bannerUserRecord) {
    return res.status(200).json({ message: 'Fetched Record', data: bannerUserRecord });
  } else {
    return res.status(400).json({ error: 'No UserBanner Record with id Present' });
  }
};

/**
 * Controller function to get all UsersBanner record based on registrationId
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.getUsersBannerByRegistrationId = async function(req, res) {
  const registrationId = req.params.registrationId;
  const bannerUserRecord = await FreelancerBannerProject.findAll({
    where: {
      registrationId: registrationId,
    },
  });
  if (bannerUserRecord) {
    return res.status(200).json({ message: 'UsersBanner Record with Registration Id', data: bannerUserRecord });
  } else {
    return res.status(400).json({ error: 'No UserBanner Record with Registration id Present' });
  }
};

/**
 * Controller function to delete UsersBanner record based on userBannerId
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.deleteUsersBanner = async function(req, res) {
  const userBannerId = req.params.userBannerId;
  const userBannerToDelete = await FreelancerBannerProject.findOne({
    where: {
      id: userBannerId,
    },
  });
  if (!userBannerToDelete) {
    return res.status(404).json({ error: 'No Product found' });
  }
  if (userBannerToDelete.banner_image) {
    fs.unlinkSync(path.join(__dirname, '../..', USERS_BANNER_PATH, '/', userBannerToDelete.banner_image));
  }
  const deletedUserBanner = await FreelancerBannerProject.destroy({
    where: {
      id: userBannerId,
    },
    returning: true,
    raw: true,
  });
  if (deletedUserBanner) {
    return res.status(200).json({ message: 'UserBanner Deleted Successfully', data: userBannerToDelete });
  } else {
    return res.status(401).json({ error: 'No UserBanner Deleted' });
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
    if (!FreelancerBannerProject.rawAttributes[fieldName]) {
      return res.status(400).json({ error: 'Invalid field name' });
    }
    const records = await FreelancerBannerProject.findAll({
      where: {
        [fieldName]: fieldValue,
      },
    });
    if (records.length > 0) {
      return res.status(200).json({ message: 'Fetched Records', data: records });
    } else {
      return res.status(404).json({ error: 'No record found' });
    }
  } catch (err) {
    if (err instanceof Sequelize.Error) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


/**
 * Retrieve all Banner  details from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise representing the completion of the retrieval operation.
 */

module.exports.getAll = async function(req, res) {
  try {
    const records = await FreelancerBannerProject.findAll({});
    if (records.length > 0) {
      return res.status(200).json({ message: 'Details fetched successfully', data: records });
    } else {
      return res.status(404).json({ error: 'details not found' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
