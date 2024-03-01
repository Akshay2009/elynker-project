const db = require('../models');
const { Sequelize } = require('sequelize');
const Category = db.category;
const fs = require('fs');
const path = require('path');
const Product = db.product;
require('dotenv').config();
const CATEGORY_LOGO_PATH = path.join(process.env.CATEGORY_LOGO_PATH);

/**
 * Controller function to get all the Category record .
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.getAllCategory = async function(req, res) {
  try {
    const categories = await Category.findAll({
    });
    if (categories.length>0) {
      return res.status(200).json(categories);
    } else {
      return res.status(404).json({ error: 'No Category Found' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error ' + err.message });
  }
};

/**
 * Controller function to create a Category record .
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.createCategory = async function(req, res) {
  try {
    const { title, description, parent_id, category_type } = req.body;
    let imagePath;
    let bannerImage;
    if (req.files['image_path']) {
      // Extract file names
      imagePath = req.files['image_path'][0].filename;
    }
    if (req.files['banner_image']) {
      bannerImage = req.files['banner_image'][0].filename;
    }
    if (parent_id) {
      const record = await Category.findOne({ where: { id: parent_id } });
      if (record) {
        const category = await Category.create({
          title,
          description,
          parent_id: parent_id,
          category_type,
          image_path: imagePath,
          banner_image: bannerImage,
        });

        if (category) {
          return res.status(200).json(category);
        } else {
          return res.status(404).json({ error: 'No Category created' });
        }
      } else {
        if (imagePath) {
          fs.unlinkSync(path.join(__dirname, '../..', CATEGORY_LOGO_PATH, '/', imagePath));
        }
        if (bannerImage) {
          fs.unlinkSync(path.join(__dirname, '../..', CATEGORY_LOGO_PATH, '/', bannerImage));
        }
        return res.status(404).json({ error: 'No Category found exist with this parent_id' });
      }
    } else {
      const newCategory = await Category.create({
        title,
        description,
        parent_id: null,
        category_type,
        image_path: imagePath,
        banner_image: bannerImage,
      });

      if (newCategory) {
        return res.status(201).json(newCategory);
      } else {
        return res.status(404).json({ error: 'Category not created' });
      }
    }
  } catch (err) {
    return res.status(500).json({ error: 'Internal ServerError ' + err.message });
  }
};

/**
 * Controller function to create a Category record by id.
 * categoryId is passed in params
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.getCategoryById = async function(req, res) {
  try {
    const categoryId = req.params.categoryId;
    const categories = await Category.findOne({
      where: {
        id: categoryId,
      },
    });
    if (categories) {
      return res.status(200).json(categories);
    } else {
      return res.status(404).json({ error: 'No Category Returned' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' + err.message });
  }
};


/**
 * Controller function to update a Category record .
 * categoryId is passed in params
 * title, description, parent_id,category_type is passed in body
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.updateCategory = async function(req, res) {
  try {
    const categoryId = req.params.categoryId;
    const { title, description, parent_id, category_type } = req.body;
    let imagePath;
    let bannerImage;
    if (req.files['image_path']) {
      // Extract file names
      imagePath = req.files['image_path'][0].filename;
    }
    if (req.files['banner_image']) {
      bannerImage = req.files['banner_image'][0].filename;
    }

    if (parent_id) {
      const record = await Category.findOne({ where: { id: parent_id } });
      if (record) {
        const existingCategory = await Category.findByPk(categoryId);
        if (!existingCategory) {
          if (imagePath) {
            fs.unlinkSync(path.join(__dirname, '../..', CATEGORY_LOGO_PATH, '/', imagePath));
          }
          if (bannerImage) {
            fs.unlinkSync(path.join(__dirname, '../..', CATEGORY_LOGO_PATH, '/', bannerImage));
          }
          return res.status(404).json({ error: 'No Category Record with this categoryId' });
        }
        if (existingCategory) {
          if (imagePath) {
            if (existingCategory.image_path) {
              fs.unlinkSync(path.join(__dirname, '../..', CATEGORY_LOGO_PATH, '/', existingCategory.image_path));
            }
          } else {
            // if (existingCategory.image_path) {
            //     fs.unlinkSync(path.join(__dirname, '../..', CATEGORY_LOGO_PATH,'/',existingCategory.image_path));
            // }
            imagePath=existingCategory.image_path;
          }
          if (bannerImage) {
            if (existingCategory.banner_image) {
              fs.unlinkSync(path.join(__dirname, '../..', CATEGORY_LOGO_PATH, '/', existingCategory.banner_image));
            }
          } else {
            // if (existingCategory.banner_image) {
            //     fs.unlinkSync(path.join(__dirname, '../..', CATEGORY_LOGO_PATH,'/',existingCategory.banner_image));
            // }
            bannerImage=existingCategory.banner_image;
          }
        }


        const [rowCount, updatedCategory] = await Category.update({
          title,
          description,
          parent_id: parent_id,
          category_type,
          image_path: imagePath,
          banner_image: bannerImage,
        }, {
          where: {
            id: categoryId,
          },
          returning: true,
        });

        if (rowCount > 0) {
          return res.status(200).json(updatedCategory[0]);
        } else {
          return res.status(404).json({ error: 'No Category found' });
        }
      } else {
        if (imagePath) {
          fs.unlinkSync(path.join(__dirname, '../..', CATEGORY_LOGO_PATH, '/', imagePath));
        }
        if (bannerImage) {
          fs.unlinkSync(path.join(__dirname, '../..', CATEGORY_LOGO_PATH, '/', bannerImage));
        }
        return res.status(404).json({ error: 'No Category found exist with this parent_id' });
      }
    } else {
      const existingCategory = await Category.findByPk(categoryId);
      if (!existingCategory) {
        if (imagePath) {
          fs.unlinkSync(path.join(__dirname, '../..', CATEGORY_LOGO_PATH, '/', imagePath));
        }
        if (bannerImage) {
          fs.unlinkSync(path.join(__dirname, '../..', CATEGORY_LOGO_PATH, '/', bannerImage));
        }
        return res.status(404).json({ error: 'No Category Record with this categoryId' });
      }
      if (existingCategory) {
        if (imagePath) {
          if (existingCategory.image_path) {
            fs.unlinkSync(path.join(__dirname, '../..', CATEGORY_LOGO_PATH, '/', existingCategory.image_path));
          }
        } else {
          // if (existingCategory.image_path) {
          //     fs.unlinkSync(path.join(__dirname, '../..', CATEGORY_LOGO_PATH, '/', existingCategory.image_path));
          // }
          imagePath=existingCategory.image_path;
        }
        if (bannerImage) {
          if (existingCategory.banner_image) {
            fs.unlinkSync(path.join(__dirname, '../..', CATEGORY_LOGO_PATH, '/', existingCategory.banner_image));
          }
        } else {
          // if (existingCategory.banner_image) {
          //     fs.unlinkSync(path.join(__dirname, '../..', CATEGORY_LOGO_PATH, '/', existingCategory.banner_image));
          // }
          bannerImage=existingCategory.banner_image;
        }
      }

      const [rowCount, updatedCategory] = await Category.update({
        title,
        description,
        category_type,
        image_path: imagePath,
        banner_image: bannerImage,
      }, {
        where: {
          id: categoryId,
        },
        returning: true,
      });
      if (rowCount > 0) {
        return res.status(200).json(updatedCategory[0]);
      } else {
        return res.status(404).json({ error: 'No Category found' });
      }
    }
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error ' + err.message });
  }
};


/**
 * Controller function to create multiple Category record .
 * parent_id is passed in params
 * array of object is passed in body
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.createMultipleCategory = async function(req, res) {
  try {
    const parent_id = req.params.parent_id;
    const arr = req.body;
    if (!arr.length) {
      return res.status(400).json({ error: 'Please provide your category data in json array[]!' });
    }
    if (parent_id) {
      const record = await Category.findOne({ where: { id: parent_id } });
      const returnArr = [];
      if (record) {
        const updatedArr = arr.map((item) => {
          return {
            ...item,
            parent_id: parent_id, // Add parent_id
          };
        });
        const result = await Category.bulkCreate(
            updatedArr,
            {
              updateOnDuplicate: ['title', 'description', 'parent_id', 'category_type'],
            },
        );
        if (result) {
          return res.status(200).json({ message: 'Sub Categories Created', data: result });
        } else {
          return res.status(400).json({ error: 'No Sub Category created' });
        }
      } else {
        return res.status(404).json({ error: 'No Parent Category exist with this parent_id' });
      }
    }
  } catch (err) {
    return res.status(500).json({ error: 'Internal ServerError ' + err.message });
  }
};

/**
 * Controller function to get all subcategories of a category .
 * parent_id is passed in params
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.getSubcategories = async function(req, res) {
  try {
    const parent_id = req.params.parent_id;
    const categories = await Category.findAll({
      where: {
        parent_id: parent_id,
      },
    });
    if (categories.length > 0) { // if subcategories exist then simply return sub-categories
      return res.status(200).json({ message: 'Sub Category Exist', subCategories: categories, products: [] });
    } else {// if no subcategories then return Product having this id as category_id
      const products = await Product.findAll({
        where: {
          category_id: {
            [Sequelize.Op.like]: `%${parent_id}%`,
          },
        },
      });
      return res.status(200).json({ message: 'No Sub Category Exist', subCategories: [], products: products });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' + err.message });
  }
};
/**
 * Controller function to Delete categories of a category .
 * parent_id is passed in params
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.delcategories = async function(req, res) {
  try {
    const category_id = req.params.category_id;
    const categoryToDelete = await Category.findByPk(category_id);
    if (!categoryToDelete) {
      return res.status(404).json({ error: 'No Category found' });
    }
    if (categoryToDelete) {
      if (categoryToDelete.image_path) {
        fs.unlinkSync(path.join(__dirname, '../..', CATEGORY_LOGO_PATH, '/', categoryToDelete.image_path));
      }
      if (categoryToDelete.banner_image) {
        fs.unlinkSync(path.join(__dirname, '../..', CATEGORY_LOGO_PATH, '/', categoryToDelete.banner_image));
      }
    }
    const categories = await Category.destroy({
      where: {
        id: category_id,
      },
    });
    if (!categories) {
      return res.status(404).json({ error: 'category not found' });
    } else {
      return res.status(200).json({ message: 'category deleted successfully', data: categoryToDelete });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' + err.message });
  }
};

/**
 * Search Category details by fieldName and  fieldValue from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise representing the completion of the retrieval operation.
 */

module.exports.search = async function(req, res) {
  try {
    const { fieldName, fieldValue } = req.params;
    if (!Category.rawAttributes[fieldName]) {
      return res.status(400).json({ error: 'Invalid field name' });
    }
    const categories = await Category.findAll({
      where: {
        [fieldName]: fieldValue,
      },
    });
    if (categories.length > 0) {
      return res.status(200).json({ message: 'Fetched Records', data: categories });
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
