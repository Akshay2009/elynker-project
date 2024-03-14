/**
 * @swagger
 * tags:
 *   name: SocialMediaMaster
 *   description: API for managing social media master records
 * components:
 *   schemas:
 *     SocialMediaMaster:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         social_media_name:
 *           type: string
 *         social_media_url:
 *           type: string
 *         image:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * paths:
 *   /api/socialmediamaster:
 *     post:
 *       summary: Create a social media master record
 *       tags: [SocialMediaMaster]
 *       parameters:
 *         - in: header
 *           name: x-access-token
 *           description: Access token for authentication
 *           required: true
 *           type: string
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 social_media_name:
 *                   type: string
 *                 social_media_url:
 *                   type: string
 *                 image:
 *                   type: string
 *                   format: binary
 *       responses:
 *         '201':
 *           description: Social media master record created successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Social Media Master Record Created Successfully
 *                 data:
 *                   id: 1
 *                   social_media_name: Facebook
 *                   social_media_url: https://www.facebook.com
 *                   image: facebook.png
 *                   createdAt: '2024-02-28T00:00:00.000Z'
 *                   updatedAt: '2024-02-28T00:00:00.000Z'
 *         '400':
 *           description: Bad request
 *         '401':
 *           description: Unauthorized
 *         '500':
 *           description: Internal server error
 *     get:
 *       summary: Get all social media master records
 *       tags: [SocialMediaMaster]
 *       parameters:
 *         - in: header
 *           name: x-access-token
 *           description: Access token for authentication
 *           required: true
 *           type: string
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
 *           description: Social media master records fetched successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Social Media Master Records Fetched Successfully
 *                 data:
 *                   - id: 1
 *                     social_media_name: Facebook
 *                     social_media_url: https://www.facebook.com
 *                     image: facebook.png
 *                     createdAt: '2024-02-28T00:00:00.000Z'
 *                     updatedAt: '2024-02-28T00:00:00.000Z'
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: No social media master records found
 *         '500':
 *           description: Internal server error
 *   /api/socialmediamaster/{socialMediaMasterId}:
 *     put:
 *       summary: Update a social media master record by ID
 *       tags: [SocialMediaMaster]
 *       parameters:
 *         - in: path
 *           name: socialMediaMasterId
 *           description: ID of the social media master record
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
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 social_media_name:
 *                   type: string
 *                 social_media_url:
 *                   type: string
 *                 image:
 *                   type: string
 *                   format: binary
 *       responses:
 *         '200':
 *           description: Social media master record updated successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Social Media Master Record Updated Successfully
 *                 data:
 *                   id: 1
 *                   social_media_name: Facebook
 *                   social_media_url: https://www.facebook.com
 *                   image: facebook.png
 *                   createdAt: '2024-02-28T00:00:00.000Z'
 *                   updatedAt: '2024-02-28T00:00:00.000Z'
 *         '400':
 *           description: Bad request
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Social media master record not found
 *         '500':
 *           description: Internal server error
 *     delete:
 *       summary: Delete a social media master record by ID
 *       tags: [SocialMediaMaster]
 *       parameters:
 *         - in: path
 *           name: socialMediaMasterId
 *           description: ID of the social media master record
 *           required: true
 *           type: integer
 *         - in: header
 *           name: x-access-token
 *           description: Access token for authentication
 *           required: true
 *           type: string
 *       responses:
 *         '200':
 *           description: Social media master record deleted successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Social Media Master Record Deleted Successfully
 *                 data:
 *                   id: 1
 *                   social_media_name: Facebook
 *                   social_media_url: https://www.facebook.com
 *                   image: facebook.png
 *                   createdAt: '2024-02-28T00:00:00.000Z'
 *                   updatedAt: '2024-02-28T00:00:00.000Z'
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Social media master record not found
 *         '500':
 *           description: Internal server error
 *   /api/socialmediamaster/{social_id}:
 *     get:
 *       summary: Get a social media master record by ID
 *       tags: [SocialMediaMaster]
 *       parameters:
 *         - in: path
 *           name: social_id
 *           description: ID of the social media master record
 *           required: true
 *           type: integer
 *         - in: header
 *           name: x-access-token
 *           description: Access token for authentication
 *           required: true
 *           type: string
 *       responses:
 *         '200':
 *           description: Social media master record fetched successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Social Media Master Record Fetched Successfully
 *                 data:
 *                   id: 1
 *                   social_media_name: Facebook
 *                   social_media_url: https://www.facebook.com
 *                   image: facebook.png
 *                   createdAt: '2024-02-28T00:00:00.000Z'
 *                   updatedAt: '2024-02-28T00:00:00.000Z'
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Social media master record not found
 *         '500':
 *           description: Internal server error
 *   /api/socialmediamaster/search/{fieldName}/{fieldValue}:
 *     get:
 *       summary: Search social media master records by field name and value
 *       tags: [SocialMediaMaster]
 *       parameters:
 *         - in: path
 *           name: fieldName
 *           description: Name of the field to search by
 *           required: true
 *           type: string
 *         - in: path
 *           name: fieldValue
 *           description: Value of the field to search by
 *           required: true
 *           type: string
 *         - in: header
 *           name: x-access-token
 *           description: Access token for authentication
 *           required: true
 *           type: string
 *       responses:
 *         '200':
 *           description: Social media master records fetched successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Social Media Master Records Fetched Successfully
 *                 data:
 *                   - id: 1
 *                     social_media_name: Facebook
 *                     social_media_url: https://www.facebook.com
 *                     image: facebook.png
 *                     createdAt: '2024-02-28T00:00:00.000Z'
 *                     updatedAt: '2024-02-28T00:00:00.000Z'
 *         '400':
 *           description: Bad request
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: No social media master records found
 *         '500':
 *           description: Internal server error
 */
