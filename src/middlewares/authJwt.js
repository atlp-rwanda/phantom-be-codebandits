import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const verifyToken = (req, res, next) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(' ')[1];
	if (token == null)
		return res.status(401).json({
			status: 'fail',
			code: 401,
			message: 'Unauthorized with token',
		});

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err)
			return res.status(401).json({
				status: 'error',
				code: 401,
				message: err,
			});
		req.user = user;
		next();
	});
};

export default verifyToken;
