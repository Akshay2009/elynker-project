/**
 * @swagger
 * tags:
 *   name: SocialLinks
 *   description: Operations related to Social Links management
 */

/**
 * @swagger
 * /api/sociallinks/:
 *   post:
 *     summary: Create a new social link
 *     tags: [SocialLinks]
 *     security:
 *       - jwt: []
 *     requestBody:
 *       description: Data for creating a new social link
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewSocialLink'
 *     responses:
 *       201:
 *         description: Social link created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SocialLink'
 *       500:
 *         description: Internal Server Error

 *   get:
 *     summary: Get all social links
 *     tags: [SocialLinks]
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: List of all social links
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SocialLink'
 *       404:
 *         description: No social links returned
 *       500:
 *         description: Internal Server Error

 * /api/sociallinks/{social_id}:
 *   get:
 *     summary: Get social link by ID
 *     tags: [SocialLinks]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: social_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the social link to retrieve
 *     responses:
 *       200:
 *         description: Social link details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SocialLink'
 *       404:
 *         description: Social Links Details not found
 *       500:
 *         description: Internal Server Error

 *   put:
 *     summary: Update social link by ID
 *     tags: [SocialLinks]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: social_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the social link to update
 *     requestBody:
 *       description: Data for updating the social link
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewSocialLink'
 *     responses:
 *       200:
 *         description: Social link record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SocialLink'
 *       404:
 *         description: Social Links not found
 *       500:
 *         description: Internal Server Error
 */

// Define the components section with schemas for SocialLink and NewSocialLink
/**
 * @swagger
 * components:
 *   schemas:
 *     SocialLink:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID of the social link
 *         social_name:
 *           type: string
 *           description: Name of the social link
 *         social_url:
 *           type: string
 *           description: URL of the social link
 *         created_by:
 *           type: string
 *           description: Created by user
 *         modified_by:
 *           type: string
 *           description: Modified by user
 *         registrationId:
 *           type: integer
 *           description: Registration ID associated with the social link
 *
 *     NewSocialLink:
 *       type: object
 *       properties:
 *         social_name:
 *           type: string
 *           description: Name of the social link
 *         social_url:
 *           type: string
 *           description: URL of the social link
 *         created_by:
 *           type: string
 *           description: Created by user
 *         modified_by:
 *           type: string
 *           description: Modified by user
 *         registrationId:
 *           type: integer
 *           description: Registration ID associated with the social link
 */
