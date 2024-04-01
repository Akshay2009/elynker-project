/**
 * @swagger
 * tags:
 *   name: ModuleDetails
 *   description: API endpoints for managing module details records
 * definitions:
 *   ModuleDetail:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       admin_module_id:
 *         type: integer
 *       value:
 *         type: string
 *       status:
 *         type: boolean
 *       created_by:
 *         type: integer
 *       updated_by:
 *         type: integer
 *     required:
 *       - admin_module_id
 *   AdminModule:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       is_active:
 *         type: boolean
 *       created_by:
 *         type: integer
 *       updated_by:
 *         type: integer
 * securityDefinitions:
 *   BearerAuth:
 *     type: apiKey
 *     in: header
 *     name: x-access-token
 *   parameters:
 *         - name: x-access-token
 *           in: header
 *           description: Access token for authentication
 *           required: true
 *           schema:
 *             type: string
 * /api/moduleDetails/miscellaneous:
 *   post:
 *     summary: Create a new admin module record and module details record
 *     tags: [ModuleDetails]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               admin:
 *                 $ref: '#/definitions/AdminModule'
 *               module:
 *                 type: array
 *                 items:
 *                   $ref: '#/definitions/ModuleDetail'
 *     responses:
 *       '201':
 *         description: Admin Module and  Module details record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 admin:
 *                   $ref: '#/definitions/AdminModule'
 *                 module:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/ModuleDetail'
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 *   put:
 *     summary: Update Admin Module and Module Detaiils
 *     tags: [ModuleDetails]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               admin:
 *                 $ref: '#/definitions/AdminModule'
 *               module:
 *                 type: array
 *                 items:
 *                   $ref: '#/definitions/ModuleDetail'
 *     responses:
 *       '200':
 *         description: Admin Module and Module Details Updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 admin:
 *                   $ref: '#/definitions/AdminModule'
 *                 module:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/ModuleDetail'
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 * /api/moduleDetails:
 *   get:
 *     summary: Get all module details records
 *     tags: [ModuleDetails]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Module details records fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 totalRecords:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/ModuleDetail'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: No module details records found
 *       '500':
 *         description: Internal server error
 * /api/moduleDetails/{id}:
 *   get:
 *     summary: Get a module details record by ID
 *     tags: [ModuleDetails]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Module details ID
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: x-access-token
 *         description: Token
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Module details record fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/definitions/ModuleDetail'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Module details record not found
 *       '500':
 *         description: Internal server error
 *   delete:
 *     summary: Delete a module details record by ID
 *     tags: [ModuleDetails]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Module details ID
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: x-access-token
 *         description: Token
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Module details record deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/definitions/ModuleDetail'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Module details record not found
 *       '500':
 *         description: Internal server error
 * /api/moduleDetails/search/{fieldName}/{fieldValue}:
 *   get:
 *     summary: Search module details records by field name and value
 *     tags: [ModuleDetails]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fieldName
 *         description: Field name to search by
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: fieldValue
 *         description: Field value to search for
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: x-access-token
 *         description: Token
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Module details records fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/ModuleDetail'
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: No module details records found
 *       '500':
 *         description: Internal server error
 * /api/moduleDetails/miscellaneous/{admin_module_id}:
 *   get:
 *     summary: Get module details records by admin module ID
 *     tags: [ModuleDetails]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: admin_module_id
 *         description: Admin module ID
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: x-access-token
 *         description: Token
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Module details records fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 admin:
 *                   $ref: '#/definitions/AdminModule'
 *                 module:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/ModuleDetail'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Module details records not found
 *       '500':
 *         description: Internal server error
 * /api/moduleDetails/miscellaneous/search/{name}:
 *   get:
 *     summary: Get module details records by admin module Name
 *     tags: [ModuleDetails]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         description: Admin module Name
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: x-access-token
 *         description: Token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Module details records fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 admin:
 *                   $ref: '#/definitions/AdminModule'
 *                 module:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/ModuleDetail'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Module details records not found
 *       '500':
 *         description: Internal server error
 *   delete:
 *     summary: Delete module details records by admin module ID
 *     tags: [ModuleDetails]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: admin_module_id
 *         description: Admin module ID
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: x-access-token
 *         description: Token
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Module details records deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 admin:
 *                   $ref: '#/definitions/AdminModule'
 *                 module:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/ModuleDetail'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Module details records not found
 *       '500':
 *         description: Internal server error
 */
