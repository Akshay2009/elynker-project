/**
 * @swagger
 * /api/currencymaster:
 *   post:
 *     summary: Create a new currency master record
 *     tags: [CurrencyMaster]
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
 *               prefix:
 *                 type: string
 *               prefix_sign:
 *                 type: string
 *               country_name:
 *                 type: string
 *             required:
 *               - name
 *               - prefix
 *               - prefix_sign
 *               - country_name
 *     responses:
 *       '201':
 *         description: Currency record created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Currency record created successfully
 *               data:
 *                 id: 1
 *                 name: Currency Name
 *                 prefix: Prefix
 *                 prefix_sign: Prefix Sign
 *                 country_name: Country Name
 *                 createdAt: '2024-02-28T00:00:00.000Z'
 *                 updatedAt: '2024-02-28T00:00:00.000Z'
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 *   get:
 *     summary: Get all currency master records
 *     tags: [CurrencyMaster]
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
 *         description: Currency records fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Currency records fetched successfully
 *               data:
 *                 - id: 1
 *                   name: Currency Name
 *                   prefix: Prefix
 *                   prefix_sign: Prefix Sign
 *                   country_name: Country Name
 *                   createdAt: '2024-02-28T00:00:00.000Z'
 *                   updatedAt: '2024-02-28T00:00:00.000Z'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 * /api/currencymaster/{id}:
 *   get:
 *     summary: Get currency master record by ID
 *     tags: [CurrencyMaster]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Currency ID
 *         required: true
 *         schema:
 *           type: integer
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Currency record fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Currency record fetched successfully
 *               data:
 *                 id: 1
 *                 name: Currency Name
 *                 prefix: Prefix
 *                 prefix_sign: Prefix Sign
 *                 country_name: Country Name
 *                 createdAt: '2024-02-28T00:00:00.000Z'
 *                 updatedAt: '2024-02-28T00:00:00.000Z'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Currency not found
 *       '500':
 *         description: Internal server error
 *   put:
 *     summary: Update currency master record by ID
 *     tags: [CurrencyMaster]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Currency ID
 *         required: true
 *         schema:
 *           type: integer
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               prefix:
 *                 type: string
 *               prefix_sign:
 *                 type: string
 *               country_name:
 *                 type: string
 *             required:
 *               - name
 *               - prefix
 *               - prefix_sign
 *               - country_name
 *     responses:
 *       '200':
 *         description: Currency record updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Currency record updated successfully
 *               data:
 *                 id: 1
 *                 name: Currency Name
 *                 prefix: Prefix
 *                 prefix_sign: Prefix Sign
 *                 country_name: Country Name
 *                 createdAt: '2024-02-28T00:00:00.000Z'
 *                 updatedAt: '2024-02-28T00:00:00.000Z'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Currency not found
 *       '500':
 *         description: Internal server error
 *   delete:
 *     summary: Delete currency master record by ID
 *     tags: [CurrencyMaster]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Currency ID
 *         required: true
 *         schema:
 *           type: integer
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Currency record deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Currency record deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Currency not found
 *       '500':
 *         description: Internal server error
 * /api/currencymaster/search/{fieldName}/{fieldValue}:
 *   get:
 *     summary: Search currency master records by field name and value
 *     tags: [CurrencyMaster]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fieldName
 *         description: Name of the field to search by
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: fieldValue
 *         description: Value of the field to search by
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Currency records fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Currency records fetched successfully
 *               data:
 *                 - id: 1
 *                   name: Currency Name
 *                   prefix: Prefix
 *                   prefix_sign: Prefix Sign
 *                   country_name: Country Name
 *                   createdAt: '2024-02-28T00:00:00.000Z'
 *                   updatedAt: '2024-02-28T00:00:00.000Z'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Currency not found
 *       '500':
 *         description: Internal server error
 * /api/citymaster:
 *   post:
 *     summary: Create a new city master record
 *     tags: [CityMaster]
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
 *               state_id:
 *                 type: integer
 *             required:
 *               - name
 *               - state_id
 *     responses:
 *       '201':
 *         description: City record created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: City record created successfully
 *               data:
 *                 id: 1
 *                 name: City Name
 *                 state_id: 1
 *                 createdAt: '2024-02-28T00:00:00.000Z'
 *                 updatedAt: '2024-02-28T00:00:00.000Z'
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 *   get:
 *     summary: Get all city master records
 *     tags: [CityMaster]
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
 *         description: City records fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: City records fetched successfully
 *               data:
 *                 - id: 1
 *                   name: City Name
 *                   state_id: 1
 *                   createdAt: '2024-02-28T00:00:00.000Z'
 *                   updatedAt: '2024-02-28T00:00:00.000Z'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 * /api/citymaster/{id}:
 *   get:
 *     summary: Get city master record by ID
 *     tags: [CityMaster]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: City ID
 *         required: true
 *         schema:
 *           type: integer
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: City record fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: City record fetched successfully
 *               data:
 *                 id: 1
 *                 name: City Name
 *                 state_id: 1
 *                 createdAt: '2024-02-28T00:00:00.000Z'
 *                 updatedAt: '2024-02-28T00:00:00.000Z'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: City not found
 *       '500':
 *         description: Internal server error
 *   put:
 *     summary: Update city master record by ID
 *     tags: [CityMaster]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: City ID
 *         required: true
 *         schema:
 *           type: integer
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               state_id:
 *                 type: integer
 *             required:
 *               - name
 *               - state_id
 *     responses:
 *       '200':
 *         description: City record updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: City record updated successfully
 *               data:
 *                 id: 1
 *                 name: City Name
 *                 state_id: 1
 *                 createdAt: '2024-02-28T00:00:00.000Z'
 *                 updatedAt: '2024-02-28T00:00:00.000Z'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: City not found
 *       '500':
 *         description: Internal server error
 *   delete:
 *     summary: Delete city master record by ID
 *     tags: [CityMaster]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: City ID
 *         required: true
 *         schema:
 *           type: integer
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: City record deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: City record deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: City not found
 *       '500':
 *         description: Internal server error
 * /api/citymaster/search/{fieldName}/{fieldValue}:
 *   get:
 *     summary: Search city master records by field name and value
 *     tags: [CityMaster]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fieldName
 *         description: Name of the field to search by
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: fieldValue
 *         description: Value of the field to search by
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: City records fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: City records fetched successfully
 *               data:
 *                 - id: 1
 *                   name: City Name
 *                   state_id: 1
 *                   createdAt: '2024-02-28T00:00:00.000Z'
 *                   updatedAt: '2024-02-28T00:00:00.000Z'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: City not found
 *       '500':
 *         description: Internal server error
 * /api/statemaster:
 *   post:
 *     summary: Create a new state master record
 *     tags: [StateMaster]
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
 *               country_id:
 *                 type: integer
 *             required:
 *               - name
 *               - country_id
 *     responses:
 *       '201':
 *         description: State record created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: State record created successfully
 *               data:
 *                 id: 1
 *                 name: State Name
 *                 country_id: 1
 *                 createdAt: '2024-02-28T00:00:00.000Z'
 *                 updatedAt: '2024-02-28T00:00:00.000Z'
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 *   get:
 *     summary: Get all state master records
 *     tags: [StateMaster]
 *     security:
 *       - bearerAuth: []
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
 *     responses:
 *       '200':
 *         description: State records fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: State records fetched successfully
 *               data:
 *                 - id: 1
 *                   name: State Name
 *                   country_id: 1
 *                   createdAt: '2024-02-28T00:00:00.000Z'
 *                   updatedAt: '2024-02-28T00:00:00.000Z'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 * /api/statemaster/{id}:
 *   get:
 *     summary: Get state master record by ID
 *     tags: [StateMaster]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: State ID
 *         required: true
 *         schema:
 *           type: integer
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: State record fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: State record fetched successfully
 *               data:
 *                 id: 1
 *                 name: State Name
 *                 country_id: 1
 *                 createdAt: '2024-02-28T00:00:00.000Z'
 *                 updatedAt: '2024-02-28T00:00:00.000Z'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: State not found
 *       '500':
 *         description: Internal server error
 *   put:
 *     summary: Update state master record by ID
 *     tags: [StateMaster]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: State ID
 *         required: true
 *         schema:
 *           type: integer
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               country_id:
 *                 type: integer
 *             required:
 *               - name
 *               - country_id
 *     responses:
 *       '200':
 *         description: State record updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: State record updated successfully
 *               data:
 *                 id: 1
 *                 name: State Name
 *                 country_id: 1
 *                 createdAt: '2024-02-28T00:00:00.000Z'
 *                 updatedAt: '2024-02-28T00:00:00.000Z'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: State not found
 *       '500':
 *         description: Internal server error
 *   delete:
 *     summary: Delete state master record by ID
 *     tags: [StateMaster]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: State ID
 *         required: true
 *         schema:
 *           type: integer
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: State record deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: State record deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: State not found
 *       '500':
 *         description: Internal server error
 * /api/statemaster/search/{fieldName}/{fieldValue}:
 *   get:
 *     summary: Search state master records by field name and value
 *     tags: [StateMaster]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fieldName
 *         description: Name of the field to search by
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: fieldValue
 *         description: Value of the field to search by
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: State records fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: State records fetched successfully
 *               data:
 *                 - id: 1
 *                   name: State Name
 *                   country_id: 1
 *                   createdAt: '2024-02-28T00:00:00.000Z'
 *                   updatedAt: '2024-02-28T00:00:00.000Z'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: State not found
 *       '500':
 *         description: Internal server error
 * /api/countrymaster:
 *   post:
 *     summary: Create a new country master record
 *     tags: [CountryMaster]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *         - in: header
 *           name: x-access-token
 *           description: Access token for authentication
 *           required: true
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               currency_id:
 *                 type: integer
 *             required:
 *               - name
 *               - currency_id
 *     responses:
 *       '201':
 *         description: Country record created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Country record created successfully
 *               data:
 *                 id: 1
 *                 name: Country Name
 *                 currency_id: 1
 *                 createdAt: '2024-02-28T00:00:00.000Z'
 *                 updatedAt: '2024-02-28T00:00:00.000Z'
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 *   get:
 *     summary: Get all country master records
 *     tags: [CountryMaster]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *         - in: header
 *           name: x-access-token
 *           description: Access token for authentication
 *           required: true
 *           type: string
 *     responses:
 *       '200':
 *         description: Country records fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Country records fetched successfully
 *               data:
 *                 - id: 1
 *                   name: Country Name
 *                   currency_id: 1
 *                   createdAt: '2024-02-28T00:00:00.000Z'
 *                   updatedAt: '2024-02-28T00:00:00.000Z'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 * /api/countrymaster/{id}:
 *   get:
 *     summary: Get country master record by ID
 *     tags: [CountryMaster]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Country ID
 *         required: true
 *         schema:
 *           type: integer
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Country record fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Country record fetched successfully
 *               data:
 *                 id: 1
 *                 name: Country Name
 *                 currency_id: 1
 *                 createdAt: '2024-02-28T00:00:00.000Z'
 *                 updatedAt: '2024-02-28T00:00:00.000Z'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Country not found
 *       '500':
 *         description: Internal server error
 *   put:
 *     summary: Update country master record by ID
 *     tags: [CountryMaster]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Country ID
 *         required: true
 *         schema:
 *           type: integer
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               currency_id:
 *                 type: integer
 *             required:
 *               - name
 *               - currency_id
 *     responses:
 *       '200':
 *         description: Country record updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Country record updated successfully
 *               data:
 *                 id: 1
 *                 name: Country Name
 *                 currency_id: 1
 *                 createdAt: '2024-02-28T00:00:00.000Z'
 *                 updatedAt: '2024-02-28T00:00:00.000Z'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Country not found
 *       '500':
 *         description: Internal server error
 *   delete:
 *     summary: Delete country master record by ID
 *     tags: [CountryMaster]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Country ID
 *         required: true
 *         schema:
 *           type: integer
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Country record deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Country record deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Country not found
 *       '500':
 *         description: Internal server error
 * /api/countrymaster/search/{fieldName}/{fieldValue}:
 *   get:
 *     summary: Search country master records by field name and value
 *     tags: [CountryMaster]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fieldName
 *         description: Name of the field to search by
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: fieldValue
 *         description: Value of the field to search by
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Country records fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Country records fetched successfully
 *               data:
 *                 - id: 1
 *                   name: Country Name
 *                   currency_id: 1
 *                   createdAt: '2024-02-28T00:00:00.000Z'
 *                   updatedAt: '2024-02-28T00:00:00.000Z'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Country not found
 *       '500':
 *         description: Internal server error
 */
