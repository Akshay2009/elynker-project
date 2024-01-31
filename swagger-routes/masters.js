/**
 * @swagger
 * tags:
 *   - name: City
 *     description: API for managing city master data
 *   - name: State
 *     description: API for managing state master data
 *   - name: Currency
 *     description: API for managing currency master data
 *   - name: RegistrationTypes
 *     description: API for managing registration types master data
 * components:
 *   schemas:
 *     City:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *     State:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *     Currency:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         code:
 *           type: string
 *         name:
 *           type: string
 *     RegistrationType:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 * paths:
 *   /api/cities:
 *     get:
 *       summary: Get all cities
 *       tags: [City]
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 - id: 1
 *                   name: City1
 *                 - id: 2
 *                   name: City2
 *     post:
 *       summary: Create a new city
 *       tags: [City]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/City'
 *       responses:
 *         '201':
 *           description: City created successfully
 *         '400':
 *           description: Bad request
 *   /api/cities/{id}:
 *     get:
 *       summary: Get a city by ID
 *       tags: [City]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: City ID
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 id: 1
 *                 name: City1
 *         '404':
 *           description: City not found
 *     put:
 *       summary: Update a city by ID
 *       tags: [City]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: City ID
 *           schema:
 *             type: integer
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/City'
 *       responses:
 *         '200':
 *           description: City updated successfully
 *         '400':
 *           description: Bad request
 *         '404':
 *           description: City not found
 *     delete:
 *       summary: Delete a city by ID
 *       tags: [City]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: City ID
 *           schema:
 *             type: integer
 *       responses:
 *         '204':
 *           description: City deleted successfully
 *         '404':
 *           description: City not found
 *   /api/states:
 *     get:
 *       summary: Get all states
 *       tags: [State]
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 - id: 1
 *                   name: State1
 *                 - id: 2
 *                   name: State2
 *     post:
 *       summary: Create a new state
 *       tags: [State]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/State'
 *       responses:
 *         '201':
 *           description: State created successfully
 *         '400':
 *           description: Bad request
 *   /api/states/{id}:
 *     get:
 *       summary: Get a state by ID
 *       tags: [State]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: State ID
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 id: 1
 *                 name: State1
 *         '404':
 *           description: State not found
 *     put:
 *       summary: Update a state by ID
 *       tags: [State]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: State ID
 *           schema:
 *             type: integer
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/State'
 *       responses:
 *         '200':
 *           description: State updated successfully
 *         '400':
 *           description: Bad request
 *         '404':
 *           description: State not found
 *     delete:
 *       summary: Delete a state by ID
 *       tags: [State]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: State ID
 *           schema:
 *             type: integer
 *       responses:
 *         '204':
 *           description: State deleted successfully
 *         '404':
 *           description: State not found
 *   /api/currencies:
 *     get:
 *       summary: Get all currencies
 *       tags: [Currency]
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 - id: 1
 *                   code: USD
 *                   name: US Dollar
 *                 - id: 2
 *                   code: EUR
 *                   name: Euro
 *     post:
 *       summary: Create a new currency
 *       tags: [Currency]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Currency'
 *       responses:
 *         '201':
 *           description: Currency created successfully
 *         '400':
 *           description: Bad request
 *   /api/currencies/{id}:
 *     get:
 *       summary: Get a currency by ID
 *       tags: [Currency]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: Currency ID
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 id: 1
 *                 code: USD
 *                 name: US Dollar
 *         '404':
 *           description: Currency not found
 *     put:
 *       summary: Update a currency by ID
 *       tags: [Currency]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: Currency ID
 *           schema:
 *             type: integer
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Currency'
 *       responses:
 *         '200':
 *           description: Currency updated successfully
 *         '400':
 *           description: Bad request
 *         '404':
 *           description: Currency not found
 *     delete:
 *       summary: Delete a currency by ID
 *       tags: [Currency]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: Currency ID
 *           schema:
 *             type: integer
 *       responses:
 *         '204':
 *           description: Currency deleted successfully
 *         '404':
 *           description: Currency not found
 *   /api/registration-types:
 *     get:
 *       summary: Get all registration types
 *       tags: [RegistrationTypes]
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 - id: 1
 *                   name: Type1
 *                 - id: 2
 *                   name: Type2
 *     post:
 *       summary: Create a new registration type
 *       tags: [RegistrationTypes]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistrationType'
 *       responses:
 *         '201':
 *           description: Registration type created successfully
 *         '400':
 *           description: Bad request
 *   /api/registration-types/{id}:
 *     get:
 *       summary: Get a registration type by ID
 *       tags: [RegistrationTypes]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: Registration type ID
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 id: 1
 *                 name: Type1
 *         '404':
 *           description: Registration type not found
 *     put:
 *       summary: Update a registration type by ID
 *       tags: [RegistrationTypes]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: Registration type ID
 *           schema:
 *             type: integer
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistrationType'
 *       responses:
 *         '200':
 *           description: Registration type updated successfully
 *         '400':
 *           description: Bad request
 *         '404':
 *           description: Registration type not found
 *     delete:
 *       summary: Delete a registration type by ID
 *       tags: [RegistrationTypes]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: Registration type ID
 *           schema:
 *             type: integer
 *       responses:
 *         '204':
 *           description: Registration type deleted successfully
 *         '404':
 *           description: Registration type not found
 */
