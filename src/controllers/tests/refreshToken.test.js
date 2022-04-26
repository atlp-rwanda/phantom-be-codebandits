import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import server from '../../app.js';
import logger from '../../configs/winston.js';
import DataSource from '../../data-source.js';

dotenv.config();

chai.use(chaiHttp);
chai.should();

describe('REFRESH', () => {
	before(async () => {
		try {
			await DataSource.query('TRUNCATE "RefreshToken" CASCADE');
			await DataSource.query('TRUNCATE "User" CASCADE');
		} catch (error) {
			logger.error(error.message);
		}
	});

	describe('REFRESH Token', () => {
		it('it should provide a new token ', (done) => {
			chai
				.request(server)
				.post('/api/v1/users')
				.send({
					firstName: 'Patrick',
					lastName: 'Shema',
					email: 'patrickshema@gmail.com',
					password: 'Andela@123',
					role: 'admin',
				})
				.end((err, res) => {
					res.should.have.status(201);
					chai
						.request(server)
						.post('/api/v1/accounts/login')
						.send({
							email: 'patrickshema@gmail.com',
							password: 'Andela@123',
						})
						.end((err, res) => {
							res.should.have.status(200);
							chai
								.request(server)
								.get('/api/v1/accounts/refresh')
								.set('Cookie', res.headers['set-cookie'])
								.end((err, res) => {
									res.should.have.status(200);
									res.body.should.be.a('object');
									res.body.should.have.property('data');
									res.body.data.should.have.property('access_token');
									done();
								});
						});
				});
		});
	});
	describe('Refresh Token Error', () => {
		it('it should return an error if the user is not logged in', (done) => {
			chai
				.request(server)
				.get('/api/v1/accounts/refresh')
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.should.have.property('data');
					res.body.data.should.have.property('message');
					done();
				});
		});
	});
	describe('Refresh Token Error', () => {
		it('it should return an error if the refresh token is not in the database', (done) => {
			chai
				.request(server)
				.get('/api/v1/accounts/refresh')
				.set('Cookie', 'jwt=bkjfsdkjdfdlsbdshlhjdlhd')
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.should.have.property('data');
					res.body.data.should.have.property('message');
					done();
				});
		});
	});
});
