import nodemailer from 'nodemailer';

const mainNodemailer = async (receiver, subject, text, context) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		host: 'smtp.gmail.com',
		port: 587,
		secure: true,
		requireTLS: true,
		auth: {
			user: 'adeoabdul.b@gmail.com',
			pass: process.env.EMAIL_PSWD,
		},
	});

	const info = await transporter.sendMail({
		from: 'adeoabdul.b@gmail.com',
		to: receiver,
		subject,
		text,
		html: context,
	});

	// console.log("Message sent: %s", info.messageId);
	// console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	return info;
};

export default mainNodemailer;
