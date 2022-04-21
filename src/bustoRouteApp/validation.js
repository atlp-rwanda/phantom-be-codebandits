/* eslint-disable prefer-promise-reject-errors */
import { param } from 'express-validator';

const PlateValidation = () => [
	param('plate', 'plateNumber_required')
		.notEmpty()
		.toUpperCase()
		.matches(/^R[A-Z]{2}[0-9]{3}[A-Z]{1}$/)
		.withMessage('plateNumber_invalid'),
];
export default PlateValidation;

export const codeValidation = () => [
	param('code', 'This is required').notEmpty().toUpperCase(),
];
