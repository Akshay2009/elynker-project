const db = require("../models");
const { Op, DataTypes, Sequelize } = require("sequelize");
const CityMaster = db.cityMaster;
const CurrencyMaster = db.currencyMaster;
const StateMaster = db.stateMaster;
const RegistrationTypesMaster = db.registrationTypesMaster;

/**
 * Controller function to save City Master details---
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.saveCityMaster = async function (req, res) {
  try {
    const { name } = req.body;
    const cityRecord = await CityMaster.create({
      name: name,
    });
    return res.status(200).json({message:"City Record saved Succesfully",cityRecord});
  } catch (err) {
    console.error("Error saving city master:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Controller function to get all City Master details--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.getAllCityMasters = async function (req, res) {
  try {
    const allCityRecords = await CityMaster.findAll();
    return res.status(200).json(allCityRecords);
  } catch (err) {
    console.error("Error fetching city masters:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//city master controller getting data by ID from database---

module.exports.getCityMasters = async function (req, res) {
  try {
    const { id } = req.params;
    if (id) {
      const cityRecord = await CityMaster.findByPk(id);
      if (!cityRecord) {
        return res.status(404).json({ error: "City not found" });
      }
      return res.status(200).json(cityRecord);
    }
  } catch (err) {
    console.error("Error fetching city masters:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Controller function to update City Master details by Id--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.updateCityMasterById = async function (req, res) {
  try {
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
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Controller function to Delete City Master details by Id--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.delCityMaster = async function (req, res) {
  try {
    const { city_id } = req.params;
    const delCity = await CityMaster.destroy({ where: { id: city_id } });
    if (delCity == 0) {
      return res.status(404).json({ error: "city not found" });
    }
    return res.status(200).json({ message: "City deleted successfully" });
  } catch (error) {
    console.error("Error deleting city:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Controller function to get currency Master details--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.getAllcurrencyMaster = async function (req, res) {
  try {
    const allCurrencyRecords = await CurrencyMaster.findAll();
    return res.status(200).json(allCurrencyRecords);
  } catch (err) {
    console.error("Error fetching city masters:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
/**
 * Controller function to Get currency Master details by ID--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.getcurrencyMasterById = async function (req, res) {
  try {
    const id = req.params.id;
    const currency = await CurrencyMaster.findByPk(id);
    if(currency){
      return res.status(200).json(currency);
    }else{
      return res.status(404).json({error: 'No Currency Found'});
    }
    
  } catch (err) {
    console.error("Error fetching city masters:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Controller function to save currency Master details--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.createCurrencyMaster = async function (req, res) {
  try {
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
  } catch (error) {
    console.error("Error creating currency master:", error);
    return res.status(500).json({ error: "Failed to create currency record" });
  }
};

/**
 * Controller function to update currency Master details by Id--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.updateCurrencyMasterById = async function (req, res) {
  try {
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
  } catch (error) {
    console.error("Error updating currency details:", error);
    return res.status(500).json({ error: "Failed to update currency record" });
  }
};

/**
 * Controller function to save State Master details--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.createStateMaster = async function (req, res) {
  try {
    const { name } = req.body;
    const newStateRecord = await StateMaster.create({
      name,
    });
    return res.status(201).json({
      message: "State record created successfully",
      newStateRecord,
    });
  } catch (error) {
    console.error("Error creating state master:", error);
    return res.status(500).json({ error: "Failed to create state record" });
  }
};

/**
 * Controller function to get all State Master details--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.getAllStateMaster = async function (req, res) {
  try {
    const getStateRecords = await StateMaster.findAll();
    return res.status(200).json(getStateRecords);
  } catch (err) {
    console.error("Error fetching state masters:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
/**
 * Controller function to update State Master by Id--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.updateStateMaster = async function (req, res) {
  try {
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
  } catch (error) {
    console.error("Error updating state details:", error);
    return res.status(500).json({ error: "Failed to update state record" });
  }
};

/**
 * Controller function to save Registration Type Master--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.saveRegistrationTypeMaster = async function (req, res) {
  try {
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
  } catch (error) {
    console.error("Error creating registration type master:", error);
    return res
      .status(500)
      .json({ error: "Failed to create registration type records" });
  }
};
/**
 * Controller function to Delete City Master details by Id--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.delCurrencyMaster = async function (req, res) {
  try {
    const { currency_id } = req.params;
    const delCurrency = await CurrencyMaster.destroy({
      where: { id: currency_id },
    });
    if (delCurrency == 0) {
      return res.status(404).json({ error: "currency not found" });
    }
    return res.status(200).json({ message: "Currency deleted successfully" });
  } catch (error) {
    console.error("Error deleting Currency:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
/**
 * Controller function to Delete STATE Master details by Id--
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.delStateMaster = async function (req, res) {
  try {
    const { state_id } = req.params;
    const delState = await StateMaster.destroy({
      where: { id: state_id },
    });
    if (delState == 0) {
      return res.status(404).json({ error: "State not found" });
    }
    return res.status(200).json({ message: "State deleted successfully" });
  } catch (error) {
    console.error("Error deleting State:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
