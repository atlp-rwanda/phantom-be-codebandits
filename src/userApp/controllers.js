import { v4 as uuid } from 'uuid';
import handleResponse from '../controllers/handleResponse.js';
import { User } from '../models/user.js';
import EmailHandler from '../utils/EmailHandler.js';
import ResetToken from './models.js';

export const forgotPassword = async (req, res) => {
	const user = await User.findOneBy({ email: req.body.email });
	if (!user) return handleResponse(res, 400, res.__('email_not_found'));

	const resetoken = await ResetToken.findOneBy({ user });

	if (resetoken) {
		await resetoken.remove();
	}

	const time = new Date();
	const resetToken = ResetToken.create({
		token: uuid(),
		expiration: new Date(time.setSeconds(time.getSeconds() + 86400)),
	});
	resetToken.user = user;
	await resetToken.save();
	const { token } = resetToken;

	const link = `${process.env.RESET_URL}/${token}`;
	await EmailHandler(
		'reset',
		{ link, email: req.body.email, name: user.firstName },
		{ title: 'Reset Password', subject: 'Password reset link' }
	);
	return handleResponse(res, 200, { message: res.__('link_sent') });
};

export const resetPasswordCheck = async (req, res) => {
	const { token } = req.params;
	const resetToken = await ResetToken.findOneBy({ token });
	if (resetToken && resetToken.checkValid()) {
		const valid = resetToken.checkValid();
		return handleResponse(res, 200, { token, valid });
	}
	if (resetToken && !resetToken.checkValid()) {
		await resetToken.remove();
	}
	return handleResponse(res, 401, 'Token invalid or expired');
};

export const resetPasswordCreate = async (req, res) => {
	const { token } = req.params;
	const resetToken = await ResetToken.findOneBy({ token });
	if (resetToken && resetToken.checkValid()) {
		const user = await User.findOneBy({ id: resetToken.user.id });

		user.password = req.body.password;
		await user.save();
		await resetToken.remove();
		const link = process.env.LOGIN_URL;
		/* c8 ignore next 2 */
		await EmailHandler(
			'reset-success',
			{ email: user.email, name: user.firstName, link },
			{ title: 'Password Changed', subject: 'Password changed successfully' }
		);
		return handleResponse(res, 200, res.__('successifully_reseted'));
	}

	if (resetToken && !resetToken.checkValid()) {
		await resetToken.remove();
	}
	return handleResponse(res, 400, res.__('token_invalid'));
};
