/**
 * @swagger
 * tags:
 *   name: Certificate
 *   description: API for managing certificates
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
 *         reg_id:
 *           type: integer
 * paths:
 *   /api/certificate:
 *     post:
 *       summary: Create a new certificate
 *       tags: [Certificate]
 *       security:
 *         - api_key: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Certificate'
 *       responses:
 *         '201':
 *           description: Certificate created successfully
 *         '400':
 *           description: Bad request
 *         '500':
 *           description: Some server error
 *     get:
 *       summary: Get all certificates
 *       tags: [Certificate]
 *       security:
 *         - api_key: []
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 - id: 1
 *                   name: Certificate1
 *                   description: Description1
 *                   reg_id: 123
 *                 - id: 2
 *                   name: Certificate2
 *                   description: Description2
 *                   reg_id: 456
 *         '500':
 *           description: Some server error
 *   /api/certificate/{reg_id}:
 *     get:
 *       summary: Get a certificate by registration ID
 *       tags: [Certificate]
 *       parameters:
 *         - name: reg_id
 *           in: path
 *           required: true
 *           description: Registration ID
 *           schema:
 *             type: integer
 *       security:
 *         - api_key: []
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 - id: 1
 *                   name: Certificate1
 *                   description: Description1
 *                   reg_id: 123
 *         '404':
 *           description: Certificate not found
 *         '500':
 *           description: Some server error
 *   /api/certificate/{certificate_id}:
 *     put:
 *       summary: Update a certificate by ID
 *       tags: [Certificate]
 *       parameters:
 *         - name: certificate_id
 *           in: path
 *           required: true
 *           description: Certificate ID
 *           schema:
 *             type: integer
 *       security:
 *         - api_key: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Certificate'
 *       responses:
 *         '200':
 *           description: Certificate updated successfully
 *         '400':
 *           description: Bad request
 *         '404':
 *           description: Certificate not found
 *         '500':
 *           description: Some server error
 *     delete:
 *       summary: Delete a certificate by ID
 *       tags: [Certificate]
 *       parameters:
 *         - name: certificate_id
 *           in: path
 *           required: true
 *           description: Certificate ID
 *           schema:
 *             type: integer
 *       security:
 *         - api_key: []
 *       responses:
 *         '204':
 *           description: Certificate deleted successfully
 *         '404':
 *           description: Certificate not found
 *         '500':
 *           description: Some server error
 */
