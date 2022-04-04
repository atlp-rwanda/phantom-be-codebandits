import { body } from 'express-validator';

const loginValidation = () => [
	body('email')
		.isEmail()
		.withMessage('email_invalid')
		.notEmpty()
		.withMessage('email_required'),
	body('password', 'password_required').notEmpty(),
];
export default loginValidation;
