/**
 * @swagger
 * tags:
 *   name: Certificate
 *   description: API for managing certificate records
 * components:
 *   schemas:
 *     Certificate:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         issued_on:
 *           type: string
 *           format: date
 *         registrationId:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * paths:
 *   /api/certificate:
 *     post:
 *       summary: Create a certificate record
 *       tags: [Certificate]
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
 *               $ref: '#/components/schemas/Certificate'
 *       responses:
 *         '200':
 *           description: Certificate record created successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Certificate created successfully
 *                 data:
 *                   id: 1
 *                   name: Certificate Name
 *                   description: Certificate Description
 *                   issued_on: '2024-02-28'
 *                   registrationId: 1
 *                   createdAt: '2024-02-28T00:00:00.000Z'
 *                   updatedAt: '2024-02-28T00:00:00.000Z'
 *         '400':
 *           description: Bad request
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Registration not found
 *         '500':
 *           description: Internal server error
 *     get:
 *       summary: Get all certificate records
 *       tags: [Certificate]
 *       parameters:
 *         - in: header
 *           name: x-access-token
 *           description: Access token for authentication
 *           required: true
 *           type: string
 *       responses:
 *         '200':
 *           description: Certificate records fetched successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Certificate records fetched successfully
 *                 data:
 *                   - id: 1
 *                     name: Certificate Name
 *                     description: Certificate Description
 *                     issued_on: '2024-02-28'
 *                     registrationId: 1
 *                     createdAt: '2024-02-28T00:00:00.000Z'
 *                     updatedAt: '2024-02-28T00:00:00.000Z'
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: No certificate records found
 *         '500':
 *           description: Internal server error
 *   /api/certificate/{reg_id}:
 *     get:
 *       summary: Get certificate records by registration ID
 *       tags: [Certificate]
 *       parameters:
 *         - in: path
 *           name: reg_id
 *           description: Registration ID
 *           required: true
 *           type: integer
 *         - in: header
 *           name: x-access-token
 *           description: Access token for authentication
 *           required: true
 *           type: string
 *       responses:
 *         '200':
 *           description: Certificate records fetched successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Certificate records fetched successfully
 *                 data:
 *                   - id: 1
 *                     name: Certificate Name
 *                     description: Certificate Description
 *                     issued_on: '2024-02-28'
 *                     registrationId: 1
 *                     createdAt: '2024-02-28T00:00:00.000Z'
 *                     updatedAt: '2024-02-28T00:00:00.000Z'
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: No certificate records found
 *         '500':
 *           description: Internal server error
*   /api/certificate/{certificateId}:
 *     put:
 *       summary: Update certificate record by ID
 *       tags: [Certificate]
 *       parameters:
 *         - in: path
 *           name: certificate_id
 *           description: Certificate ID
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
 *               $ref: '#/components/schemas/Certificate'
 *       responses:
 *         '200':
 *           description: Certificate record updated successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Certificate record updated successfully
 *                 data:
 *                   id: 1
 *                   name: Certificate Name
 *                   description: Certificate Description
 *                   issued_on: '2024-02-28'
 *                   registrationId: 1
 *                   createdAt: '2024-02-28T00:00:00.000Z'
 *                   updatedAt: '2024-02-28T00:00:00.000Z'
 *         '400':
 *           description: Bad request
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Certificate not found
 *         '500':
 *           description: Internal server error
 *     delete:
 *       summary: Delete certificate record by ID
 *       tags: [Certificate]
 *       parameters:
 *         - in: path
 *           name: certificate_id
 *           description: Certificate ID
 *           required: true
 *           type: integer
 *         - in: header
 *           name: x-access-token
 *           description: Access token for authentication
 *           required: true
 *           type: string
 *       responses:
 *         '200':
 *           description: Certificate record deleted successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Certificate record deleted successfully
 *                 data:
 *                   id: 1
 *                   name: Certificate Name
 *                   description: Certificate Description
 *                   issued_on: '2024-02-28'
 *                   registrationId: 1
 *                   createdAt: '2024-02-28T00:00:00.000Z'
 *                   updatedAt: '2024-02-28T00:00:00.000Z'
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Certificate not found
 *         '500':
 *           description: Internal server error
 *   /api/certificate/search/{fieldName}/{fieldValue}:
 *     get:
 *       summary: Search certificate records by field name and value
 *       tags: [Certificate]
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
 *           description: Certificate records fetched successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Certificate records fetched successfully
 *                 data:
 *                   - id: 1
 *                     name: Certificate Name
 *                     description: Certificate Description
 *                     issued_on: '2024-02-28'
 *                     registrationId: 1
 *                     createdAt: '2024-02-28T00:00:00.000Z'
 *                     updatedAt: '2024-02-28T00:00:00.000Z'
 *         '400':
 *           description: Bad request
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: No certificate records found
 *         '500':
 *           description: Internal server error
 */
