import { body } from 'express-validator';

const routeValidation = () => [
	body('origin', 'origin_required').notEmpty(),
	body('destination', 'destination_required').notEmpty(),
	body('distance', 'distance_required')
		.notEmpty()
		.isNumeric()
		.withMessage('number')
		.isLength({
			max: 5,
		})
		.withMessage('greater_5'),
	body('start_coor', 'geographical_coordinates')
		.optional()
		.isLength({
			min: 10,
			max: 50,
		})
		.withMessage('min_max'),
	body('end_coor', 'geographical_coordinates')
		.optional()
		.isLength({
			min: 10,
			max: 50,
		})
		.withMessage('min_max'),
	body('stop_points', 'geographical_coordinates')
		.optional()
		.toArray()
		.isArray()
		.withMessage('min_max'),
];
export const editValidation = () => [
	body('origin', 'origin_required').optional().notEmpty(),
	body('destination').optional().notEmpty().withMessage('destination_required'),
	body('distance', 'distance_required')
		.isNumeric()
		.withMessage('number')
		.isLength({
			max: 5,
		})
		.withMessage('greater_5'),
	body('start_coor', 'geographical_coordinates')
		.optional()
		.isLength({
			min: 10,
			max: 50,
		})
		.withMessage('min_max'),
	body('end_coor', 'geographical_coordinates')
		.optional()
		.isLength({
			min: 10,
			max: 50,
		})
		.withMessage('min_max'),
	body('stop_points', 'geographical_coordinates')
		.optional()
		.isArray()
		.toArray()
		.withMessage('min_max'),
];

export default routeValidation;
