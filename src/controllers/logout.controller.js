import 'dotenv/config';
import RefreshToken from '../models/refreshToken.js';
import handleResponse from './handleResponse.js';

const logout = async (req, res) => {
	const { cookies } = req;
	const accessToken = req.headers.authorization;
	if (!cookies.jwt && !accessToken) {
		return handleResponse(res, 200, { message: res.__('logout successful') });
	}
	/* c8 ignore next 8 */
	if (cookies.jwt) {
		const token = await RefreshToken.findOneBy({ token: cookies.jwt });
		if (token) {
			await token.remove();
		}

		if (!accessToken) {
			res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
			return handleResponse(res, 200, { message: res.__('logout successful') });
		}
	}
	return handleResponse(res, 200, { message: res.__('logout successful') });
};

export { logout };
