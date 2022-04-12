/* eslint-disable prefer-promise-reject-errors */
import { body } from 'express-validator';
import User from '../models/user.js';
import Driver from './models.js';

const driverValidation = () => [
	body('email')
		.notEmpty()
		.withMessage('email_required')
		.bail()
		.isEmail()
		.withMessage('email_invalid')
		.custom((email) =>
			User.findOneBy({ email }).then((user) => {
				if (user) return Promise.reject('user_conflict');
			})
		),
	body('firstName', 'first_name_required')
		.notEmpty()
		.bail()
		.isLength({ min: 3 })
		.withMessage('min_3_char'),
	body('lastName', 'last_name_required')
		.notEmpty()
		.bail()
		.isLength({ min: 3 })
		.withMessage('min_3_char'),
	body('mobileNumber', 'mobile_number_required')
		.notEmpty()
		.bail()
		.matches(/(0|7|8)\d{9}$/)
		.withMessage('mobile_number_invalid'),
	body('company', 'company_required').notEmpty(),
	body('address', 'address_required')
		.notEmpty()
		.bail()
		.isLength({ min: 3 })
		.withMessage('min_3_char'),
	body('nationalID', 'national_ID_required')
		.notEmpty()
		.bail()
		.matches(/^[1-3](19|20)\d{2}[7-8]\d{7}[0-9]\d{2}$/)
		.withMessage('national_ID_invalid')
		.custom(async (nationalID) => {
			const driver = await Driver.findOneBy({ nationalID });
			if (driver) return Promise.reject('national_ID_exist');
		}),
	body('license', 'license_required')
		.notEmpty()
		.bail()
		.matches(/^[1-3](19|20)\d{2}[7-8]\d{7}[0-9]\d{2}$/)
		.withMessage('license_invalid')
		.custom(async (license) => {
			const driver = await Driver.findOneBy({ license });
			if (driver) return Promise.reject('license_ID_exist');
		}),
];

export default driverValidation;
