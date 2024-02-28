/**
 * @swagger
 * tags:
 *   name: UserBanners
 *   description: API for managing user banners
 * components:
 *   schemas:
 *     UserBanner:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         banner_name:
 *           type: string
 *         banner_image:
 *           type: string
 *         registrationId:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 * paths:
 *   /api/user/banners/{registrationId}:
 *     post:
 *       summary: Create a user banner
 *       tags: [UserBanners]
 *       parameters:
 *         - name: registrationId
 *           in: path
 *           required: true
 *           description: Registration ID
 *           schema:
 *             type: integer
 *         - name: x-access-token
 *           in: header
 *           description: Access token for authentication
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 banner_name:
 *                   type: string
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: binary
 *       responses:
 *         '201':
 *           description: Successful creation
 *           content:
 *             application/json:
 *               example:
 *                 message: Banner Record Created
 *                 data:
 *                   id: 1
 *                   banner_name: Sample Banner
 *                   banner_image: banner1.jpg
 *                   registrationId: 1
 *                   createdAt: '2024-02-28T14:03:40.727Z'
 *                   updatedAt: '2024-02-28T14:03:40.727Z'
 *         '400':
 *           description: Bad request - Missing or invalid parameters
 *         '401':
 *           description: Unauthorized - Access token is missing or invalid
 *         '404':
 *           description: Registration not found or not of freelancer type
 *     get:
 *       summary: Get all user banners by registration ID
 *       tags: [UserBanners]
 *       parameters:
 *         - name: registrationId
 *           in: path
 *           required: true
 *           description: Registration ID
 *           schema:
 *             type: integer
 *         - name: x-access-token
 *           in: header
 *           description: Access token for authentication
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 message: UsersBanner Record with Registration Id
 *                 data:
 *                   - id: 1
 *                     banner_name: Sample Banner
 *                     banner_image: banner1.jpg
 *                     registrationId: 1
 *                     createdAt: '2024-02-28T14:03:40.727Z'
 *                     updatedAt: '2024-02-28T14:03:40.727Z'
 *         '401':
 *           description: Unauthorized - Access token is missing or invalid
 *         '404':
 *           description: No User Banner Record with Registration ID Present
 *   /api/user/banner/{userBannerId}:
 *     get:
 *       summary: Get a user banner by ID
 *       tags: [UserBanners]
 *       parameters:
 *         - name: userBannerId
 *           in: path
 *           required: true
 *           description: User Banner ID
 *           schema:
 *             type: integer
 *         - name: x-access-token
 *           in: header
 *           description: Access token for authentication
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 id: 1
 *                 banner_name: Sample Banner
 *                 banner_image: banner1.jpg
 *                 registrationId: 1
 *                 createdAt: '2024-02-28T14:03:40.727Z'
 *                 updatedAt: '2024-02-28T14:03:40.727Z'
 *         '401':
 *           description: Unauthorized - Access token is missing or invalid
 *         '404':
 *           description: User Banner not found
 *     put:
 *       summary: Update a user banner by ID
 *       tags: [UserBanners]
 *       parameters:
 *         - name: userBannerId
 *           in: path
 *           required: true
 *           description: User Banner ID
 *           schema:
 *             type: integer
 *         - name: x-access-token
 *           in: header
 *           description: Access token for authentication
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 banner_name:
 *                   type: string
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: binary
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 message: UserBanner Updated Successfully
 *                 data:
 *                   id: 1
 *                   banner_name: Sample Banner
 *                   banner_image: banner1.jpg
 *                   registrationId: 1
 *                   createdAt: '2024-02-28T14:03:40.727Z'
 *                   updatedAt: '2024-02-28T14:03:40.727Z'
 *         '400':
 *           description: Bad request - Missing or invalid parameters
 *         '401':
 *           description: Unauthorized - Access token is missing or invalid
 *         '404':
 *           description: User Banner not found
 *     delete:
 *       summary: Delete a user banner by ID
 *       tags: [UserBanners]
 *       parameters:
 *         - name: userBannerId
 *           in: path
 *           required: true
 *           description: User Banner ID
 *           schema:
 *             type: integer
 *         - name: x-access-token
 *           in: header
 *           description: Access token for authentication
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 message: UserBanner Deleted Successfully
 *                 data:
 *                   id: 1
 *                   banner_name: Sample Banner
 *                   banner_image: banner1.jpg
 *                   registrationId: 1
 *                   createdAt: '2024-02-28T14:03:40.727Z'
 *                   updatedAt: '2024-02-28T14:03:40.727Z'
 *         '401':
 *           description: Unauthorized - Access token is missing or invalid
 *         '404':
 *           description: User Banner not found
 *   /api/user/banners/search/{fieldName}/{fieldValue}:
 *     get:
 *       summary: Search user banner details by fieldName and fieldValue
 *       tags: [UserBanners]
 *       parameters:
 *         - name: fieldName
 *           in: path
 *           required: true
 *           description: Field Name
 *           schema:
 *             type: string
 *         - name: fieldValue
 *           in: path
 *           required: true
 *           description: Field Value
 *           schema:
 *             type: string
 *         - name: x-access-token
 *           in: header
 *           description: Access token for authentication
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 message: Fetched Records
 *                 data:
 *                   - id: 1
 *                     banner_name: Sample Banner
 *                     banner_image: banner1.jpg
 *                     registrationId: 1
 *                     createdAt: '2024-02-28T14:03:40.727Z'
 *                     updatedAt: '2024-02-28T14:03:40.727Z'
 *         '400':
 *           description: Bad request - Invalid field name
 *         '401':
 *           description: Unauthorized - Access token is missing or invalid
 *         '404':
 *           description: No record found
 *   /api/user/banners:
 *     get:
 *       summary: Get all user banners
 *       tags: [UserBanners]
 *       parameters:
 *         - name: x-access-token
 *           in: header
 *           description: Access token for authentication
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 message: Details fetched successfully
 *                 data:
 *                   - id: 1
 *                     banner_name: Sample Banner
 *                     banner_image: banner1.jpg
 *                     registrationId: 1
 *                     createdAt: '2024-02-28T14:03:40.727Z'
 *                     updatedAt: '2024-02-28T14:03:40.727Z'
 *         '401':
 *           description: Unauthorized - Access token is missing or invalid
 *         '404':
 *           description: Details not found
 */
