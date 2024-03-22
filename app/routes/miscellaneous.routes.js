const { authJwt } = require('../middleware');
const filterVendors = require('../controllers/miscellaneous.controller');


module.exports = function (app) {
    /**
 * Endpoint to get filter vendors details 
 * @param {String} '/api/vendors/:type/:location/:categoryId' - API endpoint path.
 * @param {Function[]} [authJwt.verifyToken,
 * @param {Function} Registration.getVendorsByFilter, - Controller function to get filter vendors details**/

    app.get(
        '/api/vendors/:type/:location/',
        [authJwt.verifyToken],
        filterVendors.getVendorsByLocation,
    );
    /**
 * Endpoint to get filter vendors details By reg id
 * @param {String} '/api/admin/vendorDetails/:reg_id' - API endpoint path.
 * @param {Function[]} [authJwt.verifyToken,
 * @param {Function} filterVendors.getFreelancerProfileDetailsByRegId, - Controller function to get filter vendors details by Reg id**/

    app.get(
        '/api/admin/vendorDetails/:reg_id',
        [authJwt.verifyToken],
        filterVendors.getFreelancerProfileDetailsByRegId,
    );
}