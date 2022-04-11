import { validationResult } from 'express-validator';
import handleResponse from '../controllers/handleResponse.js';

const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) return next();
	const extractedErrors = {};
	errors.array().forEach((err) => {
		extractedErrors[err.param] = res.__(err.msg);
	});
	return handleResponse(res, 400, extractedErrors);
};

export default validate;
