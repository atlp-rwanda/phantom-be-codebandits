import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app.js';
import Bus from '../../busesApp/models.js';
import dataFn from '../../configs/tests/dummyData.js';
import logger from '../../configs/winston.js';
import DataSource from '../../data-source.js';
import User from '../../models/user.js';
import Route from '../../routeApp/models.js';

chai.use(chaiHttp);
chai.should();

describe('ASSIGN BUS TO ROUTE', async () => {
	before(async () => {
		try {
			await DataSource.query('TRUNCATE "Route" CASCADE');
			await DataSource.query('TRUNCATE "User" CASCADE');
			await DataSource.query('TRUNCATE "Bus" CASCADE');
		} catch (error) {
			logger.error(error.message);
		}
	});

	let plate1;
	let plate2;
	let code1;
	let code2;
	let token;
	const data = dataFn();
	let routeId;

	it('should login an admin user', async () => {
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

	it('should create basic data in database', async () => {
		const Bus1 = await Bus.createAndSave(data.buses.valid);
		const Bus2 = await Bus.createAndSave(data.buses.valid2);
		const Route1 = await Route.createAndSave({
			...data.routes.valid,
			code: 'RN4ST',
		});
		const Route2 = await Route.createAndSave({
			...data.routes.valid2,
			code: 'RN1ST',
		});
		const res = await chai
			.request(app)
			.get(`/api/v1/routes/${Route1.id}`)
			.set('Authorization', `Bearer ${token}`);

		expect(res).to.have.status(200);
		plate1 = Bus1.plateNumber;
		plate2 = Bus2.plateNumber;
		code1 = Route1.code;
		code2 = Route2.code;
		routeId = Route2.id;
		expect(plate2).to.eql('RAB123A');
	});

	it('Should not find the bus', async () => {
		const res = await chai
			.request(app)
			.post(`/api/v1/bus-to-routes/RAB432B/RBS56`)
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(400);
	});
	it('Should not find the route', async () => {
		const res = await chai
			.request(app)
			.post(`/api/v1/bus-to-routes/${plate1}/RHS65`)
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(400);
	});
	it('Should assign a new route to the bus', async () => {
		const res = await chai
			.request(app)
			.post(`/api/v1/bus-to-routes/${plate1}/${code1}`)
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(200);
		expect(res.body).to.be.an('object');
		expect(res.body).to.have.property('status');
		expect(res.body).to.have.property('data');
	});

	it('Should return bus with the assigned route', async () => {
		const res = await chai
			.request(app)
			.get(`/api/v1/bus-to-routes/${plate1}`)
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(200);
		expect(res.body.data).to.have.property('routeId').to.not.eql(null);
	});
	it('Should return bus without the assigned route', async () => {
		const res = await chai
			.request(app)
			.get(`/api/v1/bus-to-routes/${plate1}`)
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(200);
	});
	it('Should remove the assigned route', async () => {
		const res = await chai
			.request(app)
			.put(`/api/v1/bus-to-routes/${plate1}`)
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(200);
		expect(res.body.data).to.have.property('routeId').to.eql(null);
	});
	it('Should not remove when bus not registered', async () => {
		const res = await chai
			.request(app)
			.put(`/api/v1/bus-to-routes/RAB345V`)
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(404);
	});
	it('Should return bus without the assigned route', async () => {
		const res = await chai
			.request(app)
			.get(`/api/v1/bus-to-routes/${plate1}`)
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(200);
		expect(res.body.data).to.have.property('routeId').to.eql(null);
	});
	it('Should not find the bus and return 404', async () => {
		const res = await chai
			.request(app)
			.get(`/api/v1/bus-to-routes/RAB000V`)
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(404);
	});
	it('Should return invalid plate number error', async () => {
		const res = await chai
			.request(app)
			.get(`/api/v1/bus-to-routes/RAB00`)
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(400);
	});
	it('Should assign a new route to the bus', async () => {
		const res = await chai
			.request(app)
			.post(`/api/v1/bus-to-routes/${plate1}/${code2}`)
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(200);
		expect(res.body).to.be.an('object');
		expect(res.body).to.have.property('status');
		expect(res.body).to.have.property('data');
	});
	it('Should retrive the route with related buses', async () => {
		const res = await chai
			.request(app)
			.get(`/api/v1/routes/${routeId}`)
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(200);
		expect(res.body).to.be.an('object');
		expect(res.body).to.have.property('status');
		expect(res.body).to.have.property('data');
	});
});
