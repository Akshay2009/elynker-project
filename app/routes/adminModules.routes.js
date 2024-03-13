const { authJwt } = require('../middleware');
const adminModulesController = require('../controllers/adminModules.controller');

module.exports = function(app) {
    /**
 * Endpoint to post admin modules details 
 * @param {String} '/api/admin/modules' - API endpoint path.
 * @param {Function[]} [authJwt.verifyToken,
 * @param {Function}adminModulesController.createAdminModule - Controller function to post admin modules details**/

    app.post(
        '/api/admin/modules',
        [authJwt.verifyToken],
        adminModulesController.createAdminModule,
    );

    /**
* Endpoint to get all admin modules details 
* @param {String} '/api/admin/modules' - API endpoint path.
* @param {Function[]} [authJwt.verifyToken,
* @param {Function}adminModulesController.getAdminModule - Controller function to get all admin modules details**/

    app.get(
        '/api/admin/modules',
        [authJwt.verifyToken],
        adminModulesController.getAdminModule,
    );

    /**
* Endpoint to get admin modules details by ID
* @param {String} '/api/admin/modules/:adminId' - API endpoint path.
* @param {Function[]} [authJwt.verifyToken,
* @param {Function}adminModulesController.getAdminModuleById - Controller function to get admin modules details by ID**/

    app.get(
        '/api/admin/modules/:adminId',
        [authJwt.verifyToken],
        adminModulesController.getAdminModuleById,
    );


    /**
* Endpoint to put admin modules details by ID
* @param {String} '/api/admin/modules/:adminId' - API endpoint path.
* @param {Function[]} [authJwt.verifyToken,
* @param {Function}adminModulesController.updateAdminModuleById- Controller function to put admin modules details by Id**/

    app.put(
        '/api/admin/modules/:adminId',
        [authJwt.verifyToken],
        adminModulesController.updateAdminModuleById,
    );


        /**
* Endpoint to delete admin modules details by ID
* @param {String} '/api/admin/modules/:adminId' - API endpoint path.
* @param {Function[]} [authJwt.verifyToken,
* @param {Function}adminModulesController.deleteAdminModuleById- Controller function to delete admin modules details by Id**/

app.delete(
    '/api/admin/modules/:adminId',
    [authJwt.verifyToken],
    adminModulesController.deleteAdminModuleById,
);


        /**
* Endpoint to get Admin module details BY field value and Field name
* @param {String} '/api/admin/modules/:adminId' - API endpoint path.
* @param {Function[]} [authJwt.verifyToken,
* @param {Function}adminModulesController.deleteAdminModuleById- Controller function to to get Admin module details BY field value and Field name*/

app.get(
    '/api/admin/modules/search/:fieldName/:fieldValue',
    [authJwt.verifyToken],
    adminModulesController.searchAdminModules,
);
};
