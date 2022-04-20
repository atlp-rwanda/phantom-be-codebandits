/**
 * @openapi
 * tags:
 *  name: Routes
 *  description: Routes for the routes app
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
 * /api/v1/routes:
 *  post:
 *      security:
 *         - Token: []
 *      summary: Add a new route in the database
 *      description: this request will take in route info to be created and add the driver to the database or return specific error
 *      tags:
 *          - Routes
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Route"
 *      responses:
 *          201:
 *              description: Return a created route
 *          400:
 *              description: Invalid request or duplicate data has been found
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: Access denied
 *          409:
 *              description: Route with provided origin and destination already exist in the database
 *
 */

/**
 * @swagger
 * /api/v1/routes:
 *  get:
 *      security:
 *         - Token: []
 *      summary: Get all routes from the database
 *      description: Expect a list of routes  in the database
 *      tags:
 *         - Routes
 *      responses:
 *          200:
 *              description: Return all routes from the database
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: Access denied
 */

/**
 * @swagger
 * /api/v1/routes/{id}:
 *  get:
 *      security:
 *         - Token: []
 *      summary: Get a single routes from the database
 *      description: Expect an object of a single route from the database
 *      tags:
 *         - Routes
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: A valid route id.
 *      responses:
 *          200:
 *              description: Return an existing route
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: Access denied
 *          404:
 *              description: Driver was not found in the database
 *          500:
 *              description: Return all users from the database
 */

/**
 * @swagger
 * /api/v1/routes/{id}:
 *  put:
 *      security:
 *         - Token: []
 *      summary: edit registered route information in the database
 *      description: this request will take in route info to be created and add the route to the database or return specific error
 *      tags:
 *          - Routes
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: A valid route id.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Route"
 *      responses:
 *          201:
 *              description: Return a created route
 *          400:
 *              description: Invalid request or duplicate data has been found
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: Access denied
 *          409:
 *              description: Route with provided origin and destination already exist in the database
 *
 */

/**
 * @swagger
 * /api/v1/routes/{id}:
 *  delete:
 *      security:
 *         - Token: []
 *      summary: delete a route from the database
 *      description: This request will require a route id and
 *      tags:
 *          - Routes
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: A valid route id.
 *      responses:
 *          201:
 *              description: Return a success when a route is deleted
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: Access denied
 *          404:
 *              description: Route was not found in the database
 *          500:
 *              description: Something went wrong on the server
 *
 */

/**
 * @swagger
 * components:
 *     schemas:
 *         Route:
 *             type: object
 *             properties:
 *                 origin:
 *                     required: true
 *                     type: string
 *                     example: Remera
 *                 destination:
 *                     required: true
 *                     type: string
 *                     example: Kabuga
 *                 distance:
 *                     required: true
 *                     type: int
 *                     example: 222
 *                 start_coor:
 *                     type: point
 *                     example: -1.986707, 30.105818
 *                 end_coor:
 *                     type: point
 *                     example: -1.988894, 30.102401
 *                 stop_points:
 *                     type: path
 *                     example: ((-1.986707, 30.105818), (-1.988894, 30.102401))
 *
 */
