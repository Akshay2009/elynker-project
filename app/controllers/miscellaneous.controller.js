const db = require('../models');
require('dotenv').config();
const User = db.user;
const Registration = db.registration;
const serviceResponse = require('../config/serviceResponse');
const Product = db.product;
const Category = db.category;
const logErrorToFile = require('../logger');
const Sequelize = db.Sequelize;

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

/**
 * Get  Registration Records by type 0-for both b2b and freelancer,2-b2b, 3-freelancer
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Promise<void>} - Promise representing the completion of the retrieval operation.
 */
module.exports.vendorsListingAdmin = async function(req,res) {
    try{
        const type = parseInt(req.params.type);
        if (type !== 0 && type !== 2 && type !== 3){
            return res.status(serviceResponse.badRequest).json({ error: 'Incorrect Type Provided' });
        };

        let whereClause = {};
        if (type === 2) {
            whereClause = { registration_type: 2 };
        } else if (type === 3) {
            whereClause = { registration_type: 3 };
        } else if (type === 0) {
            whereClause = { registration_type: [2, 3] };
        }
        let includeOptions = [
            {
                model: User,
                attributes: ['id', 'mobile_number', 'email'],
            }
        ];
        const maxLimit = 50;
        let { page, pageSize } = req.query;
        page = page ? page : 1;
        let offset = 0;
        if (page && pageSize) {
          pageSize = pageSize <= maxLimit ? pageSize : maxLimit;
          offset = (page - 1) * pageSize;
        }
        const { count, rows } = await Registration.findAndCountAll({
            where: whereClause,
            include: includeOptions,
            limit: pageSize,
            offset: offset,
            attributes: [
                'id',
                'name',
                'registration_type',
                'city',
                'status',
            ],
            order: [['createdAt', 'ASC']],
        });
        if (count > 0) {
            return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, totalRecords: count, data: rows });
        } else {
            return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
        }
    }catch(err){
        logErrorToFile.logErrorToFile(err, 'miscellaneous.controller', 'vendorsListing');
        if (err instanceof Sequelize.Error) {
            return res.status(serviceResponse.badRequest).json({ error: err.message });
        }
        return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
    }
};
