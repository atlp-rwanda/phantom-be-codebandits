import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app.js';
import dataFn from '../../configs/tests/dummyData.js';
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
	const data = dataFn();
	it('should login an operator user', async () => {
		driverInfo = data.drivers.valid;
		const user = await User.createAndSave(data.users.operator);
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
	it('should get a driver public ID', async () => {
		const response = await chai
			.request(app)
			.get(`/api/v1/drivers/public-profile/${createdDriverId}`);
		expect(response).to.have.status(200);
	});
	it('should not get a driver public for non existent driver', async () => {
		const response = await chai
			.request(app)
			.get(`/api/v1/drivers/public-profile/${createdDriverId + 200}`);
		expect(response).to.have.status(404);
	});
	it('should edit a driver', async () => {
		const response = await chai
			.request(app)
			.put(`/api/v1/drivers/${createdDriverId}`)
			.send(data.drivers.edit)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(200);
		expect(response.body.data.message).to.contain(
			'Driver updated successfully'
		);
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
			.to.equal('0788352746');
	});
	it('should get all drivers', async () => {
		const response = await chai
			.request(app)
			.get('/api/v1/drivers')
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(200);
	});
	it('should get all drivers with relations', async () => {
		const response = await chai
			.request(app)
			.get('/api/v1/drivers?relation=true')
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
