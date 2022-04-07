import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
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
	body('password', 'A strong password required')
		.isStrongPassword()
		.bail()
		.customSanitizer((value) => {
			const hash = bcrypt.hash(value, 10);
			return hash;
		}),
	body('firstName', 'This too is required').notEmpty(),
	body('lastName', 'This too is required').notEmpty(),
	body('role', 'This too is required').notEmpty(),
];

export const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) return next();
	const extractedErrors = {};
	errors.array().forEach((err) => {
		extractedErrors[err.param] = err.msg;
	});
	return res.status(400).json({ extractedErrors });
};
