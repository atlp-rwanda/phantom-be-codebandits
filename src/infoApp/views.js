import Bus from '../busesApp/models.js';
import handleResponse from '../controllers/handleResponse.js';
import Driver from '../driverApp/models.js';
import Operator from '../operatorApp/models.js';
import Route from '../routeApp/models.js';

const getInfo = async (req, res) => {
	const data = {
		buses: await Bus.count(),
		drivers: await Driver.count(),
		operators: await Operator.count(),
		routes: await Route.count(),
	};

	return handleResponse(res, 200, data);
};

export { getInfo };
