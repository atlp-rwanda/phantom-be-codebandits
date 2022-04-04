import nodemailer from 'nodemailer';

const mainNodemailer = async (receiver, subject, text, context) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		host: 'smtp.gmail.com',
		port: 587,
		secure: true,
		requireTLS: true,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});

	const info = await transporter.sendMail({
		from: process.env.EMAIL_USER,
		to: receiver,
		subject,
		text,
		html: context,
	});
	return info;
};

export default mainNodemailer;
