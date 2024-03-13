const db = require('../models');
const CityMaster = db.cityMaster;
const CurrencyMaster = db.currencyMaster;
const StateMaster = db.stateMaster;
const RegistrationTypesMaster = db.registrationTypesMaster;
const UnitMaster = db.unitMaster;
const SocialMediaMaster = db.socialMediaMaster;
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const SOCIAL_MEDIA_MASTER_PATH = path.join(
    process.env.SOCIAL_MEDIA_MASTER_PATH,
);
const { Sequelize } = require('sequelize');
const serviceResponse = require('../config/serviceResponse');

/**
 * Controller function to save City Master details---
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.saveCityMaster = async function(req, res) {
  const { name } = req.body;
  const cityRecord = await CityMaster.create({
    name: name,
  });
  return res
      .status(serviceResponse.saveSuccess)
      .json({ message: serviceResponse.createdMessage , data: cityRecord });
};

/**
 * Controller function to get all City Master details--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.getAllCityMasters = async function (req, res) {
  try {
    const { page, pageSize } = req.body;
    if (page && pageSize) {
      const offset = (page - 1) * pageSize;

      const { count, rows } = await CityMaster.findAndCountAll({
        limit: pageSize,
        offset: offset
      });
      if (count > 0) {
        return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, data: rows, total: count });
    } else {
        return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
    }
    } else {
      const { count, rows } = await CityMaster.findAndCountAll();

      if (count > 0) {
        return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, data: rows, total: count });
    } else {
        return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
    }
    }
  } catch (err) {
    console.error('Error retrieving data:', err);
    return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
  }
};

// city master controller getting data by ID from database---

module.exports.getCityMasters = async function(req, res) {
  const { id } = req.params;
  if (id) {
    const cityRecord = await CityMaster.findByPk(id);
    if (!cityRecord) {
      return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
    }
    return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage , data: cityRecord });
  }
};

/**
 * Controller function to update City Master details by Id--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.updateCityMasterById = async function(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const [updatedRows] = await CityMaster.update({ name }, { where: { id } });
  if (updatedRows > 0) {
    const updatedMaster = await CityMaster.findByPk(id);
    if (updatedMaster) {
      return res.status(serviceResponse.ok).json({
        message: serviceResponse.updatedMessage ,
        data: updatedMaster.toJSON(),
      });
    } else {
      return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
    }
  } else {
    return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
  }
};

/**
 * Controller function to Delete City Master details by Id--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.delCityMaster = async function(req, res) {
  const { city_id } = req.params;
  const delCity = await CityMaster.destroy({ where: { id: city_id } });
  if (delCity == 0) {
    return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
  }
  return res.status(serviceResponse.ok).json({ message: serviceResponse.deletedMessage });
};

/**
 * Controller function to get currency Master details--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.getAllcurrencyMaster = async function (req, res) {
  try {
    const { page, pageSize } = req.body;
    if (page && pageSize) {
      const offset = (page - 1) * pageSize;

      const { count, rows } = await CurrencyMaster.findAndCountAll({
        limit: pageSize,
        offset: offset
      });
      if (count > 0) {
        return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, data: rows, total: count });
    } else {
        return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
    }
    } else {
      const { count, rows } = await CurrencyMaster.findAndCountAll();

      if (count > 0) {
        return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, data: rows, total: count });
    } else {
        return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
    }
    }
  } catch (err) {
    console.error('Error retrieving data:', err);
    return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
  }
};
/**
 * Controller function to Get currency Master details by ID--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.getcurrencyMasterById = async function(req, res) {
  const id = req.params.id;
  const currency = await CurrencyMaster.findByPk(id);
  if (currency) {
    return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, data: currency });
  } else {
    return res.status(serviceResponse.badRequest).json({ error: serviceResponse.errorNotFound });
  }
};

/**
 * Controller function to save currency Master details--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.createCurrencyMaster = async function(req, res) {
  const { name, prefix, prefix_sign, country_name } = req.body;
  const newCurrencyRecord = await CurrencyMaster.create({
    name,
    prefix,
    prefix_sign,
    country_name,
  });
  return res.status(serviceResponse.saveSuccess).json({
    message: serviceResponse.createdMessage,
    data: newCurrencyRecord,
  });
};

/**
 * Controller function to update currency Master details by Id--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.updateCurrencyMasterById = async function(req, res) {
  const { id } = req.params;
  const { name, prefix, prefix_sign, country_name } = req.body;
  const existingCurrencyRecord = await CurrencyMaster.findByPk(id);
  if (!existingCurrencyRecord) {
    return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
  }
  await existingCurrencyRecord.update({
    name,
    prefix,
    prefix_sign,
    country_name,
  });
  return res.status(serviceResponse.ok).json({
    message: serviceResponse.updatedMessage,
    data: existingCurrencyRecord,
  });
};

/**
 * Controller function to save State Master details--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.createStateMaster = async function(req, res) {
  const { name } = req.body;
  const newStateRecord = await StateMaster.create({
    name,
  });
  return res.status(serviceResponse.saveSuccess).json({
    message: serviceResponse.createdMessage ,
    data: newStateRecord,
  });
};

/**
 * Controller function to get all State Master details--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.getAllStateMaster = async function (req, res) {
  try {
    const { page, pageSize } = req.body;
    if (page && pageSize) {
      const offset = (page - 1) * pageSize;

      const { count, rows } = await StateMaster.findAndCountAll({
        limit: pageSize,
        offset: offset
      });
      if (count > 0) {
        return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, data: rows, total: count });
    } else {
        return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
    }
    } else {
      const { count, rows } = await StateMaster.findAndCountAll();
      if (count > 0) {
        return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, data: rows, total: count });
    } else {
        return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
    }
    }
  } catch (err) {
    console.error('Error retrieving data:', err);
    return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
  }
};


/**
 * Controller function to get State Master details by Id--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.getStateMasterById = async function(req, res) {
  const { id } = req.params;
  const getStateRecords = await StateMaster.findByPk(id);
  if (getStateRecords) {
    return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, data: getStateRecords });
  } else {
    return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
  }
};

/**
 * Controller function to update State Master by Id--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.updateStateMaster = async function(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const existingStateRecord = await StateMaster.findByPk(id);
  if (!existingStateRecord) {
    return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
  }
  await existingStateRecord.update({
    name,
  });
  return res.status(serviceResponse.ok).json({
    message: serviceResponse.updatedMessage,
    data: existingStateRecord,
  });
};

/**
 * Controller function to save Registration Type Master--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.saveRegistrationTypeMaster = async function(req, res) {
  await RegistrationTypesMaster.create({
    id: 1,
    name: 'user',
  });

  await RegistrationTypesMaster.create({
    id: 2,
    name: 'b2b',
  });

  await RegistrationTypesMaster.create({
    id: 3,
    name: 'freelancer',
  });

  return res.status(serviceResponse.saveSuccess).json({
    message: serviceResponse.createdMessage,
  });
};

/**
 * Controller function to Delete City Master details by Id--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.delCurrencyMaster = async function(req, res) {
  const { currency_id } = req.params;
  const delCurrency = await CurrencyMaster.destroy({
    where: { id: currency_id },
  });
  if (delCurrency == 0) {
    return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
  }
  return res.status(serviceResponse.ok).json({ message: serviceResponse.deletedMessage });
};

/**
 * Controller function to Delete STATE Master details by Id--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.delStateMaster = async function(req, res) {
  const { state_id } = req.params;
  const delState = await StateMaster.destroy({
    where: { id: state_id },
  });
  if (delState == 0) {
    return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
  }
  return res.status(serviceResponse.ok).json({ message: serviceResponse.deletedMessage });
};

/**
 * Controller function to Create Unit Master ---
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.saveUnitMaster = async function(req, res) {
  try {
    const { name, description } = req.body;
    const saveUnit = await UnitMaster.create({ name, description });
    return res
        .status(serviceResponse.saveSuccess)
        .json({ success: serviceResponse.createdMessage, data: saveUnit });
  } catch (error) {
    console.error('Error creating Unit Master:', error);
    return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
  }
};

/**
 * Controller function to Update Unit Master Details ---
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.updateUnitMaster = async function(req, res) {
  try {
    const { unit_id } = req.params;
    const { name, description } = req.body;

    const existingUnitRecord = await UnitMaster.findByPk(unit_id);
    if (
      !unit_id ||
      unit_id == 0 ||
      unit_id === 'null' ||
      unit_id === 'undefined'
    ) {
      return res
          .status(serviceResponse.badRequest)
          .json({ error: 'Please provide valid UnitMaster Id to Update' });
    }
    if (!existingUnitRecord) {
      return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
    }

    await existingUnitRecord.update({
      name,
      description,
    });
    return res.status(serviceResponse.ok).json({
      message: serviceResponse.updatedMessage,
      data: existingUnitRecord,
    });
  } catch (error) {
    console.error('Error updating Unit Master:', error);
    return res.status(serviceResponse.internalServerError).json({ message: serviceResponse.internalServerErrorMessage });
  }
};

/**
 * Controller function to Get all Unit Master Details ---
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.getUnitMaster = async function (req, res) {
  try {
    const { page, pageSize } = req.body;
    if (page && pageSize) {
      const offset = (page - 1) * pageSize;

      const { count, rows } = await UnitMaster.findAndCountAll({
        limit: pageSize,
        offset: offset
      });
      if (count > 0) {
        return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, data: rows, total: count });
    } else {
        return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
    }
    } else {
      const { count, rows } = await UnitMaster.findAndCountAll();

      if (count > 0) {
        return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, data: rows, total: count });
    } else {
        return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
    }
    }
  } catch (err) {
    console.error('Error retrieving data:', err);
    return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
  }
};

/**
 * Controller function to Get Unit Master Details by ID---
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.getUnitmasterById = async function(req, res) {
  try {
    const { unit_id } = req.params;
    if (
      !unit_id ||
      unit_id == 0 ||
      unit_id === 'null' ||
      unit_id === 'undefined'
    ) {
      return res
          .status(serviceResponse.badRequest)
          .json({ error: 'Please provide valid Unit Master Id to get' });
    }
    const getUnitbyId = await UnitMaster.findByPk(unit_id);
    if (getUnitbyId) {
      return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, data: getUnitbyId });
    } else {
      return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
    }
  } catch (error) {
    console.error('Error Getting Unit Master:', error);
    return res.status(serviceResponse.internalServerError).json({ message: serviceResponse.internalServerErrorMessage });
  }
};

/**
 * Controller function to Delete Unit Master Details by ID---
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.delUnitmasterByid = async function(req, res) {
  try {
    const { unit_id } = req.params;
    if (
      !unit_id ||
      unit_id == 0 ||
      unit_id === 'null' ||
      unit_id === 'undefined'
    ) {
      return res
          .status(serviceResponse.badRequest)
          .json({ error: 'Please provide valid Unit Master Id to Delete' });
    }
    const delUnit = await db.unitMaster.destroy({ where: { id: unit_id } });
    if (delUnit) {
      return res
          .status(serviceResponse.ok)
          .json({ success: serviceResponse.deletedMessage });
    } else {
      return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound});
    }
  } catch (error) {
    console.error('Error deleting Unit Master:', error);
    return res.status(serviceResponse.internalServerError).json({ message: serviceResponse.internalServerErrorMessage});
  }
};

/**
 * Controller function to Save new Record of Social Media Master---
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.saveSocialMedia = async function(req, res) {
  try {
    const image = req.files['image'];
    const { media_name, is_active } = req.body;

    if (image && image.length > 0) {
      if (!media_name || !is_active) {
        fs.unlinkSync(
            path.join(
                __dirname,
                '../..',
                SOCIAL_MEDIA_MASTER_PATH,
                '/',
                image[0].filename,
            ),
        );
        return res
            .status(serviceResponse.badRequest)
            .json({ message: 'Kindly Provide media_name and is_active' });
      }
      const socialmedia = await SocialMediaMaster.create({
        media_image_path: image[0].filename,
        media_name: media_name,
        is_active: is_active,
      });
      if (socialmedia) {
        return res
            .status(serviceResponse.saveSuccess)
            .json({ message: serviceResponse.createdMessage, data: socialmedia });
      } else {
        fs.unlinkSync(
            path.join(
                __dirname,
                '../..',
                SOCIAL_MEDIA_MASTER_PATH,
                '/',
                image[0].filename,
            ),
        );
        return res
            .status(serviceResponse.badRequest)
            .json({ error: serviceResponse.errorCreatingRecord });
      }
    } else {
      return res
          .status(serviceResponse.badRequest)
          .json({ error: 'Please Upload Social Media Image' });
    }
  } catch (err) {
    if (err instanceof Sequelize.ValidationError) {
      fs.unlinkSync(
          path.join(
              __dirname,
              '../..',
              SOCIAL_MEDIA_MASTER_PATH,
              '/',
              req.files['image'][0].filename,
          ),
      );
      return res.status(serviceResponse.badRequest).json({ error: err.message });
    }
    return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
  }
};

/**
 * Controller function to Update Record of Social Media Master by ID---
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.updateSocialMedia = async function(req, res) {
  try {
    const socialMediaMasterId = req.params.socialMediaMasterId;

    const { media_name, is_active } = req.body;

    if (req.files['image']) {
      const image = req.files['image'];
      const socialMediaMasterRecord = await SocialMediaMaster.findByPk(
          socialMediaMasterId,
      );
      if (!socialMediaMasterRecord) {
        fs.unlinkSync(
            path.join(
                __dirname,
                '../..',
                SOCIAL_MEDIA_MASTER_PATH,
                '/',
                image[0].filename,
            ),
        );
        return res
            .status(serviceResponse.notFound)
            .json({
              message:
              serviceResponse.errorNotFound,
            });
      }
      const dummypath = socialMediaMasterRecord.media_image_path;

      const [rowUpdated, socialmedia] = await SocialMediaMaster.update(
          {
            media_image_path: image[0].filename,
            media_name: media_name,
            is_active: is_active,
          },
          {
            where: {
              id: socialMediaMasterId,
            },
            returning: true,
          },
      );
      if (rowUpdated > 0) {
        fs.unlinkSync(
            path.join(
                __dirname,
                '../..',
                SOCIAL_MEDIA_MASTER_PATH,
                '/',
                dummypath,
            ),
        );
        return res
            .status(serviceResponse.ok)
            .json({
              message: serviceResponse.updatedMessage,
              data: socialmedia[0],
            });
      } else {
        fs.unlinkSync(
            path.join(
                __dirname,
                '../..',
                SOCIAL_MEDIA_MASTER_PATH,
                '/',
                image[0].filename,
            ),
        );
        return res
            .status(serviceResponse.badRequest)
            .json({ error: 'Error in Updating Social Media Master' });
      }
    } else {
      const socialMediaMasterRecord = await SocialMediaMaster.findByPk(socialMediaMasterId);
      if (!socialMediaMasterRecord) {
        return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
      }
      const [rowUpdated, socialmedia] = await SocialMediaMaster.update(
          {
            media_name: media_name,
            is_active: is_active,
          },
          {
            where: {
              id: socialMediaMasterId,
            },
            returning: true,
          },
      );
      if (rowUpdated>0) {
        return res.status(serviceResponse.ok).json({ message: serviceResponse.updatedMessage, data: socialmedia[0] });
      } else {
        return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
      }
    }
  } catch (err) {
    if (err instanceof Sequelize.ValidationError) {
      return res.status(serviceResponse.badRequest).json({ error: err.message });
    }
    return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
  }
};

/**
 * Controller function to Get Record of Social Media Master by ID--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.getSocialMedia= async function (req, res) {
  try {
      const { page, pageSize } = req.body;
      if (page && pageSize) {
          const offset = (page - 1) * pageSize;

          const { count, rows } = await SocialMediaMaster.findAndCountAll({
              limit: pageSize,
              offset: offset
          });
          if (count > 0) {
            return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, data: rows, total: count });
        } else {
            return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
        }
      } else {
          const { count, rows } = await SocialMediaMaster.findAndCountAll();

          if (count > 0) {
            return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, data: rows, total: count });
        } else {
            return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
        }
      }
  } catch (err) {
    console.error('Error retrieving data:', err);
    return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
  }
};



/**
 * Controller function to Delete Record of Social Media Master---
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.delSocialMediaMaster = async function(req, res) {
  try {
    const socialMediaMasterId = req.params.socialMediaMasterId;
    const delrecord = await SocialMediaMaster.findByPk(socialMediaMasterId);
    if (!delrecord) {
      return res.status(serviceResponse.badRequest).json({ message: serviceResponse.errorNotFound });
    }
    if (delrecord) {
      if (delrecord.media_image_path) {
        fs.unlinkSync(
            path.join(
                __dirname,
                '../..',
                SOCIAL_MEDIA_MASTER_PATH,
                '/',
                delrecord.media_image_path,
            ),
        );
      }
    }
    const recordtodel = await SocialMediaMaster.destroy({ where: { id: socialMediaMasterId } });
    if (recordtodel > 0) {
      return res.status(serviceResponse.ok).json({ message: serviceResponse.deletedMessage, data: delrecord });
    } else {
      return res.status(serviceResponse.notFound).json({ message: serviceResponse.errorNotFound });
    }
  } catch (err) {
    return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
  }
};

/**
 * Controller function to Get Record of Social Media Master by ID--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.getSocialMediaById = async function(req, res) {
  try {
    const { social_id } = req.params;
    console.log(social_id);
    const Records = await SocialMediaMaster.findByPk(social_id);
    if (Records) {
      return res
          .status(serviceResponse.ok)
          .json({ message: serviceResponse.getMessage, data: Records });
    } else {
      return res
          .status(serviceResponse.notFound)
          .json({ message: serviceResponse.errorNotFound });
    }
  } catch (err) {
    if (err instanceof Sequelize.Error) {
      return res.status(serviceResponse.badRequest).json({ error: err.message });
    }
    return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
  }
};


/**
 * Search Social Media Master by fieldName and  fieldValue from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise representing the completion of the retrieval operation.
 */

module.exports.searchSocialMediaMaster = async function(req, res) {
  try {
    const { fieldName, fieldValue } = req.params;
    if (!SocialMediaMaster.rawAttributes[fieldName]) {
      return res.status(serviceResponse.badRequest).json({ error: serviceResponse.fieldNotExistMessage });
    }
    const records = await SocialMediaMaster.findAll({
      where: {
        [fieldName]: fieldValue,
      },
    });
    if (records.length > 0) {
      return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, data: records });
    } else {
      return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound});
    }
  } catch (err) {
    if (err instanceof Sequelize.Error) {
      return res.status(serviceResponse.badRequest).json({ error: err.message });
    }
    return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
  }
};

/**
 * Controller function to get City Master details by fieldName and  fieldValue from the database---
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.searchCityMaster = async function(req, res) {
  try {
    const { fieldName, fieldValue } = req.params;
    if (!CityMaster.rawAttributes[fieldName]) {
      return res.status(serviceResponse.badRequest).json({ error: serviceResponse.fieldNotExistMessage });
    }
    const records = await CityMaster.findAll({
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
 * Controller function to get CurrencyMaster details by fieldName and  fieldValue from the database---
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.searchCurrencyMaster = async function(req, res) {
  try {
    const { fieldName, fieldValue } = req.params;
    if (!CurrencyMaster.rawAttributes[fieldName]) {
      return res.status(serviceResponse.badRequest).json({ error: serviceResponse.fieldNotExistMessage });
    }
    const records = await CurrencyMaster.findAll({
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
 * Controller function to get StateMaster details by fieldName and  fieldValue from the database---
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.searchStateMaster = async function(req, res) {
  try {
    const { fieldName, fieldValue } = req.params;
    if (!StateMaster.rawAttributes[fieldName]) {
      return res.status(serviceResponse.badRequest).json({ error: serviceResponse.fieldNotExistMessage });
    }
    const records = await StateMaster.findAll({
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
 * Controller function to get UnitMaster details by fieldName and  fieldValue from the database---
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.searchUnitMaster = async function(req, res) {
  try {
    const { fieldName, fieldValue } = req.params;
    if (!UnitMaster.rawAttributes[fieldName]) {
      return res.status(serviceResponse.badRequest).json({ error: serviceResponse.fieldNotExistMessage });
    }
    const records = await UnitMaster.findAll({
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


