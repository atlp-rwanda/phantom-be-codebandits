import { v4 as uuid } from 'uuid';
import handleResponse from '../controllers/handleResponse.js';
import { User } from '../models/user.js';
import ResetToken from './models.js';
import sendResetEmail from './utils.js';
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

export const forgotPassword = async (req, res) => {
	const user = await User.findOneBy({ email: req.body.email });
	if (!user) return handleResponse(res, 400, res.__('emailNotExit'));

	const resetoken = await ResetToken.findOneBy({ user });
	let token;
	if (resetoken) {
		token = resetoken.token;
	} else {
		const time = new Date();
		const resetToken = ResetToken.create({
			token: uuid(),
			expiration: new Date(time.setSeconds(time.getSeconds() + 120)),
		});
		resetToken.user = user;
		await resetToken.save();
		token = resetToken.token;
	}

	const link = `http://localhost:5000/api/v1/users/reset/check/${token}`;
	await sendResetEmail(link, req.body.email, user);

	return handleResponse(res, 200, { message: 'Reset link sent' });
};

export const resetPasswordCheck = async (req, res) => {
	const { token } = req.params;
	const resetToken = await ResetToken.findOneBy({ token });
	if (resetToken && resetToken.checkValid()) {
		const valid = resetToken.checkValid();
		return handleResponse(res, 200, { token, valid });
	}
	if (resetToken && !resetToken.checkValid()) {
		return handleResponse(res, 401, 'Token Expired');
	}
	return handleResponse(res, 401, 'Token invalid ');
};

export const resetPasswordCreate = async (req, res) => {
	const user = await ResetToken.findOneBy({ token: req.params.token }).user;
	try {
		user.password = req.body.password;
		await user.save();
		return handleResponse(res, 200, 'Changed');
	} catch (error) {
		return handleResponse(res, 500, error.message);
	}
};
