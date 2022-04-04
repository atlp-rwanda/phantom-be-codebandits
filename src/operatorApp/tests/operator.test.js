import bcrypt from 'bcrypt';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app.js';
import logger from '../../configs/winston.js';
import DataSource from '../../data-source.js';
import User from '../../models/user.js';

chai.use(chaiHttp);
chai.should();

describe('Operator router tests', () => {
	before(async () => {
		try {
			await DataSource.query('TRUNCATE "Operator" CASCADE');
			await DataSource.query('TRUNCATE "User" CASCADE');
		} catch (error) {
			logger.error(error.message);
		}
	});
	let operatorInfo;
	let createdOperatorID;
	let token;
	it('should login an admin user', async () => {
		const password = await bcrypt.hash('Andela@1234', 5);
		const newUser = User.create({
			email: 'test123@gmail.com',
			password,
			firstName: 'test',
			lastName: 'Andela',
			role: 'admin',
		});
		const user = await newUser.save();
		const info = { email: user.email, password: 'Andela@1234' };
		const response = await chai
			.request(app)
			.post('/api/v1/accounts/login')
			.send(info);
		expect(response).to.have.status(200);
		token = response.body.data.access_token;
	});
	it('should test that no user in database', async () => {
		const response = await chai
			.request(app)
			.get('/api/v1/operators')
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(200);
		expect(response.body.data).to.contain('No users in the database');
	});
	it('should create a new operator', async () => {
		const operatorInfo = {
			firstName: 'testName',
			lastName: 'testname2',
			email: 'tiktok@me.com',
			mobileNumber: '0788352746',
			company: 'Virunga express',
			address: 'Kabuga, Kigali',
			nationalID: '1199880081691164',
		};
		const response = await chai
			.request(app)
			.post('/api/v1/operators')
			.send(operatorInfo)
			.set('Authorization', `Bearer ${token}`);
		createdOperatorID = response.body.data.id;
		expect(response).to.have.status(201);
	});
	it('Should not register same operator twice', async () => {
		const response = await chai
			.request(app)
			.post('/api/v1/operators')
			.send(operatorInfo)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(400);
	});
	it('should get all operators', async () => {
		const response = await chai
			.request(app)
			.get('/api/v1/operators')
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(200);
	});
	it('Should get a single operator', async () => {
		const response = await chai
			.request(app)
			.get(`/api/v1/operators/${createdOperatorID}`)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(200);
	});
	it('Should delete an operator', async () => {
		const response = await chai
			.request(app)
			.delete(`/api/v1/operators/${createdOperatorID}`)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(200);
	});
	it('should not get unregistered operator', async () => {
		const response = await chai
			.request(app)
			.get('/api/v1/operators/1000000')
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(404);
	});
	it('should not delete unregistered operator', async () => {
		const response = await chai
			.request(app)
			.delete('/api/v1/operators/1000')
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(404);
	});
	it('should raise validation error', async () => {
		const operatorInfo = {
			firstName: 'testName',
			lastName: 'testname2',
			password: 'Password@123',
			mobileNumber: '0788352746',
			company: 'Virunga express',
			address: 'Kabuga, Kigali',
			nationalID: '1199880081691164',
		};
		const response = await chai
			.request(app)
			.post('/api/v1/operators')
			.send(operatorInfo)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(400);
	});
});
