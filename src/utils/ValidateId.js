import handleResponse from '../controllers/handleResponse.js';

export const ValidateId = (req, res, next) => {
	const { id } = req.params;
	// eslint-disable-next-line no-restricted-globals
	if (isNaN(id)) {
		return handleResponse(res, 404, 'Not found');
	}
	return next();
};

export default ValidateId;
