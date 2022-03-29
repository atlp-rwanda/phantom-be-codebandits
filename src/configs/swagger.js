const serverURL = process.env.SERVER_URL;

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Phantom Backend',
			version: '1.0.0',
			description: 'API Documentation for Phantom project backend',
			contact: {
				name: 'Codebandits',
				url: 'https://github.com/atlp-rwanda/phantom-be-codebandits',
			},
			license: {
				name: 'ISC',
				url: 'https://opensource.org/licenses/ISC',
			},
		},
		servers: [
			{
				url: serverURL || 'http://localhost:5000/',
			},
		],
	},
	apis: ['src/**/*.js'],
};

export default options;

