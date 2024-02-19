const { authJwt } = require("../middleware");
const {
    uploadImages,
    uploadCsv,
    handleMulterError,
  } = require("../uploadUtils");
const productController = require("../controllers/product.controller");

module.exports = function (app) {
   /* End Point to  create a Products Record
        POST - /api/products API endpoint
        productController.createProduct - Controller function to Create Records in Product Table and if already present then update based on sku
    */
    app.post('/api/products',
        [authJwt.verifyToken], 
        uploadCsv.fields([
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

    /* End Point to  just insert images
        POST - /api/products/images API endpoint
        productController.createProductsImages - Controller function to just to send response we are not storing images to the db
    */

    app.post('/api/products/images',
        [authJwt.verifyToken], 
        uploadImages.fields([
            { name: 'images' }, 
        ]),
        handleMulterError,productController.createProductsImages
    );

    /* End Point to insert Record of Product Table for Screen 9
        POST - /api/products/product API endpoint
        productController.createProductsSingleRecord - Controller function to insert record in Product Table
    */
    app.post('/api/products/product',
        [authJwt.verifyToken], 
        uploadImages.fields([
            { name: 'images' }, 
        ]),
        handleMulterError,productController.createProductsSingleRecord
    );
    /* End Point to update Record of  Product Table based on sku passed in params
        PUT - /api/products/:sku API endpoint
        productController.updateProducts - Controller function to update record in Product Table
    */
    app.put('/api/products/:sku',
        [authJwt.verifyToken], 
        uploadImages.fields([
            { name: 'images' }, 
        ]),
        handleMulterError,productController.updateProducts
    );

    /* End Point to  get All Products with registrationId
        GET - /api/users/products/:registrationId End Point
        productController.getProductByRegistrationId - Controller function to get All Product Records with registrationId
    */
        app.get('/api/users/products/:registrationId',
        [authJwt.verifyToken], 
        productController.getProductByRegistrationId
    )

    app.delete('/api/products/:sku',
        [authJwt.verifyToken],
        productController.deleteProductBySku
    );

    app.delete(
        "/api/products/images/:product_id",
        [authJwt.verifyToken],
        productController.delProductImages
    );

};
