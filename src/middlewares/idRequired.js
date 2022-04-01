const IdRequired = (req, res, next) => {
	const { id } = req.params;
	if (!id)
		return res.status(400).json({ message: 'Missing required parameter' });
	return next();
};

export default IdRequired;
