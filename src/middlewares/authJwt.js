import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyToken = (req, res, next) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(' ')[1];
	if (token == null)
		return res.status(401).send({
			status: 'fail',
			code: 401,
			message: 'Unauthorized',
		});

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err)
			return res.status(401).send({
				status: 'error',
				code: 401,
				message: err,
			});
		req.user = user;
		next();
	});
};

export default verifyToken;
