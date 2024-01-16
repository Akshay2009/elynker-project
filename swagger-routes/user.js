/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         email:
 *           type: string
 *         name:
 *           type: string
 *         city:
 *           type: string
 *         country_code:
 *           type: string
 *         mobile_number:
 *           type: string
 *         created_by:
 *           type: integer
 *         updated_by:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * paths:
 *   /api/users/{id}:
 *     get:
 *       summary: Get user by ID
 *       tags: [Users]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: User ID
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 id: 1
 *                 email: gourav@gmail.com
 *                 name: Gaurav
 *                 city: Lucknow
 *                 country_code: +91
 *                 mobile_number: '1114441111'
 *                 created_by: null
 *                 updated_by: null
 *                 createdAt: '2024-01-16T14:03:40.727Z'
 *                 updatedAt: '2024-01-16T14:03:40.727Z'
 *         '404':
 *           description: User not found
 *         '500':
 *           description: Some server error
 *     put:
 *       summary: Update user by ID
 *       tags: [Users]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: User ID
 *           schema:
 *             type: integer
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         '200':
 *           description: Successful update
 *           content:
 *             application/json:
 *               example:
 *                 message: User updated successfully
 *         '404':
 *           description: User not found
 *         '500':
 *           description: Some server error
 */
