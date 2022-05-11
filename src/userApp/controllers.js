import handleResponse from '../controllers/handleResponse.js';
import { User } from '../models/user.js';
import ResetToken from './models.js';

export const forgotPassword = async (req, res) => {
	const user = await User.findOneBy({ email: req.body.email });
	if (!user) return handleResponse(res, 400, res.__('email_not_found'));
	const resetoken = await ResetToken.findOneBy({ user });
	if (resetoken) {
		await resetoken.remove();
	}
	const resetToken = ResetToken.create();
	resetToken.user = user;
	await resetToken.save();
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
		await User.updateById(resetToken.user.id, { password: req.body.password });
		await resetToken.remove();
		return handleResponse(res, 200, res.__('successifully_reseted'));
	}

	if (resetToken && !resetToken.checkValid()) {
		await resetToken.remove();
	}
	return handleResponse(res, 400, res.__('token_invalid'));
};
