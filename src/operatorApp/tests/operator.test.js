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
		expect(response.body.data).to.have.length(0);
	});
	it('should create a new operator', async () => {
		operatorInfo = {
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
	it('should edit an operator', async () => {
		const editInfo = {
			lastName: 'Samuel',
			firstName: 'Shyaka',
			wrongKey: 'nananana',
			email: 'yvesivad@gmail.com',
			role: 'admin',
			mobileNumber: '0788231378',
		};
		const response = await chai
			.request(app)
			.put(`/api/v1/operators/${createdOperatorID}`)
			.send(editInfo)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(200);
		expect(response.body.data).to.contain('Operator updated successfully');
	});
	it('should get updated operator with updated info', async () => {
		const response = await chai
			.request(app)
			.get(`/api/v1/operators/${createdOperatorID}`)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(200);
		expect(response.body.data.user)
			.to.have.property('firstName')
			.to.equal('Shyaka');
		expect(response.body.data.user)
			.to.have.property('lastName')
			.to.equal('Samuel');
		expect(response.body.data)
			.to.have.property('mobileNumber')
			.to.equal('0788231378');
	});
	it('should ignore bad data while editing an operator', async () => {
		const editInfo = {
			names: 'Samuel',
			first: 'Shyaka',
			wrongKey: 'nananana',
			phone: '0788231378',
		};
		const response = await chai
			.request(app)
			.put(`/api/v1/operators/${createdOperatorID}`)
			.send(editInfo)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(200);
		expect(response.body.data).to.contain('Operator updated successfully');
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
	it('should not edit unregistered operator', async () => {
		const response = await chai
			.request(app)
			.put('/api/v1/operators/1000000')
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
