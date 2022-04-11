import { Router } from 'express';
import validate from '../utils/validate.js';
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
	resetPasswordCreate
);
resetPasswordRouter.post(
	'/forgot-password',
	validateEmail(),
	validate,
	forgotPassword
);

export default resetPasswordRouter;
