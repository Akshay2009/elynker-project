/**
 * @swagger
 * tags:
 *   name: SocialLinks
 *   description: API for managing social links
 * components:
 *   schemas:
 *     SocialLink:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         socialmedia_id:
 *           type: integer
 *         social_name:
 *           type: string
 *         social_url:
 *           type: string
 *         created_by:
 *           type: integer
 *         modified_by:
 *           type: integer
 *         registrationId:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * paths:
 *   /api/sociallinks/:
 *     post:
 *       summary: Create a social link record
 *       tags: [SocialLinks]
 *       parameters:
 *         - in: header
 *           name: x-access-token
 *           description: Access token for authentication
 *           required: true
 *           type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SocialLink'
 *       responses:
 *         '201':
 *           description: Social link created successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Sociallinks created successfully
 *                 data:
 *                   id: 1
 *                   socialmedia_id: 1
 *                   social_name: Facebook
 *                   social_url: https://facebook.com
 *                   created_by: 1
 *                   modified_by: 1
 *                   registrationId: 1
 *                   createdAt: '2024-02-28T00:00:00.000Z'
 *                   updatedAt: '2024-02-28T00:00:00.000Z'
 *         '400':
 *           description: Bad request
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Not found
 *         '500':
 *           description: Internal server error
 *     get:
 *       summary: Get all social link records
 *       tags: [SocialLinks]
 *       parameters:
 *         - in: header
 *           name: x-access-token
 *           description: Access token for authentication
 *           required: true
 *           type: string
 *       responses:
 *         '200':
 *           description: Social links fetched successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Social Links
 *                 data:
 *                   - id: 1
 *                     socialmedia_id: 1
 *                     social_name: Facebook
 *                     social_url: https://facebook.com
 *                     created_by: 1
 *                     modified_by: 1
 *                     registrationId: 1
 *                     createdAt: '2024-02-28T00:00:00.000Z'
 *                     updatedAt: '2024-02-28T00:00:00.000Z'
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Not found
 *         '500':
 *           description: Internal server error
 *   /api/sociallinks/{social_id}:
 *     get:
 *       summary: Get a social link record by ID
 *       tags: [SocialLinks]
 *       parameters:
 *         - in: path
 *           name: social_id
 *           description: ID of the social link to retrieve
 *           required: true
 *           type: integer
 *         - in: header
 *           name: x-access-token
 *           description: Access token for authentication
 *           required: true
 *           type: string
 *       responses:
 *         '200':
 *           description: Social link fetched successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Social Links
 *                 data:
 *                   id: 1
 *                   socialmedia_id: 1
 *                   social_name: Facebook
 *                   social_url: https://facebook.com
 *                   created_by: 1
 *                   modified_by: 1
 *                   registrationId: 1
 *                   createdAt: '2024-02-28T00:00:00.000Z'
 *                   updatedAt: '2024-02-28T00:00:00.000Z'
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Not found
 *         '500':
 *           description: Internal server error
 *     put:
 *       summary: Update a social link record by ID
 *       tags: [SocialLinks]
 *       parameters:
 *         - in: path
 *           name: social_id
 *           description: ID of the social link to update
 *           required: true
 *           type: integer
 *         - in: header
 *           name: x-access-token
 *           description: Access token for authentication
 *           required: true
 *           type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SocialLink'
 *       responses:
 *         '200':
 *           description: Social link updated successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Social links record updated successfully
 *                 data:
 *                   id: 1
 *                   socialmedia_id: 1
 *                   social_name: Facebook
 *                   social_url: https://facebook.com
 *                   created_by: 1
 *                   modified_by: 1
 *                   registrationId: 1
 *                   createdAt: '2024-02-28T00:00:00.000Z'
 *                   updatedAt: '2024-02-28T00:00:00.000Z'
 *         '400':
 *           description: Bad request
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Not found
 *         '500':
 *           description: Internal server error
 *     delete:
 *       summary: Delete a social link record by ID
 *       tags: [SocialLinks]
 *       parameters:
 *         - in: path
 *           name: social_id
 *           description: ID of the social link to delete
 *           required: true
 *           type: integer
 *         - in: header
 *           name: x-access-token
 *           description: Access token for authentication
 *           required: true
 *           type: string
 *       responses:
 *         '200':
 *           description: Social link deleted successfully
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Not found
 *         '500':
 *           description: Internal server error
 *   /api/sociallinks/search/{fieldName}/{fieldValue}:
 *     get:
 *       summary: Search social links by field name and value
 *       tags: [SocialLinks]
 *       parameters:
 *         - in: path
 *           name: fieldName
 *           description: Field name to search
 *           required: true
 *           type: string
 *         - in: path
 *           name: fieldValue
 *           description: Field value to search
 *           required: true
 *           type: string
 *         - in: header
 *           name: x-access-token
 *           description: Access token for authentication
 *           required: true
 *           type: string
 *       responses:
 *         '200':
 *           description: Social links fetched successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Fetched Records
 *                 data:
 *                   - id: 1
 *                     socialmedia_id: 1
 *                     social_name: Facebook
 *                     social_url: https://facebook.com
 *                     created_by: 1
 *                     modified_by: 1
 *                     registrationId: 1
 *                     createdAt: '2024-02-28T00:00:00.000Z'
 *                     updatedAt: '2024-02-28T00:00:00.000Z'
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Not found
 *         '500':
 *           description: Internal server error
 *   /api/users/sociallinks/{registrationId}:
 *     post:
 *       summary: Create social link records in bulk
 *       tags: [SocialLinks]
 *       parameters:
 *         - in: path
 *           name: registrationId
 *           description: ID of the registration
 *           required: true
 *           type: integer
 *         - in: header
 *           name: x-access-token
 *           description: Access token for authentication
 *           required: true
 *           type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SocialLink'
 *       responses:
 *         '201':
 *           description: Social links created successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Sociallinks created successfully
 *                 data:
 *                   - id: 1
 *                     socialmedia_id: 1
 *                     social_name: Facebook
 *                     social_url: https://facebook.com
 *                     created_by: 1
 *                     modified_by: 1
 *                     registrationId: 1
 *                     createdAt: '2024-02-28T00:00:00.000Z'
 *                     updatedAt: '2024-02-28T00:00:00.000Z'
 *         '400':
 *           description: Bad request
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Not found
 *         '500':
 *           description: Internal server error
 *     get:
 *       summary: Get all social link records by registration ID
 *       tags: [SocialLinks]
 *       parameters:
 *         - in: path
 *           name: registrationId
 *           description: ID of the registration
 *           required: true
 *           type: integer
 *         - in: header
 *           name: x-access-token
 *           description: Access token for authentication
 *           required: true
 *           type: string
 *       responses:
 *         '200':
 *           description: Social links fetched successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Social Links
 *                 data:
 *                   - id: 1
 *                     socialmedia_id: 1
 *                     social_name: Facebook
 *                     social_url: https://facebook.com
 *                     created_by: 1
 *                     modified_by: 1
 *                     registrationId: 1
 *                     createdAt: '2024-02-28T00:00:00.000Z'
 *                     updatedAt: '2024-02-28T00:00:00.000Z'
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Not found
 *         '500':
 *           description: Internal server error
 *   /api/users/sociallinks/{reg_id}:
 *     delete:
 *       summary: Delete all social link records by registration ID
 *       tags: [SocialLinks]
 *       parameters:
 *         - in: path
 *           name: reg_id
 *           description: ID of the registration
 *           required: true
 *           type: integer
 *         - in: header
 *           name: x-access-token
 *           description: Access token for authentication
 *           required: true
 *           type: string
 *       responses:
 *         '200':
 *           description: Social links deleted successfully
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Not found
 *         '500':
 *           description: Internal server error
 */
