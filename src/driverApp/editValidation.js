import { body } from 'express-validator';

const editValidation = () => [
	body('firstName', 'firstName_required')
		.optional()
		.notEmpty()
		.bail()
		.isLength({ min: 3 })
		.withMessage('min_3_char'),
	body('lastName')
		.optional()
		.notEmpty()
		.withMessage('last_name_required')
		.bail()
		.isLength({ min: 3 })
		.withMessage('min_3_char'),
	body('mobileNumber', 'mobile_number_required')
		.optional()
		.notEmpty()
		.bail()
		.matches(/(0|7|8)\d{9}$/)
		.withMessage('mobile_number_invalid'),
	body('address', 'add')
		.optional()
		.notEmpty()
		.bail()
		.isLength({ min: 3 })
		.withMessage('min_3_char'),
];

export default editValidation;
