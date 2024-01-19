/**
 * @swagger
 * tags:
 *   name: CityMaster
 *   description: City Master data handling
 */

/**
 * @swagger
 * tags:
 *   name: CurrencyMaster
 *   description: Currency Master data handling
 */

/**
 * @swagger
 * tags:
 *   name: StateMaster
 *   description: State Master data handling
 */

/**
 * @swagger
 * /api/citymaster/:
 *   post:
 *     summary: Save City Master
 *     tags: [CityMaster]
 *     security:
 *       - jwt: []
 *     requestBody:
 *       description: City Master details to save
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CityMaster'
 *     responses:
 *       200:
 *         description: City Master saved successfully
 *       401:
 *         description: Unauthorized - Invalid token
 */

/**
 * @swagger
 * /api/citymaster/:
 *   get:
 *     summary: Get all City Masters
 *     tags: [CityMaster]
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: List of all City Masters
 *       401:
 *         description: Unauthorized - Invalid token
 */

/**
 * @swagger
 * /api/citymaster/{id}:
 *   get:
 *     summary: Get City Master by ID
 *     tags: [CityMaster]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the City Master to retrieve
 *     responses:
 *       200:
 *         description: City Master retrieved successfully
 *       401:
 *         description: Unauthorized - Invalid token
 */

/**
 * @swagger
 * /api/citymaster/{id}:
 *   put:
 *     summary: Update City Master by ID
 *     tags: [CityMaster]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the City Master to update
 *     requestBody:
 *       description: City Master details to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CityMaster'
 *     responses:
 *       200:
 *         description: City Master updated successfully
 *       401:
 *         description: Unauthorized - Invalid token
 */

/**
 * @swagger
 * /api/currencymaster/:
 *   get:
 *     summary: Get all Currency Masters
 *     tags: [CurrencyMaster]
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: List of all Currency Masters
 *       401:
 *         description: Unauthorized - Invalid token
 */

/**
 * @swagger
 * /api/currencymaster/:
 *   post:
 *     summary: Save Currency Master
 *     tags: [CurrencyMaster]
 *     security:
 *       - jwt: []
 *     requestBody:
 *       description: Currency Master details to save
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CurrencyMaster'
 *     responses:
 *       200:
 *         description: Currency Master saved successfully
 *       401:
 *         description: Unauthorized - Invalid token
 */

/**
 * @swagger
 * /api/currencymaster/{id}:
 *   put:
 *     summary: Update Currency Master by ID
 *     tags: [CurrencyMaster]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Currency Master to update
 *     requestBody:
 *       description: Currency Master details to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CurrencyMaster'
 *     responses:
 *       200:
 *         description: Currency Master updated successfully
 *       401:
 *         description: Unauthorized - Invalid token
 */

/**
 * @swagger
 * /api/statemaster/:
 *   post:
 *     summary: Save State Master
 *     tags: [StateMaster]
 *     security:
 *       - jwt: []
 *     requestBody:
 *       description: State Master details to save
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StateMaster'
 *     responses:
 *       200:
 *         description: State Master saved successfully
 *       401:
 *         description: Unauthorized - Invalid token
 */

/**
 * @swagger
 * /api/statemaster/:
 *   get:
 *     summary: Get all State Masters
 *     tags: [StateMaster]
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: List of all State Masters
 *       401:
 *         description: Unauthorized - Invalid token
 */

/**
 * @swagger
 * /api/statemaster/{id}:
 *   put:
 *     summary: Update State Master by ID
 *     tags: [StateMaster]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the State Master to update
 *     requestBody:
 *       description: State Master details to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StateMaster'
 *     responses:
 *       200:
 *         description: State Master updated successfully
 *       401:
 *         description: Unauthorized - Invalid token
 */

// Define the components section with schemas for CityMaster, CurrencyMaster, and StateMaster
/**
 * @swagger
 * components:
 *   schemas:
 *     CityMaster:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the city
 *
 *     CurrencyMaster:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the currency
 *         prefix:
 *           type: string
 *           description: Currency prefix
 *         prefix_sign:
 *           type: string
 *           description: Prefix sign
 *         country_name:
 *           type: string
 *           description: Country name associated with the currency
 *
 *     StateMaster:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the state
 */
