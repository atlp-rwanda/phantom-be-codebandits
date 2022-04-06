import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app.js';
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
	it('it should get all users', async () => {
		const response = await chai.request(server).get('/api/v1/users');
		expect(response).to.have.status(200);
		expect(response.body.data).to.have.length(0);
	});
	it('it should create a new user', async () => {
		const response = await chai.request(server).post('/api/v1/users').send({
			firstName: 'Fabrice',
			lastName: 'Ivad',
			email: 'test@mail.com',
			password: '1234',
		});
		expect(response).to.have.status(201);
		expect(response.body.data)
			.to.have.property('email')
			.to.equal('test@mail.com');
	});
	it('it should return a conflict error', async () => {
		const response = await chai.request(server).post('/api/v1/users').send({
			firstName: 'Fabrice',
			lastName: 'Ivad',
			email: 'test@mail.com',
			password: '1234',
		});
		expect(response).to.have.status(409);
	});
	it('it should return raise a validation error', async () => {
		const response = await chai.request(server).post('/api/v1/users').send({
			email: 'test1@mail.com',
			password: '1234',
		});
		expect(response).to.have.status(400);
	});
});
