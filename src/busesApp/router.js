import { Router } from 'express';
import verifyToken from '../middlewares/authJwt.js';
import CheckPermissionAny from '../middlewares/CheckPermission.js';
import asyncHandler from '../utils/asyncHandler.js';
import validate from '../utils/validateMiddleware.js';
import {
	checkDriverStatus,
	deleteBusHandler,
	getBusHandler,
	getSingleBusHandler,
	postBusHandler,
	putBusHandler,
} from './controllers.js';
import updateValidation from './updateValidation.js';
import busValidation from './validations.js';

const resource = 'buses';

const busesRouter = Router();

busesRouter.post(
	'/',
	verifyToken,
	CheckPermissionAny(resource),
	busValidation(),
	validate,
	asyncHandler(postBusHandler)
);
busesRouter.get(
	'/',
	verifyToken,
	CheckPermissionAny(resource),
	asyncHandler(getBusHandler)
);
busesRouter.get(
	'/:id',
	verifyToken,
	CheckPermissionAny(resource),
	asyncHandler(getSingleBusHandler)
);
busesRouter.put(
	'/:id',
	verifyToken,
	CheckPermissionAny(resource),
	updateValidation(),
	validate,
	asyncHandler(putBusHandler)
);
busesRouter.delete(
	'/:id',
	verifyToken,
	CheckPermissionAny(resource),
	asyncHandler(deleteBusHandler)
);

busesRouter.get(
	'/:plate/driver',
	verifyToken,
	CheckPermissionAny(resource),
	asyncHandler(checkDriverStatus)
);

export default busesRouter;
