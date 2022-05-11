import handleResponse from '../controllers/handleResponse.js';
import Route from '../routeApp/models.js';
import { getDriverProfile, getTripByPlate } from '../routes/utils.js';
import { BusRepository } from './models.js';
import { handleDriverActions } from './utils.js';

export const busControl = async (req, res) => {
	const driver = await getDriverProfile(req.user.id);
	if (!driver) return handleResponse(res, 404, 'Driver not found');

	const coordinates = await handleDriverActions(driver, req.body);
	if (!coordinates)
		return handleResponse(
			res,
			400,
			'Not allowed to start the bus without route'
		);
	return handleResponse(res, 200, coordinates);
};

export const busListView = async (req, res) => {
	const buses = await BusRepository.search().return.all();

	return handleResponse(res, 200, buses);
};

export const getOptions = async (req, res) => {
	const routes = await Route.find({});
	const options = [];
	routes.forEach((route) => {
		const option = route.getStartCoor();
		options.push(option);
	});

	return handleResponse(res, 200, { options });
};

export const checkTripInProgress = async (req, res) => {
	const { plate } = req.params;
	const trip = await getTripByPlate(plate);
	if (trip) {
		return handleResponse(res, 200, trip);
	}
	return handleResponse(res, 400, 'No trip on the way');
};
