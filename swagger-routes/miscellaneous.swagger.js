/**
 * @swagger
 * tags:
 *   name: Miscellaneous
 *   description: API endpoints for managing vendor records
 * definitions:
 *   Vendor:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       image_path:
 *         type: string
 *       isActive:
 *         type: boolean
 *       ip_address:
 *         type: string
 *       registration_type:
 *         type: integer
 *       dob:
 *         type: string
 *         format: date
 *       latitude:
 *         type: string
 *       longitude:
 *         type: string
 *       steps_completed:
 *         type: boolean
 *       active_steps:
 *         type: integer
 *       city:
 *         type: string
 *       address1:
 *         type: string
 *       address2:
 *         type: string
 *       state:
 *         type: string
 *       country:
 *         type: string
 *       company_name:
 *         type: string
 *       business_type:
 *         type: integer
 *       business_description:
 *         type: string
 *       education:
 *         type: string
 *       available_hrs_per_week:
 *         type: integer
 *       hourly_rate:
 *         type: number
 *       service_fee:
 *         type: number
 *       currency_id:
 *         type: integer
 *       cover_image:
 *         type: string
 *       category_ids:
 *         type: string
 *       freelancer_role:
 *         type: string
 *       freelancer_bio:
 *         type: string
 *       language:
 *         type: string
 *       about_company:
 *         type: string
 *       whatsapp_number:
 *         type: string
 *     required:
 *       - name
 *       - registration_type
 *       - city
 * /api/vendors/{type}/{location}:
 *   get:
 *     summary: Get vendors by type and location and categoryId
 *     tags: [Miscellaneous]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: type
 *         description: Vendor registration type
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: location
 *         description: Vendor location
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: x-access-token
 *         description: Access token for authentication
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: categoryId
 *         description: categoryId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: ratingMin
 *         description: ratingMin
 *         schema:
 *           type: float
 *       - in: query
 *         name: ratingMax
 *         description: ratingMax
 *         schema:
 *           type: float
 *     responses:
 *       '200':
 *         description: Vendors fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/Vendor'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: No vendors found
 *       '500':
 *         description: Internal server error
 */
