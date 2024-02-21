/**
 * @swagger
 * tags:
 *   name: Social Media Master
 *   description: Operations related to Social Media Master management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SocialMediaMaster:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID of the social media master
 *         media_image_path:
 *           type: string
 *           description: Filename of the media image
 *         media_name:
 *           type: string
 *           description: Name of the media
 *         is_active:
 *           type: boolean
 *           description: Indicates whether the media is active or not
 *     NewSocialMediaMaster:
 *       type: object
 *       properties:
 *         media_name:
 *           type: string
 *           description: Name of the media
 *         is_active:
 *           type: boolean
 *           description: Indicates whether the media is active or not
 *         image:
 *           type: string
 *           format: binary
 *           description: Image file for the media
 */

/**
 * @swagger
 * /api/socialmediamaster:
 *   post:
 *     summary: Create a new social media master record
 *     tags: [Social Media Master]
 *     security:
 *       - jwt: []
 *     requestBody:
 *       description: Data for creating a new social media master record
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/NewSocialMediaMaster'
 *     responses:
 *       201:
 *         description: New social media master record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SocialMediaMaster'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 *
 *   get:
 *     summary: Get social media master record by ID
 *     tags: [Social Media Master]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: socialMediaMasterId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the social media master
 *     responses:
 *       200:
 *         description: Social media master record retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SocialMediaMaster'
 *       404:
 *         description: Social media master record not found
 *       500:
 *         description: Internal Server Error
 *
 * /api/socialmediamaster/{socialMediaMasterId}:
 *   put:
 *     summary: Update social media master record by ID
 *     tags: [Social Media Master]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: socialMediaMasterId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the social media master
 *     requestBody:
 *       description: Data for updating the social media master record
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/NewSocialMediaMaster'
 *     responses:
 *       200:
 *         description: Social media master record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SocialMediaMaster'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Social media master record not found
 *       500:
 *         description: Internal Server Error
 *
 *   delete:
 *     summary: Delete social media master record by ID
 *     tags: [Social Media Master]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: socialMediaMasterId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the social media master
 *     responses:
 *       200:
 *         description: Social media master record deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SocialMediaMaster'
 *       404:
 *         description: Social media master record not found
 *       500:
 *         description: Internal Server Error
 */
