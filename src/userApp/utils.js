import nodemailer from 'nodemailer';
import logger from '../configs/winston.js';
import renderEmail from './emailMessage.js';

const sendResetEmail = async (link, email, user) => {
	const testAccount = await nodemailer.createTestAccount();

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
				user: testAccount.user,
				pass: testAccount.pass,
			},
		},
	};
	emailOptions.development = emailOptions.test;
	const mode = process.env.NODE_ENV /* c8 ignore next */ || 'development';
	const transport = nodemailer.createTransport(
		emailOptions[mode] /* c8 ignore next */ || emailOptions.development
	);
	const message = {
		from: 'phantomcodebandits@gmail.com',
		to: email,
		envelope: {
			from: `Phantom Reset Password <phantomcodebandits@gmail.com>`,
			to: `${user.firstName} <${email}>`,
		},
		subject: 'Password reset request',
		html: renderEmail(link),
		text: link,
	};

	try {
		const email = await transport.sendMail(message);
		logger.info('Reset password email link has been sent');
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

export default sendResetEmail;
