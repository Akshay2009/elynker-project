const db = require("../models");
const CityMaster = db.cityMaster;
const CurrencyMaster = db.currencyMaster;
const StateMaster = db.stateMaster;
const RegistrationTypesMaster = db.registrationTypesMaster;
const UnitMaster = db.unitMaster;
const SocialMedia_Master = db.socialmedia_master;
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const SOCIAL_MEDIA_MASTER_PATH = path.join(
  process.env.SOCIAL_MEDIA_MASTER_PATH
);
const { Sequelize } = require('sequelize');

/**
 * Controller function to save City Master details---
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.saveCityMaster = async function (req, res) {
  const { name } = req.body;
  const cityRecord = await CityMaster.create({
    name: name,
  });
  return res
    .status(200)
    .json({ message: "City Record saved Succesfully", cityRecord });
};

/**
 * Controller function to get all City Master details--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.getAllCityMasters = async function (req, res) {
  const allCityRecords = await CityMaster.findAll();
  return res.status(200).json(allCityRecords);
};

//city master controller getting data by ID from database---

module.exports.getCityMasters = async function (req, res) {
  const { id } = req.params;
  if (id) {
    const cityRecord = await CityMaster.findByPk(id);
    if (!cityRecord) {
      return res.status(404).json({ error: "City not found" });
    }
    return res.status(200).json(cityRecord);
  }
};

/**
 * Controller function to update City Master details by Id--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.updateCityMasterById = async function (req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const [updatedRows] = await CityMaster.update({ name }, { where: { id } });
  if (updatedRows > 0) {
    const updatedMaster = await CityMaster.findByPk(id);
    if (updatedMaster) {
      return res.status(200).json({
        message: "city updated successfully",
        Master: updatedMaster.toJSON(),
      });
    } else {
      return res.status(404).json({ error: "city not found" });
    }
  } else {
    return res.status(404).json({ error: "city not found" });
  }
};

/**
 * Controller function to Delete City Master details by Id--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.delCityMaster = async function (req, res) {
  const { city_id } = req.params;
  const delCity = await CityMaster.destroy({ where: { id: city_id } });
  if (delCity == 0) {
    return res.status(404).json({ error: "city not found" });
  }
  return res.status(200).json({ message: "City deleted successfully" });
};

/**
 * Controller function to get currency Master details--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.getAllcurrencyMaster = async function (req, res) {
  const allCurrencyRecords = await CurrencyMaster.findAll();
  return res.status(200).json(allCurrencyRecords);
};
/**
 * Controller function to Get currency Master details by ID--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.getcurrencyMasterById = async function (req, res) {
  const id = req.params.id;
  const currency = await CurrencyMaster.findByPk(id);
  if (currency) {
    return res.status(200).json(currency);
  } else {
    return res.status(404).json({ error: "No Currency Found" });
  }
};

/**
 * Controller function to save currency Master details--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.createCurrencyMaster = async function (req, res) {
  const { name, prefix, prefix_sign, country_name } = req.body;
  const newCurrencyRecord = await CurrencyMaster.create({
    name,
    prefix,
    prefix_sign,
    country_name,
  });
  return res.status(201).json({
    message: "Currency record created successfully",
    newCurrencyRecord,
  });
};

/**
 * Controller function to update currency Master details by Id--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.updateCurrencyMasterById = async function (req, res) {
  const { id } = req.params;
  const { name, prefix, prefix_sign, country_name } = req.body;
  const existingCurrencyRecord = await CurrencyMaster.findByPk(id);
  if (!existingCurrencyRecord) {
    return res.status(404).json({ error: "Currency not found" });
  }
  await existingCurrencyRecord.update({
    name,
    prefix,
    prefix_sign,
    country_name,
  });
  return res.status(200).json({
    message: "Currency record updated successfully",
    updatedCurrencyRecord: existingCurrencyRecord,
  });
};

/**
 * Controller function to save State Master details--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.createStateMaster = async function (req, res) {
  const { name } = req.body;
  const newStateRecord = await StateMaster.create({
    name,
  });
  return res.status(201).json({
    message: "State record created successfully",
    newStateRecord,
  });
};

/**
 * Controller function to get all State Master details--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.getAllStateMaster = async function (req, res) {
  const getStateRecords = await StateMaster.findAll();
  return res.status(200).json(getStateRecords);
};

/**
 * Controller function to update State Master by Id--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.updateStateMaster = async function (req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const existingStateRecord = await StateMaster.findByPk(id);
  if (!existingStateRecord) {
    return res.status(404).json({ error: "State not found" });
  }
  await existingStateRecord.update({
    name,
  });
  return res.status(200).json({
    message: "State record updated successfully",
    updated_State_Record: existingStateRecord,
  });
};

/**
 * Controller function to save Registration Type Master--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.saveRegistrationTypeMaster = async function (req, res) {
  await RegistrationTypesMaster.create({
    id: 1,
    name: "user",
  });

  await RegistrationTypesMaster.create({
    id: 2,
    name: "b2b",
  });

  await RegistrationTypesMaster.create({
    id: 3,
    name: "freelancer",
  });

  return res.status(201).json({
    message: "Registration types records created successfully",
  });
};

/**
 * Controller function to Delete City Master details by Id--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.delCurrencyMaster = async function (req, res) {
  const { currency_id } = req.params;
  const delCurrency = await CurrencyMaster.destroy({
    where: { id: currency_id },
  });
  if (delCurrency == 0) {
    return res.status(404).json({ error: "currency not found" });
  }
  return res.status(200).json({ message: "Currency deleted successfully" });
};

/**
 * Controller function to Delete STATE Master details by Id--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.delStateMaster = async function (req, res) {
  const { state_id } = req.params;
  const delState = await StateMaster.destroy({
    where: { id: state_id },
  });
  if (delState == 0) {
    return res.status(404).json({ error: "State not found" });
  }
  return res.status(200).json({ message: "State deleted successfully" });
};

/**
 * Controller function to Create Unit Master ---
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.saveUnitMaster = async function (req, res) {
  try {
    const { name, description } = req.body;
    const saveUnit = await UnitMaster.create({ name, description });
    return res
      .status(200)
      .json({ success: "unit saved sucessfully", saveUnit });
  } catch (error) {
    console.error("Error creating Unit Master:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Controller function to Update Unit Master Details ---
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.updateUnitMaster = async function (req, res) {
  try {
    const { unit_id } = req.params;
    const { name, description } = req.body;

    const existingUnitRecord = await UnitMaster.findByPk(unit_id);
    if (
      !unit_id ||
      unit_id == 0 ||
      unit_id === "null" ||
      unit_id === "undefined"
    ) {
      return res
        .status(404)
        .json({ error: "Please provide valid UnitMaster Id to Update" });
    }
    if (!existingUnitRecord) {
      return res.status(404).json({ error: "UnitMaster not found" });
    }

    await existingUnitRecord.update({
      name,
      description,
    });
    return res.status(200).json({
      message: "UnitMaster record updated successfully",
      updated_Unit_Record: existingUnitRecord,
    });
  } catch (error) {
    console.error("Error updating Unit Master:", error);
    return res.status(500).json({ message: "internal server error" });
  }
};

/**
 * Controller function to Get all Unit Master Details ---
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.getUnitMaster = async function (req, res) {
  try {
    const getUnitmaster = await UnitMaster.findAll();
    return res.status(200).json(getUnitmaster);
  } catch (error) {
    console.error("Error Getting Unit Master:", error);
    return res.status(500).json({ message: "internal server error" });
  }
};

/**
 * Controller function to Get Unit Master Details by ID---
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.getUnitmasterById = async function (req, res) {
  try {
    const { unit_id } = req.params;
    if (
      !unit_id ||
      unit_id == 0 ||
      unit_id === "null" ||
      unit_id === "undefined"
    ) {
      return res
        .status(404)
        .json({ error: "Please provide valid Unit Master Id to get" });
    }
    const getUnitbyId = await UnitMaster.findByPk(unit_id);
    if (getUnitbyId) {
      return res.status(200).json(getUnitbyId);
    } else {
      return res.status(404).json({ error: "Unit Master details not found" });
    }
  } catch (error) {
    console.error("Error Getting Unit Master:", error);
    return res.status(500).json({ message: "internal server error" });
  }
};

/**
 * Controller function to Delete Unit Master Details by ID---
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.delUnitmasterByid = async function (req, res) {
  try {
    const { unit_id } = req.params;
    if (
      !unit_id ||
      unit_id == 0 ||
      unit_id === "null" ||
      unit_id === "undefined"
    ) {
      return res
        .status(404)
        .json({ error: "Please provide valid Unit Master Id to Delete" });
    }
    const delUnit = await db.unitMaster.destroy({ where: { id: unit_id } });
    if (delUnit) {
      return res
        .status(200)
        .json({ success: "Unit Master deleted successfully" });
    } else {
      return res.status(404).json({ error: "Unit Master details not found" });
    }
  } catch (error) {
    console.error("Error deleting Unit Master:", error);
    return res.status(500).json({ message: "internal server error" });
  }
};

/**
 * Controller function to Save new Record of Social Media Master---
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.saveSocialMedia = async function (req, res) {
  try {
    const image = req.files["image"];
    const { media_name, is_active } = req.body;

    if (image && image.length > 0) {
      if (!media_name || !is_active) {
        fs.unlinkSync(
          path.join(
            __dirname,
            "../..",
            SOCIAL_MEDIA_MASTER_PATH,
            "/",
            image[0].filename
          )
        );
        return res
          .status(400)
          .json({ message: "Kindly Provide media_name and is_active" });
      }
      const socialmedia = await SocialMedia_Master.create({
        media_image_path: image[0].filename,
        media_name: media_name,
        is_active: is_active,
      });
      if (socialmedia) {
        return res
          .status(201)
          .json({ message: "Social Media Master Saved", data: socialmedia });
      } else {
        fs.unlinkSync(
          path.join(
            __dirname,
            "../..",
            SOCIAL_MEDIA_MASTER_PATH,
            "/",
            image[0].filename
          )
        );
        return res
          .status(400)
          .json({ error: "Error in creating Social Media Master" });
      }
    } else {
      return res
        .status(400)
        .json({ error: "Please Upload Social Media Image" });
    }
  } catch (err) {
    if (err instanceof Sequelize.ValidationError) {
      fs.unlinkSync(
        path.join(
          __dirname,
          "../..",
          SOCIAL_MEDIA_MASTER_PATH,
          "/",
          req.files["image"][0].filename
        )
      );
      return res.status(400).json({ error: err.message })
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Controller function to Update Record of Social Media Master by ID---
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.updateSocialMedia = async function (req, res) {
  try {
    const socialMediaMasterId = req.params.socialMediaMasterId;
    const image = req.files["image"];
    const { media_name, is_active } = req.body;

    if (image && image.length > 0) {
      const socialMediaMasterRecord = await SocialMedia_Master.findByPk(
        socialMediaMasterId
      );
      if (!media_name || !is_active || !socialMediaMasterRecord) {
        fs.unlinkSync(
          path.join(
            __dirname,
            "../..",
            SOCIAL_MEDIA_MASTER_PATH,
            "/",
            image[0].filename
          )
        );
        return res
          .status(400)
          .json({
            message:
              "Kindly Provide media_name and is_active or Social Media Master Record not exist for the provided id",
          });
      }
      const dummypath = socialMediaMasterRecord.media_image_path;

      const [rowUpdated, socialmedia] = await SocialMedia_Master.update(
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
        }
      );
      if (rowUpdated > 0) {
        fs.unlinkSync(
          path.join(
            __dirname,
            "../..",
            SOCIAL_MEDIA_MASTER_PATH,
            "/",
            dummypath
          )
        );
        return res
          .status(201)
          .json({
            message: "Social Media Master Updated",
            data: socialmedia[0],
          });
      } else {
        fs.unlinkSync(
          path.join(
            __dirname,
            "../..",
            SOCIAL_MEDIA_MASTER_PATH,
            "/",
            image[0].filename
          )
        );
        return res
          .status(400)
          .json({ error: "Error in Updating Social Media Master" });
      }
    } else {
      return res
        .status(400)
        .json({ error: "Please Upload Social Media Image" });
    }
  } catch (err) {
    if (err instanceof Sequelize.ValidationError) {
      if (err instanceof Sequelize.ValidationError) {
        fs.unlinkSync(
          path.join(
            __dirname,
            "../..",
            SOCIAL_MEDIA_MASTER_PATH,
            "/",
            req.files["image"][0].filename
          )
        );
        return res.status(400).json({ error: err.message })
      }
      return res.status(400).json({ error: err.message })
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Controller function to Get Record of Social Media Master by ID--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.getSocialMediaById = async function (req, res) {
  try {
    const { socialMediaMasterId } = req.params;
    const Records = await SocialMedia_Master.findByPk(socialMediaMasterId);
    if (Records) {
      return res
        .status(200)
        .json({ message: "details fetched successfully", data: Records });
    } else {
      return res
        .status(404)
        .json({ message: "details not found with this Social Media Id" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


/**
 * Controller function to Delete Record of Social Media Master by ID---
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.delSocialMediaMaster = async function (req, res) {
  try {
    const socialMediaMasterId = req.params.socialMediaMasterId;
    const delrecord = await SocialMedia_Master.findByPk(socialMediaMasterId)
    if (!delrecord) {
      return res.status(404).json({ message: "Record not found with this Id." })
    }
    if (delrecord) {
      if (delrecord.media_image_path) {
        fs.unlinkSync(
          path.join(
            __dirname,
            "../..",
            SOCIAL_MEDIA_MASTER_PATH,
            "/",
            delrecord.media_image_path
          )
        );
      }
    }
    const recordtodel = await SocialMedia_Master.destroy({ where: { id: socialMediaMasterId } })
    if (recordtodel > 0) {
      return res.status(200).json({ message: "Social Media Master Record Deleted Successfully", data: delrecord })
    } else {
      return res.status(404).json({ message: "Record not found with this Id." })
    }
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}