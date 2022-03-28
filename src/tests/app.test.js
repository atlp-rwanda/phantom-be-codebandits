import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app.js';

chai.use(chaiHttp);
chai.should();

describe('App', () => {
	it('it should test the app', (done) => {
		chai
			.request(server)
			.get('/')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('status');
				res.body.should.have.property('code');
				res.body.should.have.property('data');
				done();
			});
	});
	it('it should test not found', (done) => {
		chai
			.request(server)
			.post('/')
			.end((err, res) => {
				res.should.have.status(404);
				res.body.should.be.a('object');
				res.body.should.have.property('status');
				done();
			});
	});
	it('it should test not found', (done) => {
		chai
			.request(server)
			.post('/text')
			.end((err, res) => {
				res.should.have.status(404);
				res.body.should.be.a('object');
				res.body.should.have.property('status');
				done();
			});
	});
});
