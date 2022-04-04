import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app.js';
import logger from '../../configs/winston.js';
import DataSource from '../../data-source.js';

chai.use(chaiHttp);
chai.should();

describe('userRouter', () => {
	before(async () => {
		try {
			await DataSource.query('TRUNCATE "RefreshToken" CASCADE');
			await DataSource.query('TRUNCATE "User" CASCADE');
		} catch (error) {
			logger.error(error.message);
		}
	});

	it('it should raise an authorization error', async () => {
		const response = await chai.request(app).get('/api/v1/users');
		expect(response).to.have.status(401);
	});
	it('it should create a new user', async () => {
		const response = await chai.request(app).post('/api/v1/users').send({
			firstName: 'Fabrice',
			lastName: 'Ivad',
			email: 'test@mail.com',
			password: 'Andela@1234',
			role: 'operator',
		});
		expect(response).to.have.status(201);
		expect(response.body.data)
			.to.have.property('email')
			.to.equal('test@mail.com');
		expect(response.body.data).not.have.property('password');
	});
	it('it should return a conflict error', async () => {
		const response = await chai.request(app).post('/api/v1/users').send({
			firstName: 'Fabrice',
			lastName: 'Ivad',
			email: 'test@mail.com',
			password: 'Andela@123',
			role: 'admin',
		});
		expect(response).to.have.status(400);
	});
	it('it should return raise a validation error', async () => {
		const response = await chai.request(app).post('/api/v1/users').send({
			email: 'test1@mail.com',
			password: '1234',
		});
		expect(response).to.have.status(400);
	});
});
