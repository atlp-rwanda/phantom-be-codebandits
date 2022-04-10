/**
 * @openapi
 * tags:
 *  name: Authentication
 *  description: Routes for authentication
 */

/**
 * @swagger
 * /api/v1/accounts/login:
 *  post:
 *      summary: Login into phantom
 *      description: The user is able to login into phantom
 *      tags:
 *          - Login
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
 *              description: login is successful
 *          404:
 *              description: user does not exist
 *          400:
 *              description: wrong email or password
 */
