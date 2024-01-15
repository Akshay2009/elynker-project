const { authJwt } = require("../middleware");
const productController = require("../controllers/product.controller");

module.exports = function (app) {
    // app.get('/api/products/', [authJwt.verifyToken], productController.getAllProductCategory);
    // app.get('/api/products/:product_id', [authJwt.verifyToken], productController.createProduct);
    // app.put('/api/products/', [authJwt.verifyToken], productController.createProduct);
    // app.get('/api/products/category/:category_id', [authJwt.verifyToken], productController.getSubProducts);
};