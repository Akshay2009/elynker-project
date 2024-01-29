const db = require("../models");
const { Op, DataTypes, Sequelize } = require("sequelize");
const CityMaster = db.cityMaster;
const CurrencyMaster = db.currencyMaster;
const StateMaster = db.stateMaster;
const RegistrationTypesMaster=db.registrationTypesMaster;

//city master controller saving data in database---

module.exports.saveCityMaster = async function (req, res) {
  try {
    const { name } = req.body;
    const cityRecord = await CityMaster.create({
      name: name,
    });
    res.status(200).json(cityRecord);
  } catch (err) {
    console.error("Error saving city master:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//city master controller getting all data from database---

module.exports.getAllCityMasters = async function (req, res) {
  try {
    const allCityRecords = await CityMaster.findAll();
    res.status(200).json(allCityRecords);
  } catch (err) {
    console.error("Error fetching city masters:", err);
    res.status(500).json({ error: "Internal Server Error" });
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
    const allCityRecords = await CityMaster.findAll();
    res.status(200).json(allCityRecords);
  } catch (err) {
    console.error("Error fetching city masters:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//update city master--

module.exports.updateCityMasterById = async function (req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const [updatedRows] = await CityMaster.update({ name }, { where: { id } });
    if (updatedRows > 0) {
      const updatedMaster = await CityMaster.findByPk(id);
      if (updatedMaster) {
        res.json({
          message: "city updated successfully",
          Master: updatedMaster.toJSON(),
        });
      } else {
        res.status(404).json({ error: "city not found" });
      }
    } else {
      res.status(404).json({ error: "city not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//getting currency master details--

module.exports.getAllcurrencyMaster = async function (req, res) {
  try {
    const allCurrencyRecords = await CurrencyMaster.findAll();
    res.status(200).json(allCurrencyRecords);
  } catch (err) {
    console.error("Error fetching city masters:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//saving currency Master details--

module.exports.createCurrencyMaster = async function (req, res) {
  try {
    const { name, prefix, prefix_sign, country_name } = req.body;
    const newCurrencyRecord = await CurrencyMaster.create({
      name,
      prefix,
      prefix_sign,
      country_name,
    });
    res.status(201).json({
      message: "Currency record created successfully",
      newCurrencyRecord,
    });
  } catch (error) {
    console.error("Error creating currency master:", error);
    res.status(500).json({ error: "Failed to create currency record" });
  }
};

//updating currency master details--
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
    res.status(200).json({
      message: "Currency record updated successfully",
      updatedCurrencyRecord: existingCurrencyRecord,
    });
  } catch (error) {
    console.error("Error updating currency details:", error);
    res.status(500).json({ error: "Failed to update currency record" });
  }
};

//state master saving ----

module.exports.createStateMaster = async function (req, res) {
  try {
    const { name } = req.body;
    const newStateRecord = await StateMaster.create({
      name,
    });
    res.status(201).json({
      message: "State record created successfully",
      newStateRecord,
    });
  } catch (error) {
    console.error("Error creating state master:", error);
    res.status(500).json({ error: "Failed to create state record" });
  }
};

//getting state master details-
module.exports.getAllStateMaster = async function (req, res) {
  try {
    const getStateRecords = await StateMaster.findAll();
    res.status(200).json(getStateRecords);
  } catch (err) {
    console.error("Error fetching state masters:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//updating state masters by id--

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
    res.status(200).json({
      message:"State record updated successfully",
      updated_State_Record:existingStateRecord,
    });
  } catch (error) {
    console.error("Error updating state details:", error);
    res.status(500).json({ error:"Failed to update state record" });
  }
}

  //saving registration type master details--
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

    res.status(201).json({
      message: "Registration types records created successfully",
    });
  } catch (error) {
    console.error("Error creating registration type master:", error);
    res
      .status(500)
      .json({ error: "Failed to create registration type records" });
  }
};


