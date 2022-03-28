const handleResponse = (res, code, data) => {
	const message = code < 400 ? res.__('success') : res.__('fail');
	return res.status(code).json({ status: message, code, data });
};
export default handleResponse;

