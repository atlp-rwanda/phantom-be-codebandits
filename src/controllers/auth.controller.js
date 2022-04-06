import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import User from '../models/user.js';
import RefreshToken, { RefreshTokenSchema } from '../models/refreshToken.js';
import handleResponse from './handleResponse.js';

const AuthHandler = async (req, res) => {
	const user = await User.findOneBy({ email: req.body.email });
	if (!user) {
		return handleResponse(res, 404, { message: res.__('user does not exist') });
	}
	try {
		if (await bcrypt.compare(req.body.password, user.password)) {
			const accessToken = jwt.sign(
				{ id: user.id, role: user.role },
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: '120s' }
			);
			const oldToken = await RefreshToken.findOneBy({ user });
			if (oldToken) await oldToken.remove();
			const refreshToken = await RefreshTokenSchema.createToken(user);
			res.cookie('jwt', refreshToken, {
				httpOnly: true,
				maxAge: 60 * 60 * 60 * 24 * 7,
			});
			return handleResponse(res, 200, {
				first_name: user.firstName,
				role: user.role,
				access_token: accessToken,
			});
		}
		return handleResponse(res, 401, {
			message: res.__('wrong email or password'),
		});
		/* c8 ignore next 3 */
	} catch (err) {
		return handleResponse(res, 500, { message: res.__('serverError') });
	}
};

export { AuthHandler };
