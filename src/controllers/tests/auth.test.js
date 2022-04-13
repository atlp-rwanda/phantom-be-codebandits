import chai from 'chai';
import chaiHttp from 'chai-http';
import 'dotenv/config';
import server from '../../app.js';
import logger from '../../configs/winston.js';
import DataSource from '../../data-source.js';

chai.use(chaiHttp);
chai.should();

describe('LOGIN', () => {
	before(async () => {
		try {
			await DataSource.query('TRUNCATE "User" CASCADE');
		} catch (error) {
			logger.error(error.message);
		}
	});

	describe('LOGIN a user', () => {
		it('it should login a user ', (done) => {
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
							res.body.should.be.a('object');
							res.body.should.have.property('data');
							res.body.data.should.have.property('access_token');
							done();
						});
				});
		});
	});
	describe('LOGIN a user', () => {
		it('it should login a user and delete the existing token', (done) => {
			chai
				.request(server)
				.post('/api/v1/accounts/login')
				.send({
					email: 'patrickshema@gmail.com',
					password: 'Andela@123',
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('data');
					res.body.data.should.have.property('access_token');
					done();
				});
		});
	});
	describe('LOGIN Error', () => {
		it('it should return an error if the user does not exist', (done) => {
			chai
				.request(server)
				.post('/api/v1/accounts/login')
				.send({
					email: 'ericngabo@gmail.com',
					password: 'ericngabo',
				})
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.should.have.property('data');
					res.body.data.should.have.property('message');
					done();
				});
		});
	});
	describe('LOGIN Error', () => {
		it('it should return an error if the user enters wrong credentials', (done) => {
			chai
				.request(server)
				.post('/api/v1/accounts/login')
				.send({
					email: 'patrickshema@gmail.com',
					password: 'ericngabo',
				})
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.should.have.property('data');
					res.body.data.should.have.property('message');
					done();
				});
		});
	});
	describe('LOGIN Error', () => {
		it('it should raise a validation error', (done) => {
			chai
				.request(server)
				.post('/api/v1/accounts/login')
				.send({
					email: '',
					password: 'ericngabo',
				})
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.should.have.property('data');
					res.body.data.should.have.property('email');
					done();
				});
		});
	});
});
