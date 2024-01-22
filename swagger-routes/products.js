/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operations related to Product management
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create or Update Products from CSV
 *     tags: [Products]
 *     security:
 *       - jwt: []
 *     requestBody:
 *       description: Data for creating or updating products from a CSV file
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               csvFilePath:
 *                 type: string
 *                 format: binary
 *             required:
 *               - csvFilePath
 *     responses:
 *       200:
 *         description: Products Data inserted successfully
 *       500:
 *         description: Internal Server Error

 *   get:
 *     summary: Get All Products
 *     tags: [Products]
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal Server Error

 * /api/products/{sku}:
 *   get:
 *     summary: Get product by SKU
 *     tags: [Products]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: sku
 *         schema:
 *           type: string
 *         required: true
 *         description: SKU of the product to retrieve
 *     responses:
 *       200:
 *         description: Product details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal Server Error

 *   put:
 *     summary: Update product by SKU
 *     tags: [Products]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: sku
 *         schema:
 *           type: string
 *         required: true
 *         description: SKU of the product to update
 *     requestBody:
 *       description: Data for updating the product
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               budget:
 *                 type: number
 *               moq:
 *                 type: number
 *               category_id:
 *                 type: integer
 *             required:
 *               - title
 *               - description
 *               - budget
 *               - moq
 *               - category_id
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: No Product found with this SKU
 *       500:
 *         description: Internal Server Error

 * /api/products/images:
 *   post:
 *     summary: Just insert images
 *     tags: [Products]
 *     security:
 *       - jwt: []
 *     requestBody:
 *       description: Data for inserting images
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *             required:
 *               - images
 *     responses:
 *       200:
 *         description: Images Uploaded Successfully
 *       500:
 *         description: Internal Server Error

 * /api/products/product:
 *   post:
 *     summary: Insert Record of Product Table for Screen 9
 *     tags: [Products]
 *     security:
 *       - jwt: []
 *     requestBody:
 *       description: Data for inserting a product record
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               type:
 *                 type: string
 *               registrationId:
 *                 type: integer
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               budget:
 *                 type: number
 *               moq:
 *                 type: number
 *               category_id:
 *                 type: integer
 *             required:
 *               - type
 *               - registrationId
 *               - title
 *               - description
 *               - budget
 *               - moq
 *               - category_id
 *     responses:
 *       200:
 *         description: Product record inserted successfully
 *       400:
 *         description: Product not inserted
 *       500:
 *         description: Internal Server Error
 * 
 */

// Define the components section with a schema for Product
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         sku:
 *           type: string
 *           description: SKU of the product
 *         title:
 *           type: string
 *           description: Title of the product
 *         description:
 *           type: string
 *           description: Description of the product
 *         budget:
 *           type: number
 *           description: Budget of the product
 *         moq:
 *           type: number
 *           description: MOQ (Minimum Order Quantity) of the product
 *         category_id:
 *           type: integer
 *           description: ID of the product category
 *         default_image:
 *           type: string
 *           description: Default image of the product
 *         product_images:
 *           type: string
 *           description: Comma-separated list of product images
 */
