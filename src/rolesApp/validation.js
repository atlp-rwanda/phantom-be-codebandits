import { body } from 'express-validator';
import User from '../models/user.js';

export const createUserValidation = () => [
	body('email', 'A valid email required')
		.notEmpty()
		.isEmail()
		.normalizeEmail()
		.bail()
		.custom(async (email) => {
			const user = await User.findOne({ where: { email } });
			// eslint-disable-next-line prefer-promise-reject-errors
			if (user) return Promise.reject('user_conflict');
		}),
	body('password', 'A strong password required').isStrongPassword().bail(),
	body('firstName', 'This too is required').notEmpty(),
	body('lastName', 'This too is required').notEmpty(),
	body('role', 'This too is required').notEmpty(),
];
