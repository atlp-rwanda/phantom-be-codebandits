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
 *      description: Expect a list of buses from the database. Set the relation to true if you want related route
 *      tags:
 *         - Buses
 *      parameters:
 *       - in: query
 *         name: relation
 *         required: false
 *         description: Send if you want to receive related route
 *      responses:
 *          200:
 *              description: Return all buses from the database. If relation is stated, the bus will have associated route
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
 * /api/v1/buses/{plate}/driver:
 *  get:
 *      security:
 *         - Token: []
 *      summary: check bus driver status
 *      description: check if the bus with given plate number has driver assigned to it
 *      tags:
 *          - Buses
 *      parameters:
 *       - in: path
 *         name: plate
 *         required: true
 *         description: A valid bus plate number.
 *      responses:
 *          200:
 *              description: Bus is assigned to a driver
 *          204:
 *              description: Bus has no driver assigned to it
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
