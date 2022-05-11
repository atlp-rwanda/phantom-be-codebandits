import { body } from 'express-validator';

export const ProfileUpdateValidation = () => [
	body('firstName', 'firstName_required')
		.optional()
		.notEmpty()
		.bail()
		.isLength({ min: 3 })
		.withMessage('min_3_char'),
	body('lastName', 'last_name_required')
		.optional()
		.notEmpty()
		.withMessage('last_name_required')
		.bail()
		.isLength({ min: 3 })
		.withMessage('min_3_char'),
	body('mobileNumber', 'mobile_number_required')
		.optional()
		.matches(/^07[0-9]{8}$/)
		.withMessage('mobile_number_invalid'),

	body('address', 'add')
		.optional()
		.notEmpty()
		.bail()
		.isLength({ min: 3 })
		.withMessage('min_3_char'),
];
