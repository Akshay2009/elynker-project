const db = require("../models");
const path = require('path');
const { Op, DataTypes, Sequelize, where } = require('sequelize');
const Product = db.product;
const Registration = db.registration;
const parseCSV = require('./csvParser');


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
        const { type, registrationId } = req.body;
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

