/**
 * @openapi
 * tags:
 *  name: Users
 *  description: Routes for the user App
 */

/**
 * @swagger
 * /api/v1/users:
 *  get:
 *      security:
 *         - Token: []
 *      summary: Get all users from the database
 *      description: Expect a list of all users in the database
 *      tags:
 *          - Users
 *      responses:
 *          200:
 *              description: Return all users from the database
 */

/**
 * @swagger
 * /api/v1/users:
 *  post:
 *      summary: Get all users from the database
 *      description: Expect a list of all users in the database
 *      tags:
 *          - Users
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *
 *                          firstName:
 *                              required: true
 *                              type: string
 *                              example: Fabrice
 *                          lastName:
 *                              required: true
 *                              type: string
 *                              example: Ivad
 *                          email:
 *                              required: true
 *                              type: string
 *                              example: test@me.com
 *                          password:
 *                              required: true
 *                              type: string
 *                              example: Andela@1234
 *                          role:
 *                              required: true
 *                              type: string
 *                              example: operator
 *
 *      responses:
 *          201:
 *              description: Return a created user
 *          400:
 *              description: Invalid request or duplicate data has been found
 *          409:
 *              $ref: "#/components/responses/conflictResponse"
 */
