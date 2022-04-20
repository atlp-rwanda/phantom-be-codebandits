const serverURL = process.env.SERVER_URL;

export const customizationOptions = {
	customCssUrl: '/swagger.css',
	customSiteTitle: 'DOCS| Phantom Codebandits',
	customfavIcon:
		'https://res.cloudinary.com/feyton/image/upload/v1644861999/Codebandits/codebandits_favicon_ahnxce.png',
};

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
				/* c8 ignore next 1 */
				url: serverURL || 'http://localhost:5000/',
				description: 'Phantom Server',
			},
		],
	},
	apis: ['src/**/*.js'],
};

export default options;
