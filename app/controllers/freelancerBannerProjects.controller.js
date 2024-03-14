const db = require('../models');
const FreelancerBannerProject = db.freelancerBannerProject;
const Registration = db.registration;
const path = require('path');
const fs = require('fs');

require('dotenv').config();
const USERS_BANNER_PATH = path.join(process.env.USERS_BANNER_PATH);
const serviceResponse = require('../config/serviceResponse');


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
    return res.status(serviceResponse.badRequest).json({ error: 'Registration not exist or Registration is not freelancer type' });
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
      return res.status(serviceResponse.saveSuccess).json({ message: serviceResponse.createdMessage, data: userBanner });
    } else {
      return res.status(serviceResponse.badRequest).json({ error: serviceResponse.errorCreatingRecord });
    }
  } else {
    return res.status(serviceResponse.badRequest).json({ error: 'Banner Image not provided' });
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
    return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
  }
  const { banner_name, registrationId } = req.body;
  let reg_id = userBanner.registrationId;
  if(registrationId) {
    reg_id = registrationId;
  }
  const registrationRecord = await Registration.findByPk(reg_id);
  if (!registrationRecord || registrationRecord.registration_type !== 3) {
    if (req.files['images']) {
      fs.unlinkSync(path.join(__dirname, '../..', USERS_BANNER_PATH, '/', req.files['images'][0].filename));
    }
    return res.status(serviceResponse.badRequest).json({ error: 'Registration not exist or Registration is not freelancer type' });
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
      registrationId: reg_id,
    }, {
      where: {
        id: userBannerId,
      },
      returning: true,
    });
    if (row>0) {
      return res.status(serviceResponse.ok).json({ message: serviceResponse.updatedMessage, data: bannerRecord[0] });
    } else {
      return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
    }
  } else {
    const [row, bannerRecord] = await FreelancerBannerProject.update({
      banner_name: banner_name,
      registrationId: reg_id,
    }, {
      where: {
        id: userBannerId,
      },
      returning: true,
    });
    if (row>0) {
      return res.status(serviceResponse.ok).json({ message: serviceResponse.updatedMessage, data: bannerRecord[0] });
    } else {
      return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
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
    return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, data: bannerUserRecord });
  } else {
    return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
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
    return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, data: bannerUserRecord });
  } else {
    return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
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
    return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
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
    return res.status(serviceResponse.ok).json({ message: serviceResponse.deletedMessage, data: userBannerToDelete });
  } else {
    return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
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
      return res.status(serviceResponse.badRequest).json({ error: serviceResponse.fieldNotExistMessage });
    }
    const records = await FreelancerBannerProject.findAll({
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


/**
 * Retrieve all Banner  details from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise representing the completion of the retrieval operation.
 */

module.exports.getAll = async function(req, res) {
  try {
    const maxLimit = 50;
    let { page, pageSize } = req.query;
    page = page ? page : 1;
    let offset = 0;
    if (page && pageSize) {
      pageSize = pageSize <= maxLimit ? pageSize : maxLimit;
      offset = (page - 1) * pageSize;
    }

    const { count, rows } = await FreelancerBannerProject.findAndCountAll({
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
    return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
  }
};

