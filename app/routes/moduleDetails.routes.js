const { authJwt } = require('../middleware');
const moduleDetailsController = require('../controllers/moduleDetails.controller');

module.exports = function(app) {
    /**
     * Create new Module Details Record
     */
    app.post('/api/moduleDetails',
        [authJwt.verifyToken],
        moduleDetailsController.saveModuleDetails,
    );
    /**
     * Update Module Details Record
    */
    app.put('/api/moduleDetails',
        [authJwt.verifyToken],
        moduleDetailsController.updateModuleDetails,
    );
    /**
     * Delete Module Details Record
    */
    app.delete('/api/moduleDetails/:id',
        [authJwt.verifyToken],
        moduleDetailsController.deleteModuleDetails,
    );
    /**
     * Get All Module Details Record
    */
   app.get('/api/moduleDetails',
        [authJwt.verifyToken],
        moduleDetailsController.getAll,
    );
    /**
     * Get  Module Details Record by id*/
    app.get('/api/moduleDetails/:id',
        [authJwt.verifyToken],
        moduleDetailsController.getById,
    );
    /** Search Module Details details by fieldName and  fieldValue from the database.*/
    app.get('/api/moduleDetails/search/:fieldName/:fieldValue',
        [authJwt.verifyToken],
        moduleDetailsController.search,
    );

    app.get('/api/moduleDetails/adminModules/:admin_module_id',
        [authJwt.verifyToken],
        moduleDetailsController.getByAdminModuleId,
    );

    app.delete('/api/moduleDetails/adminModules/:admin_module_id',
        [authJwt.verifyToken],
        moduleDetailsController.deleteByAdminModuleId,
    );
};
