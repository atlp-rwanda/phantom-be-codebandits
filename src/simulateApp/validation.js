import { body } from 'express-validator';

export const validatePassengers = () => [
	body('passengers', 'This should be a number').optional().toInt().isLength({
		min: 0,
		max: 100,
	}),
];
