const db = require('../models');
require('dotenv').config();
const User = db.user;
const Registration = db.registration;
const serviceResponse = require('../config/serviceResponse');
const Product = db.product;
const Category = db.category;

module.exports.getVendorsByLocation = async (req, res) => {
    try {
        const { type, location } = req.params;
        const { categoryId, ratingMin, ratingMax } = req.query;
        let whereCondition = {
            registration_type: type,
            city: location,
        };
        let includeOptions = [
            {
                model: User,
                attributes: ['id', 'mobile_number']
            },
            {
                model: Product,
                attributes: []
            }
        ];
        if (categoryId) {
            includeOptions.push({
                model: Category,
                where: { id: categoryId },
                through: { attributes: [] }
            });
        }
        const vendors = await Registration.findAll({
            where: whereCondition,
            include: includeOptions,
            attributes: [
                'id',
                'name',
                'image_path',
                'last_login',
                'registration_type',
                'city',
                'business_description',
                'whatsapp_number',
                'company_name',
                [db.sequelize.fn('COUNT', db.sequelize.col('products.id')), 'productCount'],
            ],
            group: ['registration.id', 'user.id', categoryId ? 'categories.id': 'user.id'],
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
            business_description: vendor.business_description,
            last_login: vendor.last_login,
            whatsapp_number: vendor.whatsapp_number,
            mobile_number: vendor.user.dataValues.mobile_number,
            product_count: vendor.dataValues.productCount,
            rating: staticRating,
            enquiry_count: staticMember,
        }));
        // Filter based on rating range if provided
        if (ratingMin && ratingMax) {
            const filteredData = formattedData.filter(vendor => vendor.rating >= parseFloat(ratingMin) && vendor.rating <= parseFloat(ratingMax));
            if (filteredData.length > 0) {
                return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, data: filteredData });
            } else {
                return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
            }
        } else {
            if (formattedData.length > 0) {
                return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, data: formattedData });
            } else {
                return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
            }
        }

    } catch (error) {
        console.error("Error fetching vendor types:", error);
        return res.status(serviceResponse.internalServerError).json({ message: serviceResponse.internalServerErrorMessage });
    }
};
