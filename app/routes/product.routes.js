const { authJwt } = require("../middleware");
const multer = require('multer');
const path = require('path');
const PRODUCT_IMAGE_PATH = path.join('/uploads/products/products_images');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', PRODUCT_IMAGE_PATH));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 //1MB
    }
});
const handleMulterError = function (err, req, res, next) {
    if (err) {
        console.error('Multer error:', err.message);
        res.status(err.status || 500).json({ error: err.message });
    } else {
        next();
    }
};
const productController = require("../controllers/product.controller");

module.exports = function (app) {
   /* End Point to  create a categories Record
        POST - /api/products API endpoint
        productController.createProduct - Controller function to Create Records in Product Table and if already present then update based on sku
    */
    app.post('/api/products',
        [authJwt.verifyToken], 
        upload.fields([
            { name: 'images', maxCount: 10 }, //  allow up to 10 images
            {name: 'csvFilePath'}
        ]),
        handleMulterError,productController.createProduct
    );

    /* End Point to  get All Products
        GET - /api/products API endpoint
        productController.getAllProducts - Controller function to get All Product Records
    */
    app.get('/api/products',
        [authJwt.verifyToken], 
        productController.getAllProducts
    )
    
    /* End Point to  get  Products based on sku
        GET - /api/products/:sku API endpoint
        productController.getProductBySKU - Controller function to get Product Record based on sku
    */
    app.get('/api/products/:sku',
        [authJwt.verifyToken], 
        productController.getProductBySKU
    )

};