const { authJwt } = require("../middleware");
const multer = require('multer');
const path = require('path');
const fs = require("fs");
require('dotenv').config();
const USERS_BANNER_PATH = path.join(process.env.USERS_BANNER_PATH);
const freelancerBannerProjectController = require("../controllers/freelancerBannerProjects.controller");


// Multer storage configuration for handling banner images uploads
let storageBannerImage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.join(__dirname, '../..', USERS_BANNER_PATH);
        // Check if the destination directory exists
        fs.access(destinationPath, fs.constants.F_OK, (err) => {
            if (err) {
                // If directory doesn't exist, create it
                fs.mkdir(destinationPath, { recursive: true }, (err) => {
                    if (err) {
                        console.error('Error creating directory:', err);
                        cb(err, null);
                    } else {
                        cb(null, destinationPath);
                    }
                });
            } else {
                cb(null, destinationPath);
            }
        });
    },
    filename: function (req, file, cb) {
        const uniqueFilename = `${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueFilename);
    }
});
const fileFilterImage = function (req, file, cb) {
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

const uploadBannerImage= multer({
    storage: storageBannerImage,
    fileFilter: fileFilterImage,
    limits: {
      fileSize: 2 * 1024 * 1024, // 2MB
      files : 1
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

    /* End Point to  create a UserBanner Record
        POST - /api/user/banners/:registrationId
        usersBannersController.createUsersBanner - Controller function to Create Records UsersBanner Table with provided registrationId
    */
    app.post('/api/user/banners/:registrationId',
        [authJwt.verifyToken],
        uploadBannerImage.fields([
            { name: 'images' }
        ]),
        handleMulterError, freelancerBannerProjectController.createUsersBanner
    );
    
    /* End Point to  update UsersBanner
        PUT - /api/user/banners/:userBannerId
        usersBannersController.updateUsersBanner - Controller function to update Record only banner_name and banner_image
    */
    app.put('/api/user/banners/:userBannerId',
        [authJwt.verifyToken],
        uploadBannerImage.fields([
            { name: 'images' }
        ]),
        handleMulterError, freelancerBannerProjectController.updateUsersBanner
    );
    
    /* End Point to  get UsersBanner record based on userBannerId
        GET - /api/user/banners/:userBannerId
        usersBannersController.getUsersBannerById - Controller function to get UsersBanner record based on userBannerId
    */
    app.get('/api/user/banners/:userBannerId',
        [authJwt.verifyToken],
        freelancerBannerProjectController.getUsersBannerById
    );
    

    /* End Point to  get UsersBanner record based on registrationId
        GET - /api/user/banners/registration/:registrationId
        usersBannersController.getUsersBannerByRegistrationId - Controller function to get all UsersBanner record based on registrationId
    */
    app.get('/api/user/banners/registration/:registrationId',
        [authJwt.verifyToken],
        freelancerBannerProjectController.getUsersBannerByRegistrationId
    );

    /* End Point to  delete a UsersBanners Record
        DELETE  - /api/user/banners/:userBannerId
        usersBannersController.deleteUsersBanner - Controller function to delete UsersBanner Record based on userBannerId
    */
    app.delete('/api/user/banners/:userBannerId',
        [authJwt.verifyToken],
        freelancerBannerProjectController.deleteUsersBanner
    );
    
};
