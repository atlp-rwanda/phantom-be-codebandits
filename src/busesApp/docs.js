/**
 * @openapi
 * tags:
 *  name: Buses
 *  description: CRUD operations for buses
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
 * /api/v1/buses:
 *  post:
 *      security:
 *         - Token: []
 *      summary: Add a new bus to the database
 *      description: Expect a new bus to be added to the database
 *      tags:
 *          - Buses
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Bus"
 *      responses:
 *          201:
 *              description: Return the created bus
 *          400:
 *              description: Invalid request or duplicate data has been found
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: Access denied
 *          409:
 *              description: Bus already exists in the database
 *
 */

/**
 * @swagger
 * /api/v1/buses:
 *  get:
 *      security:
 *         - Token: []
 *      summary: Get all buses from the database
 *      description: Expect a list of buses from the database
 *      tags:
 *         - Buses
 *      responses:
 *          200:
 *              description: Return all buses from the database
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: Access denied
 */

/**
 * @swagger
 * /api/v1/buses/{id}:
 *  get:
 *      security:
 *         - Token: []
 *      summary: Get a single bus from the database
 *      description: Expect an object of a single bus from the database
 *      tags:
 *         - Buses
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: A valid bus id.
 *      responses:
 *          200:
 *              description: Return an existing bus
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: Access denied
 *          404:
 *              description: Bus was not found in the database
 *          500:
 *              description: Internal server error
 */

/**
 * @swagger
 * /api/v1/buses/{id}:
 *  put:
 *      security:
 *         - Token: []
 *      summary: edit registered bus information in the database
 *      description: Expect an object of the bus with updated informartion
 *      tags:
 *          - Buses
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: A valid bus id.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Bus"
 *      responses:
 *          201:
 *              description: Return a created bus
 *          400:
 *              description: Invalid request or duplicate data has been found
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: Access denied
 *          409:
 *              description: Bus already exists in the database
 *
 */

/**
 * @swagger
 * /api/v1/buses/{id}:
 *  delete:
 *      security:
 *         - Token: []
 *      summary: delete a bus from the database
 *      description: This request will delete a specific bus from the database
 *      tags:
 *          - Buses
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: A valid bus id.
 *       - in: headers
 *         name: Accept-Language
 *         required: false
 *         description: Choose a language
 *      responses:
 *          201:
 *              description: Bus is successfully deleted
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: Access denied
 *          404:
 *              description: Bus not found in the database
 *          500:
 *              description: Internal server error
 *
 */

/**
 * @swagger
 * components:
 *     schemas:
 *         Bus:
 *             type: object
 *             properties:
 *                 plateNumber:
 *                     required: true
 *                     type: string
 *                     example: RAE652B
 *                 company:
 *                     required: true
 *                     type: string
 *                     example: Kigali Bus Services
 *                 busType:
 *                     required: true
 *                     type: string
 *                     example: coaster
 *                 seats:
 *                     required: true
 *                     type: int
 *                     example: 27
 *
 */
