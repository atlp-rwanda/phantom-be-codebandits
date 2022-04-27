import { body } from 'express-validator';

const updateValidation = () => [
	body('plateNumber')
		.optional()
		.toUpperCase()
		.notEmpty()
		.withMessage('plateNumber_required')
		.bail()
		.matches(/^R[A-Z]{1,4}[0-9]{1,4}[A-Z]{1}$/)
		.withMessage('plateNumber_invalid'),
	body('busType', 'busType_required')
		.optional()
		.notEmpty()
		.bail()
		.isLength({ min: 3 })
		.withMessage('min_3_char'),
	body('seats')
		.optional()
		.notEmpty()
		.withMessage('seats_required')
		.bail()
		.isLength({ min: 2 })
		.withMessage('min_2_char'),
	body('company').optional(),
];

export default updateValidation;
