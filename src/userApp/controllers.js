import { User } from '../models/user.js';
import handleResponse from '../controllers/handleResponse.js';
import generateToken from './verifyToken.js';
// eslint-disable-next-line import/no-named-as-default
import emailMessage from './emailMessage.js';
import mainNodemailer from './nodeMailer.js';

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
	try {
		const emailExist = await User.findOneBy({ email: req.body.email });
		// if (emailExist) return handleResponse(res, 200, res.__('email_found'));
		if (emailExist) {
			const tokenId = generateToken({ id: emailExist.id }, '20m');

			const confirm = emailMessage(tokenId);
			mainNodemailer(
				emailExist.email,
				'Reset password',
				'requesting for reset password',
				confirm
			);

			return handleResponse(res, 200, res.__('link_sent'));
		}
		return handleResponse(res, 404, res.__('email_not_found'));
	} catch (error) {
		return handleResponse(res, 500, res.__('serverError'));
	}
};
