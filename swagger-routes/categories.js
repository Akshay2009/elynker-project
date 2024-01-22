/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Operations related to Category management
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: List of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       404:
 *         description: No categories returned
 *       500:
 *         description: Internal Server Error

 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - jwt: []
 *     requestBody:
 *       description: Data for creating a new category
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCategory'
 *     responses:
 *       200:
 *         description: New category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not created
 *       500:
 *         description: Internal Server Error

 * /api/categories/{categoryId}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve
 *     responses:
 *       200:
 *         description: Category details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: No Category Returned
 *       500:
 *         description: Internal Server Error

 *   put:
 *     summary: Update category by ID
 *     tags: [Categories]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to update
 *     requestBody:
 *       description: Data for updating the category
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCategory'
 *     responses:
 *       202:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: No Category found
 *       500:
 *         description: Internal Server Error
 */

// Define the components section with schemas for Category and NewCategory
/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID of the category
 *         title:
 *           type: string
 *           description: Title of the category
 *         description:
 *           type: string
 *           description: Description of the category
 *         parent_id:
 *           type: integer
 *           description: ID of the parent category
 *         category_type:
 *           type: string
 *           description: Type of the category
 *
 *     NewCategory:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the category
 *         description:
 *           type: string
 *           description: Description of the category
 *         parent_id:
 *           type: integer
 *           description: ID of the parent category
 *         category_type:
 *           type: string
 *           description: Type of the category
 */
