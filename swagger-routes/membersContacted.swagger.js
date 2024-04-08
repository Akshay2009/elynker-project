/**
 * @swagger
 * tags:
 *   name: MembersContacted
 *   description: API endpoints for managing members contacted records
 * definitions:
 *   MembersContacted:
 *     type: object
 *     properties:
 *       member_phone:
 *         type: string
 *       created_by:
 *         type: number
 *       updated_by:
 *         type: number
 *       registrationId:
 *         type: integer
 *     required:
 *       - member_phone
 *       - registrationId
 *   ErrorResponse:
 *     type: object
 *     properties:
 *       error:
 *         type: string
 *   SuccessResponse:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *       data:
 *         $ref: '#/definitions/MembersContacted'
 * /api/save/membersContacted:
 *   post:
 *     summary: Save or update members contacted record
 *     tags: [MembersContacted]
 *     parameters:
 *         - name: x-access-token
 *           in: header
 *           description: Access token for authentication
 *           required: true
 *           schema:
 *             type: string
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/MembersContacted'
 *     responses:
 *       '200':
 *         description: Members contacted record saved or updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/SuccessResponse'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Registration not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ErrorResponse'
 */
