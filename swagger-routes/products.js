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
