import { body } from 'express-validator';

const baseValidation = () => [
	body('email')
		.isEmail()
		.withMessage('email_invalid')
		.notEmpty()
		.withMessage('email_required'),
	body('password', 'password_required')
		.notEmpty()
		.isStrongPassword({
			minLength: 8,
			minLowercase: 1,
			minUppercase: 1,
			minNumbers: 1,
			minSymbols: 1,
		})
		.withMessage('password_invalid'),
	body('firstName', 'firstName_required')
		.notEmpty()
		.isLength({ min: 3 })
		.withMessage('min_3_char'),
	body('lastName')
		.notEmpty()
		.withMessage('last_name_required')
		.isLength({ min: 3 })
		.withMessage('min_3_char'),
	body('mobileNumber', 'mobile_number_required')
		.notEmpty()
		.matches(/(0|7|8)\d{9}$/)
		.withMessage('mobile_number_invalid'),
	body('company', 'company_required').notEmpty(),
	body('address', 'add')
		.notEmpty()
		.isLength({ min: 3 })
		.withMessage('min_3_char'),
	body('nationalID', 'national_ID_required')
		.notEmpty()
		.matches(/^[1-3](19|20)\d{2}[7-8]\d{7}[0-9]\d{2}$/)
		.withMessage('national_ID_invalid'),
];
export default baseValidation;
