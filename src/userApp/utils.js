import nodemailer from 'nodemailer';
import logger from '../configs/winston.js';
import renderEmail from '../user/emailMessage.js';

const sendResetEmail = async (link, email, user) => {
	const transport = nodemailer.createTransport({
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
	});
	const message = {
		from: 'adeoabdul.b@gmail.com',
		to: email,
		envelope: {
			from: `Phantom Reset Password <phantom@feyton.co.rw>`,
			to: `${email}, ${user.firstName} <${email}>`,
		},
		subject: 'Password reset request',
		html: renderEmail(link),
		text: link,
	};

	try {
		await transport.sendMail(message);
		logger.info('Reset password email link has been sent');
		return true;
	} catch (error) {
		logger.error(error.message);
		return false;
	}
};

export default sendResetEmail;
