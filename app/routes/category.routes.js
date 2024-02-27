const { authJwt } = require("../middleware");
const {
  upload,
  handleMulterError,
} = require("../uploadUtils");
const categoryController = require("../controllers/category.controller");





module.exports = function (app) {
  /* End Point to  get all the categories Record
        GET - /api/categories API endpoint
        categoryController.getAllCategory - Controller function to get All Categories
    */
  app.get(
    "/api/categories",
    [authJwt.verifyToken],
    categoryController.getAllCategory
  );

  /* End Point to  create a categories Record
        POST - /api/categories API endpoint
        categoryController.createCategory - Controller function to Create a categories record
    */
  app.post(
    "/api/categories",
    [authJwt.verifyToken],
    upload.fields([{ name: "image_path", maxCount: 1 }, { name: "banner_image", maxCount: 1 }]),
    handleMulterError,
    categoryController.createCategory
  );

  /* End Point to  get  a categories Record by categoryId : id
        POST - /api/categories/:categoryId API endpoint
        categoryController.getCategoryById - Controller function to get a categories record with categoryId
    */
  app.get(
    "/api/categories/:categoryId",
    [authJwt.verifyToken],
    categoryController.getCategoryById
  );

  /* End Point to  update a categories Record by categoryId : id
        PUT - /api/categories/:categoryId API endpoint
        categoryController.updateCategory - Controller function to update a categories record with categoryId
    */
  app.put(
    "/api/categories/:categoryId",
    [authJwt.verifyToken],
    upload.fields([{ name: "image_path", maxCount: 1 }, { name: "banner_image", maxCount: 1 }]),
    handleMulterError,
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
                "category_type":"business",
                "id":   //if this is send then it will update this sub category
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
  app.post(
    "/api/categories/multiple/:parent_id",
    [authJwt.verifyToken],
    categoryController.createMultipleCategory
  );

  /* End Point to  get  all categories Record having parent_id as parent_id passed in params
        POST - /api/categories/subcategories/:parent_id API endpoint
        categoryController.getSubcategories - Controller function to get a categories record with parent_id
    */
  app.get(
    "/api/categories/subcategories/:parent_id",
    [authJwt.verifyToken],
    categoryController.getSubcategories
  );

  /* End Point to Delete  categories Record having parent_id as parent_id passed in params
        Delete - /api/categories/subcategories/:parent_id API endpoint
        categoryController.getSubcategories - Controller function to Delete a categories record with parent_id
    */
  app.delete(
    "/api/categories/:category_id",
    [authJwt.verifyToken],
    categoryController.delcategories
  );


  /**
   * Search Category details by fieldName and  fieldValue from the database.
  */
  app.get('/api/categories/search/:fieldName/:fieldValue',
    [authJwt.verifyToken],
    categoryController.search
  )
};
