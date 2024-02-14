/**
 * @swagger
 * tags:
 *   name: Freelancer Resume
 *   description: Operations related to Freelancer Resume management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FreelancerResume:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID of the freelancer resume
 *         freelancer_resume:
 *           type: string
 *           description: Filename of the freelancer resume
 *         registrationId:
 *           type: integer
 *           description: ID of the registration associated with the freelancer resume
 *     NewFreelancerResume:
 *       type: object
 *       properties:
 *         resume:
 *           type: string
 *           format: binary
 *           description: Resume file for the freelancer
 */

/**
 * @swagger
 * /api/resume/{registrationId}:
 *   post:
 *     summary: Upload a freelancer resume
 *     tags: [Freelancer Resume]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: registrationId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the registration associated with the freelancer resume
 *     requestBody:
 *       description: Data for uploading a freelancer resume
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/NewFreelancerResume'
 *     responses:
 *       200:
 *         description: Resume uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FreelancerResume'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Registration not found or not of freelancer type
 *       500:
 *         description: Internal Server Error
 *
 *   get:
 *     summary: Get freelancer resumes by registration ID
 *     tags: [Freelancer Resume]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: registrationId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the registration
 *     responses:
 *       200:
 *         description: Freelancer resumes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FreelancerResume'
 *       404:
 *         description: No resumes found for the provided registration ID
 *       500:
 *         description: Internal Server Error
 *
 * /api/resume/{resume_id}:
 *   delete:
 *     summary: Delete freelancer resume by ID
 *     tags: [Freelancer Resume]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: resume_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the freelancer resume to delete
 *     responses:
 *       200:
 *         description: Freelancer resume deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FreelancerResume'
 *       404:
 *         description: Freelancer resume not found
 *       500:
 *         description: Internal Server Error
 */
