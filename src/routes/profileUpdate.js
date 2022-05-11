import { AccessControl } from 'accesscontrol';
import { matchedData } from 'express-validator';
import { editByRelation } from '../controllers/baseControllers.js';
import handleResponse from '../controllers/handleResponse.js';
import Driver from '../driverApp/models.js';
import User from '../models/user.js';
import Operator from '../operatorApp/models.js';
import { cleanModel } from '../utils/cleanModel.js';

export const profileUpdate = async (req, res) => {
	const user = await User.findOne({ where: { id: req?.user.id } });
	if (!user) return handleResponse(res, 404, 'User not found');
	const data = matchedData(req, {
		optional: false,
	});
	if (req.user.role === 'driver') {
		await editByRelation(Driver, req.user.id, data, user);
	} else if (req.user.role === 'operator') {
		await editByRelation(Operator, req.user.id, data, user);
	} else {
		await User.update(user, cleanModel(User.create(data)));
	}
	return handleResponse(res, 200, { message: 'Profile updated' });
};

/* c8 ignore start */
export const handlePictureUpload = async (req, res) => {
	const user = await User.findOne({ where: { id: req?.user.id } });
	if (req.file) {
		// TODO Handle deleting pictures on user removal
		await User.update(user, {
			image: req.file.path,
		});
	}
	return handleResponse(
		res,
		200,
		AccessControl.filter(user, ['*', '!password', '!id'])
	);
};

/* c8 ignore end */
