import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app.js';
import logger from '../../configs/winston.js';
import AppDataSource from '../../data-source.js';
import User from '../../models/user.js';

chai.use(chaiHttp);
chai.should();

describe('ROLES AND PERMISSIONS', async () => {
	before(async () => {
		try {
			await AppDataSource.query('TRUNCATE "User" CASCADE');
		} catch (error) {
			logger.error(error.message);
		}
	});
	let token;
	let userId;
	describe('Driver accessing routes', async () => {
		before(async () => {
			const password = 'Andela@1234';
			const user = {
				email: 'driver@gmail.com',
				password,
				firstName: 'Test',
				lastName: 'Last',
				role: 'driver',
			};
			const saveUser = User.create(user);
			await saveUser.save();
			userId = saveUser.id;
			const res = await chai.request(app).post('/api/v1/accounts/login').send({
				email: 'driver@gmail.com',
				password: 'Andela@1234',
			});
			token = res.body.data.access_token;
		});
		it('Should return a list of users', async () => {
			const res = await chai
				.request(app)
				.get('/api/v1/users')
				.set('Authorization', `Bearer ${token}`);
			expect(res).to.have.status(200);
		});
		it('Should allow edit of own profile', async () => {
			const res = await chai
				.request(app)
				.put('/api/v1/drivers/123')
				.set('Authorization', `Bearer ${token}`);
			expect(res).to.have.status(404);
		});
		it('Return unauthorized for creating driver', async () => {
			const res = await chai
				.request(app)
				.post('/api/v1/drivers')
				.set('Authorization', `Bearer ${token}`);
			expect(res).to.have.status(403);
		});
		it('Return unauthorized for getting operators', async () => {
			const res = await chai
				.request(app)
				.post('/api/v1/operators')
				.set('Authorization', `Bearer ${token}`);
			expect(res).to.have.status(403);
		});
		it('Return unauthorized for invalid token', async () => {
			const res = await chai
				.request(app)
				.post('/api/v1/operators')
				.set('Authorization', `Bearer 123hdgdhdjjdhf`);
			expect(res).to.have.status(401);
		});
	});
	describe('Operator accessing drivers', async () => {
		before(async () => {
			const password = 'Andela@1234';
			const user = {
				email: 'operator@gmail.com',
				password,
				firstName: 'Test',
				lastName: 'Last',
				role: 'operator',
			};
			const saveUser = User.create(user);
			await saveUser.save();
			const res = await chai.request(app).post('/api/v1/accounts/login').send({
				email: 'operator@gmail.com',
				password: 'Andela@1234',
			});
			token = res.body.data.access_token;
		});
		it('Should return a list of users', async () => {
			const res = await chai
				.request(app)
				.get('/api/v1/users')
				.set('Authorization', `Bearer ${token}`);
			expect(res).to.have.status(200);
			expect(res.body).to.have.property('data');
		});
		it('Should allow edit of driver profile', async () => {
			const res = await chai
				.request(app)
				.put('/api/v1/drivers/123')
				.set('Authorization', `Bearer ${token}`);
			expect(res).to.have.status(404);
		});
		it('Return unauthorized for getting operators', async () => {
			const res = await chai
				.request(app)
				.post('/api/v1/operators')
				.set('Authorization', `Bearer ${token}`);
			expect(res).to.have.status(403);
		});
		it('Return a raised an error', async () => {
			const res = await chai
				.request(app)
				.delete('/api/v1/users')
				.set('Authorization', `Bearer ${token}`);
			expect(res).to.have.status(500);
		});
		it('Be allowed to delete an operator', async () => {
			const res = await chai
				.request(app)
				.delete('/api/v1/users/2345567')
				.set('Authorization', `Bearer ${token}`);
			expect(res).to.have.status(404);
		});
		it('Delete a driver', async () => {
			const res = await chai
				.request(app)
				.delete(`/api/v1/users/${userId}`)
				.set('Authorization', `Bearer ${token}`);
			expect(res).to.have.status(200);
		});
	});
});
