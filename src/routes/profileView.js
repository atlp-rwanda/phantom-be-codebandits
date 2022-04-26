import handleResponse from '../controllers/handleResponse.js';
import User from '../models/user.js';
import { getDriverProfile, getOperatorProfile } from './utils.js';

export const profileView = async (req, res) => {
	let data = await User.findOne({ where: { id: req?.user.id } });
	if (req?.user?.role === 'driver') {
		data = await getDriverProfile(req.user.id);
	}
	if (req?.user?.role === 'operator') {
		data = await getOperatorProfile(req.user.id);
	}
	if (!data) return handleResponse(res, 404, 'Not found');
	return handleResponse(res, 200, data);
};
