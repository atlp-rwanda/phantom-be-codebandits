/**
 * @openapi
 * tags:
 *  name: Drivers
 *  description: Routes for the drivers app
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
 * /api/v1/drivers:
 *  post:
 *      security:
 *         - Token: []
 *      summary: Add a new driver in the database
 *      description: this request will take in driver info to be created and add the driver to the database or return specific error
 *      tags:
 *          - Drivers
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Driver"
 *      responses:
 *          201:
 *              description: Return a created driver
 *          400:
 *              description: Invalid request or duplicate data has been found
 *          409:
 *              description: User with provided email already exist in the database
 *
 */

/**
 * @swagger
 * /api/v1/drivers:
 *  get:
 *      security:
 *         - Token: []
 *      summary: Get all drivers from the database
 *      description: Expect a list of drivers users in the database
 *      tags:
 *         - Drivers
 *      responses:
 *          200:
 *              description: Return all users from the database
 */

/**
 * @swagger
 * /api/v1/drivers/{id}:
 *  get:
 *      security:
 *         - Token: []
 *      summary: Get a single drivers from the database
 *      description: Expect an object of a single driver from the database
 *      tags:
 *         - Drivers
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: A valid driver id.
 *      responses:
 *          200:
 *              description: Return an existing driver
 *          401:
 *              description: Missing or invalid access token
 *          404:
 *              description: Driver was not found in the database
 *          500:
 *              description: Return all users from the database
 */

/**
 * @swagger
 * /api/v1/drivers/{id}:
 *  put:
 *      security:
 *         - Token: []
 *      summary: edit registered driver information in the database
 *      description: this request will take in driver info to be created and add the driver to the database or return specific error
 *      tags:
 *          - Drivers
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: A valid driver id.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Driver"
 *      responses:
 *          201:
 *              description: Return a created driver
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
 * /api/v1/drivers/{id}:
 *  delete:
 *      security:
 *         - Token: []
 *      summary: delete a driver from the database
 *      description: This request will require a driver id and
 *      tags:
 *          - Drivers
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: A valid driver id.
 *      responses:
 *          201:
 *              description: Return a success when a driver is deleted
 *          401:
 *              description: Invalid or missing accessToken
 *          404:
 *              description: Driver was not found in the database
 *          500:
 *              description: Something went wrong on the server
 *
 */

/**
 * @swagger
 * /api/v1/drivers/{id}/bus/{plate}:
 *  post:
 *      security:
 *         - Token: []
 *      summary: Assign driver to bus
 *      description: assign driver of given id to a bus of given plate
 *      tags:
 *          - Drivers
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: A valid driver id.
 *       - in: path
 *         name: plate
 *         required: true
 *         description: A valid bus plate.
 *      responses:
 *          201:
 *              description: Return a success when a driver is assigned
 *          401:
 *              description: Invalid or missing accessToken
 *          404:
 *              description: Driver or bus was not found in the database
 *          403:
 *              description: Access denied
 *          500:
 *              description: Something went wrong on the server
 *
 */

/**
 * @swagger
 * components:
 *     schemas:
 *         Driver:
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
 *                 license:
 *                     required: true
 *                     type: string
 *                     example: 1200080081691164
 *
 */
