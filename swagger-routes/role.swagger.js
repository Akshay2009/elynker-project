/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: API for managing roles
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         permissions:
 *           type: string
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
 *   /api/roles:
 *     post:
 *       summary: Create a new role
 *       tags: [Roles]
 *       parameters:
 *         - name: x-access-token
 *           in: header
 *           description: Access token for authentication
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       responses:
 *         '201':
 *           description: Role created successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Role Record Created Successfully
 *         '400':
 *           description: Role Record not created
 *         '401':
 *           description: Unauthorized - Access token is missing or invalid
 *         '500':
 *           description: Internal Server Error
 *     get:
 *       summary: Get all roles
 *       tags: [Roles]
 *       parameters:
 *         - name: x-access-token
 *           in: header
 *           description: Access token for authentication
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Fetched roles successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Fetched Records
 *                 data:
 *                   - id: 1
 *                     name: example
 *                     permissions: example
 *                     createdAt: '2024-02-28T00:00:00.000Z'
 *                     updatedAt: '2024-02-28T00:00:00.000Z'
 *         '400':
 *           description: No Record Found
 *         '401':
 *           description: Unauthorized - Access token is missing or invalid
 *         '500':
 *           description: Internal Server Error
 *   /api/roles/{id}:
 *     put:
 *       summary: Update a role by ID
 *       tags: [Roles]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: Role ID
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
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       responses:
 *         '200':
 *           description: Role updated successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Role Record Updated
 *         '404':
 *           description: Role Record not found with the id provided
 *         '400':
 *           description: Bad request
 *         '401':
 *           description: Unauthorized - Access token is missing or invalid
 *         '500':
 *           description: Internal Server Error
 *     delete:
 *       summary: Delete a role by ID
 *       tags: [Roles]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: Role ID
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
 *           description: Role deleted successfully with the id provided
 *           content:
 *             application/json:
 *               example:
 *                 message: Role Deleted Successfully with the id provided
 *         '404':
 *           description: No Role Record found with the id provided
 *         '400':
 *           description: Could not delete Role Record with the id provided
 *         '401':
 *           description: Unauthorized - Access token is missing or invalid
 *         '500':
 *           description: Internal Server Error
 *     get:
 *       summary: Get a role by ID
 *       tags: [Roles]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: Role ID
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
 *           description: Role fetched successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Fetched Record
 *                 data:
 *                   id: 1
 *                   name: example
 *                   permissions: example
 *                   createdAt: '2024-02-28T00:00:00.000Z'
 *                   updatedAt: '2024-02-28T00:00:00.000Z'
 *         '400':
 *           description: No Role Record found with the id provided
 *         '401':
 *           description: Unauthorized - Access token is missing or invalid
 *         '500':
 *           description: Internal Server Error
 *   /api/roles/search/{fieldName}/{fieldValue}:
 *     get:
 *       summary: Search roles by fieldName and fieldValue
 *       tags: [Roles]
 *       parameters:
 *         - name: x-access-token
 *           in: header
 *           description: Access token for authentication
 *           required: true
 *           schema:
 *             type: string
 *         - name: fieldName
 *           in: path
 *           required: true
 *           description: Field name to search
 *           schema:
 *             type: string
 *         - name: fieldValue
 *           in: path
 *           required: true
 *           description: Field value to search
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Fetched Records
 *           content:
 *             application/json:
 *               example:
 *                 message: Fetched Records
 *                 data:
 *                   - id: 1
 *                     name: example
 *                     permissions: example
 *                     createdAt: '2024-02-28T00:00:00.000Z'
 *                     updatedAt: '2024-02-28T00:00:00.000Z'
 *         '404':
 *           description: No record found
 *         '400':
 *           description: Invalid field name
 *         '401':
 *           description: Unauthorized - Access token is missing or invalid
 *         '500':
 *           description: Internal Server Error
 */

