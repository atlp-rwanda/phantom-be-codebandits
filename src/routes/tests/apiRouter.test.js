import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app.js';

chai.use(chaiHttp);
chai.should();

describe('apiRouter', () => {
	it('it should test the apiRouter', (done) => {
		chai
			.request(server)
			.get('/api/v1/')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('status');
				done();
			});
	});
});
