import { Router } from 'express';
import verifyToken from '../middlewares/authJwt.js';
import CheckPermissionAny, {
	CheckPermissionOwn,
} from '../middlewares/CheckPermission.js';
import {
	createOperator,
	deleteOperator,
	getOperators,
	getSingleOperator,
} from './controllers.js';
import operatorValidation from './validations.js';
import asyncHandler from '../utils/asyncHandler.js';
import validate from '../utils/validateMiddleware.js';

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

operatorRouter.delete(
	'/:id',
	verifyToken,
	CheckPermissionAny(resource),
	asyncHandler(deleteOperator)
);
export default operatorRouter;
