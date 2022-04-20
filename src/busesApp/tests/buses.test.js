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
	let data;
	it('should login an operator user', async () => {
		data = await dataFn();
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
			.get(`/api/v1/buses/${createdBusId}`)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(200);
		expect(response.body).to.be.an('object');
		expect(response.body).to.have.property('status');
		expect(response.body).to.have.property('code');
		expect(response.body).to.have.property('data');
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
