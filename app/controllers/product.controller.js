const db = require("../models");
const path = require('path');
const { Op, DataTypes, Sequelize, where } = require('sequelize');
const Product = db.product;
const Registration = db.registration;
const parseCSV = require('./csvParser');

function generateUniqueSKU() {
    return 'SKU_' + Date.now().toString() + Math.floor(Math.random() * 1000);
  }


module.exports.getAllProducts = async function (req, res) {
    try{
        const products = await Product.findAll({});
        if(products){
            res.status(200).json(products);
        }else{
            res.status(500).json({error : 'No Product Found'});
        }
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error ' + error.message });
    }
}

module.exports.getProductBySKU = async function (req, res) {
    const sku = req.params.sku;
    try{
        const products = await Product.findOne({
            where:{
                sku:sku
            }
        });
        if(products){
            res.status(200).json(products);
        }else{
            res.status(500).json({error : 'No Product Found'});
        }
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error ' + error.message });
    }
}

module.exports.createProduct = async function (req, res) {
    try {
        const { type, registrationId,category_id } = req.body;
        //const imageFileNames = req.files['images'].map((file) => path.basename(file.path));
        
        if (req.files && req.files['csvFilePath'][0].path) {
            const csvData = await parseCSV(req.files['csvFilePath'][0].path);
            
            for (const row of csvData) {
                const productImages = row.product_images ? row.product_images.split(',') : [];
                const productImagesString = productImages.join(',');

                if (row.sku) {
                    console.log('*****', row.sku);
                    const [product, created] = await Product.findOrCreate({
                        where: { sku: row.sku },
                        defaults: {
                            title: row.title,
                            description: row.description,
                            type: type,
                            registrationId,
                            budget: row.budget,
                            moq: row.moq,
                            category_id:category_id,
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
                            category_id: category_id,
                            //images: imageFileNames,
                            default_image: row.default_image,
                            product_images: productImagesString
                        },{
                            where : { sku: row.sku },
                        });
                    }
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


module.exports.createProductsImages = async function(req,res){
    try{
        res.status(200).json({message: 'Images Uploaded Successfully'});
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error ' + error.message });
    }
}


module.exports.createProductsSingleRecord = async function(req,res){
    try{
        const { type, registrationId,title,description,budget,moq,category_id } = req.body;
        const imageFileNames = req.files['images'].map((file) => path.basename(file.path));
        const sku = generateUniqueSKU();
        const productImagesString = imageFileNames.join(',');
        const product = await Product.create({
            title: title,
            description: description,
            sku: sku,
            type: type,
            registrationId,
            category_id,
            budget:budget,
            moq:moq,
            default_image: imageFileNames[0],
            product_images: productImagesString
        });
        if(product){
            res.status(200).json(product);
        }else{
            res.status(400).json({error : 'Product not inserted'});
        }

    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error ' + error.message });
    }
}

module.exports.updateProducts = async function(req,res){
    try{
        const sku = req.params.sku;
        const { title,description,budget,moq,category_id } = req.body;
        let productImagesString;
        let imageFileNames;
        if(req.files['images']){ // if images are uploaded then then update product_images and default_image field
            imageFileNames = req.files['images'].map((file) => path.basename(file.path));
            productImagesString = imageFileNames.join(',');
            const [rowUpdated, productUpdated] = await Product.update({
                title,
                description,
                budget,
                moq,
                category_id,
                default_image: imageFileNames[0],
                product_images: productImagesString
            }, {
                where: {
                    sku: sku
                },
                returning: true
            });
            if(rowUpdated>0){
                res.status(200).json(productUpdated[0]);
            }else{
                res.status(404).json({error : 'No Product found with this sku'});
            }
        }else{ // here product_images and default_image are not updated
            const [rowUpdated, productUpdated] = await Product.update({
                title,
                description,
                budget,
                moq,
                category_id,
            }, {
                where: {
                    sku: sku
                },
                returning: true
            });
            if(rowUpdated>0){
                res.status(200).json(productUpdated[0]);
            }else{
                res.status(404).json({error : 'No Product found with this sku'});
            }
        }
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error ' + error.message });
    }
}