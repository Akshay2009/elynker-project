const db = require('../models');
const AdminModules = db.adminModules;
const { Op } = require('sequelize');

/**
 * Controller function to create a admin module record .
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.createAdminModule = async function (req, res) {
    const { name, description, is_active } = req.body;
    const newAdminRecord = await AdminModules.create({
        name,
        description,
        is_active
    });
    return res.status(201).json({
        message: 'Admin Module created successfully',
        data: newAdminRecord,
    });
};

/**
 * Controller function to get all admin module record .
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

module.exports.getAdminModule = async function (req, res) {
    try {
        const AdminModuleRecords = await AdminModules.findAll({});
        if (AdminModuleRecords.length > 0) {
            return res
                .status(200)
                .json({ message: 'Details fetched successfully', data: AdminModuleRecords });
        } else {
            return res
                .status(404)
                .json({ error: 'details not found' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

/**
 * Controller function to get admin module record by Id.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.getAdminModuleById = async function (req, res) {
    const { adminId } = req.params;
    const AdminModulesById = await AdminModules.findOne({
        where: { id: adminId },
    });

    if (AdminModulesById) {
        return res.status(200).json({ message: 'Admin Modules Details Fetched Successfully', data: AdminModulesById });
    } else {
        return res.status(404).json({ error: 'Admin Modules Details not found' });
    }
};

/**
 * Controller function to update admin module record by Id.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.updateAdminModuleById = async function (req, res) {
    const { adminId } = req.params;
    const { name, description, is_active } = req.body;
    const existingAdminRecord = await AdminModules.findByPk(adminId);
    if (!adminId || adminId == 0) {
        return res.status(404).json({ error: "Kindly provide valid Admin ID" });
    }
    if (!existingAdminRecord) {
        return res.status(404).json({ error: 'Admin Module not found with this id' });
    }
    await existingAdminRecord.update({
        name, description, is_active
    });
    return res.status(200).json({
        message: 'Admin Module record updated successfully',
        data: existingAdminRecord,
    });
};


/**
 * Controller function to Delete admin module record by Id.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.deleteAdminModuleById = async function (req, res) {
    const { adminId } = req.params;
    const existingAdminRecord = await AdminModules.findByPk(adminId);
    if (!adminId || adminId == 0) {
        return res.status(404).json({ error: "Kindly provide valid Admin ID" });
    }
    if (!existingAdminRecord) {
        return res.status(404).json({ error: 'Admin Module not found with this id' });
    }
    await existingAdminRecord.destroy({
        where: { id: adminId }
    });
    return res.status(200).json({
        message: 'Admin Module record Delete successfully',
        data: existingAdminRecord,
    });
};


/**
 * Controller function to search by value and field name of admin module .
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.searchAdminModules = async function(req, res) {
    try {
      const { fieldName, fieldValue } = req.params;
      if (!AdminModules.rawAttributes[fieldName]) {
        return res.status(400).json({ error: 'Invalid field name' });
      }
      const records = await AdminModules.findAll({
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