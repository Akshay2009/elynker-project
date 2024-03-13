/**
 * @swagger
 * /api/admin/modules:
 *   post:
 *     summary: Create a Admin Modules 
 *     tags: [AdminModules]
 *     parameters:
 *         - in: header
 *           name: x-access-token
 *           description: Access token for authentication
 *           required: true
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *             required:
 *               - name
 *               - description
 *               - is_active
 *     responses:
 *       '201':
 *         description: Admin Modules record created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Admin Modules record created successfully
 *               data:
 *                 id:
 *                 name: 
 *                 description:
 *                 is_active:   
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 *   get:
 *     summary: Get all admin modules records
 *     tags: [AdminModules]
 *     parameters:
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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Admin Modules records fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Admin Modules fetched successfully
 *               data:
 *                 - id: 
 *                   name: 
 *                   description: 
 *                   is_active: 
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 * /api/admin/modules/{adminId}:
 *   get:
 *     summary: Get admin module by ID
 *     tags: [AdminModules]
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         type: string
 *       - in: path
 *         name: adminId
 *         description: ID of the admin module to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Admin Module Details Fetched Successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Admin Modules Details Fetched Successfully
 *               data: {}
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Admin Modules Details not found
 *   put:
 *     summary: Update admin module by ID
 *     tags: [AdminModules]
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         type: string
 *       - in: path
 *         name: adminId
 *         description: ID of the admin module to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Admin Module record updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Admin Module record updated successfully
 *               data:
 *                 id: 
 *                 name: 
 *                 description: 
 *                 is_active: 
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Admin Module not found with this ID
 *   delete:
 *     summary: Delete admin module by ID
 *     tags: [AdminModules]
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         type: string
 *       - in: path
 *         name: adminId
 *         description: ID of the admin module to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Admin Module record Delete successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Admin Module record Delete successfully
 *               data:
 *                 id: 
 *                 name: 
 *                 description: 
 *                 is_active: 
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Admin Module not found with this ID
 * /api/admin/modules/search/{fieldName}/{fieldValue}:
 *   get:
 *     summary: Search admin modules
 *     tags: [AdminModules]
 *     parameters:
 *       - in: path
 *         name: fieldName
 *         description: Name of the field to search
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: fieldValue
 *         description: Value of the field to search
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Fetched Records
 *         content:
 *           application/json:
 *             example:
 *               message: Fetched Records
 *               data: []
 *       '400':
 *         description: Invalid field name
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: No record found
 */
