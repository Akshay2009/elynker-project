const { authJwt } = require("../middleware");
const multer = require('multer');
const path = require('path');
const categoryController = require("../controllers/category.controller");

const CATEGORY_LOGO_PATH = path.join('/uploads/category/category_logo');

let storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, path.join(__dirname, '..', CATEGORY_LOGO_PATH));
    },
    filename: function (req, res, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 100);
        cb(null, 'logo' + '-' + uniqueSuffix);
    }
});
const fileFilter = function (req, file, cb) {
    try {
        const allowedFileTypes = /jpeg|jpg|png/;
        const mimetype = allowedFileTypes.test(file.mimetype);
        const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }

        const error = new Error('Only JPEG, JPG, and PNG files are allowed!');
        error.status = 400; // Set the status code for the error

        cb(error);
    } catch (err) {
        console.log('error in fileFilter function', err.message);
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
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

module.exports = function (app) {

    /* End Point to  get all the categories Record
        GET - /api/categories API endpoint
        categoryController.getAllCategory - Controller function to get All Categories
    */
    app.get('/api/categories', 
        [authJwt.verifyToken], 
        categoryController.getAllCategory
    );

    /* End Point to  create a categories Record
        POST - /api/categories API endpoint
        categoryController.createCategory - Controller function to Create a categories record
    */
    app.post('/api/categories',
        [authJwt.verifyToken], 
        categoryController.createCategory
    );

    /* End Point to  get  a categories Record by categoryId : id
        POST - /api/categories/:categoryId API endpoint
        categoryController.getCategoryById - Controller function to get a categories record with categoryId
    */
    app.get('/api/categories/:categoryId', 
        [authJwt.verifyToken], 
        categoryController.getCategoryById
    );
    
    
    /* End Point to  update a categories Record by categoryId : id
        PUT - /api/categories/:categoryId API endpoint
        categoryController.updateCategory - Controller function to update a categories record with categoryId
    */
    app.put('/api/categories/:categoryId',
        [authJwt.verifyToken], 
        categoryController.updateCategory
    );

    /* End Point to  create multiple category record based on parent_id
       POST - /api/categories/multiple/:parent_id API endpoint
       parent_id  in params
       ---- in body array of object------
       [
            {
                "title":"tmt bars",
                "description":"tmt",
                "category_type":"business"
            },
            {
                "title":"steel plates",
                "description":"steel plates",
                "category_type":"business"
            },
            {
                "title":"Stainless Steel Sheet",
                "description":"Stainless Steel Sheet",
                "category_type":"business"
            }
        ]
        -------------------------------------------
       categoryController.createMultipleCategory - Controller function to get All Categories
   */
       app.post('/api/categories/multiple/:parent_id',
       [authJwt.verifyToken], 
       categoryController.createMultipleCategory
   );


   /* End Point to  get  all categories Record having parent_id as parent_id passed in params
       POST - /api/categories/subcategories/:parent_id API endpoint
       categoryController.getSubcategories - Controller function to get a categories record with parent_id
   */
   app.get('/api/categories/subcategories/:parent_id',
       [authJwt.verifyToken], 
       categoryController.getSubcategories
   );
    
};
