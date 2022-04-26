import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { RefreshToken, RefreshTokenSchema } from '../models/refreshToken.js';
import handleResponse from './handleResponse.js';

const refresh = async (req, res) => {
	try {
		const { cookies } = req;
		if (!cookies || !cookies.jwt) {
			return handleResponse(res, 400, {
				message: res.__('you need to login first'),
			});
		}
		const refreshToken = cookies.jwt;
		const userToken = await RefreshToken.findOneBy({ token: refreshToken });
		if (!userToken) {
			return handleResponse(res, 400, {
				message: res.__('you need to login first'),
			});
		}
		/* c8 ignore next 7 */
		if (RefreshTokenSchema.verifyExpiration(userToken)) {
			await userToken.remove();
			res.clearCookie('jwt', { httpOnly: true });
			return handleResponse(res, 400, {
				message: res.__('you need to login first'),
			});
		}
		const accessToken = jwt.sign(
			{ id: userToken.user.id, role: userToken.user.role },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '600s' }
		);
		return handleResponse(res, 200, { access_token: accessToken });
		/* c8 ignore next 3 */
	} catch (err) {
		handleResponse(res, 500, { message: res.__('serverError') });
	}
};

export { refresh };
