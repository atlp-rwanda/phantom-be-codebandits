import ac from '../configs/ac.js';
import handleResponse from '../controllers/handleResponse.js';

const CheckPermissionAny = (resource) => async (req, res, next) => {
	if (req.user.role === 'admin') {
		req.attributes = ['*', '!user.password', '!password'];
		return next();
	}
	let permission;
	switch (req.method) {
		case 'GET':
			permission = ac.can(req.user.role).readAny(resource);
			if (permission.granted) {
				req.attributes = permission.attributes;
				return next();
			}
			return handleResponse(res, 403, res.__('Permission denied'));
		case 'POST':
			permission = ac.can(req.user.role).createAny(resource);
			if (permission.granted) {
				req.attributes = permission.attributes;
				return next();
			}
			return handleResponse(res, 403, res.__('Permission denied'));
		case 'PUT':
			permission = ac.can(req.user.role).updateAny(resource);
			if (permission.granted) {
				req.attributes = permission.attributes;
				return next();
			}
			return handleResponse(res, 403, res.__('Permission denied'));

		case 'DELETE':
			permission = ac.can(req.user.role).deleteAny(resource);
			if (permission.granted) {
				req.attributes = permission.attributes;
				return next();
			}
			return handleResponse(res, 403, res.__('Permission denied'));
		/* c8 ignore next 3 */
		default:
			return handleResponse(res, 403, res.__('Permission denied'));
	}
};
export default CheckPermissionAny;

export const CheckPermissionOwn = (resource) => async (req, res, next) => {
	if (req.user.role === 'admin') {
		req.attributes = ['*', '!user.password', '!password'];
		return next();
	}
	let permission;
	switch (req.method) {
		case 'GET':
			permission = ac.can(req.user.role).readOwn(resource);
			if (permission.granted) {
				req.attributes = permission.attributes;
				return next();
			}
			return handleResponse(res, 403, res.__('Permission denied'));
		case 'POST':
			permission = ac.can(req.user.role).createOwn(resource);
			if (permission.granted) {
				req.attributes = permission.attributes;
				return next();
			}
			return handleResponse(res, 403, res.__('Permission denied'));
		case 'PUT':
			permission = ac.can(req.user.role).updateOwn(resource);
			if (permission.granted) {
				req.attributes = permission.attributes;
				return next();
			}
			return handleResponse(res, 403, res.__('Permission denied'));
		case 'DELETE':
			permission = ac.can(req.user.role).deleteOwn(resource);
			if (permission.granted) {
				req.attributes = permission.attributes;
				return next();
			}
			return handleResponse(res, 403, res.__('Permission denied'));
		/* c8 ignore next 3 */
		default:
			return handleResponse(res, 403, 'Permission denied');
	}
};
