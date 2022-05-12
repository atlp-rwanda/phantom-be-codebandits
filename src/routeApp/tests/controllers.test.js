import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app.js';
import dataFn from '../../configs/tests/dummyData.js';
import logger from '../../configs/winston.js';
import DataSource from '../../data-source.js';
import User from '../../models/user.js';

chai.use(chaiHttp);
chai.should();

describe('Route router tests', async () => {
	before(async () => {
		try {
			await DataSource.query('TRUNCATE "Route" CASCADE');
			await DataSource.query('TRUNCATE "User" CASCADE');
		} catch (error) {
			logger.error(error.message);
		}
	});

	let routeEdit;
	let token;
	let routeData;
	let data;

	it('should login an admin user', async () => {
		data = await dataFn();
		const user = await User.createAndSave(data.users.admin);
		const info = { email: user.email, password: 'Andela@1234' };
		const response = await chai
			.request(app)
			.post('/api/v1/accounts/login')
			.send(info);
		expect(response).to.have.status(200);
		expect(response.body).to.be.an('object');
		expect(response.body).to.have.property('status');
		expect(response.body).to.have.property('data');
		token = response.body.data.access_token;
	});

	it('should get response with no Routes', async () => {
		const res = await chai
			.request(app)
			.get('/api/v1/routes')
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(200);
		expect(res.body.data).to.have.length(0);
	});

	it('should create a new Route', async () => {
		routeData = data.routes.valid;
		const res = await chai
			.request(app)
			.post('/api/v1/routes')
			.send(routeData)
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(201);
		expect(res.body).to.be.an('object');
		expect(res.body).to.have.property('status');
		expect(res.body).to.have.property('data');

		routeEdit = res.body.data.id;
	});

	it('should not create a new Route that already exist', async () => {
		const res = await chai
			.request(app)
			.post('/api/v1/routes')
			.send(routeData)
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(409);
	});

	it('should not create a new Route with invalid data', async () => {
		routeData = data.routes.invalid;
		const res = await chai
			.request(app)
			.post('/api/v1/routes')
			.send(routeData)
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(400);
	});

	it('should get all Routes', async () => {
		const res = await chai
			.request(app)
			.get('/api/v1/routes')
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(200);
	});

	it('should get single Route with Id', async () => {
		const response = await chai
			.request(app)
			.get(`/api/v1/routes/${routeEdit}`)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(200);
	});
	it('should not get single Route with Id', async () => {
		const response = await chai
			.request(app)
			.get(`/api/v1/routes/1000`)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(404);
	});
	it('should not get route with malformed id', async () => {
		const response = await chai
			.request(app)
			.get(`/api/v1/routes/null`)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(404);
	});
	it('should Edit Route', async () => {
		const editRoute = data.routes.edit;
		const response = await chai
			.request(app)
			.put(`/api/v1/routes/${routeEdit}`)
			.send(editRoute)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(200);
	});
	it('should not edit the route that does not exist', async () => {
		const editRoute = data.routes.valid;
		const response = await chai
			.request(app)
			.put(`/api/v1/routes/${routeEdit + 1000}`)
			.send(editRoute)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(404);
	});

	it('should get updated Route with updated data', async () => {
		const response = await chai
			.request(app)
			.get(`/api/v1/routes/${routeEdit}`)
			.set('Authorization', `Bearer ${token}`);
		expect(response).to.have.status(200);
		expect(response.body.data).to.have.property('origin').to.equal('Nyanza');
		expect(response.body.data)
			.to.have.property('destination')
			.to.equal('Remera');
		expect(response.body.data).to.have.property('distance').to.equal(146);
	});
	it('should delete existing Route', async () => {
		const res = await chai
			.request(app)
			.delete(`/api/v1/routes/${routeEdit}`)
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(200);
		expect(res.body.data.message).to.contain('Route deleted successfully');
	});
	it('should not delete route that does not exist', async () => {
		const res = await chai
			.request(app)
			.delete(`/api/v1/routes/${routeEdit}`)
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(404);
	});

	it('should get response with no Routes after deletion', async () => {
		const res = await chai
			.request(app)
			.get('/api/v1/routes')
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(200);
		expect(res.body.data).to.have.length(0);
	});
});
