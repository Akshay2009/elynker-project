/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API operations related to products
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - jwt: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: csvFilePath
 *         type: file
 *         description: CSV file path
 *     responses:
 *       200:
 *         description: Product created successfully
 *       401:
 *         description: Unauthorized - Invalid token
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: List of products
 *       401:
 *         description: Unauthorized - Invalid token
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/products/{sku}:
 *   get:
 *     summary: Get product by SKU
 *     tags: [Products]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: sku
 *         required: true
 *         type: string
 *         description: SKU of the product
 *     responses:
 *       200:
 *         description: Product details
 *       401:
 *         description: Unauthorized - Invalid token
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/products/images:
 *   post:
 *     summary: Upload product images
 *     tags: [Products]
 *     security:
 *       - jwt: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: images
 *         type: file
 *         description: Product images (up to 10 images)
 *     responses:
 *       200:
 *         description: Images uploaded successfully
 *       401:
 *         description: Unauthorized - Invalid token
 *       500:
 *         description: Internal Server Error
 */


/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operations related to Product management
 */

/**
 * @swagger
 * /api/products/product:
 *   post:
 *     summary: Create a single record in the Product Table
 *     tags: [Products]
 *     security:
 *       - jwt: []
 *     requestBody:
 *       description: Data for creating a new product record
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: Type of the product
 *               registrationId:
 *                 type: integer
 *                 description: ID of the registration associated with the product
 *               title:
 *                 type: string
 *                 description: Title of the product
 *               description:
 *                 type: string
 *                 description: Description of the product
 *               budget:
 *                 type: number
 *                 description: Budget for the product
 *               moq:
 *                 type: integer
 *                 description: Minimum Order Quantity for the product
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of images (multipart/form-data)
 *     responses:
 *       200:
 *         description: New product record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request - Product not inserted
 *       401:
 *         description: Unauthorized - Invalid token
 *       500:
 *         description: Internal Server Error
 */

// Define the components section with schemas for Product
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the product
 *         description:
 *           type: string
 *           description: Description of the product
 *         sku:
 *           type: string
 *           description: Stock Keeping Unit (SKU) of the product
 *         type:
 *           type: string
 *           description: Type of the product
 *         registrationId:
 *           type: integer
 *           description: ID of the registration associated with the product
 *         budget:
 *           type: number
 *           description: Budget for the product
 *         moq:
 *           type: integer
 *           description: Minimum Order Quantity for the product
 *         default_image:
 *           type: string
 *           description: Filename of the default image for the product
 *         product_images:
 *           type: string
 *           description: Comma-separated list of filenames for additional product images
 */

