/**
 * @swagger
 * tags:
 *   - name: City
 *     description: API for managing city master data
 *   - name: Currency
 *     description: API for managing currency master data
 *   - name: State
 *     description: API for managing state master data
 * components:
 *   schemas:
 *     City:
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
 *     State:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
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
 *   /api/citymaster:
 *     get:
 *       summary: Get all city masters
 *       tags: [City]
 *       security:
 *         - auth_token: []
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
 *       summary: Create a new city master
 *       tags: [City]
 *       security:
 *         - auth_token: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/City'
 *       responses:
 *         '201':
 *           description: City master created successfully
 *         '400':
 *           description: Bad request
 *   /api/citymaster/{city_id}:
 *     get:
 *       summary: Get a city master by ID
 *       tags: [City]
 *       security:
 *         - auth_token: []
 *       parameters:
 *         - name: city_id
 *           in: path
 *           required: true
 *           description: City master ID
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
 *           description: City master not found
 *     put:
 *       summary: Update a city master by ID
 *       tags: [City]
 *       security:
 *         - auth_token: []
 *       parameters:
 *         - name: city_id
 *           in: path
 *           required: true
 *           description: City master ID
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
 *           description: City master updated successfully
 *         '400':
 *           description: Bad request
 *         '404':
 *           description: City master not found
 *     delete:
 *       summary: Delete a city master by ID
 *       tags: [City]
 *       security:
 *         - auth_token: []
 *       parameters:
 *         - name: city_id
 *           in: path
 *           required: true
 *           description: City master ID
 *           schema:
 *             type: integer
 *       responses:
 *         '204':
 *           description: City master deleted successfully
 *         '404':
 *           description: City master not found
 *   /api/currencymaster:
 *     get:
 *       summary: Get all currency masters
 *       tags: [Currency]
 *       security:
 *         - auth_token: []
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
 *       summary: Create a new currency master
 *       tags: [Currency]
 *       security:
 *         - auth_token: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Currency'
 *       responses:
 *         '201':
 *           description: Currency master created successfully
 *         '400':
 *           description: Bad request
 *   /api/currencymaster/{currency_id}:
 *     get:
 *       summary: Get a currency master by ID
 *       tags: [Currency]
 *       security:
 *         - auth_token: []
 *       parameters:
 *         - name: currency_id
 *           in: path
 *           required: true
 *           description: Currency master ID
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
 *           description: Currency master not found
 *     put:
 *       summary: Update a currency master by ID
 *       tags: [Currency]
 *       security:
 *         - auth_token: []
 *       parameters:
 *         - name: currency_id
 *           in: path
 *           required: true
 *           description: Currency master ID
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
 *           description: Currency master updated successfully
 *         '400':
 *           description: Bad request
 *         '404':
 *           description: Currency master not found
 *     delete:
 *       summary: Delete a currency master by ID
 *       tags: [Currency]
 *       security:
 *         - auth_token: []
 *       parameters:
 *         - name: currency_id
 *           in: path
 *           required: true
 *           description: Currency master ID
 *           schema:
 *             type: integer
 *       responses:
 *         '204':
 *           description: Currency master deleted successfully
 *         '404':
 *           description: Currency master not found
 *   /api/statemaster:
 *     get:
 *       summary: Get all state masters
 *       tags: [State]
 *       security:
 *         - auth_token: []
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
 *       summary: Create a new state master
 *       tags: [State]
 *       security:
 *         - auth_token: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/State'
 *       responses:
 *         '201':
 *           description: State master created successfully
 *         '400':
 *           description: Bad request
 *   /api/statemaster/{state_id}:
 *     get:
 *       summary: Get a state master by ID
 *       tags: [State]
 *       security:
 *         - auth_token: []
 *       parameters:
 *         - name: state_id
 *           in: path
 *           required: true
 *           description: State master ID
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
 *           description: State master not found
 *     put:
 *       summary: Update a state master by ID
 *       tags: [State]
 *       security:
 *         - auth_token: []
 *       parameters:
 *         - name: state_id
 *           in: path
 *           required: true
 *           description: State master ID
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
 *           description: State master updated successfully
 *         '400':
 *           description: Bad request
 *         '404':
 *           description: State master not found
 *     delete:
 *       summary: Delete a state master by ID
 *       tags: [State]
 *       security:
 *         - auth_token: []
 *       parameters:
 *         - name: state_id
 *           in: path
 *           required: true
 *           description: State master ID
 *           schema:
 *             type: integer
 *       responses:
 *         '204':
 *           description: State master deleted successfully
 *         '404':
 *           description: State master not found
 *   /api/registrationtypemaster:
 *     get:
 *       summary: Get all registration type masters
 *       tags: [RegistrationTypes]
 *       security:
 *         - auth_token: []
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
 *       summary: Create a new registration type master
 *       tags: [RegistrationTypes]
 *       security:
 *         - auth_token: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistrationType'
 *       responses:
 *         '201':
 *           description: Registration type master created successfully
 *         '400':
 *           description: Bad request
 *   /api/registrationtypemaster/{registrationtype_id}:
 *     get:
 *       summary: Get a registration type master by ID
 *       tags: [RegistrationTypes]
 *       security:
 *         - auth_token: []
 *       parameters:
 *         - name: registrationtype_id
 *           in: path
 *           required: true
 *           description: Registration type master ID
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
 *           description: Registration type master not found
 *     put:
 *       summary: Update a registration type master by ID
 *       tags: [RegistrationTypes]
 *       security:
 *         - auth_token: []
 *       parameters:
 *         - name: registrationtype_id
 *           in: path
 *           required: true
 *           description: Registration type master ID
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
 *           description: Registration type master updated successfully
 *         '400':
 *           description: Bad request
 *         '404':
 *           description: Registration type master not found
 *     delete:
 *       summary: Delete a registration type master by ID
 *       tags: [RegistrationTypes]
 *       security:
 *         - auth_token: []
 *       parameters:
 *         - name: registrationtype_id
 *           in: path
 *           required: true
 *           description: Registration type master ID
 *           schema:
 *             type: integer
 *       responses:
 *         '204':
 *           description: Registration type master deleted successfully
 *         '404':
 *           description: Registration type master not found
 */
