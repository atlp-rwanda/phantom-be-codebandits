/**
 * @openapi
 * components:
 *  responses:
 *    UnauthorizedError:
 *      description: Access token is missing or invalid
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/errorWithoutResponse"
 *          example:
 *              status: fail
 *              code: 401
 *              data: {message: Invalid or missing authorization token}
 *    notFound:
 *      description: The requested resource could not be found
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/errorWithoutResponse"
 *            example:
 *              status: fail
 *              code: 404
 *              data: {message: "The requested resource could not be found"}
 *    successResponse:
 *      description: The request was processed successful and data are sent back
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/successResponse"
 *            example:
 *              status: success
 *              code: 200
 *              data: {routes: [], bus: {id: 1}}
 *    conflictResponse:
 *      description: The data that was received have conflict with the value in the database
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/errorWithDataResponse"
 *            example:
 *              status: fail
 *              code: 409
 *              data: {"field": "Field already exists"}
 *    serverError:
 *      description: Something went wrong on our servers
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/errorWithoutResponse"
 *          example:
 *              status: error
 *              code: 500
 *              data: {message: Something went wrong on our end}
 *    forbidenError:
 *      description: Forbiden access or request
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/errorWithoutResponse"
 *          example:
 *              status: fail
 *              code: 403
 *              data: {message: You dont have permission to perform the request}
 *    createdResponse:
 *      description: The request was success and the object was created and returned in respo
 *      content:
 *        application/json:
 *          schema:
 *            #ref: "#/components/schemas/errorWithoutResponse"
 *          example:
 *              status: fail
 *              code: 400
 *              data: {"key": "Value"}
 *    badRequest:
 *      description: Data that was received are not valid. Check the response body for invalid/ missing values
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: string
 *                description: Describe the nature of response
 *              code:
 *                type: number
 *                description: the html status code associated with the response
 *              data:
 *                type: object
 *                description: An object with key value pairs of missing on invalid data
 *            example:
 *              status: fail
 *              code: 400
 *              data: {"name": "Must be at least 5 characters long"}
 *
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      errorWithDataResponse:
 *          type: object
 *          example:
 *              status: "fail"
 *              code: 400
 *              data: {'lastName':"A valid last name needs to be more than 10 characters"}
 *          properties:
 *              status:
 *                  type: string
 *                  description: A simple description of the response
 *              code:
 *                  type: number
 *                  description: Associated with the http status
 *              data:
 *                  type: object
 *                  description: An object with key value pairs of missing on invalid data 
 *      errorWithoutResponse:
 *          type: object
 *          properties:
 *              status:
 *                  type: string
 *                  description: Describe the nature of the response based on request
 *                  example: Not found
 *              code:
 *                  type: number
 *                  description: Associated with the http status
 *                  example: 401
 *              data:
 *                  type: object
 *                  description: An object with a message property detailing what happened
 *                  example: {message: "Invalid data"}
 *      successResponse:
 *          type: object
 *          example:
 *              status: success
 *              code: 200
 *              data: {'bus':"bus properties"}
 *          properties:
 *              status:
 *                  type: string
 *                  description: Describe the response
 *              code:
 *                  type: number
 *                  description: Associated with the http status
 *              data:
 *                  type: object
 *                  description: An object with key value pairs of data sent back

 */
