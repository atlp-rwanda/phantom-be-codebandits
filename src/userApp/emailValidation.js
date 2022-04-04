import { body } from 'express-validator';

const validateEmail = () => {
	body('email', 'email_required')
		.notEmpty()
		.isEmail()
		.withMessage('email_not_valid');
};

export default validateEmail;
