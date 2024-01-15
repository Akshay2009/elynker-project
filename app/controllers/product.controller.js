const db = require("../models");
const { Op, DataTypes, Sequelize } = require('sequelize');
const Product = db.product;

module.exports.getAllProductCategory = async function (req, res) {
    try {
        const product = await Product.findAll({
            where: {
                parent_id: null
            }
        });
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(500).json({ error: 'No Products Returned' });
        }
    } catch (err) {
        res.status(500).json({ error: ' err.message' });
    }

}

module.exports.createProduct =  async function(req,res){
    try {
        const { title, description, parent_id} = req.body;
        const product = await Product.create({
            title,
            description,
            parent_id : parent_id ||  null,
        });
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(500).json({ error: 'No Products Returned' });
        }
    } catch (err) {
        res.status(500).json({ error: ' err.message' });
    }
}

module.exports.getSubProducts = async function(req,res){
    const parentId = req.params.parent_id;
    try {
        const subProducts = await Product.findAll({
          where: { parent_id: parentId },
        });
    
        res.json(subProducts);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error'+err.message });
      }
}