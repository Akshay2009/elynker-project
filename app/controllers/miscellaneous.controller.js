const db = require('../models');
require('dotenv').config();
const Registration = db.registration;
const serviceResponse = require('../config/serviceResponse');

module.exports.getVendorsByLocation = async (req, res) => {
    try {
        const { type, location } = req.params;
        const vendorTypes = await Registration.findAll({
            where: {
                registration_type: type,
                city: location
            },
        });
        if (vendorTypes.length > 0) {
            return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, data: vendorTypes });
        } else {
            return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
        }
    } catch (error) {
        console.error("Error fetching vendor types:", error);
        return res.status(serviceResponse.internalServerError).json({ message: serviceResponse.internalServerErrorMessage });
    }
};
