export const clearCookie = (res) =>
	res.cookie('jwt', '', { httpOnly: true, maxAge: 1 }).status(200).json({
		status: 'success',
		code: 200,
		data: {},
	});
