import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app.js';
import dataFn from '../../configs/tests/dummyData.js';
import logger from '../../configs/winston.js';
import DataSource from '../../data-source.js';
import User from '../../models/user.js';

chai.use(chaiHttp);
chai.should();

describe('buses router tests', () => {
	before((done) => {
		app.on('started', async () => {
			try {
				await DataSource.query('TRUNCATE "User" CASCADE');
				await DataSource.query('TRUNCATE "Bus" CASCADE');
				await DataSource.query('TRUNCATE "Driver" CASCADE');
			} catch (error) {
				logger.error(error.message);
			} finally {
				done();
			}
		});
	});
	let token;
	let createdBusId;
	let busInfo;
	let createdDriverId;
	const data = dataFn();
	it('should login an operator user', async () => {
		busInfo = data.buses.valid;
		const user = await User.createAndSave(data.users.operator);
		const info = { email: user.email, password: 'Andela@1234' };
		const response = await chai
			.request(app)
			.post('/api/v1/accounts/login')
			.send(info);
		expect(response).to.have.status(200);
		expect(response.body).to.be.an('object');
		expect(response.body).to.have.property('status');
		expect(response.body).to.have.property('code');
		expect(response.body).to.have.property('data');
		token = response.body.data.access_token;
	});
	it('should create a driver to assign to a bus', async () => {
		const response = await chai
			.request(app)
			.post('/api/v1/drivers')
			.send(data.drivers.valid)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(201);
		createdDriverId = response.body.data.id;
	});
	it('should return empty when no buses ', async () => {
		const response = await chai
			.request(app)
			.get('/api/v1/buses')
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(200);
		expect(response.body).to.be.an('object');
		expect(response.body).to.have.property('status');
		expect(response.body).to.have.property('code');
		expect(response.body).to.have.property('data');
		expect(response.body.data).to.have.length(0);
	});
	it('should create a new bus', async () => {
		const response = await chai
			.request(app)
			.post('/api/v1/buses')
			.send(data.buses.valid2)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(201);
		expect(response.body).to.be.an('object');
		expect(response.body).to.have.property('status');
		expect(response.body).to.have.property('code');
		expect(response.body).to.have.property('data');
		createdBusId = response.body.data.id;
	});
	it('should create a second  new bus', async () => {
		const response = await chai
			.request(app)
			.post('/api/v1/buses')
			.send(busInfo)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(201);
		expect(response.body).to.be.an('object');
		expect(response.body).to.have.property('status');
		expect(response.body).to.have.property('code');
		expect(response.body).to.have.property('data');
		createdBusId = response.body.data.id;
	});
	it('should not create the same bus twice', async () => {
		const response = await chai
			.request(app)
			.post('/api/v1/buses')
			.send(busInfo)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(409);
		expect(response.body).to.be.an('object');
		expect(response.body).to.have.property('status');
		expect(response.body).to.have.property('code');
		expect(response.body).to.have.property('data');
	});
	it('should get a single bus', async () => {
		const response = await chai
			.request(app)
			.get(`/api/v1/buses/${createdBusId}?relation=true`)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(200);
		expect(response.body).to.be.an('object');
		expect(response.body).to.have.property('status');
		expect(response.body).to.have.property('code');
		expect(response.body).to.have.property('data');
	});
	it('should check that a bus has no driver assigned', async () => {
		const response = await chai
			.request(app)
			.get(`/api/v1/buses/${busInfo.plateNumber}/driver`)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(200);
		expect(response.body.data.message).to.contain('Bus has no driver assigned');
	});
	it('Should assign driver to a bus', async () => {
		const response = await chai
			.request(app)
			.post(`/api/v1/drivers/${createdDriverId}/bus/${busInfo.plateNumber}`)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(200);
	});
	it('should find that a bus has driver assigned', async () => {
		const response = await chai
			.request(app)
			.get(`/api/v1/buses/${busInfo.plateNumber}/driver`)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(200);
		expect(response.body.data.id).to.equal(createdDriverId);
	});
	it('Should not assign unregistered driver to a bus', async () => {
		const response = await chai
			.request(app)
			.post(`/api/v1/drivers/10000000/bus/${busInfo.plateNumber}`)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(404);
		expect(response.body.data.message).to.contain('Driver not found');
	});
	it('Should not assign driver to an unregistered bus', async () => {
		const response = await chai
			.request(app)
			.post(`/api/v1/drivers/${createdDriverId}/bus/R3ABAS1`)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(404);
		expect(response.body.data.message).to.contain('Bus not found');
	});
	it('should not find the bus driver when that bus is not registered', async () => {
		const response = await chai
			.request(app)
			.get(`/api/v1/buses/R3ABAS1/driver`)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(404);
		expect(response.body.data.message).to.contain('Bus not found');
	});
	it('should update the bus', async () => {
		const response = await chai
			.request(app)
			.put(`/api/v1/buses/${createdBusId}`)
			.send(data.buses.edit)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(200);
		expect(response.body).to.be.an('object');
		expect(response.body).to.have.property('status');
		expect(response.body).to.have.property('code');
		expect(response.body).to.have.property('data');
	});
	it('should not update bus update the bus', async () => {
		const response = await chai
			.request(app)
			.put(`/api/v1/buses/${createdBusId}`)
			.send(data.buses.valid2)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(409);
		expect(response.body).to.be.an('object');
		expect(response.body).to.have.property('status');
		expect(response.body).to.have.property('code');
	});

	it('should get all buses', async () => {
		const response = await chai
			.request(app)
			.get('/api/v1/buses')
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(200);
		expect(response.body).to.be.an('object');
		expect(response.body).to.have.property('status');
		expect(response.body).to.have.property('code');
		expect(response.body).to.have.property('data');
	});
	it('should get all buses with relations', async () => {
		const response = await chai
			.request(app)
			.get('/api/v1/buses?relation=true')
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(200);
		expect(response.body).to.be.an('object');
		expect(response.body).to.have.property('status');
		expect(response.body).to.have.property('code');
		expect(response.body).to.have.property('data');
		expect(response.body.data[0]).to.have.property('route');
	});
	it('should delete a bus', async () => {
		const deleteResponse = await chai
			.request(app)
			.delete(`/api/v1/buses/${createdBusId}`)
			.set('Authorization', `Bearer ${token}`);
		expect(deleteResponse).to.have.status(200);
		expect(deleteResponse.body).to.be.an('object');
		expect(deleteResponse.body).to.have.property('status');
		expect(deleteResponse.body).to.have.property('code');
		expect(deleteResponse.body).to.have.property('data');
	});
	it('should not get the unregistered bus', async () => {
		const response = await chai
			.request(app)
			.get('/api/v1/buses/1000')
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(404);
		expect(response.body).to.be.an('object');
		expect(response.body).to.have.property('status');
		expect(response.body).to.have.property('code');
		expect(response.body).to.have.property('data');
	});
	it('should not update the unregistered bus', async () => {
		const response = await chai
			.request(app)
			.put('/api/v1/buses/1000')
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(404);
		expect(response.body).to.be.an('object');
		expect(response.body).to.have.property('status');
		expect(response.body).to.have.property('code');
		expect(response.body).to.have.property('data');
	});
	it('should not delete the unregistered bus', async () => {
		const response = await chai
			.request(app)
			.delete('/api/v1/buses/1000')
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(404);
		expect(response.body).to.be.an('object');
		expect(response.body).to.have.property('status');
		expect(response.body).to.have.property('code');
		expect(response.body).to.have.property('data');
	});
});
