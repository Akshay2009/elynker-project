/**
 * @swagger
 * tags:
 *   name: Registration
 *   description: Registration related operations
 *
 * /api/registration/{reg_id}:
 *   put:
 *     summary: Update registration details
 *     tags: [Registration]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: reg_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the registration to update
 *     requestBody:
 *       description: Registration details to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistrationUpdate'
 *     responses:
 *       200:
 *         description: Registration details updated successfully
 *       401:
 *         description: Unauthorized - Invalid token
 *       404:
 *         description: Registration not found
 *       500:
 *         description: Internal Server Error
 */

// Define the RegistrationUpdate schema in the components section
/**
 * @swagger
 * components:
 *   schemas:
 *     RegistrationUpdate:
 *       type: object
 *       properties:
 *         isActive:
 *           type: boolean
 *           description: Whether the registration is active
 *         ip_address:
 *           type: string
 *           description: IP address of the registration
 *         registration_type:
 *           type: integer
 *           description: Type of registration
 *         dob:
 *           type: string
 *           format: date
 *           description: Date of birth
 *         latitude:
 *           type: string
 *           description: Latitude
 *         longitude:
 *           type: string
 *           description: Longitude
 *         registration_status:
 *           type: integer
 *           description: Registration status
 *         registration_steps_completed:
 *           type: integer
 *           description: Number of registration steps completed
 *         city:
 *           type: string
 *           description: City
 *         address1:
 *           type: string
 *           description: Address line 1
 *         address2:
 *           type: string
 *           description: Address line 2
 *         state:
 *           type: string
 *           description: State
 *         country:
 *           type: string
 *           description: Country
 *         company_name:
 *           type: string
 *           description: Company name
 *         business_type:
 *           type: integer
 *           description: Type of business
 *         business_description:
 *           type: string
 *           description: Business description
 *         education:
 *           type: string
 *           description: Education details
 *         available_hrs_per_week:
 *           type: integer
 *           description: Available hours per week
 *         hourly_rate:
 *           type: number
 *           description: Hourly rate
 *         service_fee:
 *           type: number
 *           description: Service fee
 *         currency_id:
 *           type: integer
 *           description: Currency ID
 *         created_by:
 *           type: integer
 *           description: ID of the user who created the registration
 *         updated_by:
 *           type: integer
 *           description: ID of the user who updated the registration
 */
