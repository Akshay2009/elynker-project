/**
 * @swagger
 * tags:
 *   name: Language
 *   description: API endpoints for managing language master records
 * definitions:
 *   LanguageMaster:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       language:
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
 * /api/language/:
 *   post:
 *     summary: Create a language master record
 *     tags: [Language]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/LanguageMaster'
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: Language master record created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Language master record created successfully
 *               data:
 *                 id: 1
 *                 language: English
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
 *     summary: Get all language master records
 *     tags: [Language]
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
 *         description: Language master records fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Language master records fetched successfully
 *               totalRecords: 10
 *               data:
 *                 - id: 1
 *                   language: English
 *                   is_active: true
 *                   created_by: 1
 *                   updated_by: 1
 *                   createdAt: '2024-03-15T00:00:00.000Z'
 *                   updatedAt: '2024-03-15T00:00:00.000Z'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: No language master records found
 *       '500':
 *         description: Internal server error
 * /api/language/{language_id}:
 *   get:
 *     summary: Get language master record by ID
 *     tags: [Language]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: language_id
 *         description: Language master record ID
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
 *         description: Language master record fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Language master record fetched successfully
 *               data:
 *                 id: 1
 *                 language: English
 *                 is_active: true
 *                 created_by: 1
 *                 updated_by: 1
 *                 createdAt: '2024-03-15T00:00:00.000Z'
 *                 updatedAt: '2024-03-15T00:00:00.000Z'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Language master record not found
 *       '500':
 *         description: Internal server error
 *   put:
 *     summary: Update language master record by ID
 *     tags: [Language]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: language_id
 *         description: Language master record ID
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
 *             $ref: '#/definitions/LanguageMaster'
 *     responses:
 *       '200':
 *         description: Language master record updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Language master record updated successfully
 *               data:
 *                 id: 1
 *                 language: English
 *                 is_active: true
 *                 created_by: 1
 *                 updated_by: 1
 *                 createdAt: '2024-03-15T00:00:00.000Z'
 *                 updatedAt: '2024-03-15T00:00:00.000Z'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Language master record not found
 *       '500':
 *         description: Internal server error
 *   delete:
 *     summary: Delete language master record by ID
 *     tags: [Language]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: language_id
 *         description: Language master record ID
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
 *         description: Language master record deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Language master record deleted successfully
 *               data:
 *                 id: 1
 *                 language: English
 *                 is_active: true
 *                 created_by: 1
 *                 updated_by: 1
 *                 createdAt: '2024-03-15T00:00:00.000Z'
 *                 updatedAt: '2024-03-15T00:00:00.000Z'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Language master record not found
 *       '500':
 *         description: Internal server error
 * /api/language/search/{fieldName}/{fieldValue}:
 *   get:
 *     summary: Search language master records by field name and value
 *     tags: [Language]
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
 *         description: Language master records fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Language master records fetched successfully
 *               data:
 *                 - id: 1
 *                   language: English
 *                   is_active: true
 *                   created_by: 1
 *                   updated_by: 1
 *                   createdAt: '2024-03-15T00:00:00.000Z'
 *                   updatedAt: '2024-03-15T00:00:00.000Z'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: No language master records found
 *       '500':
 *         description: Internal server error
 */
