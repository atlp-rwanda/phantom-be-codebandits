/* eslint-disable prefer-promise-reject-errors */
import { body } from 'express-validator';

const busValidation = () => [
	body('plateNumber')
		.toUpperCase()
		.notEmpty()
		.withMessage('plateNumber_required')
		.bail()
		.matches(/^R[A-Z]{1,4}[0-9]{1,4}[A-Z]{1}$/)
		.withMessage('plateNumber_invalid'),
	body('company', 'company_required').notEmpty(),
	body('busType', 'busType_required')
		.notEmpty()
		.bail()
		.isLength({ min: 3 })
		.withMessage('min_3_char'),
	body('seats', 'seats_required')
		.isNumeric()
		.withMessage('enter_a_number')
		.isLength({ min: 2 })
		.withMessage('min_2_char')
		.toInt(),
];

export default busValidation;
