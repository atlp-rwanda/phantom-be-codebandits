import { body } from 'express-validator';

const validateEmail = () => [
	body('email')
		.notEmpty()
		.withMessage('email_required')
		.bail()
		.isEmail()
		.withMessage('email_invalid'),
];

export default validateEmail;
