import { Router } from 'express';
import verifyToken from '../middlewares/authJwt.js';
import CheckPermissionAny from '../middlewares/CheckPermission.js';
import asyncHandler from '../utils/asyncHandler.js';
import validate from '../utils/validateMiddleware.js';
import { AssignBus, CheckBusStatus, RemoveRoute } from './controllers.js';
import PlateValidation, { codeValidation } from './validation.js';

const router = Router();
const resource = 'routes';

router.get(
	'/:plate',
	verifyToken,
	CheckPermissionAny(resource),
	PlateValidation(),
	validate,
	asyncHandler(CheckBusStatus)
);
router.put(
	'/:plate',
	verifyToken,
	CheckPermissionAny(resource),
	PlateValidation(),
	validate,
	asyncHandler(RemoveRoute)
);

router.post(
	'/:plate/:code',
	verifyToken,
	CheckPermissionAny(resource),
	PlateValidation(),
	codeValidation(),
	validate,
	asyncHandler(AssignBus)
);

export default router;
