import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { v4 as uuid } from 'uuid';
import app from '../../app.js';
import logger from '../../configs/winston.js';
import AppDataSource from '../../data-source.js';
import User from '../../models/user.js';
import ResetToken from '../models.js';

chai.use(chaiHttp);
chai.should();

describe('Reset password controllers tests', () => {
	before(async () => {
		try {
			await AppDataSource.query('TRUNCATE "RefreshToken" CASCADE');
			await AppDataSource.query('TRUNCATE "User" CASCADE');
		} catch (error) {
			logger.error(error.message);
		}
	});
	let token;

	it('Create a user', async () => {
		const res = await chai.request(app).post('/api/v1/users').send({
			firstName: 'Patrick',
			lastName: 'Shema',
			email: 'user@gmail.com',
			password: 'PasswordToForget@123',
			role: 'admin',
		});
		expect(res).to.have.status(201);
	});

	it('should return invalid error', async () => {
		const response = await chai
			.request(app)
			.post(`/api/v1/accounts/forgot-password/`)
			.send({ email: 'usercom' });
		expect(response).to.have.status(400);
	});
	it('should send email', async () => {
		const response = await chai
			.request(app)
			.post(`/api/v1/accounts/forgot-password/`)
			.send({ email: 'user@gmail.com' });
		expect(response).to.have.status(200);
	});
	it('should return a user not found error', async () => {
		const response = await chai
			.request(app)
			.post(`/api/v1/accounts/forgot-password/`)
			.send({ email: 'user123@gmail.com' });
		expect(response).to.have.status(400);
	});

	it('should return a valid token response', async () => {
		const newUser = User.create({
			email: 'test123@gmail.com',
			password: 'Andela@123',
			firstName: 'test',
			lastName: 'Andela',
			role: 'Admin',
		});
		const user = await User.save(newUser);
		const time = new Date();
		const resetToken = ResetToken.create({
			token: uuid(),
			expiration: new Date(time.setSeconds(time.getSeconds() + 86400)),
		});
		resetToken.user = user;
		await resetToken.save();
		token = resetToken.token;
		const response = await chai
			.request(app)
			.get(`/api/v1/accounts/reset-password/${resetToken.token}`)
			.send({ email: 'user@gmail.com' });
		expect(response).to.have.status(200);
		expect(response.body.data).to.have.property('token');
	});
	it('should reset password', async () => {
		const resetPass = { password: 'Password@123' };
		const response = await chai
			.request(app)
			.post(`/api/v1/accounts/reset-password/${token}`)
			.send(resetPass);
		expect(response).to.have.status(200);
	});

	it('should return a valid token response', async () => {
		const newUser = User.create({
			email: 'test12345@gmail.com',
			password: 'Andela@123',
			firstName: 'test',
			lastName: 'Andela',
			role: 'Admin',
		});
		const user = await User.save(newUser);
		const time = new Date();
		const resetToken = ResetToken.create({
			token: uuid(),
			expiration: new Date(time.setSeconds(time.getSeconds() - 86400)),
		});
		resetToken.user = user;
		await resetToken.save();
		token = resetToken.token;
		const response = await chai
			.request(app)
			.get(`/api/v1/accounts/reset-password/${resetToken.token}`)
			.send({ email: 'user@gmail.com' });
		expect(response).to.have.status(401);
		expect(response.body.data).to.not.have.property('token');
	});

	it('should return a valid token response', async () => {
		const newUser = User.create({
			email: 'test123999@gmail.com',
			password: 'Andela@123',
			firstName: 'test',
			lastName: 'Andela',
			role: 'Admin',
		});
		const user = await User.save(newUser);
		const time = new Date();
		const resetToken = ResetToken.create({
			token: uuid(),
			expiration: new Date(time.setSeconds(time.getSeconds() - 86400)),
		});
		resetToken.user = user;
		await resetToken.save();
		token = resetToken.token;
		const response = await chai
			.request(app)
			.post(`/api/v1/accounts/reset-password/${resetToken.token}`)
			.send({ password: 'Password@123' });
		expect(response).to.have.status(400);
		expect(response.body.data).to.not.have.property('token');
	});
	it('should return a valid token response', async () => {
		const newUser = User.create({
			email: 'test123990@gmail.com',
			password: 'Andela@123',
			firstName: 'test',
			lastName: 'Andela',
			role: 'Admin',
		});
		const user = await User.save(newUser);
		const time = new Date();
		const resetToken = ResetToken.create({
			token: uuid(),
			expiration: new Date(time.setSeconds(time.getSeconds() - 86400)),
		});
		resetToken.user = user;
		await resetToken.save();
		token = resetToken.token;
		const response = await chai
			.request(app)
			.post(`/api/v1/accounts/forgot-password`)
			.send({ email: 'test123990@gmail.com' });
		expect(response).to.have.status(200);
		expect(response.body.data).to.not.have.property('token');
	});
});
