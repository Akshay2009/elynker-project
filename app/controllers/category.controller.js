const db = require("../models");
const { Op, DataTypes, Sequelize } = require('sequelize');
const Category = db.category;

/**
 * Controller function to get all the Category record .
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.getAllCategory = async function (req, res) {
    try {
        const categories = await Category.findAll({
        });
        if (categories) {
            return res.status(200).json(categories);
        } else {
            return res.status(404).json({ error: 'No Category Returned' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error ' + err.message });
    }
}

/**
 * Controller function to create a Category record .
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.createCategory = async function (req, res) {
    try {

        const { title, description, parent_id, category_type } = req.body;
        // const imagePaths = req.files['image_path'].map((file) => file.path);
        // const bannerImagePath = req.files['banner_image'][0].path;
        if (parent_id) {
            const record = await Category.findOne({ where: { id: parent_id } });
            if (record) {
                const category = await Category.create({
                    title,
                    description,
                    parent_id: parent_id,
                    category_type
                });

                if (category) {
                    return res.status(200).json(category);
                }
                else {
                    return res.status(404).json({ error: 'No Category created' });
                }
            } else {
                return res.status(404).json({ error: 'No Category found exist with this parent_id' });
            }
        }
        else {
            const newCategory = await Category.create({
                title,
                description,
                parent_id: null,
                category_type
            });

            if (newCategory) {
                return res.status(200).json(newCategory);
            } else {
                return res.status(404).json({ error: 'Category not created' });
            }
        }
    } catch (err) {
        return res.status(500).json({ error: 'Internal ServerError ' + err.message });
    }

}

/**
 * Controller function to create a Category record by id.
 * categoryId is passed in params
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.getCategoryById = async function (req, res) {
    try {
        const categoryId = req.params.categoryId;
        const categories = await Category.findOne({
            where: {
                id: categoryId
            }
        });
        if (categories) {
            return res.status(200).json(categories);
        } else {
            return res.status(404).json({ error: 'No Category Returned' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' + err.message });
    }
}


/**
 * Controller function to update a Category record .
 * categoryId is passed in params
 * title, description, parent_id,category_type is passed in body
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.updateCategory = async function (req, res) {
    try {
        const categoryId = req.params.categoryId;
        const { title, description, parent_id, category_type } = req.body;
        // const imagePaths = req.files['image_path'].map((file) => file.path);
        // const bannerImagePath = req.files['banner_image'][0].path;
        if (parent_id) {
            const record = await Category.findOne({ where: { id: parent_id } });
            if (record) {
                const [rowCount, updatedCategory] = await Category.update({
                    title,
                    description,
                    parent_id: parent_id,
                    category_type
                }, {
                    where: {
                        id: categoryId
                    },
                    returning: true
                });

                if (rowCount > 0) {
                    return res.status(200).json(updatedCategory[0]);
                }
                else {
                    return res.status(404).json({ error: 'No Category found' });
                }
            } else {
                return res.status(404).json({ error: 'No Category found exist with this parent_id' });
            }
        }
        else {
            const [rowCount, updatedCategory] = await Category.update({
                title,
                description,
                parent_id: null,
                category_type
            }, {
                where: {
                    id: categoryId
                },
                returning: true
            });
            if (rowCount > 0) {
                return res.status(200).json(updatedCategory[0]);
            }
            else {
                return res.status(404).json({ error: 'No Category found' });
            }
        }

    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error ' + err.message });
    }

}


/**
 * Controller function to create multiple Category record .
 * parent_id is passed in params
 * array of object is passed in body
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.createMultipleCategory = async function (req, res) {
    try {
        const parent_id = req.params.parent_id;
        const arr = req.body;
        if (!arr.length) {
            return res.status(401).json({ success: "Please provide your category data in json array[]!" });
        }
        if (parent_id) {
            const record = await Category.findOne({ where: { id: parent_id } });
            const returnArr = [];
            if (record) {
                const updatedArr = arr.map((item) => {
                    return {
                        ...item,
                        parent_id: parent_id  // Add parent_id 
                    };
                });
                const result = await Category.bulkCreate(
                    updatedArr,
                    {
                        updateOnDuplicate: ["title", "description", "parent_id", "category_type"],
                    }
                );
                if (result) {
                    return res.status(200).json({ message: 'Sub Categories Created', data: result });
                }
                else {
                    return res.status(404).json({ error: 'No Sub Category created' });
                }
            } else {
                return res.status(404).json({ error: 'No Parent Category exist with this parent_id' });
            }
        }
    } catch (err) {
        return res.status(500).json({ error: 'Internal ServerError ' + err.message });
    }

}

/**
 * Controller function to get all subcategories of a category .
 * parent_id is passed in params
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.getSubcategories = async function (req, res) {
    try {
        const parent_id = req.params.parent_id;
        const categories = await Category.findAll({
            where: {
                parent_id: parent_id
            }
        });
        if (categories.length > 0) {
            return res.status(200).json(categories);
        } else {
            return res.status(404).json({ error: 'No Sub Category Returned' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' + err.message });
    }
}
/**
 * Controller function to Delete categories of a category .
 * parent_id is passed in params
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.delcategories = async function (req, res) {
    try {
        const category_id = req.params.category_id;
        const categories = await Category.destroy({
            where: {
                id: category_id
            }
        });
        if (!categories) {
            return res.status(404).json({ error: "category not found" });
        } else {
            return res.status(200).json({ message: "category deleted successfully" });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' + err.message });
    }
}
