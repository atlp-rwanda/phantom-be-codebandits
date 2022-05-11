import 'dotenv/config';
import nodemailer from 'nodemailer';
import logger from '../configs/winston.js';
import renderHtml from '../templates/renderHtml.js';

const mode = process.env.NODE_ENV /* c8 ignore next */ || 'development';

const emailOptions = {
	production: {
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
		tls: {
			rejectUnauthorized: false,
		},
	},
	test: {
		host: 'smtp.ethereal.email',
		port: 587,
		secure: false,
		auth: {
			user:
				process.env.TEST_EMAIL_USER /* c8 ignore next */ ||
				'roma.wunsch32@ethereal.email',
			pass:
				process.env.TEST_EMAIL_AUTH /* c8 ignore next */ ||
				'qVS2TJ9SymvgG2MnV6',
		},
	},
};
emailOptions.development = emailOptions.test;

const EmailHandler = async (template, data, { title, subject }) => {
	const transport = nodemailer.createTransport(
		emailOptions[mode] /* c8 ignore next */ || emailOptions.development
	);

	const from = 'phantomcodebandits@gmail.com';

	const message = {
		from,
		to: data.email,
		subject,
		envelope: {
			from: `${title /* c8 ignore next */ || 'Update from Phantom'} <${from}>`,
			to: `${data.name /* c8 ignore next */ || 'User'} <${data.email}>`,
		},
		html: renderHtml(template, data).html,
		text: renderHtml(template, data).plain,
	};

	try {
		const email = await transport.sendMail(message);
		logger.info(`${title}- Email sent`);
		/* c8 ignore next 3 */
		if (mode === 'test' || mode === 'development' || mode === undefined) {
			logger.info(`PREVIEW: ${nodemailer.getTestMessageUrl(email)}`);
		}
		return true;
		/* c8 ignore next 4 */
	} catch (error) {
		logger.error(error.message);
		return false;
	}
};

export default EmailHandler;
