import { Router } from 'express';
import editValidation from '../driverApp/editValidation.js';
import verifyToken from '../middlewares/authJwt.js';
import CheckPermissionAny, {
	CheckPermissionOwn,
} from '../middlewares/CheckPermission.js';
import asyncHandler from '../utils/asyncHandler.js';
import ValidateId from '../utils/ValidateId.js';
import validate from '../utils/validateMiddleware.js';
import {
	createOperator,
	deleteOperator,
	editOperator,
	getOperators,
	getSingleOperator,
} from './controllers.js';
import operatorValidation from './validations.js';

const resource = 'operators';
const operatorRouter = Router();

operatorRouter.get(
	'/',
	verifyToken,
	CheckPermissionAny(resource),
	asyncHandler(getOperators)
);
operatorRouter.get(
	'/:id',
	ValidateId,
	verifyToken,
	CheckPermissionOwn(resource),
	asyncHandler(getSingleOperator)
);
operatorRouter.post(
	'/',
	verifyToken,
	CheckPermissionAny(resource),
	operatorValidation(),
	validate,
	asyncHandler(createOperator)
);
operatorRouter.put(
	'/:id',
	ValidateId,
	verifyToken,
	CheckPermissionOwn(resource),
	editValidation(),
	validate,
	asyncHandler(editOperator)
);
operatorRouter.delete(
	'/:id',
	ValidateId,
	verifyToken,
	CheckPermissionAny(resource),
	asyncHandler(deleteOperator)
);
export default operatorRouter;
