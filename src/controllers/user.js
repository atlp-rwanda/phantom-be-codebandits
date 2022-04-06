import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import handleResponse from './handleResponse.js';
import saveUser from './services/saveUser.js';

export const GetUsers = async (_, res) => {
	const users = await User.find();
	return handleResponse(res, 200, users);
};

export const CreateUser = async (req, res) => {
	const hashedPassword = await bcrypt.hash(req.body.password, 10);
	const user = await User.findOneBy({ email: req.body.email });
	if (user) return handleResponse(res, 409, res.__('user_conflict'));
	try {
		req.body.password = hashedPassword;
		const newUser = await saveUser(req.body);
		return handleResponse(res, 201, newUser);
	} catch (error) {
		return handleResponse(res, 400, { message: res.__('bad_data') });
	}
};
