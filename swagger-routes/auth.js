/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - roles
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The username for the users
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: boolean
 *           description: Password for the users
 *         roles:
 *           type: array
 *           format: string array
 *           description: The roles for user was added
 *       example:
 *         name: AlexDew
 *         email: alexdew@elynker
 *         city: 'Lucknow'
 *         country_code: '+91'
 *         mobile_number: 9999999999
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The username for the users
 *         password:
 *           type: boolean
 *           description: Password for the users
 *       example:
 *         mobile_number: AlexDew
 *         otp: '454545'
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The users managing API
 * /api/auth/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 * /api/auth/signin:
 *   post:
 *     summary: Logged in with user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Auth'
 *       500:
 *         description: Some server error
 *
 */