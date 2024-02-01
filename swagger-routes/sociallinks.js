/**
 * @swagger
 * tags:
 *   name: SocialLinks
 *   description: API endpoints for managing social links
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SocialLink:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the social link
 *         social_name:
 *           type: string
 *           description: Name of the social link
 *         social_url:
 *           type: string
 *           description: URL of the social link
 *         created_by:
 *           type: string
 *           description: Creator of the social link
 *         modified_by:
 *           type: string
 *           description: Modifier of the social link
 *         registrationId:
 *           type: integer
 *           description: ID of the registration associated with the social link
 */

/**
 * @swagger
 * /api/sociallinks/:
 *   post:
 *     summary: Create a social link
 *     tags: [SocialLinks]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SocialLink'
 *     responses:
 *       '201':
 *         description: Social link created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Social link created successfully
 *               newSociallinks:
 *                 id: 1
 *                 social_name: Facebook
 *                 social_url: https://www.facebook.com
 *                 created_by: admin
 *                 modified_by: admin
 *                 registrationId: 123
 *       '500':
 *         description: Failed to create social link
 */

/**
 * @swagger
 * /api/users/sociallinks/{registrationId}:
 *   post:
 *     summary: Create social links in bulk for a registration ID
 *     tags: [SocialLinks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: registrationId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/SocialLink'
 *     responses:
 *       '201':
 *         description: Social links created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Social links created successfully
 *               newSociallinks:
 *                 - id: 1
 *                   social_name: Facebook
 *                   social_url: https://www.facebook.com
 *                   created_by: admin
 *                   modified_by: admin
 *                   registrationId: 123
 *                 - id: 2
 *                   social_name: Twitter
 *                   social_url: https://twitter.com
 *                   created_by: admin
 *                   modified_by: admin
 *                   registrationId: 123
 *       '401':
 *         description: Error updating social links
 *       '500':
 *         description: Failed to create social links
 */

/**
 * @swagger
 * /api/sociallinks/:
 *   get:
 *     summary: Get all social links
 *     tags: [SocialLinks]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: List of social links
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 social_name: Facebook
 *                 social_url: https://www.facebook.com
 *                 created_by: admin
 *                 modified_by: admin
 *                 registrationId: 123
 *               - id: 2
 *                 social_name: Twitter
 *                 social_url: https://twitter.com
 *                 created_by: admin
 *                 modified_by: admin
 *                 registrationId: 123
 *       '404':
 *         description: No social links returned
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/users/sociallinks/{registrationId}:
 *   get:
 *     summary: Get all social links by registration ID
 *     tags: [SocialLinks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: registrationId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: List of social links
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 social_name: Facebook
 *                 social_url: https://www.facebook.com
 *                 created_by: admin
 *                 modified_by: admin
 *                 registrationId: 123
 *               - id: 2
 *                 social_name: Twitter
 *                 social_url: https://twitter.com
 *                 created_by: admin
 *                 modified_by: admin
 *                 registrationId: 123
 *       '404':
 *         description: No social links with this Registration ID
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/sociallinks/{social_id}:
 *   get:
 *     summary: Get a social link by ID
 *     tags: [SocialLinks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: social_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Social link details
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               social_name: Facebook
 *               social_url: https://www.facebook.com
 *               created_by: admin
 *               modified_by: admin
 *               registrationId: 123
 *       '404':
 *         description: Social link details not found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/sociallinks/{social_id}:
 *   put:
 *     summary: Update a social link by ID
 *     tags: [SocialLinks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: social_id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SocialLink'
 *     responses:
 *       '200':
 *         description: Social link record updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Social link record updated successfully
 *               updatedSociallinksRecord:
 *                 id: 1
 *                 social_name: Facebook
 *                 social_url: https://www.facebook.com
 *                 created_by: admin
 *                 modified_by: admin
 *                 registrationId: 123
 *       '404':
 *         description: Social link not found
 *       '500':
 *         description: Failed to update social link record
 */

/**
 * @swagger
 * /api/sociallinks/{social_id}:
 *   delete:
 *     summary: Delete a social link by ID
 *     tags: [SocialLinks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: social_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Social link deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Social link deleted successfully
 *       '404':
 *         description: Social link not found
 *       '500':
 *         description: Failed to delete social link
 */

/**
 * @swagger
 * /api/users/sociallinks/{reg_id}:
 *   delete:
 *     summary: Delete all social links by registration ID
 *     tags: [SocialLinks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reg_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Social links deleted successfully with provided Registration ID
 *         content:
 *           application/json:
 *             example:
 *               message: Social links deleted successfully with provided Registration ID
 *       '404':
 *         description: No records found for provided registration Id
 *       '500':
 *         description: Failed to delete social links
 */
