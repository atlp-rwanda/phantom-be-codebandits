const verifyJWT = (role) => async (req, res, next) => {
	req.user = {
		name: 'fabrice',
		role: role || 'driver',
	};
	next();
};

export default verifyJWT;
