import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app.js';
import Bus from '../../busesApp/models.js';
import dataFn from '../../configs/tests/dummyData.js';
import { signTestToken } from '../../configs/tests/testUtils.js';
import logger from '../../configs/winston.js';
import DataSource from '../../data-source.js';
import Driver from '../../driverApp/models.js';
import User from '../../models/user.js';
import Route from '../../routeApp/models.js';

chai.use(chaiHttp);
chai.should();

describe('SIMULATE BUS MOTION', () => {
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
	let token;
	let data;
	let driverInfo;
	it('Initialize required data', async () => {
		data = await dataFn();
		driverInfo = data.drivers.valid;
		const driverUser = User.create({
			...driverInfo,
			password: data.users.operator.password,
			role: 'driver',
		});
		const driver = Driver.create(driverInfo);
		driver.user = driverUser;
		driverInfo = await driver.save();
		expect(driverInfo).to.have.property('id');
	});
	it('Return 404 for driver not found', async () => {
		token = signTestToken({ id: 300, role: 'driver' });
		const res = await chai
			.request(app)
			.post('/api/v1/simulate')
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(404);
		expect(res.body.data)
			.to.have.property('message')
			.to.eql('Driver not found');
	});
	it('Should return bad request as we have no bus for driver', async () => {
		token = signTestToken({ id: driverInfo.user.id, role: 'driver' });
		const res = await chai
			.request(app)
			.post('/api/v1/simulate')
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(400);
	});

	it('Should return bad request for missing route on assigned bus', async () => {
		const Bus1 = await Bus.createAndSave(data.buses.valid);
		plate1 = Bus1.plateNumber;
		const driver = await Driver.findOneBy({ id: driverInfo.id });
		await Bus.updateById(Bus1.id, { driver: driver.id });
		Bus1.driver = driver;
		await Bus1.save();
		const res = await chai
			.request(app)
			.post('/api/v1/simulate')
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(400);
		expect(res.body.data)
			.to.haveOwnProperty('message')
			.to.eql('Not allowed to start the bus without route');
	});
	it('Should get the trip for bus buses', async () => {
		const res = await chai.request(app).get(`/api/v1/simulate/check/${plate1}`);
		expect(res).to.have.status(400);
		expect(res.body.data).to.have.property('message');
	});

	it('Should start the trip', async () => {
		// Assign route to bus
		const route = await Route.createAndSave(data.routes.withPoints);
		const bus = await Bus.findByPlate(plate1);
		bus.route = route;
		await bus.save();
		const res = await chai
			.request(app)
			.post('/api/v1/simulate')
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(200);
		expect(res.body.data.inProgress).to.equal(false);
	});
	it('Should resume the trip', async () => {
		// Assign route to bus
		const res = await chai
			.request(app)
			.post('/api/v1/simulate')
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(200);
		expect(res.body.data.inProgress).to.equal(true);
	});

	it('Should get available buses', async () => {
		const res = await chai.request(app).get('/api/v1/simulate');
		expect(res).to.have.status(200);
		expect(res.body.data).to.have.length(1);
	});
	it('Should get the trip for bus buses', async () => {
		const res = await chai.request(app).get(`/api/v1/simulate/check/${plate1}`);
		expect(res).to.have.status(200);
	});
	it('Should get all available routes as options', async () => {
		const res = await chai.request(app).get('/api/v1/simulate/options');
		expect(res).to.have.status(200);
		expect(res.body.data).to.property('options');
	});
});
