import bcrypt from 'bcrypt';
import { body } from 'express-validator';

const validatePassword = () => [
	body('password')
		.notEmpty()
		.withMessage('password_required')
		.isStrongPassword()
		.withMessage('strong_password')
		.bail()
		.customSanitizer((value) => {
			const hash = bcrypt.hash(value, 10);
			return hash;
		}),
];

export default validatePassword;
