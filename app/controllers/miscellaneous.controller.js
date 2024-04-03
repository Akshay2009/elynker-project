const db = require('../models');
require('dotenv').config();
const User = db.user;
const Registration = db.registration;
const serviceResponse = require('../config/serviceResponse');
const Product = db.product;
const Category = db.category;
const logErrorToFile = require('../logger');
const Sequelize = db.Sequelize;
const FreelancerResume = db.freelancerResume;
const FreelancerBannerProject = db.freelancerBannerProject;
const Certificate = db.certificate;
const BusinessDetail = db.businessDetail;
const Enquiry = db.enquiry;

/**
 *Endpoint to get filter vendors details based on type location category rating -----
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Promise<void>} - Promise representing the completion of the retrieval operation.
 */

module.exports.getVendorsByLocation = async (req, res) => {
    try {
        const { type } = req.params;
        const { location, categoryId, rating, sortBy } = req.query;
        
        let whereCondition = {
            registration_type: type,
        };

        if (location) {
            whereCondition.city = Array.isArray(location) ? location : [location];
        }
        let minRatings = [];
        let minRating = 0.0;
        if (rating) {
            minRatings = Array.isArray(rating) ? rating.map(ele => parseFloat(ele)) : [parseFloat(rating)];
            minRating = Math.min(...minRatings);
        }

        let includeOptions = [
            {
                model: User,
                attributes: ['id', 'mobile_number']
            },
            {
                model: Product,
                attributes: []
            },
        ];


        if (categoryId) {
            includeOptions.push({
                model: Category,
                attributes: [],
                through: { attributes: [] }, //  no attributes are selected from the join table
                where: { id: Array.isArray(categoryId) ? categoryId : [categoryId] }
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
            group: ['registration.id', 'user.id', categoryId ? 'categories.id' : 'user.id','products.budget'],  
            //order: sortBy === 'budget-low-to-high' ? [[{ model: Product }, 'budget', 'ASC']] : null 
            order: sortBy === 'price-low-to-high' ? [[{ model: Product }, 'budget', 'ASC']] :
                   sortBy === 'price-high-to-low' ? [[{ model: Product }, 'budget', 'DESC']] : null 
        });
        
        const staticRating = 3.5;
        const staticMember = 26529;
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
            member_count: staticMember,
        }));
        // Filter vendors based on the minimum rating
        const filteredVendors = formattedData.filter(vendor => vendor.rating >= minRating);

        if (filteredVendors.length > 0) {
            return res.status(serviceResponse.ok).json({ message: serviceResponse.ok, data: filteredVendors });
        } else {
            return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
        }

    } catch (error) {
        console.error("Error fetching vendor types:", error);
        return res.status(serviceResponse.internalServerError).json({ message: serviceResponse.internalServerErrorMessage });
    }
};

/**
 * Get  Registration Records by type 0-for both b2b and freelancer,2-b2b, 3-freelancer
 * End point to get freelancer profile details by registration id--
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Promise<void>} - Promise representing the completion of the retrieval operation.
 */

module.exports.vendorsListingAdmin = async function (req, res) {
    try {
        const type = parseInt(req.params.type);
        if (type !== 0 && type !== 2 && type !== 3) {
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
                'createdAt',
                'updatedAt',
            ],
            order: [['updatedAt', 'DESC']],
        });
        if (count > 0) {
            const categorizedData = rows.map(entry => {
                const registrationType = entry.registration_type == 2 ? "Business" : "Freelancer";
                return { 
                    ...entry.toJSON(),
                    registration_type: registrationType 
                };
            });
            return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, totalRecords: count, data: categorizedData });
        } else {
            return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
        }
    } catch (err) {
        logErrorToFile.logErrorToFile(err, 'miscellaneous.controller', 'vendorsListing');
            if (err instanceof Sequelize.Error) {
                return res.status(serviceResponse.badRequest).json({ error: err.message });
            }
            return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
    }
}

    module.exports.getFreelancerProfileDetailsByRegId = async function (req, res) {
        try {
            const { reg_id } = req.params;
            let whereCondition = {
                id: reg_id
            };
            let includeOptions = [
                {
                    model: User,
                    attributes: ['id', 'mobile_number', 'email'],
                },
                {
                    model: FreelancerResume,
                    attributes: ['id', 'freelancer_resume'],
                },
                {
                    model: FreelancerBannerProject,
                    attributes: ['id', 'banner_name'],
                },
                {
                    model: Product,
                    attributes: ['id', 'title', 'default_image', 'description', 'budget', 'type'],
                },
                {
                    model: Category,
                    through: { attributes: [] },
                    attributes: ['id', 'title']
                },
                {
                    model: Certificate,
                    attributes: ['id', 'name'],
                },
                {
                    model: BusinessDetail,
                }
            ];
            const vendor = await Registration.findOne({
                where: whereCondition,
                include: includeOptions,
            });

            if (vendor) {
                return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, data: vendor });
            } else {
                return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
            }
        } catch (err) {
            logErrorToFile.logErrorToFile(err, 'miscellaneous.controller', 'getFreelancerProfileDetailsByRegId');
            if (err instanceof Sequelize.Error) {
                return res.status(serviceResponse.badRequest).json({ error: err.message });
            }
            return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
        }
}
