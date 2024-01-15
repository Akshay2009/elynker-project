const { authJwt } = require("../middleware");
const productController = require("../controllers/product.controller");

module.exports = function (app) {
    app.get('/api/product/allProductCategory', [authJwt.verifyToken], productController.getAllProductCategory);

    app.post('/api/product/createProduct', [authJwt.verifyToken], productController.createProduct);
    app.get('/api/product/subproduct/:parent_id', [authJwt.verifyToken], productController.getSubProducts);
};