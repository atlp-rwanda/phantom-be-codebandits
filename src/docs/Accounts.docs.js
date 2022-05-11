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
 *                              example: Andela@1234
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
 *      description: The user is able to logout from the account
 *      tags:
 *          - Accounts
 *      responses:
 *          200:
 *              description: successfully logged out
 */

/**
 * @swagger
 * /api/v1/accounts/refresh:
 *  get:
 *      summary: Get a new token
 *      description: The user can get a new token when the first one expires
 *      tags:
 *          - Accounts
 *      responses:
 *          200:
 *              description: successfully logged out
 */
/**
 * @swagger
 * /api/v1/accounts/profile:
 *  get:
 *      security:
 *         - Token: []
 *      summary: Retrive a profile for the logged in user
 *      description: The user gets a profile based on their role as well as assignements
 *      tags:
 *          - Accounts
 *      responses:
 *         200:
 *             $ref: "#/components/responses/successResponse"
 *         401:
 *             $ref: "#/components/responses/UnauthorizedError"
 *         404:
 *             $ref: "#/components/responses/notFound"
 *         500:
 *             $ref: "#/components/responses/serverError"
 */
