import { Router } from 'express';
import { CreateUser, deleteUser, GetUsers } from '../controllers/user.js';
import verifyToken from '../middlewares/authJwt.js';
import CheckPermissionAny, {
	CheckPermissionOwn,
} from '../middlewares/CheckPermission.js';
import raiseError from '../rolesApp/controller.js';
import { createUserValidation } from '../rolesApp/validation.js';
import validate from '../utils/validateMiddleware.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = Router();

router.get(
	'/',
	verifyToken,
	CheckPermissionAny('drivers'),
	asyncHandler(GetUsers)
);
router.post('/', createUserValidation(), validate, asyncHandler(CreateUser));
router.delete(
	'/:id',
	verifyToken,
	CheckPermissionAny('drivers'),
	asyncHandler(deleteUser)
);
router.delete(
	'/',
	verifyToken,
	CheckPermissionOwn('drivers'),
	asyncHandler(raiseError)
);

export default router;
