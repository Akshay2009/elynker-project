const db = require("../models");
const path = require('path');
const Product = db.product;
const Registration = db.registration;
const Category = db.category;
const parseCSV = require('./csvParser');

/**
 method to generate unique SKU in form SKU_****
 */
function generateUniqueSKU() {
    const randomNumber = Math.floor(Math.random() * 10000000000); // 10-digit random number
    const timestamp = Date.now().toString();
    const uniqueSKU = 'SKU_' + timestamp + randomNumber.toString().padStart(6, '0');
    return uniqueSKU;
}


/**
 * Controller function to get all the Product record .
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.getAllProducts = async function (req, res) {
    try {
        const products = await Product.findAll({});
        if (products) {
            res.status(200).json(products);
        } else {
            res.status(500).json({ error: 'No Product Found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error ' + error.message });
    }
}

/**
 * Controller function to a Product record based on sku.
 * sku is passed in params
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.getProductBySKU = async function (req, res) {
    const sku = req.params.sku;
    try {
        const products = await Product.findOne({
            where: {
                sku: sku
            }
        });
        if (products) {
            res.status(200).json(products);
        } else {
            res.status(500).json({ error: 'No Product Found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error ' + error.message });
    }
}

/**
 * Controller function to create Product records based on CSV file passed.
 * multer is used.
 * This controller also updates the business_type on Registration Table.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.createProduct = async function (req, res) {
    try {
        const { type, registrationId, category_id } = req.body;
        // Split comma-separated category IDs into an array
        const categoryIdsArray = category_id.split(',');
        let categoryIds;
        //const imageFileNames = req.files['images'].map((file) => path.basename(file.path));

        if (req.files && req.files['csvFilePath'][0].path) {
            const csvData = await parseCSV(req.files['csvFilePath'][0].path);

            for (const row of csvData) {
                const productImages = row.product_images ? row.product_images.split(',') : [];
                const productImagesString = productImages.join(',');
                let catIdArray;
                // Split comma-separated category IDs into an array
                const rowCategoryIdsArray = row.category_id ? row.category_id.split(',') : [];
                if (rowCategoryIdsArray.length > 0) {
                    catIdArray = rowCategoryIdsArray;
                    categoryIds = rowCategoryIdsArray.join(',');
                } else {
                    catIdArray = categoryIdsArray;
                    categoryIds = categoryIdsArray.join(',');
                }

                if (row.sku) {
                    console.log('*****', row.sku, '**catIdArray*', catIdArray);
                    const [product, created] = await Product.findOrCreate({
                        where: { sku: row.sku },
                        defaults: {
                            title: row.title,
                            description: row.description,
                            type: type,
                            registrationId,
                            budget: row.budget,
                            moq: row.moq,
                            category_id: categoryIds,
                            //images: imageFileNames,
                            default_image: row.default_image,
                            product_images: productImagesString
                        }
                    });

                    if (!created) {
                        // If the product already existed, update the fields
                        await product.update({
                            title: row.title,
                            description: row.description,
                            type: type,
                            registrationId,
                            budget: row.budget,
                            moq: row.moq,
                            category_id: categoryIds,
                            //images: imageFileNames,
                            default_image: row.default_image,
                            product_images: productImagesString
                        });
                    }
                    // Find categories by IDs
                    const categories = await Category.findAll({
                        where: {
                            id: catIdArray,
                        },
                    });

                    // Update associations
                    await product.setCategories(categories);
                }
            }

            await Registration.update({ business_type: type },
                { where: { id: registrationId } }
            );

            res.status(200).json({ message: 'Products Data inserted successfully' });
        } else {
            res.status(500).json({ message: 'CSV file not provided' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error ' + error.message });
    }
};

/**
 * Controller function to upload Product Images.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.createProductsImages = async function (req, res) {
    try {
        res.status(200).json({ message: 'Images Uploaded Successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error ' + error.message });
    }
}

/**
 * Controller function to create Product Single Record.
 * multer is used to upload images
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.createProductsSingleRecord = async function (req, res) {
    try {
        const { type, registrationId, title, description, budget, moq, category_id } = req.body;
        const imageFileNames = req.files['images'].map((file) => path.basename(file.path));
        const sku = generateUniqueSKU();
        const productImagesString = imageFileNames.join(',');
        // Split comma-separated category IDs into an array
        const categoryIdsArray = category_id.split(',');
        const product = await Product.create({
            title: title,
            description: description,
            sku: sku,
            type: type,
            registrationId,
            category_id: categoryIdsArray.join(','),
            budget: budget,
            moq: moq,
            default_image: imageFileNames[0],
            product_images: productImagesString
        });
        const categories = await Category.findAll({
            where: {
                id: categoryIdsArray,
            },
        });

        // Associate the product with categories
        await product.addCategories(categories);
        // update the business_type on Registration
        await Registration.update({ business_type: type },
            { where: { id: registrationId } }
        );

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(400).json({ error: 'Product not inserted' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error ' + error.message });
    }
}

/**
 * Controller function to update a Product Single Record.
 * multer is used to upload images
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.updateProducts = async function (req, res) {
    try {
        const sku = req.params.sku;
        const { title, description, budget, moq, category_id } = req.body;
        if (!category_id) {
            return res.status(401).json({ error: 'No category Provided' });
        }
        // Split comma-separated category IDs into an array
        const categoryIdsArray = category_id.split(',');
        const categories = await Category.findAll({
            where: {
                id: categoryIdsArray,
            },
        });
        if (categories.length == 0) {
            return res.status(401).json({ error: 'No category with this id' });
        }

        let catArray = [];
        categories.forEach((cat) => {
            catArray.push(cat.id)
        });

        let productImagesString;
        let imageFileNames;

        const product_details = {
            title,
            description,
            budget,
            moq,
            category_id: catArray.join(',')
        }

        if (req.files['images']) { // if images are uploaded then then update product_images and default_image field
            imageFileNames = req.files['images'].map((file) => path.basename(file.path));
            productImagesString = imageFileNames.join(',');
            product_details.default_image = imageFileNames[0];
            product_details.product_images = productImagesString
        }

        const [rowUpdated, productUpdated] = await Product.update(product_details, {
            where: {
                sku: sku
            },
            returning: true
        });

        if (rowUpdated > 0) {
            // Update associations
            await productUpdated[0].setCategories(categories);
            res.status(200).json(productUpdated[0]);
        } else {
            res.status(404).json({ error: 'No Product found with this sku' });
        }

    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error ' + err.message })
    }
}

module.exports.getProductByRegistrationId = async function (req, res) {
    const registrationId = req.params.registrationId;
    try {
        const products = await Product.findAll({
            where: {
                registrationId: registrationId
            }
        });
        if (products.length > 0) {
            res.status(200).json(products);
        } else {
            res.status(500).json({ error: 'No Product Found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error ' + error.message });
    }
}

module.exports.deleteProductBySku = async function (req, res) {
    try {
        const sku = req.params.sku;
        const productToDelete = await Product.findOne({
            where: {
                sku: sku
            }
        });
        if (!productToDelete) {
            return res.status(404).json({ error: 'No Product found' });
        }
        const deletedProduct = await Product.destroy({
            where: {
                sku: sku
            },
            returning: true,
            raw: true,
        });
        if (deletedProduct) {
            return res.status(200).json({ message: 'Product Deleted Successfully', product: productToDelete });
        } else {
            return res.status(401).json({ error: 'No Product Deleted' });
        }

    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error ' + err.message });
    }
}