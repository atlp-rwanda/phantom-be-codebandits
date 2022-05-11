import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const signTestToken = (user) => {
	const token = jwt.sign(
		{
			id: user.id,
			role: user.role,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: '60s' }
	);
	return token;
};
