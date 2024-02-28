/**
 * @swagger
 * tags:
 *   name: Business
 *   description: API for managing business information
 * components:
 *   schemas:
 *     Business:
 *       type: object
 *       properties:
 *         company_name:
 *           type: string
 *         document:
 *           type: string
 *         is_active:
 *           type: integer
 *         document_name:
 *           type: string
 *         document_number:
 *           type: string
 *         file_location:
 *           type: string
 *         file_name:
 *           type: string
 *         id:
 *           type: string
 *     BusinessInput:
 *       type: object
 *       properties:
 *         company_name:
 *           type: string
 *         document:
 *           type: string
 *         is_active:
 *           type: integer
 *         document_name:
 *           type: string
 *         document_number:
 *           type: string
 *         file_location:
 *           type: string
 *         file_name:
 *           type: string
 * paths:
 *   /api/business/{id}:
 *     get:
 *       summary: Get business by ID
 *       tags: [Business]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: Business ID
 *           schema:
 *             type: string
 *       security:
 *         - api_key: []
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 company_name: TIN
 *                 document: N/A
 *                 is_active: 1
 *                 document_name: CIN
 *                 document_number: '1111111'
 *                 file_location: ''
 *                 file_name: TCS.exc
 *                 id: '28'
 *         '404':
 *           description: Business not found
 *         '500':
 *           description: Some server error
 *     post:
 *       summary: Create a new business
 *       tags: [Business]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: Business ID (auto-generated)
 *           schema:
 *             type: string
 *       security:
 *         - api_key: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BusinessInput'
 *       responses:
 *         '201':
 *           description: Business created successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Business created successfully
 *         '400':
 *           description: Bad request
 *         '500':
 *           description: Some server error
 *   
 *   /api/business/search/{fieldName}/{fieldValue}:
 *     get:
 *       summary: Get business by field value and field name
 *       tags: [Business]
 *     description: "Search for business records based on a field name and field value." 
 *     parameters: 
 *       - name: fieldName 
 *         in: path 
 *         description: "Name of the field to search by" 
 *         required: true 
 *         schema: 
 *           type: string 
 *       - name: fieldValue 
 *         in: path 
 *         description: "Value of the field to search for" 
 *         required: true 
 *         schema: 
 *           type: string 
 *     responses: 
 *       '200': 
 *         description: "Successful response" 
 *         content: 
 *           application/json: 
 *             schema: 
 *               type: object 
 *               properties: 
 *                 message: 
 *                   type: string 
 *                   example: "Fetched Records" 
 *                 data: 
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/BusinessDetail" 
 *       '400': 
 *         description: "Invalid field name or bad request" 
 *         content: 
 *           application/json: 
 *             schema: 
 *               type: object 
 *               properties: 
 *                 error: 
 *                   type: string 
 *                   example: "Invalid field name" 
 *       '404': 
 *         description: "No record found" 
 *         content: 
 *           application/json: 
 *             schema: 
 *               type: object 
 *               properties: 
 *                 error: 
 *                   type: string 
 *                   example: "No record found" 
 *       '500': 
 *         description: "Internal Server Error"
 *         content: 
 *           application/json: 
 *             schema: 
 *               type: object 
 *               properties: 
 *                 error: 
 *                   type: string 
 */
