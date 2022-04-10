import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';
import DataSource from '../../data-source.js';
import logger from '../../configs/winston.js';
import server from '../../app.js';

dotenv.config();

chai.use(chaiHttp);
chai.should();

describe('LOGOUT', () => {
	before(async () => {
		try {
			await DataSource.query('TRUNCATE "RefreshToken" CASCADE');
			await DataSource.query('TRUNCATE "User" CASCADE');
		} catch (error) {
			logger.error(error.message);
		}
	});

	describe('LOGOUT from the account', () => {
		it('it should logout a user from the account ', (done) => {
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
								.get('/api/v1/accounts/logout')
								.end((err, res) => {
									res.should.have.status(200);
									res.body.should.be.a('object');
									res.body.should.have.property('data');
									res.body.data.should.have.property('message');
									done();
								});
						});
				});
		});
	});
});
