const db = require("../models");
const { Op, DataTypes, Sequelize } = require('sequelize');
const Category = db.category;

module.exports.getAllCategory = async function (req, res) {
    try {
        const categories = await Category.findAll({
        });
        if (categories) {
            res.status(200).json(categories);
        } else {
            res.status(404).json({ error: 'No Category Returned' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error '+err.message });
    }
}
module.exports.createCategory = async function (req, res) {
    try {

        const { title, description, parent_id } = req.body;
        // const imagePaths = req.files['image_path'].map((file) => file.path);
        // const bannerImagePath = req.files['banner_image'][0].path;
        if (parent_id) {
            const newCategory = await Category.create({
                title,
                description,
                // image_path: imagePaths,
                // banner_image: bannerImagePath,
                parent_id: parent_id
            });
            if (newCategory) {
                res.status(200).json(newCategory);
            } else {
                res.status(404).json({ error: 'Category not created' });
            }
        }
        else {
            const newCategory = await Category.create({
                title,
                description,
                // image_path: imagePaths,
                // banner_image: bannerImagePath,
                parent_id: null
            });

            if (newCategory) {
                res.status(200).json(newCategory);
            } else {
                res.status(404).json({ error: 'Category not created' });
            }
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal ServerError ' + err.message });
    }

}
module.exports.getCategoryById = async function (req, res) {
    try {
        const categoryId = req.params.categoryId;
        const categories = await Category.findOne({
            where: {
                id: categoryId
            }
        });
        if (categories) {
            res.status(200).json(categories);
        } else {
            res.status(404).json({ error: 'No Category Returned' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error'+err.message });
    }
}

module.exports.updateCategory = async function (req, res) {
    try {
        const categoryId = req.params.categoryId;
        const { title, description, parent_id } = req.body;
        // const imagePaths = req.files['image_path'].map((file) => file.path);
        // const bannerImagePath = req.files['banner_image'][0].path;
        if(parent_id){
            const record = await Category.findOne({ where: { id : parent_id}});
            if(record){
                const [rowCount, updatedCategory] = await Category.update({
                    title,
                    description,
                    // image_path: imagePaths,
                    // banner_image: bannerImagePath,
                    parent_id: parent_id ,
                },{
                    where: {
                        id: categoryId
                    },
                    returning: true
                });
        
                if(rowCount>0){
                    res.status(202).json(updatedCategory[0]);
                }
                else{
                    res.status(404).json({ error: 'No Category found' });
                }
            }else{
                res.status(404).json({ error: 'No Category found exist with this parent_id' });
            }
        }
        else{
            const [rowCount, updatedCategory] = await Category.update({
                title,
                description,
                // image_path: imagePaths,
                // banner_image: bannerImagePath,
                parent_id: null ,
            },{
                where: {
                    id: categoryId
                },
                returning: true
            });
            if(rowCount>0){
                res.status(202).json(updatedCategory[0]);
            }
            else{
                res.status(404).json({ error: 'No Category found' });
            }
        }

    } catch (err) {
        res.status(500).json({ error:'Internal Server Error '+ err.message });
    }

}
