const db = require('../models');
const Role = db.role;
const Sequelize = db.Sequelize;
const logErrorToFile = require('../logger');

/**
 * Save Role details in the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Promise<void>} - Promise representing the completion of the retrieval operation.
 */
module.exports.saveRole = async function(req, res) {
    try {
        const allRecords = await Role.findAll({});
        const { name, permissions } = req.body;
        const record = await Role.create({
            id: allRecords[allRecords.length - 1].id + 1, // get the last record id and do +1 to id 
            name: name,
            permissions: permissions,
        });
        if (record) {
            return res.status(201).json({ message: 'Role Record Created Successfully', data: record });
        } else {
            return res.status(400).json({ error: 'Role Record not Created' });
        }
    } catch (err) {
        logErrorToFile.logErrorToFile(err, 'route.controller', 'saveRole');
        if (err instanceof Sequelize.Error) {
            return res.status(400).json({ error: err.message });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Search Role details by ID from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Promise<void>} - Promise representing the completion of the retrieval operation.
 */
module.exports.updateRole = async function(req, res) {
    try {
        const id = req.params.id;
        const { name, permissions } = req.body;
        const [row, record] = await Role.update({
            name: name,
            permissions: permissions,
        }, {
            where: {
                id: id,
            },
            returning: true,
        });
        if (row > 0) {
            return res.status(200).json({ message: 'Role Record Updated', data: record[0] });
        } else {
            return res.status(404).json({ error: 'Role Record not found with the id provided' });
        }
    } catch (err) {
        logErrorToFile.logErrorToFile(err, 'route.controller', 'updateRole');
        if (err instanceof Sequelize.Error) {
            return res.status(400).json({ error: err.message });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Delete Role details by ID from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Promise<void>} - Promise representing the completion of the retrieval operation.
 */
module.exports.deleteRole = async function(req, res) {
    try {
        const id = req.params.id;
        const recordToDelete = await Role.findOne({ where: { id: id } });
        if (!recordToDelete) {
            return res.status(404).json({ error: 'No Role Record found with the id provided' });
        }
        const deletedRecord = await Role.destroy({
            where: {
                id: id,
            },
        });
        if (deletedRecord > 0) {
            return res.status(200).json({ message: 'Role Deleted Successfully with the id provided', data: recordToDelete });
        } else {
            return res.status(400).json({ error: 'Could not delete Role Record with the id provided' });
        }
    } catch (err) {
        logErrorToFile.logErrorToFile(err, 'route.controller', 'deleteRole');
        if (err instanceof Sequelize.Error) {
            return res.status(400).json({ error: err.message });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Search All Role details from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Promise<void>} - Promise representing the completion of the retrieval operation.
 */
module.exports.getAll = async function(req, res) {
    try {
        const records = await Role.findAll({});
        if (records.length > 0) {
            return res.status(200).json({ message: 'Fetched Records', data: records });
        } else {
            return res.status(400).json({ error: 'No Record Found' });
        }
    } catch (err) {
        logErrorToFile.logErrorToFile(err, 'route.controller', 'getAll');
        if (err instanceof Sequelize.Error) {
            return res.status(400).json({ error: err.message });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Search Role details by ID from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Promise<void>} - Promise representing the completion of the retrieval operation.
 */
module.exports.getRoleById = async function(req, res) {
    try {
        const id = req.params.id;
        const record = await Role.findOne({
            where: {
                id: id,
            },
        });
        if (record) {
            return res.status(200).json({ message: 'Fetched Record', data: record });
        } else {
            return res.status(400).json({ error: 'No Role Record found with the id provided' });
        }
    } catch (err) {
        logErrorToFile.logErrorToFile(err, 'route.controller', 'getRoleById');
        if (err instanceof Sequelize.Error) {
            return res.status(400).json({ error: err.message });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Search Role details by fieldName and  fieldValue from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Promise<void>} - Promise representing the completion of the retrieval operation.
 */

module.exports.search = async function(req, res) {
    try {
        const { fieldName, fieldValue } = req.params;
        if (!Role.rawAttributes[fieldName]) {
            return res.status(400).json({ error: 'Invalid field name' });
        }
        const records = await Role.findAll({
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
        logErrorToFile.logErrorToFile(err, 'route.controller', 'search');
        if (err instanceof Sequelize.Error) {
            return res.status(400).json({ error: err.message });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
