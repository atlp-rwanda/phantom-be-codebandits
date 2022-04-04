import { Router } from 'express';
import { CreateUser, GetUsers } from '../controllers/user.js';
import verifyToken from '../middlewares/authJwt.js';
import CheckPermission from '../middlewares/CheckPermission.js';
import raiseError from '../rolesApp/controller.js';
import { createUserValidation, validate } from '../rolesApp/validation.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = Router();

router.get('/', verifyToken, CheckPermission('drivers'), GetUsers);
router.post('/', createUserValidation(), validate, CreateUser);
router.delete(
	'/',
	verifyToken,
	CheckPermission('drivers'),
	asyncHandler(raiseError)
);

export default router;
