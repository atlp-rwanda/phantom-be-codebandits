import bcrypt from 'bcrypt';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import RefreshToken, { RefreshTokenSchema } from '../models/refreshToken.js';
import User from '../models/user.js';
import handleResponse from './handleResponse.js';

const AuthHandler = async (req, res) => {
	const user = await User.findOneBy({ email: req.body.email });
	if (!user) {
		return handleResponse(res, 400, {
			message: res.__('wrong email or password'),
		});
	}
	try {
		if (await bcrypt.compare(req.body.password, user.password)) {
			const accessToken = jwt.sign(
				{ id: user.id, role: user.role },
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: '1000s' }
			);
			const oldToken = await RefreshToken.findOneBy({ user });
			if (oldToken) await oldToken.remove();
			const refreshToken = await RefreshTokenSchema.createToken(user);
			res.cookie('jwt', refreshToken, {
				httpOnly: true,
				maxAge: 60 * 60 * 60 * 24 * 7,
				sameSite: 'none',
				secure: process.env.NODE_ENV === 'production',
			});
			return handleResponse(res, 200, {
				first_name: user.firstName,
				role: user.role,
				image: user.image,
				access_token: accessToken,
			});
		}
		return handleResponse(res, 400, {
			message: res.__('Password or email is invalid'),
		});
		/* c8 ignore next 3 */
	} catch (err) {
		return handleResponse(res, 500, { message: res.__('serverError') });
	}
};

export { AuthHandler };
