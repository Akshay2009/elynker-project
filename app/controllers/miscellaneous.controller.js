const db = require('../models');
require('dotenv').config();
const User=db.user;
const Registration = db.registration;
const serviceResponse = require('../config/serviceResponse');
const Product = db.product;

module.exports.getVendorsByLocation = async (req, res) => {
    try {
        const { type, location} = req.params;
        let vendors = await Registration.findAll({
            where: {
                registration_type: type,
                city: location,
            },
            include: [{
                model: User, // Include the User model
                attributes: ['id', 'mobile_number'] // Include the mobile_number field from the User model
            },{
                model: Product,
                attributes: [] // Exclude all attributes of Product
              }],
              attributes: [
                'id', // Include Registration's id or any other necessary attributes
                'name',
                'image_path',
                'last_login',
                'registration_type',
                'city',
                'whatsapp_number',
                'company_name',
                [db.sequelize.fn('COUNT', db.sequelize.col('products.id')), 'productCount'] // Count the associated products
              ],
              group: ['registration.id', 'user.id'] // Group by Registration id
        });
        const staticRating = 3.5;
        const staticMember = 10;
        const formattedData = vendors.map(vendor => ({
            id: vendor.id,
            name: vendor.name,
            company_name: vendor.company_name,
            image_path: vendor.image_path,
            registration_type: vendor.registration_type,
            city: vendor.city,
            last_login: vendor.last_login,
            whatsapp_number: vendor.whatsapp_number,
            mobile_number: vendor.user.dataValues.mobile_number,
            product_count : vendor.dataValues.productCount,
            rating: staticRating,
            enquiry_count: staticMember,
        }));
        if (formattedData.length > 0) {
            return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, data: formattedData });
        } else {
            return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
        }
        
    } catch (error) {
        console.error("Error fetching vendor types:", error);
        return res.status(serviceResponse.internalServerError).json({ message: serviceResponse.internalServerErrorMessage });
    }
};
