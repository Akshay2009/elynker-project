const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

    
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
};
