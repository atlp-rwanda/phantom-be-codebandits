import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'dotenv/config';
import app from '../../app.js';
import dataFn from '../../configs/tests/dummyData.js';
import { signTestToken } from '../../configs/tests/testUtils.js';
import logger from '../../configs/winston.js';
import DataSource from '../../data-source.js';
import Driver from '../../driverApp/models.js';
import User from '../../models/user.js';
import Operator from '../../operatorApp/models.js';
import { BusRepository } from '../../simulateApp/models.js';

chai.use(chaiHttp);
chai.should();

describe('PROFILE VIEW', () => {
	before(async () => {
		try {
			await DataSource.query('TRUNCATE "Driver" CASCADE');
			await DataSource.query('TRUNCATE "User" CASCADE');
			await DataSource.query('TRUNCATE "Operator" CASCADE');
			const buses = await BusRepository.search().return.all();
			buses.forEach(async (bus) => {
				await BusRepository.remove(bus.entityId);
			});
		} catch (error) {
			logger.error(error.message);
		}
	});
	let token;
	let driverInfo;
	let data;
	it('Initialize data', async () => {
		data = await dataFn();
		driverInfo = data.drivers.valid;
		const driverUser = User.create({
			...driverInfo,
			password: data.users.operator.password,
			role: 'driver',
		});
		const driver = Driver.create(driverInfo);
		driver.user = driverUser;
		const driverSaved = await driver.save();
		token = signTestToken({ id: driverSaved.user.id, role: 'driver' });
	});
	it('should return a driver profile', async () => {
		const res = await chai
			.request(app)
			.get('/api/v1/accounts/profile')
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(200);
	});
	it('should update a driver profile', async () => {
		const res = await chai
			.request(app)
			.post('/api/v1/accounts/profile')
			.send({ firstName: 'Feyton', mobileNumber: '0788498955' })
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(200);
	});
	it('should return 404 as user does not exist', async () => {
		token = signTestToken({ id: 10000, role: 'driver' });
		const res = await chai
			.request(app)
			.get('/api/v1/accounts/profile')
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(404);
	});
	it('should return 404 as user does not exist', async () => {
		token = signTestToken({ id: 10000, role: 'driver' });
		const res = await chai
			.request(app)
			.post('/api/v1/accounts/profile')
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(404);
	});
	it('Get operator profile', async () => {
		const operator = data.operators.valid;
		operator.email = 'test123@operator.com';
		const user = User.create({
			...operator,
			password: 'andela@1234',
			role: 'operator',
		});
		const newOp = Operator.create(operator);
		newOp.user = user;
		const saved = await newOp.save();
		token = signTestToken({ id: saved.user.id, role: 'operator' });
		const res = await chai
			.request(app)
			.get('/api/v1/accounts/profile')
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(200);
	});
	it('Update profile of operator', async () => {
		const res = await chai
			.request(app)
			.post('/api/v1/accounts/profile')
			.send({
				firstName: 'Abdul',
				mobileNumber: '0788498955',
			})
			.set('Authorization', `Bearer ${token}`);
		expect(res).to.have.status(200);
	});
});
