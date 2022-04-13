import { Router } from 'express';
import verifyToken from '../middlewares/authJwt.js';
import CheckPermissionAny, {
	CheckPermissionOwn,
} from '../middlewares/CheckPermission.js';
import asyncHandler from '../utils/asyncHandler.js';
import validate from '../utils/validateMiddleware.js';
import {
	assignBus,
	checkDriverBusStatus,
	createDriver,
	deleteDriver,
	editDriver,
	getDrivers,
	getSingleDriver,
} from './controllers.js';
import editValidation from './editValidation.js';
import driverValidation from './validations.js';

const resource = 'drivers';
const driverRouter = Router();

driverRouter.post(
	'/',
	verifyToken,
	CheckPermissionAny(resource),
	driverValidation(),
	validate,
	asyncHandler(createDriver)
);
driverRouter.get(
	'/',
	verifyToken,
	CheckPermissionAny(resource),
	asyncHandler(getDrivers)
);
driverRouter.get(
	'/:id',
	verifyToken,
	CheckPermissionOwn(resource),
	asyncHandler(getSingleDriver)
);
driverRouter.put(
	'/:id',
	verifyToken,
	CheckPermissionOwn(resource),
	editValidation(),
	validate,
	asyncHandler(editDriver)
);
driverRouter.delete(
	'/:id',
	verifyToken,
	CheckPermissionAny(resource),
	asyncHandler(deleteDriver)
);

driverRouter.post(
	':driverId/bus/:busId',
	verifyToken,
	CheckPermissionAny(resource),
	asyncHandler(assignBus)
);
driverRouter.get(
	':id/bus',
	CheckPermissionAny(resource),
	asyncHandler(checkDriverBusStatus)
);
export default driverRouter;
