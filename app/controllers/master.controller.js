const db = require("../models");
const { Op, DataTypes, Sequelize } = require("sequelize");
const CityMaster = db.cityMaster;

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

//city master controller ghetting data by ID from database---

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

    // Perform the update operation
    const [updatedRows] = await CityMaster.update({ name }, { where: { id } });

    if (updatedRows > 0) {
      // Fetch the updated record from the database
      const updatedMaster = await CityMaster.findByPk(id);

      if (updatedMaster) {
        res.json({
          message: "User updated successfully",
          Master: updatedMaster.toJSON(),
        });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
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

//putting currency Master details--