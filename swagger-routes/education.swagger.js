/**
 * @swagger
 * tags:
 *   name: Education
 *   description: API endpoints for managing education master records
 * definitions:
 *   EducationMaster:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       education:
 *         type: string
 *       is_active:
 *         type: boolean
 *       created_by:
 *         type: integer
 *       updated_by:
 *         type: integer
 *       createdAt:
 *         type: string
 *         format: date-time
 *       updatedAt:
 *         type: string
 *         format: date-time
 * /api/education/:
 *   post:
 *     summary: Create an education master record
 *     tags: [Education]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/EducationMaster'
 *     responses:
 *       '201':
 *         description: Education master record created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Education master record created successfully
 *               data:
 *                 id: 1
 *                 education: Bachelor's Degree
 *                 is_active: true
 *                 created_by: 1
 *                 updated_by: 1
 *                 createdAt: '2024-03-15T00:00:00.000Z'
 *                 updatedAt: '2024-03-15T00:00:00.000Z'
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 *   get:
 *     summary: Get all education master records
 *     tags: [Education]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pageSize
 *         description: Number of records per page
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Education master records fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Education master records fetched successfully
 *               totalRecords: 10
 *               data:
 *                 - id: 1
 *                   education: Bachelor's Degree
 *                   is_active: true
 *                   created_by: 1
 *                   updated_by: 1
 *                   createdAt: '2024-03-15T00:00:00.000Z'
 *                   updatedAt: '2024-03-15T00:00:00.000Z'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: No education master records found
 *       '500':
 *         description: Internal server error
 * /api/education/{education_id}:
 *   get:
 *     summary: Get education master record by ID
 *     tags: [Education]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: education_id
 *         description: Education master record ID
 *         required: true
 *         schema:
 *           type: integer
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Education master record fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Education master record fetched successfully
 *               data:
 *                 id: 1
 *                 education: Bachelor's Degree
 *                 is_active: true
 *                 created_by: 1
 *                 updated_by: 1
 *                 createdAt: '2024-03-15T00:00:00.000Z'
 *                 updatedAt: '2024-03-15T00:00:00.000Z'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Education master record not found
 *       '500':
 *         description: Internal server error
 *   put:
 *     summary: Update education master record by ID
 *     tags: [Education]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: education_id
 *         description: Education master record ID
 *         required: true
 *         schema:
 *           type: integer
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/EducationMaster'
 *     responses:
 *       '200':
 *         description: Education master record updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Education master record updated successfully
 *               data:
 *                 id: 1
 *                 education: Bachelor's Degree
 *                 is_active: true
 *                 created_by: 1
 *                 updated_by: 1
 *                 createdAt: '2024-03-15T00:00:00.000Z'
 *                 updatedAt: '2024-03-15T00:00:00.000Z'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Education master record not found
 *       '500':
 *         description: Internal server error
 *   delete:
 *     summary: Delete education master record by ID
 *     tags: [Education]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: education_id
 *         description: Education master record ID
 *         required: true
 *         schema:
 *           type: integer
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Education master record deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Education master record deleted successfully
 *               data:
 *                 id: 1
 *                 education: Bachelor's Degree
 *                 is_active: true
 *                 created_by: 1
 *                 updated_by: 1
 *                 createdAt: '2024-03-15T00:00:00.000Z'
 *                 updatedAt: '2024-03-15T00:00:00.000Z'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Education master record not found
 *       '500':
 *         description: Internal server error
 * /api/education/search/{fieldName}/{fieldValue}:
 *   get:
 *     summary: Search education master records by field value and field name
 *     tags: [Education]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fieldName
 *         description: Field name to search
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: fieldValue
 *         description: Field value to search
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Education master records fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Education master records fetched successfully
 *               data:
 *                 - id: 1
 *                   education: Bachelor's Degree
 *                   is_active: true
 *                   created_by: 1
 *                   updated_by: 1
 *                   createdAt: '2024-03-15T00:00:00.000Z'
 *                   updatedAt: '2024-03-15T00:00:00.000Z'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: No education master records found
 *       '500':
 *         description: Internal server error
 */
