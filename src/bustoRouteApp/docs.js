/**
 * @openapi
 * tags:
 *  name: Assign Bus to Routes
 *  description: Routes for assigning a given bus to the route
 */

/**
 * @swagger
 * /api/v1/bus-to-routes/{plate}:
 *  get:
 *      summary: Check if the current bus has assigned route
 *      description: The response will have the information about the requested bus and the assigned route
 *      tags:
 *          - Assign Bus to Routes
 *      security:
 *         - Token: []
 *      parameters:
 *       - in: path
 *         name: plate
 *         required: true
 *         description: A valid bus plate number is required.
 *      responses:
 *          200:
 *              description: Return information about the bus
 *          401:
 *              description: Missing/Expired authorization token
 *          403:
 *              description: Missing required permission to access the resource
 *          404:
 *              description: The bus with the specified plate number was not found
 *          500:
 *              description: Something went terribly wrong
 */

/**
 * @swagger
 * /api/v1/bus-to-routes/{plate}:
 *  put:
 *      summary: Remove the assigned route from the bus
 *      description: If the bus had a route assigned, it will be removed while if not, it will be unchanged
 *      tags:
 *          - Assign Bus to Routes
 *      security:
 *         - Token: []
 *      parameters:
 *       - in: path
 *         name: plate
 *         required: true
 *         description: A valid bus plate number is required.
 *      responses:
 *          200:
 *              description: Return an updated bus with the route removed
 *          401:
 *              description: Missing/Expired authorization token
 *          403:
 *              description: Missing required permission to access the resource
 *          404:
 *              description: The route was not found
 *          500:
 *              description: Something went terribly wrong
 */

/**
 * @swagger
 * /api/v1/bus-to-routes/{plate}/{code}:
 *  post:
 *      summary: Assign a bus to the route
 *      description: The bus with the given plate will be assigned the route specified with the route code
 *      tags:
 *          - Assign Bus to Routes
 *      security:
 *         - Token: []
 *      parameters:
 *       - in: path
 *         name: plate
 *         required: true
 *         description: A valid bus plate number is required.
 *       - in: path
 *         name: code
 *         required: true
 *         description: A valid route code is required.
 *      responses:
 *          200:
 *              description: Return an updated bus with related route loaded
 *          401:
 *              description: Missing/Expired authorization token
 *          403:
 *              description: Missing required permission to access the resource
 *          404:
 *              description: The bus or route was not found. Check the response for the issue
 *          500:
 *              description: Something went terribly wrong
 */
