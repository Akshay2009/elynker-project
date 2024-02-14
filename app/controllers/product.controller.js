const db = require("../models");
const path = require('path');
const Product = db.product;
const Registration = db.registration;
const Category = db.category;
const parseCSV = require('./csvParser');
const fs = require('fs');
const axios = require('axios');
require('dotenv').config();
const PRODUCT_IMAGE_PATH = path.join(process.env.PRODUCT_IMAGE_PATH);


/**
 method to generate unique SKU in form SKU_****
 */
 function generateUniqueSKU() {
    return 'SKU_' + Date.now().toString() + Math.floor(Math.random() * 1000);
}

// method to download image from csv file
async function downloadImage(imageUrl, imageName) {
    try {
      // Fetch the image using axios
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  
      // Specify the path where the image will be stored
      const imagePath = path.join(__dirname, '../..', PRODUCT_IMAGE_PATH,'/', imageName);
  
      // Write the image to the file system
      fs.writeFileSync(imagePath, Buffer.from(response.data));
  
      console.log(`Image downloaded and stored at: ${imagePath}`);
    } catch (error) {
      console.error('Error downloading the image:', error.message);
    }
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
            return res.status(200).json(products);
        } else {
            return res.status(500).json({ error: 'No Product Found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error ' + error.message });
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
            return res.status(200).json(products);
        } else {
            return res.status(500).json({ error: 'No Product Found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error ' + error.message });
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
        const { type, registrationId } = req.body;
        if(!req.files['csvFilePath']){
            return res.status(400).json({error: 'Please Provide CSV'});
        }
        if(!registrationId){
            return res.status(400).json({error: 'Registration ID Not provided'});
        }
        if(!type){
            return res.status(400).json({error: 'Type not Provided - Product/Service'});
        }

        let categoryIds;

        if (req.files && req.files['csvFilePath'][0].path) {
            const csvData = await parseCSV(req.files['csvFilePath'][0].path);

            for (const row of csvData) {
                const productImages = row.product_images ? row.product_images.split(',') : [];
                let productArray = [];
                for(let j=0;j<productImages.length;j++){
                    const imageUrl = productImages[j]; 
                    // let imageName = registrationId+row.title+'image'+j; // Replace with the desired image name
                    // imageName = imageName+imageUrl.substring(imageUrl.lastIndexOf("."));
                    let imageName = imageUrl.substring(imageUrl.lastIndexOf("/")+1);
                    productArray.push(imageName);
                    downloadImage(imageUrl, imageName);
                }


                let catIdArray;
                // Split comma-separated category IDs into an array
                const rowCategoryIdsArray = row.category_id ? row.category_id.split(',') : [];
                if (rowCategoryIdsArray.length > 0) {
                    catIdArray = rowCategoryIdsArray;
                    categoryIds = rowCategoryIdsArray.join(',');
                } 

                if (row.sku) {
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
                            default_image: productArray[0],
                            product_images: productArray.join(',')
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
                            default_image: productArray[0],
                            product_images: productArray.join(',')
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

            return res.status(200).json({ message: 'Products Data inserted successfully using CSV' });
        } else {
            return res.status(500).json({ message: 'CSV file not provided' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error ' + error.message });
    }
};

/**
 * Controller function to upload Product Images.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports.createProductsImages = async function (req, res) {
    try {
        return res.status(200).json({ message: 'Images Uploaded Successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error ' + error.message });
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
        const { type, registrationId, title, description, budget, moq, category_id,unit,year_of_exp,
            portfolio_link} = req.body;
        if(!req.files['images']){
            return res.status(405).json({error: 'Please Provide Product Images'});
        }
        if(!registrationId){
            return res.status(403).json({error: 'Registration ID Not provided'});
        }
        if (!category_id) {
            return res.status(402).json({ error: 'No category Provided' });
        }
        if(!type){
            return res.status(400).json({error: 'Type not Provided - Product/Service'});
        }
        const regRecord = await Registration.findOne({
            where: { id: registrationId}
        });
        if(!regRecord){
            return res.status(404).json({error: 'Registration Doesnot Exist'});
        }
        const imageFileNames = req.files['images'].map((file) => path.basename(file.path));
        const sku = generateUniqueSKU();
        const productImagesString = imageFileNames.join(',');
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
        const product = await Product.create({
            title: title,
            description: description,
            sku: sku,
            type: type,
            registrationId,
            year_of_exp,
            portfolio_link,
            category_id: catArray.join(','),
            budget: budget,
            moq: moq,
            unit: unit,
            default_image: imageFileNames[0],
            product_images: productImagesString
        });
        if (product) {
            // Associate the product with categories
            await product.addCategories(categories);
            return res.status(200).json(product);
        } else {
            return res.status(400).json({ error: 'Product not inserted' });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error ' + error.message });
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
        const { title, description, budget, moq, category_id,registrationId,unit,year_of_exp,portfolio_link } = req.body;
        if(!registrationId){
            return res.status(404).json({error: 'Registration ID Not provided'});
        }
        if (!category_id) {
            return res.status(401).json({ error: 'No category Provided' });
        }
        const regRecord = await Registration.findOne({
            where: { id: registrationId}
        });
        if(!regRecord){
            return res.status(404).json({error: 'Registration Does not Exist'});
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
            year_of_exp,
            portfolio_link,
            unit:unit,
            category_id: catArray.join(','),
            registrationId: registrationId
        }
        const existingProduct = await Product.findOne({ where: { sku : sku }});
        if(!existingProduct){
            return res.status(404).json({ error: 'No Product found with this sku' });
        }
        let existingProductImages = existingProduct.product_images.split(',');
        let existingProductImagesString;
        if(existingProductImages.join(',').length ==0){
            existingProductImagesString = "";
        }else{
            existingProductImagesString = existingProductImages.join(',');
        }
        

        if (req.files['images'] ) { // if images are uploaded then then update product_images and default_image field
            imageFileNames = req.files['images'].map((file) => path.basename(file.path));
            productImagesString = imageFileNames.join(',');
            if(existingProductImages.join(',').length===0){
                product_details.default_image = imageFileNames[0];
                product_details.product_images = productImagesString
            }else{
                product_details.default_image = existingProductImages[0];
                product_details.product_images = existingProductImagesString+','+productImagesString
            }
        }else{
            product_details.default_image = "";
            product_details.product_images = "";
            const existingProductImages = existingProduct.product_images.split(',');
            for( let i=0;i<existingProductImages.length;i++){
                fs.unlinkSync(path.join(__dirname, '../..', PRODUCT_IMAGE_PATH,'/',existingProductImages[i]));
            }
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
            return res.status(200).json(productUpdated[0]);
        } else {
            return res.status(404).json({ error: 'No Product found with this sku' });
        }

    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error ' + err.message })
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
            return res.status(200).json(products);
        } else {
            return res.status(500).json({ error: 'No Product Found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error ' + error.message });
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
        if(productToDelete){
            const existingProductImages = productToDelete.product_images.split(',');
            for( let i=0;i<existingProductImages.length;i++){
                fs.unlinkSync(path.join(__dirname, '../..', PRODUCT_IMAGE_PATH,'/',existingProductImages[i]));
            }
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
        return res.status(500).json({ error: 'Internal Server Error ' + err.message });
    }
}

module.exports.delProductImages=async function(req,res){
    try{
        const {product_id}=req.params;
        const {image_name}=req.body;
        const product = await Product.findByPk(product_id);
        if(!product){
            return res.status(404).json({error:"product id not found kindly check!"})
        }
        let productArray=product.product_images.split(',');
        const productArrayUpdated = productArray.filter(product => product!== image_name);
        
        if(productArray.length === productArrayUpdated.length){
            return res.status(400).json({error:"Image name provided not present on this Product"});
        }
        const [rowUpdated, productUpdated] = await Product.update({
            default_image : productArrayUpdated[0] || "",
            product_images : productArrayUpdated.join(',') || ""
        }, {
            where: {
                id : product_id
            },
            returning: true
        });
        if(rowUpdated>0){
            fs.unlinkSync(path.join(__dirname, '../..', PRODUCT_IMAGE_PATH,'/',image_name));
            return res.status(200).json({message:"Product updated",product:productUpdated[0]});
        }else{
            return res.status(400).json({error:"Error in deleting Product Images"});
        }
    }catch (err) {
        return res.status(500).json({ error: 'Internal Server Error ' + err.message });
    }
} 
