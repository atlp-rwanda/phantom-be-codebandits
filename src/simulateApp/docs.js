/**
 * @openapi
 * tags:
 *  name: Simulation
 *  description: Simulating bus motion
 */

/**
 * @swagger
 * /api/v1/simulate:
 *  post:
 *      security:
 *         - Token: []
 *      summary: Allow driver to start a bus
 *      description: The driver sent a request before start a new trip
 *      tags:
 *          - Simulation
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          passengers:
 *                              required: true,
 *                              type: number,
 *                              example: 10
 *      responses:
 *         200:
 *             $ref: "#/components/responses/successResponse"
 *         400:
 *             $ref: "#/components/responses/badRequest"
 *         401:
 *             $ref: "#/components/responses/UnauthorizedError"
 *         404:
 *             $ref: "#/components/responses/notFound"
 *         500:
 *             $ref: "#/components/responses/serverError"
 *
 */

/**
 * @swagger
 * /api/v1/simulate:
 *  get:
 *      summary: Retrieve a list of buses active on the road
 *      description: The user receive a list of all buses with their latest locations
 *      tags:
 *          - Simulation
 *      responses:
 *         200:
 *             $ref: "#/components/responses/successResponse"
 *         500:
 *             $ref: "#/components/responses/serverError"
 *
 */

/**
 * @swagger
 * /api/v1/simulate/options:
 *  get:
 *      summary: Retrieve a list of all routes with sorted information
 *      description: Return a structured list of options with minimum data
 *      tags:
 *          - Simulation
 *      responses:
 *         200:
 *             $ref: "#/components/responses/successResponse"
 *         500:
 *             $ref: "#/components/responses/serverError"
 *
 */

/**
 * @swagger
 * /api/v1/simulate/check/{plate}:
 *  get:
 *      summary: Check the status of the bus
 *      description: Return a give bus information about its latest trip
 *      tags:
 *          - Simulation
 *      responses:
 *         200:
 *             $ref: "#/components/responses/successResponse"
 *         404:
 *             $ref: "#/components/responses/notFound"
 *         500:
 *             $ref: "#/components/responses/serverError"
 *
 */
