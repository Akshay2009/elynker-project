const { authJwt } = require('../middleware');
const filterVendors = require('../controllers/miscellaneous.controller');


module.exports = function (app) {
    /**
 * Endpoint to get filter vendors details 
 * @param {String} '/api/vendors/:type/:location' - API endpoint path.
 * @param {Function[]} [authJwt.verifyToken,
 * @param {Function} Registration.getVendorsByFilter, - Controller function to get filter vendors details**/

    app.get(
        '/api/vendors/:type/:location',
        [authJwt.verifyToken],
        filterVendors.getVendorsByLocation,
    );
}