/**
 * @openapi
 * tags:
 *  name: Accounts
 *  description: Routes for authentication and account management
 */

/**
 * @swagger
 * /api/v1/accounts/login:
 *  post:
 *      summary: Login into phantom
 *      description: The user is able to login into phantom
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
 *                          password:
 *                              required: true
 *                              type: string
 *                              example: 1234
 *
 *      responses:
 *          200:
 *              description: Login is successful
 *          404:
 *              description: User does not exist
 *          400:
 *              description: Wrong email or password
 */

/**
 * @swagger
 * /api/v1/accounts/logout:
 *  get:
 *      summary: Logout from phantom
 *      description: The
 *      tags:
 *          - Accounts
 *      responses:
 *          200:
 *              description: successfully logged out
 */
