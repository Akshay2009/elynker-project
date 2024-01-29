/**
 * @swagger
 * tags:
 *   name: Registration
 *   description: API for managing user registration
 * components:
 *   schemas:
 *     Registration:
 *       type: object
 *       properties:
 *         ip_address:
 *           type: string
 *         registration_type:
 *           type: string
 *         dob:
 *           type: string
 *         latitude:
 *           type: number
 *         longitude:
 *           type: number
 *         steps_completed:
 *           type: integer
 *         active_steps:
 *           type: integer
 *         address1:
 *           type: string
 *         address2:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         country:
 *           type: string
 *         education:
 *           type: string
 *         available_hrs_per_week:
 *           type: integer
 *         hourly_rate:
 *           type: number
 *         service_fee:
 *           type: number
 *         currency_id:
 *           type: integer
 *         created_by:
 *           type: string
 *         updated_by:
 *           type: string
 *         id:
 *           type: string
 *
 *     RegistrationInput:
 *       type: object
 *       properties:
 *         ip_address:
 *           type: string
 *         registration_type:
 *           type: string
 *         dob:
 *           type: string
 *         latitude:
 *           type: number
 *         longitude:
 *           type: number
 *         steps_completed:
 *           type: integer
 *         active_steps:
 *           type: integer
 *         address1:
 *           type: string
 *         address2:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         country:
 *           type: string
 *         education:
 *           type: string
 *         available_hrs_per_week:
 *           type: integer
 *         hourly_rate:
 *           type: number
 *         service_fee:
 *           type: number
 *         currency_id:
 *           type: integer
 *         created_by:
 *           type: string
 *         updated_by:
 *           type: string
 *
 * paths:
 *   /api/registration/{reg_id}:
 *     put:
 *       summary: Update Registration Record
 *       tags: [Registration]
 *       parameters:
 *         - name: reg_id
 *           in: path
 *           required: true
 *           description: Registration ID
 *           schema:
 *             type: string
 *       security:
 *         - api_key: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistrationInput'
 *       responses:
 *         '200':
 *           description: Registration record updated successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Registration record updated successfully
 *                 updatedRegistration:
 *                   id: '123'
 *                   ip_address: '127.0.0.1'
 *                   registration_type: 'user'
 *                   dob: '1990-01-01'
 *                   latitude: 40.7128
 *                   longitude: -74.0060
 *                   steps_completed: 3
 *                   active_steps: 2
 *                   address1: '123 Main St'
 *                   address2: 'Apt 4'
 *                   city: 'City'
 *                   state: 'State'
 *                   country: 'Country'
 *                   education: 'Graduate'
 *                   available_hrs_per_week: 40
 *                   hourly_rate: 25.5
 *                   service_fee: 5.0
 *                   currency_id: 1
 *                   created_by: 'user123'
 *                   updated_by: 'user456'
 *         '404':
 *           description: Registration record not found
 *         '500':
 *           description: Internal Server Error
 *  */
