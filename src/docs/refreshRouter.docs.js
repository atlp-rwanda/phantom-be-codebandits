/**
 * @openapi
 * tags:
 *  name: Authentication
 *  description: Routes for authentication
 */

/**
 * @swagger
 * /api/v1/accounts/refresh:
 *  get:
 *      summary: Get a new token
 *      description: The user can get a new token when the first one expires
 *      tags:
 *          - Refresh
 *      responses:
 *          200:
 *              description: successfully logged out
 */
