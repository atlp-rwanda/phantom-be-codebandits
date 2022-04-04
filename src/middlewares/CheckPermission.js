import ac from '../configs/ac.js';
import handleResponse from '../controllers/handleResponse.js';

const CheckPermissionAny = (resource) => async (req, res, next) => {
	if (req.user.role === 'admin') return next();
	let permission;
	switch (req.method) {
		case 'GET':
			permission = ac.can(req.user.role).readAny(resource);
			if (permission.granted) {
				req.attributes = permission.attributes;
				return next();
			}
			return handleResponse(res, 401, res.__('Unauthorized'));
		case 'POST':
			permission = ac.can(req.user.role).createAny(resource);
			if (permission.granted) {
				req.attributes = permission.attributes;
				return next();
			}
			return handleResponse(res, 401, res.__('Unauthorized'));
		case 'PUT':
			permission = ac.can(req.user.role).updateAny(resource);
			if (permission.granted) {
				req.attributes = permission.attributes;
				return next();
			}
			return handleResponse(res, 401, res.__('Unauthorized'));
		case 'DELETE':
			permission = ac.can(req.user.role).deleteAny(resource);
			if (permission.granted) {
				req.attributes = permission.attributes;
				return next();
			}
			return handleResponse(res, 401, res.__('Unauthorized'));

		default:
			return handleResponse(res, 403, 'Permission denied');
	}
};
export default CheckPermissionAny;

export const CheckPermissionOwn = (resource) => async (req, res, next) => {
	if (req.user.role === 'admin') return next();
	let permission;
	switch (req.method) {
		case 'GET':
			permission = ac.can(req.user.role).readOwn(resource);
			if (permission.granted) {
				req.attributes = permission.attributes;
				return next();
			}
			return handleResponse(res, 401, res.__('Unauthorized'));
		case 'POST':
			permission = ac.can(req.user.role).createOwn(resource);
			if (permission.granted) {
				req.attributes = permission.attributes;
				return next();
			}
			return handleResponse(res, 401, res.__('Unauthorized'));
		case 'PUT':
			permission = ac.can(req.user.role).updateOwn(resource);
			if (permission.granted) {
				req.attributes = permission.attributes;
				return next();
			}
			return handleResponse(res, 401, res.__('Unauthorized'));
		case 'DELETE':
			permission = ac.can(req.user.role).deleteOwn(resource);
			if (permission.granted) {
				req.attributes = permission.attributes;
				return next();
			}
			return handleResponse(res, 401, res.__('Unauthorized'));

		default:
			return handleResponse(res, 403, 'Permission denied');
	}
};
