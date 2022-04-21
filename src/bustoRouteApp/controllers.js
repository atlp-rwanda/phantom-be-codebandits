import { Bus } from '../busesApp/models.js';
import handleResponse from '../controllers/handleResponse.js';
import { Route } from '../routeApp/models.js';

export const CheckBusStatus = async (req, res) => {
	const { plate } = req.params;
	const bus = await Bus.findByPlate(plate);
	if (!bus) return handleResponse(res, 404, 'Resource not found');
	return handleResponse(res, 200, bus);
};
export const AssignBus = async (req, res) => {
	const { plate, code } = req.params;
	const bus = await Bus.findByPlate(plate);
	if (!bus) return handleResponse(res, 400, 'Bus was not found');
	const route = await Route.findByCode(code);
	if (!route) return handleResponse(res, 400, 'Route was not found');
	bus.route = route;
	await bus.save();
	return handleResponse(res, 200, bus);
};
export const RemoveRoute = async (req, res) => {
	const { plate } = req.params;
	const bus = await Bus.findByPlate(plate);
	if (!bus) return handleResponse(res, 404, 'Bus was not found');
	bus.route = null;
	await bus.save();
	return handleResponse(res, 200, bus);
};
