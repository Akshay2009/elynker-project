/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API operations related to products
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security:
 *       - api_key: []
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error

 * /api/products/{sku}:
 *   get:
 *     summary: Get a product by SKU
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: sku
 *         required: true
 *         description: SKU of the product to retrieve
 *         schema:
 *           type: string
 *     security:
 *       - api_key: []
 *     responses:
 *       200:
 *         description: The requested product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error

 * /api/products:
 *   post:
 *     summary: Create products from CSV file
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               csvFilePath:
 *                 type: string
 *                 format: binary
 *               type:
 *                 type: string
 *               registrationId:
 *                 type: integer
 *               category_id:
 *                 type: integer
 *     security:
 *       - api_key: []
 *     responses:
 *       200:
 *         description: Products created successfully
 *       500:
 *         description: Internal server error

 * /api/products/product:
 *   post:
 *     summary: Create a single product record
 *     tags: [Products]
 *     requestBody:
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
 *               category_id:
 *                 type: integer
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               budget:
 *                 type: number
 *               moq:
 *                 type: number
 *     security:
 *       - api_key: []
 *     responses:
 *       200:
 *         description: The created product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Product not inserted
 *       500:
 *         description: Internal server error

 * /api/products/{sku}:
 *   put:
 *     summary: Update a product by SKU
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: sku
 *         required: true
 *         description: SKU of the product to update
 *         schema:
 *           type: string
 *     requestBody:
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
 *     security:
 *       - api_key: []
 *     responses:
 *       200:
 *         description: The updated product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         sku:
 *           type: string
 *         type:
 *           type: string
 *         registrationId:
 *           type: integer
 *         category_id:
 *           type: integer
 *         budget:
 *           type: number
 *         moq:
 *           type: number
 *         default_image:
 *           type: string
 *         product_images:
 *           type: string
 *       required:
 *         - title
 *         - description
 *         - type
 *         - registrationId
 *         - category_id
 *         - budget
 *         - moq
 *         - default_image
 *         - product_images
 */
