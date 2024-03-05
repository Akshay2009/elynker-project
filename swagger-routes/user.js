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
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
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
 *         - name: x-access-token
 *           in: header
 *           description: Access token for authentication
 *           required: true
 *           schema:
 *             type: string
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
 *         '401':
 *           description: Unauthorized - Access token is missing or invalid
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
 *         - name: x-access-token
 *           in: header
 *           description: Access token for authentication
 *           required: true
 *           schema:
 *             type: string
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
 *         '401':
 *           description: Unauthorized - Access token is missing or invalid
 *         '404':
 *           description: User not found
 *         '500':
 *           description: Some server error
 *     delete:
 *       summary: Delete user by ID
 *       tags: [Users]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: User ID
 *           schema:
 *             type: integer
 *         - name: x-access-token
 *           in: header
 *           description: Access token for authentication
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 message: User deleted successfully
 *         '401':
 *           description: Unauthorized - Access token is missing or invalid
 *         '404':
 *           description: User not found
 *         '500':
 *           description: Some server error
 *   /api/users/search/{fieldName}/{fieldValue}:
 *     get:
 *       summary: Search user details by fieldName and fieldValue
 *       tags: [Users]
 *       parameters:
 *         - name: fieldName
 *           in: path
 *           required: true
 *           description: Field name to search
 *           schema:
 *             type: string
 *         - name: fieldValue
 *           in: path
 *           required: true
 *           description: Field value to search
 *           schema:
 *             type: string
 *         - name: x-access-token
 *           in: header
 *           description: Access token for authentication
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 message: Fetched Records
 *                 data:
 *                   - id: 1
 *                     email: gourav@gmail.com
 *                     name: Gaurav
 *                     city: Lucknow
 *                     country_code: +91
 *                     mobile_number: '1114441111'
 *                     created_by: null
 *                     updated_by: null
 *                     createdAt: '2024-01-16T14:03:40.727Z'
 *                     updatedAt: '2024-01-16T14:03:40.727Z'
 *         '401':
 *           description: Unauthorized - Access token is missing or invalid
 *         '404':
 *           description: No record found
 *         '500':
 *           description: Some server error
 *   /api/users:
 *     get:
 *       summary: Get all user details
 *       tags: [Users]
 *       parameters:
 *         - name: x-access-token
 *           in: header
 *           description: Access token for authentication
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 message: Details fetched successfully
 *                 data:
 *                   - id: 1
 *                     email: gourav@gmail.com
 *                     name: Gaurav
 *                     city: Lucknow
 *                     country_code: +91
 *                     mobile_number: '1114441111'
 *                     created_by: null
 *                     updated_by: null
 *                     createdAt: '2024-01-16T14:03:40.727Z'
 *                     updatedAt: '2024-01-16T14:03:40.727Z'
 *         '401':
 *           description: Unauthorized - Access token is missing or invalid
 *         '404':
 *           description: Details not found
 *         '500':
 *           description: Some server error
 *   /api/admin/users:
 *       post:
 *         summary: Create a new user by admin with roles
 *         tags: [Users]
 *         parameters:
 *           - name: x-access-token
 *             in: header
 *             description: Access token for authentication
 *             required: true
 *             schema:
 *               type: string
 *         requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *             roles:
 *                 'CFO' 
 *         responses:
 *           '201':
 *             description: User created successfully
 *             content:
 *               application/json:
 *                 example:
 *                   message: User Created By Admin
 *                   user:
 *                     id: 1
 *                     email: gourav@gmail.com
 *                     name: Gaurav
 *                     city: Lucknow
 *                     country_code: +91
 *                     mobile_number: '1114441111'
 *                     created_by: null
 *                     updated_by: null
 *                     createdAt: '2024-01-16T14:03:40.727Z'
 *                     updatedAt: '2024-01-16T14:03:40.727Z'
 *                   roles: 
 *                     - ROLE_ADMIN
 *                     - ROLE_USER  # Example roles
 *           '400':
 *             description: Role Not Given or Error in creating user by admin
 *           '404':
 *             description: No Roles Found
 *           '401':
 *             description: Unauthorized - Access token is missing or invalid
 *           '500':
 *             description: Internal Server Error
 *   /api/admin/users/{id}:
 *         put:
 *           summary: Update user by admin by ID
 *           tags: [Users]
 *           parameters:
 *             - name: id
 *               in: path
 *               required: true
 *               description: User ID
 *               schema:
 *                 type: integer
 *             - name: x-access-token
 *               in: header
 *               description: Access token for authentication
 *               required: true
 *               schema:
 *                 type: string
 *           requestBody:
 *             required: true
 *             content:
 *               application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/User'
 *           responses:
 *             '200':
 *               description: Successful update
 *               content:
 *                 application/json:
 *                   example:
 *                     message: User Updated By Admin
 *                     user:
 *                       id: 1
 *                       email: gourav@gmail.com
 *                       name: Gaurav
 *                       city: Lucknow
 *                       country_code: +91
 *                       mobile_number: '1114441111'
 *                       created_by: null
 *                       updated_by: null
 *                       createdAt: '2024-01-16T14:03:40.727Z'
 *                       updatedAt: '2024-01-16T14:03:40.727Z'
 *                     roles: 
 *                       - ROLE_ADMIN
 *                       - ROLE_USER  # Example roles
 *             '400':
 *               description: No User Found with provided ID or Error in updating user by admin
 *             '404':
 *               description: No Roles Found
 *             '401':
 *               description: Unauthorized - Access token is missing or invalid
 *             '500':
 *               description: Internal Server Error
 *         delete:
 *           summary: Delete user by admin by ID
 *           tags: [Users]
 *           parameters:
 *             - name: id
 *               in: path
 *               required: true
 *               description: User ID
 *               schema:
 *                 type: integer
 *             - name: x-access-token
 *               in: header
 *               description: Access token for authentication
 *               required: true
 *               schema:
 *                 type: string
 *           responses:
 *             '200':
 *               description: Successful response
 *               content:
 *                 application/json:
 *                   example:
 *                     message: User Deleted by Admin
 *                     user:
 *                       id: 1
 *                       email: gourav@gmail.com
 *                       name: Gaurav
 *                       city: Lucknow
 *                       country_code: +91
 *                       mobile_number: '1114441111'
 *                       created_by: null
 *                       updated_by: null
 *                       createdAt: '2024-01-16T14:03:40.727Z'
 *                       updatedAt: '2024-01-16T14:03:40.727Z'
 *             '400':
 *               description: No User with the ID present
 *             '401':
 *               description: Unauthorized - Access token is missing or invalid
 *             '500':
 *               description: Internal Server Error
 */
