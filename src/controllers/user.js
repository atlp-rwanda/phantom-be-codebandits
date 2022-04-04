import { User } from '../models/user.js';
import handleResponse from './handleResponse.js';
// import Jwt  from 'jsonwebtoken';

export const GetUsers = async (_, res) => {
	const users = await User.find();
	return handleResponse(res, 200, users);
};

export const CreateUser = async (req, res) => {
	const user = await User.findOneBy({ email: req.body.email });
	if (user) return handleResponse(res, 409, res.__('user_conflict'));
	try {
		const newUser = User.create(req.body);
		await newUser.save();
		return handleResponse(res, 201, newUser);
	} catch (error) {
		return handleResponse(res, 400, { message: res.__('bad_data') });
	}
};

// export const forgotPassword = async (req, res) => {
// 	const email = User.findOneBy({ email: req.body.email });
// 	if (!email) return handleResponse(res, 404, res.__('emailNotExit'));

// 	return 0;
// };
