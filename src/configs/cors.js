/* eslint-disable func-names */
/* eslint-disable object-shorthand */
const whiteList = [
	'http://localhost:3000',
	'http://127.0.0.1:3000',
	'http://127.0.0.1:5000',
	'https://phantom-codebandits-staging.herokuapp.com',
	'https://phantom-codebandits-pro.herokuapp.com',
	'https://phantom-codebantis.herokuapp.com',
];

const corsOptions = {
	origin: function (origin, callback) {
		if (whiteList.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
			/* c8 ignore next 4 */
		} else {
			callback(null, true);
		}
	},
	methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
	preflightContinue: true,
	credentials: true,
	allowedHeaders: [
		'Content-Type',
		'Authorization',
		'X-Requested-With',
		'device-remember-token',
		'Access-Control-Allow-Origin',
		'Origin',
		'Accept',
		'Accept-Language',
		'Access-Control-Allow-Credentials',
		'Access-Control-Allow-Headers',
	],
};

export default corsOptions;
