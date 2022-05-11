import { Router } from 'express';
import verifyToken from '../middlewares/authJwt.js';
import CheckPermissionAny from '../middlewares/CheckPermission.js';
import asyncHandler from '../utils/asyncHandler.js';
import ValidateId from '../utils/ValidateId.js';
import validate from '../utils/validateMiddleware.js';
import {
	createRoute,
	deleteRoute,
	editRoute,
	getRoutes,
	getSingleRoute,
} from './controllers.js';
import routeValidation, { editValidation } from './validations.js';

const routeRouter = Router();
const resource = 'routes';

routeRouter.get(
	'/',
	verifyToken,
	CheckPermissionAny(resource),
	asyncHandler(getRoutes)
);
routeRouter.post(
	'/',
	verifyToken,
	CheckPermissionAny(resource),
	routeValidation(),
	validate,
	asyncHandler(createRoute)
);
routeRouter.get(
	'/:id',
	ValidateId,
	verifyToken,
	CheckPermissionAny(resource),
	asyncHandler(getSingleRoute)
);
routeRouter.delete(
	'/:id',
	ValidateId,
	verifyToken,
	CheckPermissionAny(resource),
	asyncHandler(deleteRoute)
);
routeRouter.put(
	'/:id',
	ValidateId,
	verifyToken,
	CheckPermissionAny(resource),
	editValidation(),
	validate,
	asyncHandler(editRoute)
);

export default routeRouter;
