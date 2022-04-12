/* eslint-disable */
import handleResponse from '../controllers/handleResponse.js';
const errorMessage = [
	'Something happened on our end. We have been notified',
	'These things happen sometimes. Try again after after some time.',
	'Ooops! Our problem. We are looking into this one',
];

const errLogger = (error, req, res, next) => {
	let at = error.stack.split(/\r\n|\r|\n/)[1];
	console.error(`${error.message}- happended at \n ${at}`);
	/* c8 ignore next 5 */
	if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
		return res
			.status(406)
			.send({ code: 406, status: 'fail', message: error.message }); // Bad request
	} else {
		return handleResponse(
			res,

			500,
			errorMessage[Math.floor(Math.random() * errorMessage.length)]
		);
	}
};

export default errLogger;
