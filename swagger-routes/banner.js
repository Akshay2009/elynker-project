/**
 * @swagger
 * tags:
 *   name: User Banners
 *   description: Operations related to User Banner management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserBanner:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID of the user banner
 *         banner_name:
 *           type: string
 *           description: Name of the banner
 *         banner_image:
 *           type: string
 *           description: Filename of the banner image
 *         registrationId:
 *           type: integer
 *           description: ID of the registration associated with the user banner
 *     NewUserBanner:
 *       type: object
 *       properties:
 *         banner_name:
 *           type: string
 *           description: Name of the banner
 *         images:
 *           type: string
 *           format: binary
 *           description: Image file for the banner
 */

/**
 * @swagger
 * /api/user/banners/{registrationId}:
 *   post:
 *     summary: Create a new user banner record
 *     tags: [User Banners]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: registrationId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the registration associated with the user banner
 *     requestBody:
 *       description: Data for creating a new user banner
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/NewUserBanner'
 *     responses:
 *       201:
 *         description: New user banner created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserBanner'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Registration not found
 *       500:
 *         description: Internal Server Error
 *
 *   get:
 *     summary: Get user banners by registration ID
 *     tags: [User Banners]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: registrationId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the registration
 *     responses:
 *       200:
 *         description: User banners retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserBanner'
 *       404:
 *         description: No user banners found for the registration
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/user/banners/{userBannerId}:
 *   put:
 *     summary: Update user banner by ID
 *     tags: [User Banners]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: userBannerId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user banner to update
 *     requestBody:
 *       description: Data for updating the user banner
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/NewUserBanner'
 *     responses:
 *       200:
 *         description: User banner updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserBanner'
 *       400:
 *         description: Bad request
 *       404:
 *         description: User banner not found
 *       500:
 *         description: Internal Server Error
 *
 * /api/user/banner/{userBannerId}:
 *   delete:
 *     summary: Delete user banner by ID
 *     tags: [User Banners]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: userBannerId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user banner to delete
 *     responses:
 *       200:
 *         description: User banner deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserBanner'
 *       404:
 *         description: User banner not found
 *       500:
 *         description: Internal Server Error
 * 
 * /api/user/banner/{BannerId}:
 *   get:
 *     summary: Get user banner by Banner ID
 *     tags: [User Banners]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: userBannerId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user banner to delete
 *     responses:
 *       200:
 *         description: Get user banner details 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserBanner'
 *       404:
 *         description: User banner not found
 *       500:
 *         description: Internal Server Error
 */
