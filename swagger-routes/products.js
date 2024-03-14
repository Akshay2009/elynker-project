/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API for managing products
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
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
 *           type: string
 *         budget:
 *           type: number
 *         moq:
 *           type: number
 *         default_image:
 *           type: string
 *         product_images:
 *           type: string
 *     ProductInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         type:
 *           type: string
 *         registrationId:
 *           type: integer
 *         category_id:
 *           type: string
 *         budget:
 *           type: number
 *         moq:
 *           type: number
 *         default_image:
 *           type: string
 *         product_images:
 *           type: string
 * paths:
 *   /api/products:
 *     get:
 *       summary: Get all Products details
 *       tags: [Products]
 *       parameters:
 *         - name: x-access-token
 *           in: header
 *           description: Access token for authentication
 *           required: true
 *           schema:
 *             type: string
 *         - name: page
 *           in: query
 *           description: Page for Pagination
 *           schema:
 *             type: integer
 *         - name: pageSize
 *           in: query
 *           description: Page Size to show records on the Page for Pagination
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 message: Details fetched successfully
 *                 totalRecords: Total Number of Product records in Db
 *                 data:
 *                   - id: 1
 *                     email: gourav@gmail.com
 *                     name: Gaurav
 *                     city: Lucknow
 *                     country_code: +91
 *                     mobile_number: '1114441111'
 *                     created_by: null
 *                     updated_by: null
 *                     createdAt: '2024-01-16T14:03:40.727Z'
 *                     updatedAt: '2024-01-16T14:03:40.727Z'
 *         '401':
 *           description: Unauthorized - Access token is missing or invalid
 *         '404':
 *           description: Details not found
 *         '500':
 *           description: Some server error
 *     post:
 *       summary: Create or update products from CSV
 *       tags: [Products]
 *       parameters:
 *         - name: type
 *           in: query
 *           required: true
 *           description: Type of product
 *           schema:
 *             type: string
 *         - name: registrationId
 *           in: query
 *           required: true
 *           description: Registration ID
 *           schema:
 *             type: integer
 *         - name: category_id
 *           in: query
 *           required: true
 *           description: Comma-separated category IDs
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 csvFilePath:
 *                   type: string
 *                   format: binary
 *       responses:
 *         '200':
 *           description: Products data inserted or updated successfully
 *         '400':
 *           description: Bad request or CSV file not provided
 *         '500':
 *           description: Some server error
 *   /api/products/{sku}:
 *     get:
 *       summary: Get product by SKU
 *       tags: [Products]
 *       parameters:
 *         - name: sku
 *           in: path
 *           required: true
 *           description: Product SKU
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               $ref: '#/components/schemas/Product'
 *         '404':
 *           description: Product not found
 *         '500':
 *           description: Some server error
 *     post:
 *       summary: Upload product images
 *       tags: [Products]
 *       parameters:
 *         - name: type
 *           in: query
 *           required: true
 *           description: Type of product
 *           schema:
 *             type: string
 *         - name: registrationId
 *           in: query
 *           required: true
 *           description: Registration ID
 *           schema:
 *             type: integer
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 images:
 *                   type: string
 *                   format: binary
 *       responses:
 *         '200':
 *           description: Images uploaded successfully
 *         '500':
 *           description: Some server error
 *   /api/products/product:
 *     post:
 *       summary: Create product single record
 *       tags: [Products]
 *       parameters:
 *         - name: type
 *           in: query
 *           required: true
 *           description: Type of product
 *           schema:
 *             type: string
 *         - name: registrationId
 *           in: query
 *           required: true
 *           description: Registration ID
 *           schema:
 *             type: integer
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 images:
 *                   type: string
 *                   format: binary
 *       responses:
 *         '200':
 *           description: Product record created successfully
 *         '400':
 *           description: Bad request
 *         '500':
 *           description: Some server error
 *   /api/users/products/{registrationId}:
 *     get:
 *       summary: Get all products by registration ID
 *       tags: [Products]
 *       parameters:
 *         - name: registrationId
 *           in: path
 *           required: true
 *           description: Registration ID
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 - title: Sample Product
 *                   description: This is a sample product
 *                   sku: SKU_123456789
 *                   type: Type1
 *                   registrationId: 1
 *                   category_id: 1,2,3
 *                   budget: 100.0
 *                   moq: 10
 *                   default_image: sample_image.jpg
 *                   product_images: image1.jpg,image2.jpg
 *                 - title: Another Product
 *                   description: This is another product
 *                   sku: SKU_987654321
 *                   type: Type2
 *                   registrationId: 1
 *                   category_id: 2,3,4
 *                   budget: 150.0
 *                   moq: 15
 *                   default_image: another_image.jpg
 *                   product_images: image3.jpg,image4.jpg
 *         '404':
 *           description: No products found for the registration ID
 *         '500':
 *           description: Some server error
 */
