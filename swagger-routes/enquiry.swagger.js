/**
 * @swagger
 * tags:
 *   name: Enquiries
 *   description: API endpoints for managing enquiries
 * components:
 *   schemas:
 *     Enquiry:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         phone_number:
 *           type: string
 *         comments:
 *           type: string
 *         status:
 *           type: string
 *           enum: [Pending, Contacted]
 *         created_by:
 *           type: number
 *         updated_by:
 *           type: number
 *         registrationId:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *   parameters:
 *     pageQueryParam:
 *       name: page
 *       in: query
 *       description: Page for pagination
 *       schema:
 *         type: integer
 *     pageSizeQueryParam:
 *       name: pageSize
 *       in: query
 *       description: Number of records per page
 *       schema:
 *         type: integer
 *     idPathParam:
 *       name: id
 *       in: path
 *       description: ID of the enquiry
 *       required: true
 *       schema:
 *         type: integer
 *     fieldNamePathParam:
 *       name: fieldName
 *       in: path
 *       description: Name of the field to search by
 *       required: true
 *       schema:
 *         type: string
 *     fieldValuePathParam:
 *       name: fieldValue
 *       in: path
 *       description: Value of the field to search by
 *       required: true
 *       schema:
 *         type: string
 *     xAccessTokenHeader:
 *       name: x-access-token
 *       in: header
 *       description: Access token for authentication
 *       required: true
 *       schema:
 *         type: string
 *   responses:
 *     BadRequestError:
 *       description: Bad request error
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *     UnauthorizedError:
 *       description: Unauthorized error
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *     NotFoundError:
 *       description: Not found error
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *     InternalServerError:
 *       description: Internal server error
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 * paths:
 *   /api/enquiry:
 *     post:
 *       summary: Create a new enquiry record
 *       tags: [Enquiries]
 *       parameters:
 *         - $ref: '#/components/parameters/xAccessTokenHeader'
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Enquiry'
 *       responses:
 *         '201':
 *           description: Enquiry created successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Enquiry created successfully
 *                 data:
 *                   id: 1
 *                   name: John Doe
 *                   email: john@example.com
 *                   phone_number: 1234567890
 *                   comments: Some comments
 *                   status: Pending
 *                   created_by: 1
 *                   updated_by: 1
 *                   createdAt: '2024-02-28T12:00:00Z'
 *                   updatedAt: '2024-02-28T12:00:00Z'
 *         '400':
 *           $ref: '#/components/responses/BadRequestError'
 *         '401':
 *           $ref: '#/components/responses/UnauthorizedError'
 *         '500':
 *           $ref: '#/components/responses/InternalServerError'
 *     get:
 *       summary: Get all enquiry records
 *       tags: [Enquiries]
 *       parameters:
 *         - $ref: '#/components/parameters/xAccessTokenHeader'
 *         - $ref: '#/components/parameters/pageQueryParam'
 *         - $ref: '#/components/parameters/pageSizeQueryParam'
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 message: Details fetched successfully
 *                 totalRecords: 10
 *                 data:
 *                   - id: 1
 *                     name: John Doe
 *                     email: john@example.com
 *                     phone_number: 1234567890
 *                     comments: Some comments
 *                     status: Pending
 *                     created_by: 1
 *                     updated_by: 1
 *                     createdAt: '2024-02-28T12:00:00Z'
 *                     updatedAt: '2024-02-28T12:00:00Z'
 *                   - id: 2
 *                     name: Jane Smith
 *                     email: jane@example.com
 *                     phone_number: 9876543210
 *                     comments: Some other comments
 *                     status: Contacted
 *                     created_by: 2
 *                     updated_by: 2
 *                     createdAt: '2024-02-28T12:00:00Z'
 *                     updatedAt: '2024-02-28T12:00:00Z'
 *         '401':
 *           $ref: '#/components/responses/UnauthorizedError'
 *         '500':
 *           $ref: '#/components/responses/InternalServerError'
 *   /api/enquiry/{id}:
 *     get:
 *       summary: Get all enquiry records
 *       tags: [Enquiries]
 *       parameters:
 *         - $ref: '#/components/parameters/xAccessTokenHeader'
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 message: Details fetched successfully
 *                 data:
 *                   id: 1
 *                   name: example
 *                   permissions: example
 *                   createdAt: '2024-02-28T00:00:00.000Z'
 *                   updatedAt: '2024-02-28T00:00:00.000Z'
 *         '401':
 *           $ref: '#/components/responses/UnauthorizedError'
 *         '500':
 *           $ref: '#/components/responses/InternalServerError'
 *     put:
 *       summary: Update an enquiry record by ID
 *       tags: [Enquiries]
 *       parameters:
 *         - $ref: '#/components/parameters/idPathParam'
 *         - $ref: '#/components/parameters/xAccessTokenHeader'
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Enquiry'
 *       responses:
 *         '200':
 *           description: Enquiry updated successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Enquiry updated successfully
 *                 data:
 *                   id: 1
 *                   name: John Doe
 *                   email: john@example.com
 *                   phone_number: 1234567890
 *                   comments: Some updated comments
 *                   status: Pending
 *                   created_by: 1
 *                   updated_by: 1
 *                   createdAt: '2024-02-28T12:00:00Z'
 *                   updatedAt: '2024-02-28T12:00:00Z'
 *         '400':
 *           $ref: '#/components/responses/BadRequestError'
 *         '401':
 *           $ref: '#/components/responses/UnauthorizedError'
 *         '404':
 *           $ref: '#/components/responses/NotFoundError'
 *         '500':
 *           $ref: '#/components/responses/InternalServerError'
 *     delete:
 *       summary: Delete an enquiry record by ID
 *       tags: [Enquiries]
 *       parameters:
 *         - $ref: '#/components/parameters/idPathParam'
 *         - $ref: '#/components/parameters/xAccessTokenHeader'
 *       responses:
 *         '200':
 *           description: Enquiry deleted successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Enquiry deleted successfully
 *                 data:
 *                   id: 1
 *                   name: John Doe
 *                   email: john@example.com
 *                   phone_number: 1234567890
 *                   comments: Some updated comments
 *                   status: Pending
 *                   created_by: 1
 *                   updated_by: 1
 *                   createdAt: '2024-02-28T12:00:00Z'
 *                   updatedAt: '2024-02-28T12:00:00Z'
 *         '401':
 *           $ref: '#/components/responses/UnauthorizedError'
 *         '404':
 *           $ref: '#/components/responses/NotFoundError'
 *         '500':
 *           $ref: '#/components/responses/InternalServerError'
 *   /api/enquiry/search/{fieldName}/{fieldValue}:
 *     get:
 *       summary: Search enquiry records by field name and field value
 *       tags: [Enquiries]
 *       parameters:
 *         - $ref: '#/components/parameters/xAccessTokenHeader'
 *         - $ref: '#/components/parameters/fieldNamePathParam'
 *         - $ref: '#/components/parameters/fieldValuePathParam'
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 message: Details fetched successfully
 *                 data:
 *                   - id: 1
 *                     name: John Doe
 *                     email: john@example.com
 *                     phone_number: 1234567890
 *                     comments: Some comments
 *                     status: Pending
 *                     created_by: 1
 *                     updated_by: 1
 *                     createdAt: '2024-02-28T12:00:00Z'
 *                     updatedAt: '2024-02-28T12:00:00Z'
 *         '400':
 *           $ref: '#/components/responses/BadRequestError'
 *         '401':
 *           $ref: '#/components/responses/UnauthorizedError'
 *         '404':
 *           $ref: '#/components/responses/NotFoundError'
 *         '500':
 *           $ref: '#/components/responses/InternalServerError'
 */