import { AccessControl } from 'accesscontrol';
import { User } from '../models/user.js';
import handleResponse from './handleResponse.js';
import { saveInstance } from '../services/saveService.js';

export const GetUsers = async (req, res) => {
	const users = await User.find();
	return handleResponse(res, 200, AccessControl.filter(users, req.attributes));
};

export const CreateUser = async (req, res) => {
	const newUser = await saveInstance(User, req.body);
	const { password, ...data } = newUser;
	return handleResponse(res, 201, data);
};

export const testPermissionUser = async (req, res) =>
	handleResponse(res, 200, 'Getting user');

export const deleteUser = async (req, res) => {
	const { id } = req.params;
	const userExist = await User.findOneBy({ id });
	if (userExist) {
		await userExist.remove();
		return handleResponse(res, 200, { message: 'user is deleted' });
	}
	return handleResponse(res, 404, { message: res.__('notFound') });
};
