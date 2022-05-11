const handleResponse = (res, code, messageData) => {
	const message = code < 400 ? res.__('success') : res.__('fail');
	const response = { status: message, code };
	if (typeof messageData === 'string') {
		response.data = {
			message: messageData,
		};
	} else {
		response.data = messageData;
	}
	return res.status(code).json(response);
};

export default handleResponse;
