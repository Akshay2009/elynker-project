/**
 * @swagger
 * tags:
 *   name: Resume
 *   description: API for managing resumes
 * components:
 *   schemas:
 *     Resume:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         freelancer_resume:
 *           type: string
 *         registrationId:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * paths:
 *   /api/resume/{registrationId}:
 *     post:
 *       summary: Upload a resume for a registration
 *       tags: [Resume]
 *       parameters:
 *         - in: path
 *           name: registrationId
 *           description: ID of the registration
 *           required: true
 *           type: integer
 *         - in: header
 *           name: x-access-token
 *           description: Access token for authentication
 *           required: true
 *           type: string
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 resume:
 *                   type: string
 *                   format: binary
 *       responses:
 *         '201':
 *           description: Resume uploaded successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Resume Uploaded Successfully
 *                 data:
 *                   id: 1
 *                   freelancer_resume: resume.pdf
 *                   registrationId: 1
 *                   createdAt: '2024-02-28T00:00:00.000Z'
 *                   updatedAt: '2024-02-28T00:00:00.000Z'
 *         '400':
 *           description: Bad request
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Registration not found
 *         '500':
 *           description: Internal server error
 *     get:
 *       summary: Get all resumes associated with a registration
 *       tags: [Resume]
 *       parameters:
 *         - in: path
 *           name: registrationId
 *           description: ID of the registration
 *           required: true
 *           type: integer
 *         - in: header
 *           name: x-access-token
 *           description: Access token for authentication
 *           required: true
 *           type: string
 *       responses:
 *         '200':
 *           description: Resumes fetched successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: resume details fetched successfully
 *                 data:
 *                   - id: 1
 *                     freelancer_resume: resume.pdf
 *                     registrationId: 1
 *                     createdAt: '2024-02-28T00:00:00.000Z'
 *                     updatedAt: '2024-02-28T00:00:00.000Z'
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: No Resume found with this Registration ID
 *         '500':
 *           description: Internal server error
 *   /api/resume/{resume_id}:
 *     delete:
 *       summary: Delete a resume by ID
 *       tags: [Resume]
 *       parameters:
 *         - in: path
 *           name: resume_id
 *           description: ID of the resume
 *           required: true
 *           type: integer
 *         - in: header
 *           name: x-access-token
 *           description: Access token for authentication
 *           required: true
 *           type: string
 *       responses:
 *         '200':
 *           description: Resume deleted successfully
 *           content:
 *             application/json:
 *               example:
 *                 success: Resume deleted successfully!
 *                 data:
 *                   id: 1
 *                   freelancer_resume: resume.pdf
 *                   registrationId: 1
 *                   createdAt: '2024-02-28T00:00:00.000Z'
 *                   updatedAt: '2024-02-28T00:00:00.000Z'
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Resume not found
 *         '500':
 *           description: Internal server error
 *   /api/resume/:
 *     get:
 *       summary: Get all resumes
 *       tags: [Resume]
 *       parameters:
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
 *       responses:
 *         '200':
 *           description: Resumes fetched successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: resume details fetched successfully
 *                 data:
 *                   - id: 1
 *                     freelancer_resume: resume.pdf
 *                     registrationId: 1
 *                     createdAt: '2024-02-28T00:00:00.000Z'
 *                     updatedAt: '2024-02-28T00:00:00.000Z'
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: No Resumes found
 *         '500':
 *           description: Internal server error
 *   /api/freelancer/resume/{resume_id}:
 *     get:
 *       summary: Get a resume by ID
 *       tags: [Resume]
 *       parameters:
 *         - in: path
 *           name: resume_id
 *           description: ID of the resume
 *           required: true
 *           type: integer
 *         - in: header
 *           name: x-access-token
 *           description: Access token for authentication
 *           required: true
 *           type: string
 *       responses:
 *         '200':
 *           description: Resume fetched successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: resume details fetched successfully
 *                 data:
 *                   id: 1
 *                   freelancer_resume: resume.pdf
 *                   registrationId: 1
 *                   createdAt: '2024-02-28T00:00:00.000Z'
 *                   updatedAt: '2024-02-28T00:00:00.000Z'
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: No Resumes found with this ID
 *         '500':
 *           description: Internal server error
 *   /api/freelancer/resume/search/{fieldName}/{fieldValue}:
 *     get:
 *       summary: Search resumes by field name and value
 *       tags: [Resume]
 *       parameters:
 *         - in: path
 *           name: fieldName
 *           description: Field name to search
 *           required: true
 *           type: string
 *         - in: path
 *           name: fieldValue
 *           description: Field value to search
 *           required: true
 *           type: string
 *         - in: header
 *           name: x-access-token
 *           description: Access token for authentication
 *           required: true
 *           type: string
 *       responses:
 *         '200':
 *           description: Resumes fetched successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Fetched Records
 *                 data:
 *                   - id: 1
 *                     freelancer_resume: resume.pdf
 *                     registrationId: 1
 *                     createdAt: '2024-02-28T00:00:00.000Z'
 *                     updatedAt: '2024-02-28T00:00:00.000Z'
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: No record found
 *         '500':
 *           description: Internal server error
 */
