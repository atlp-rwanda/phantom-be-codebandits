import { Router } from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import validate from '../utils/validateMiddleware.js';
import {
	forgotPassword,
	resetPasswordCheck,
	resetPasswordCreate,
} from './controllers.js';
import validateEmail from './emailValidation.js';
import validatePassword from './validatePassword.js';

const resetPasswordRouter = Router();
resetPasswordRouter.get('/reset-password/:token', resetPasswordCheck);
resetPasswordRouter.post(
	'/reset-password/:token',
	validatePassword(),
	validate,
	asyncHandler(resetPasswordCreate)
);
resetPasswordRouter.post(
	'/forgot-password',
	validateEmail(),
	validate,
	asyncHandler(forgotPassword)
);

export default resetPasswordRouter;
