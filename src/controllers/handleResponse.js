const handleResponse = (statusCode, data) => {
	const statusMessage =
		statusCode === 200 || statusCode === 201 ? 'Success' : 'Fail';
	const response = {
		status: statusMessage,
		statusCode,
		data,
	};
	return response;
};
export default handleResponse;

