/**
 * @swagger
 * tags:
 *   name: SocialLinks
 *   description: Operations related to SocialLinks
 */

/**
 * @swagger
 * /api/sociallinks/:
 *   post:
 *     summary: Create a SocialLinks record
 *     tags: [SocialLinks]
 *     security:
 *       - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               social_name:
 *                 type: string
 *               social_url:
 *                 type: string
 *               created_by:
 *                 type: string
 *               modified_by:
 *                 type: string
 *               registrationId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: SocialLinks created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Sociallinks created successfully
 *               newSociallinks: { id: 1, social_name: "Social1", social_url: "https://social1.com", created_by: "User1", modified_by: "User1", registrationId: 1 }
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/sociallinks/:
 *   get:
 *     summary: Get all SocialLinks records
 *     tags: [SocialLinks]
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Returns all SocialLinks records
 *         content:
 *           application/json:
 *             example:
 *               - { id: 1, social_name: "Social1", social_url: "https://social1.com", created_by: "User1", modified_by: "User1", registrationId: 1 }
 *               - { id: 2, social_name: "Social2", social_url: "https://social2.com", created_by: "User2", modified_by: "User2", registrationId: 2 }
 *       404:
 *         description: No social links Returned
 *       500:
 *         description: Internal Server Error
 */

// Similar structure for GET by ID, PUT, and DELETE routes for SocialLinks

/**
 * @swagger
 * /api/sociallinks/{social_id}:
 *   parameters:
 *     - in: path
 *       name: social_id
 *       required: true
 *       description: ID of the SocialLinks record
 *       schema:
 *         type: integer
 */

/**
 * @swagger
 * /api/sociallinks/{social_id}:
 *   get:
 *     summary: Get a SocialLinks record by ID
 *     tags: [SocialLinks]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - $ref: '#/components/parameters/social_id'
 *     responses:
 *       200:
 *         description: Returns a SocialLinks record by ID
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               social_name: "Social1"
 *               social_url: "https://social1.com"
 *               created_by: "User1"
 *               modified_by: "User1"
 *               registrationId: 1
 *       404:
 *         description: Social Links Details not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/sociallinks/{social_id}:
 *   put:
 *     summary: Update a SocialLinks record by ID
 *     tags: [SocialLinks]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - $ref: '#/components/parameters/social_id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               social_name:
 *                 type: string
 *               social_url:
 *                 type: string
 *               created_by:
 *                 type: string
 *               modified_by:
 *                 type: string
 *               registrationId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Social links record updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Social links record updated successfully"
 *               updatedSociallinksRecord: { id: 1, social_name: "Social1", social_url: "https://social1.com", created_by: "User1", modified_by: "User1", registrationId: 1 }
 *       404:
 *         description: Social Links not found
 *       500:
 *         description: Failed to update social links record
 */

/**
 * @swagger
 * /api/sociallinks/{social_id}:
 *   delete:
 *     summary: Delete a SocialLinks record by ID
 *     tags: [SocialLinks]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - $ref: '#/components/parameters/social_id'
 *     responses:
 *       200:
 *         description: Social link deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "link deleted successfully"
 *       404:
 *         description: Social link not found
 *       500:
 *         description: Failed to delete social link
 */
