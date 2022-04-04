/**
 * @swagger
 * /api/v1/accounts/forgot-password:
 *  post:
 *      summary: send a registered email to receive a reset password token
 *      description: Reset password link must be sent to your email when valid. If you are in local check the logs for email
 *      tags:
 *          - Accounts
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          email:
 *                              required: true
 *                              type: string
 *                              example: test@me.com
 *
 *      responses:
 *          200:
 *              description: Link sent to your email
 *          400:
 *              description: Invalid email
 *          500:
 *              description: Internal server error
 */

/**
 * @swagger
 * /api/v1/accounts/reset-password/{token}:
 *  get:
 *      summary: Check if reset token is valid
 *      description: You must provide a token verify the validity
 *      tags:
 *          - Accounts
 *      parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: A valid token provided with email
 *
 *      responses:
 *          200:
 *              description: The token is valid with a token and a valid message
 *          400:
 *              description: The token was found and deleted as it was expired
 *          404:
 *              description: The token was not found
 *          500:
 *              description: Internal server error
 */

/**
 * @swagger
 * /api/v1/accounts/reset-password/{token}:
 *  post:
 *      summary: Reset your password
 *      description: You must provide a valid token to reset your password
 *      tags:
 *          - Accounts
 *      parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: A valid token provided with email
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          password:
 *                              required: true
 *                              type: string
 *                              example: Password@123
 *      responses:
 *          200:
 *              description: Your password successfully reset
 *          400:
 *              description: The password received was not valid
 *          404:
 *              description: Request not found
 *          500:
 *              description: Internal server error
 */
