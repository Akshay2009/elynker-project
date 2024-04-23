/**
 * @swagger
 * components:
 *   schemas:
 *     Widget:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *       required:
 *         - name
 *
 * /api/widgets:
 *   post:
 *     summary: Create a new widget
 *     tags: [Widgets]
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Widget'
 *     responses:
 *       201:
 *         description: Widget created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Widget'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *   get:
 *     summary: Get all widgets
 *     tags: [Widgets]
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
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
 *                     $ref: '#/components/schemas/Widget'
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 * /api/widgets/{id}:
 *   put:
 *     summary: Update a widget by ID
 *     tags: [Widgets]
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the widget to update
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Widget'
 *     responses:
 *       200:
 *         description: Widget updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Widget'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
