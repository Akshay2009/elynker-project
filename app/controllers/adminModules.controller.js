const db = require('../models');
const AdminModules = db.adminModules;

const serviceResponse = require('../config/serviceResponse');

/**
 * Controller function to create a admin module record .
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.createAdminModule = async function(req, res) {
    const { name, description, is_active } = req.body;
    const newAdminRecord = await AdminModules.create({
        name,
        description,
        is_active,
    });
    return res.status(serviceResponse.saveSuccess).json({
        message: serviceResponse.createdMessage,
        data: newAdminRecord,
    });
};
/**
 * Controller function to get all admin module record .
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.getAdminModule = async function(req, res) {
    try {
        const maxLimit = 50;
        let { page, pageSize } = req.query;
        page = page ? page : 1;
        let offset = 0;
        if (page && pageSize) {
            pageSize = pageSize <= maxLimit ? pageSize : maxLimit;
            offset = (page - 1) * pageSize;
        }

        const { count, rows } = await AdminModules.findAndCountAll({
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
        return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
    }
};

/**
 * Controller function to get admin module record by Id.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.getAdminModuleById = async function(req, res) {
    const { adminId } = req.params;
    const AdminModulesById = await AdminModules.findOne({
        where: { id: adminId },
    });

    if (AdminModulesById) {
        return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, data: AdminModulesById });
    } else {
        return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
    }
};

/**
 * Controller function to update admin module record by Id.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.updateAdminModuleById = async function(req, res) {
    const { adminId } = req.params;
    const { name, description, is_active } = req.body;
    const existingAdminRecord = await AdminModules.findByPk(adminId);
    if (!adminId || adminId == 0) {
        return res.status(serviceResponse.badRequest).json({ error: 'Kindly provide valid Admin ID' });
    }
    if (!existingAdminRecord) {
        return res.status(serviceResponse.notFound).json({ error: 'Admin Module not found with this id' });
    }
    await existingAdminRecord.update({
        name, description, is_active,
    });
    return res.status(serviceResponse.ok).json({
        message: serviceResponse.updatedMessage,
        data: existingAdminRecord,
    });
};


/**
 * Controller function to Delete admin module record by Id.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.deleteAdminModuleById = async function(req, res) {
    const { adminId } = req.params;
    const existingAdminRecord = await AdminModules.findByPk(adminId);
    if (!adminId || adminId == 0) {
        return res.status(serviceResponse.badRequest).json({ error: 'Kindly provide valid Admin ID' });
    }
    if (!existingAdminRecord) {
        return res.status(serviceResponse.notFound).json({ error: 'Admin Module not found with this id' });
    }
    await existingAdminRecord.destroy({
        where: { id: adminId },
    });
    return res.status(serviceResponse.ok).json({
        message: serviceResponse.deletedMessage,
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
            return res.status(serviceResponse.badRequest).json({ error: serviceResponse.fieldNotExistMessage });
        }
        const records = await AdminModules.findAll({
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
