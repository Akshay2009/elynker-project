const db = require('../models');
const AdminModules = db.adminModules;
const ModuleDetails = db.moduleDetails;
const Sequelize = db.Sequelize;
const serviceResponse = require('../config/serviceResponse');
const logErrorToFile = require('../logger');


/**
 * Controller function to handle the creation of admin and module records.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.saveModuleDetails = async function (req, res) {
    try {
        const { admin, module } = req.body;
        if (admin.id) {
            return res.status(serviceResponse.badRequest).json({ error: 'Admin module id is not required for POST request' });
        }

        // validating request
        if (module) {
            for (let element of module) {
                if (element.id) {
                    return res.status(serviceResponse.badRequest).json({ error: ' module details id is not required for POST request' });
                }
            }
        }
        const adminModuleRecord = await AdminModules.create(admin);
        const adminModuleId = adminModuleRecord.id;
        const input = module.map((mod) => ({
            ...mod,
            admin_module_id: adminModuleId,
        }));
        const createdRecords = await ModuleDetails.bulkCreate(input);
        if (createdRecords) {
            return res.status(serviceResponse.saveSuccess).json({ message: serviceResponse.createdMessage, admin: adminModuleRecord, module: createdRecords });
        } else {
            return res.status(serviceResponse.badRequest).json({ error: serviceResponse.errorCreatingRecord });
        }
    } catch (err) {
        logErrorToFile.logErrorToFile(err, 'moduleDetails.controller', 'saveModuleDetails');
        if (err instanceof Sequelize.Error) {
            return res.status(serviceResponse.badRequest).json({ error: err.message });
        }
        return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
    }
};


module.exports.updateModuleDetails = async function (req, res) {
    try {
        const { admin, module } = req.body;
        if (!admin.id) {
            return res.status(serviceResponse.badRequest).json({ error: 'Admin module id is required' });
        }
        
        const [ row, record ] = await AdminModules.update({
            name: admin.name,
            description: admin.description,
            is_active: admin.is_active,
            created_by: admin.created_by,
            updated_by: admin.updated_by,
        },{
            where: {
                id: admin.id,
            },
            returning: true,
        });
        if(!row){
            return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound+' AdminModule Record with provided id' });
        }
        const adminModuleId = admin.id;
        const input = module.map((mod) => ({
            ...mod,
            admin_module_id: adminModuleId,
        }));
        const createdRecords = await ModuleDetails.bulkCreate(input, {
            updateOnDuplicate: ['value', 'status', 'admin_module_id', 'created_by', 'updated_by'],
        });
        if (createdRecords) {
            return res.status(serviceResponse.ok).json({ message: serviceResponse.updatedMessage, admin: record[0], module: createdRecords });
        } else {
            return res.status(serviceResponse.badRequest).json({ error: serviceResponse.errorCreatingRecord });
        }
    } catch (err) {
        logErrorToFile.logErrorToFile(err, 'moduleDetails.controller', 'updateModuleDetails');
        if (err instanceof Sequelize.Error) {
            return res.status(serviceResponse.badRequest).json({ error: err.message });
        }
        return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
    }
};

module.exports.deleteModuleDetails = async function (req, res) {
    try {
        const id = req.params.id;
        const recordToDelete = await ModuleDetails.findOne({ where: { id: id } });
        if (!recordToDelete) {
            return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
        }
        const deletedRecord = await ModuleDetails.destroy({
            where: {
                id: id,
            },
        });
        if (deletedRecord > 0) {
            return res.status(serviceResponse.ok).json({ message: serviceResponse.deletedMessage, data: recordToDelete });
        } else {
            return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
        }
    } catch (err) {
        logErrorToFile.logErrorToFile(err, 'moduleDetails.controller', 'deleteModuleDetails');
        if (err instanceof Sequelize.Error) {
            return res.status(serviceResponse.badRequest).json({ error: err.message });
        }
        return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
    }
};

/**
 * Search All Module Details details from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Promise<void>} - Promise representing the completion of the retrieval operation.
 */
module.exports.getAll = async function (req, res) {
    try {
        const maxLimit = 50;
        let { page, pageSize } = req.query;
        page = page ? page : 1;
        let offset = 0;
        if (page && pageSize) {
            pageSize = pageSize <= maxLimit ? pageSize : maxLimit;
            offset = (page - 1) * pageSize;
        }

        const { count, rows } = await ModuleDetails.findAndCountAll({
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
        logErrorToFile.logErrorToFile(err, 'moduleDetails.controller', 'getAll');
        if (err instanceof Sequelize.Error) {
            return res.status(serviceResponse.badRequest).json({ error: err.message });
        }
        return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
    }
};

/**
 * Search Module Details details by ID from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Promise<void>} - Promise representing the completion of the retrieval operation.
 */
module.exports.getById = async function (req, res) {
    try {
        const id = req.params.id;
        const record = await ModuleDetails.findOne({
            where: {
                id: id,
            },
            order: [['createdAt', 'ASC']],
        });
        if (record) {
            return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, data: record });
        } else {
            return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
        }
    } catch (err) {
        logErrorToFile.logErrorToFile(err, 'moduleDetails.controller', 'getById');
        if (err instanceof Sequelize.Error) {
            return res.status(serviceResponse.badRequest).json({ error: err.message });
        }
        return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
    }
};

/**
 * Search Module Details details by fieldName and  fieldValue from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Promise<void>} - Promise representing the completion of the retrieval operation.
 */

module.exports.search = async function (req, res) {
    try {
        const { fieldName, fieldValue } = req.params;
        if (!ModuleDetails.rawAttributes[fieldName]) {
            return res.status(serviceResponse.badRequest).json({ error: serviceResponse.fieldNotExistMessage });
        }
        const records = await ModuleDetails.findAll({
            where: {
                [fieldName]: fieldValue,
            },
            order: [['createdAt', 'ASC']],
        });
        if (records.length > 0) {
            return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, data: records });
        } else {
            return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
        }
    } catch (err) {
        logErrorToFile.logErrorToFile(err, 'moduleDetails.controller', 'search');
        if (err instanceof Sequelize.Error) {
            return res.status(serviceResponse.badRequest).json({ error: err.message });
        }
        return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
    }
};


/**
 * Search Module Details details by ID from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Promise<void>} - Promise representing the completion of the retrieval operation.
 */
module.exports.getByAdminModuleId = async function (req, res) {
    try {
        const admin_module_id = req.params.admin_module_id;
        const adminModuleRecord = await AdminModules.findByPk(admin_module_id);
        if (!adminModuleRecord) {
            return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
        }
        const record = await ModuleDetails.findAll({
            where: {
                admin_module_id: admin_module_id,
            },
            order: [['createdAt', 'ASC']],
        });
        if (record.length > 0) {
            return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, admin: adminModuleRecord, module: record });
        } else {
            return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
        }
    } catch (err) {
        logErrorToFile.logErrorToFile(err, 'moduleDetails.controller', 'getByAdminModuleId');
        if (err instanceof Sequelize.Error) {
            return res.status(serviceResponse.badRequest).json({ error: err.message });
        }
        return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
    }
};


module.exports.deleteByAdminModuleId = async function(req,res){
    try{
        const admin_module_id = req.params.admin_module_id; 
        const adminModuleRecord = await AdminModules.findByPk(admin_module_id);
        if (!adminModuleRecord) {
            return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound+' Admin Module' });
        }
        const record = await ModuleDetails.findAll({
            where: {
                admin_module_id: admin_module_id,
            },
            order: [['createdAt', 'ASC']],
        });
        const deletedAdmin = await AdminModules.destroy({
            where: {
                id: admin_module_id,
            },
        });
        const deletedModules = await ModuleDetails.destroy({
            where: {
                admin_module_id: admin_module_id,
            },
        });
        if(deletedAdmin >0 && deletedModules>0){
            return res.status(serviceResponse.ok).json({ message:serviceResponse.deletedMessage, admin: adminModuleRecord, module: record });
        }else{
            return res.status(serviceResponse.badRequest).json({ error: 'Error in deleting Admin and Module Details' });
        }


    } catch (err) {
        logErrorToFile.logErrorToFile(err, 'moduleDetails.controller', 'deleteByAdminModuleId');
        if (err instanceof Sequelize.Error) {
            return res.status(serviceResponse.badRequest).json({ error: err.message });
        }
        return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
    }
}


/**
 * Search Module Details details by Name from the database.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Promise<void>} - Promise representing the completion of the retrieval operation.
 */
module.exports.getModuleDetailsByname = async function (req, res) {
    try {
        const name = req.params.name;
        const adminModuleRecord = await AdminModules.findOne(
            {
                where:{
                    name:name,
                },
            },
        );
        if (!adminModuleRecord) {
            return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
        }
        const record = await ModuleDetails.findAll({
            where: {
                admin_module_id: adminModuleRecord.id,
            },
            order: [['createdAt', 'ASC']],
        });
        if (record.length > 0) {
            return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, admin: adminModuleRecord, module: record });
        } else {
            return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
        }
    } catch (err) {
        logErrorToFile.logErrorToFile(err, 'moduleDetails.controller', 'getByAdminModuleId');
        if (err instanceof Sequelize.Error) {
            return res.status(serviceResponse.badRequest).json({ error: err.message });
        }
        return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
    }
};