const { authJwt } = require('../middleware');
const rolesController = require('../controllers/role.controller');

module.exports = function(app) {
    /**
     * Create new Role Record
     */
    app.post('/api/roles',
        [authJwt.verifyToken],
        rolesController.saveRole,
    );
    /**
     * Update Role Record
    */
    app.put('/api/roles/:id',
        [authJwt.verifyToken],
        rolesController.updateRole,
    );
    /**
     * Delete Role Record
    */
    app.delete('/api/roles/:id',
        [authJwt.verifyToken],
        rolesController.deleteRole,
    );
    /**
     * Get All Role Record
    */
    app.get('/api/roles',
        [authJwt.verifyToken],
        rolesController.getAll,
    );
    /**
     * Get  Role Record by id
    */
    app.get('/api/roles/:id',
        [authJwt.verifyToken],
        rolesController.getRoleById,
    );

    /**
   * Search Role details by fieldName and  fieldValue from the database.
  */
    app.get('/api/roles/search/:fieldName/:fieldValue',
        [authJwt.verifyToken],
        rolesController.search,
    );
};
