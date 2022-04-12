import bcrypt from 'bcrypt';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app.js';
import logger from '../../configs/winston.js';
import DataSource from '../../data-source.js';
import User from '../../models/user.js';

chai.use(chaiHttp);
chai.should();

describe('driver router tests', () => {
	before(async () => {
		try {
			await DataSource.query('TRUNCATE "Driver" CASCADE');
			await DataSource.query('TRUNCATE "User" CASCADE');
		} catch (error) {
			logger.error(error.message);
		}
	});
	let token;
	let createdDriverId;
	let driverInfo;
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
	it('should get return empty when no drivers ', async () => {
		const response = await chai
			.request(app)
			.get('/api/v1/drivers')
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(200);
		expect(response.body.data).to.have.length(0);
	});
	it('should create a new driver', async () => {
		driverInfo = {
			firstName: 'testName',
			lastName: 'testname2',
			email: 'tiktok@me.com',
			mobileNumber: '0788352746',
			company: 'Kigali Bus Services',
			address: 'Kabuga, Kigali',
			nationalID: '1200080081691164',
			license: '1200080081691164',
		};
		const response = await chai
			.request(app)
			.post('/api/v1/drivers')
			.send(driverInfo)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(201);
		createdDriverId = response.body.data.id;
	});
	it('should not create a same driver twice', async () => {
		const response = await chai
			.request(app)
			.post('/api/v1/drivers')
			.send(driverInfo)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(400);
	});
	it('should get a single driver', async () => {
		const response = await chai
			.request(app)
			.get(`/api/v1/drivers/${createdDriverId}`)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(200);
	});
	it('should edit a driver', async () => {
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
			.put(`/api/v1/drivers/${createdDriverId}`)
			.send(editInfo)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(200);
		expect(response.body.data).to.contain('Driver updated successfully');
	});
	it('should get updated driver with updated info', async () => {
		const response = await chai
			.request(app)
			.get(`/api/v1/drivers/${createdDriverId}`)
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
	it('should get all drivers', async () => {
		const response = await chai
			.request(app)
			.get('/api/v1/drivers')
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(200);
	});
	it('should delete a driver', async () => {
		const deleteResponse = await chai
			.request(app)
			.delete(`/api/v1/drivers/${createdDriverId}`)
			.set('Authorization', `Bearer ${token}`);
		expect(deleteResponse).to.have.status(200);
	});
	it('should not get unregistered driver', async () => {
		const response = await chai
			.request(app)
			.get('/api/v1/drivers/1000')
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(404);
	});
	it('should not delete unregistered driver', async () => {
		const response = await chai
			.request(app)
			.delete('/api/v1/drivers/1000')
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(404);
	});
});
