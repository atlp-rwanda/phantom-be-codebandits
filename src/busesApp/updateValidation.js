import { body } from 'express-validator';

const updateValidation = () => [
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
];

export default updateValidation;
