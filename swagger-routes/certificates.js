/**
 * @swagger
 * tags:
 *   name: Certificates
 *   description: Operations related to Certificate management
 */

/**
 * @swagger
 * /api/certificate/:
 *   post:
 *     summary: Create a new certificate
 *     tags: [Certificates]
 *     security:
 *       - jwt: []
 *     requestBody:
 *       description: Data for creating a new certificate
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCertificate'
 *     responses:
 *       201:
 *         description: Certificate created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Certificate'
 *       500:
 *         description: Internal Server Error

 *   get:
 *     summary: Get all certificates
 *     tags: [Certificates]
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: List of all certificates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Certificate'
 *       404:
 *         description: No certificates returned
 *       500:
 *         description: Internal Server Error

 * /api/certificate/{reg_id}:
 *   get:
 *     summary: Get certificate by registration ID
 *     tags: [Certificates]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: reg_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Registration ID of the certificate to retrieve
 *     responses:
 *       200:
 *         description: Certificate details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Certificate'
 *       404:
 *         description: Details not found
 *       500:
 *         description: Internal Server Error

 *   put:
 *     summary: Update certificate by ID
 *     tags: [Certificates]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: certificate_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the certificate to update
 *     requestBody:
 *       description: Data for updating the certificate
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCertificate'
 *     responses:
 *       200:
 *         description: Certificate record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Certificate'
 *       404:
 *         description: Certificate not found
 *       500:
 *         description: Internal Server Error
 */

// Define the components section with schemas for Certificate and NewCertificate
/**
 * @swagger
 * components:
 *   schemas:
 *     Certificate:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID of the certificate
 *         email:
 *           type: string
 *           description: Email of the certificate
 *         name:
 *           type: string
 *           description: Name of the certificate
 *         mobile_no:
 *           type: string
 *           description: Mobile number of the certificate
 *         otp:
 *           type: string
 *           description: OTP of the certificate
 *         created_by:
 *           type: string
 *           description: Created by user
 *         modified_by:
 *           type: string
 *           description: Modified by user
 *         registrationId:
 *           type: integer
 *           description: Registration ID associated with the certificate
 *
 *     NewCertificate:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Email of the certificate
 *         name:
 *           type: string
 *           description: Name of the certificate
 *         mobile_no:
 *           type: string
 *           description: Mobile number of the certificate
 *         otp:
 *           type: string
 *           description: OTP of the certificate
 *         created_by:
 *           type: string
 *           description: Created by user
 *         modified_by:
 *           type: string
 *           description: Modified by user
 *         registrationId:
 *           type: integer
 *           description: Registration ID associated with the certificate
 */
