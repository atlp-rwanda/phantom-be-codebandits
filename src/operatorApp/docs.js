/**
 * @openapi
 * tags:
 *  name: Operators
 *  description: Routes for the operators app
 */

// Security Schemes
/**
 * @openapi
 * components:
 *  securitySchemes:
 *    Token:
 *      type: http
 *      scheme: Bearer
 *      bearerFormat: JWT
 *      required: true
 */

// -------------------//-------------------//

/**
 * @swagger
 * /api/v1/operators:
 *  post:
 *      security:
 *         - Token: []
 *      summary: Add a new operator in the database
 *      description: this request will take in operator info to be created and add the operator to the database or return specific error
 *      tags:
 *          - Operators
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Operator"
 *      responses:
 *          201:
 *              description: Return a created operator
 *          400:
 *              description: Invalid request or duplicate data has been found
 *          409:
 *              description: User with provided email already exist in the database
 *
 */

/**
 * @swagger
 * /api/v1/operators:
 *  get:
 *      security:
 *         - Token: []
 *      summary: Get all operators from the database
 *      description: Expect a list of operators users in the database
 *      tags:
 *         - Operators
 *      responses:
 *          200:
 *              description: Return all users from the database
 */

/**
 * @swagger
 * /api/v1/operators/{id}:
 *  get:
 *      security:
 *         - Token: []
 *      summary: Get a single operators from the database
 *      description: Expect an object of a single operator from the database
 *      tags:
 *         - Operators
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: A valid operator id.
 *      responses:
 *          200:
 *              description: Return an existing operator
 *          401:
 *              description: Missing or invalid access token
 *          404:
 *              description: Operator was not found in the database
 *          500:
 *              description: Return all users from the database
 */

/**
 * @swagger
 * /api/v1/operators/{id}:
 *  put:
 *      security:
 *         - Token: []
 *      summary: edit registered operator information in the database
 *      description: this request will take in operator info to be created and add the operator to the database or return specific error
 *      tags:
 *          - Operators
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: A valid operator id.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Operator"
 *      responses:
 *          201:
 *              description: Return a created operator
 *          400:
 *              description: Invalid request or duplicate data has been found
 *          401:
 *              description: Missing or invalid token
 *          409:
 *              description: User with provided email already exist in the database
 *
 */

/**
 * @swagger
 * /api/v1/operators/{id}:
 *  delete:
 *      security:
 *         - Token: []
 *      summary: delete a operator from the database
 *      description: This request will require a operator id and
 *      tags:
 *          - Operators
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: A valid operator id.
 *      responses:
 *          201:
 *              description: Return a success when a operator is deleted
 *          401:
 *              description: Invalid or missing accessToken
 *          404:
 *              description: Operator was not found in the database
 *          500:
 *              description: Something went wrong on the server
 *
 */

/**
 * @swagger
 * components:
 *     schemas:
 *         Operator:
 *             type: object
 *             properties:
 *                 firstName:
 *                     required: true
 *                     type: string
 *                     example: Fabrice
 *                 lastName:
 *                     required: true
 *                     type: string
 *                     example: Ivad
 *                 email:
 *                     required: true
 *                     type: string
 *                     example: test@me.com
 *                 password:
 *                     required: true
 *                     type: string
 *                     example: Password@123
 *                 mobileNumber:
 *                     required: true
 *                     type: string
 *                     example: "0788352746"
 *                 company:
 *                     required: true
 *                     type: string
 *                     example: Kigali Bus Services
 *                 address:
 *                     required: true
 *                     type: string
 *                     example: Kabuga, Kigali
 *                 nationalID:
 *                     required: true
 *                     type: string
 *                     example: 1200080081691164
 *
 */
