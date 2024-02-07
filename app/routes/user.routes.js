const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  
/**
 * Update user details by user ID from the database.
 *
 */
  app.put('/api/users/:id', 
    [authJwt.verifyToken],
    controller.updateUser
  )

/**
 * Retrieve user details by user ID from the database.
 *
 */
  app.get('/api/users/:id',
    [authJwt.verifyToken],
    controller.getUserById
  )
   /**
 * delete user details by user ID from the database.
 *
 */
   app.delete('/api/users/:id',
   [authJwt.verifyToken],
   controller.delUserById
 )
};
