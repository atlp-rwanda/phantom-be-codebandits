import { body } from 'express-validator';

const validatePassword = () => [
	body('password')
		.notEmpty()
		.withMessage('password_required')
		.isStrongPassword()
		.withMessage('strong_password')
		.bail(),
];

export default validatePassword;
