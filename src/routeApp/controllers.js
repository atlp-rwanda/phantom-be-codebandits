import { matchedData } from 'express-validator';
import handleResponse from '../controllers/handleResponse.js';
import Route from './models.js';
import { handelDeleteRoute, handeleditRoute } from './services.js';
import { RouteCodeGenerator } from './utils.js';

export const getRoutes = async (req, res) => {
	const routes = await Route.find({
		select: ['origin', 'destination', 'code', 'id', 'distance'],
	});
	return handleResponse(res, 200, routes);
};

export const getSingleRoute = async (req, res) => {
	const { id } = req.params;
	const oneRoute = await Route.findOne({ where: { id }, relations: ['buses'] });
	if (!oneRoute) return handleResponse(res, 404, 'Resource not found');
	return handleResponse(res, 200, oneRoute);
};

export const createRoute = async (req, res) => {
	const data = matchedData(req, {
		optional: true,
	});
	data.code = RouteCodeGenerator();

	const routeExist = await Route.findOne({
		where: { origin: data.origin, destination: data.destination },
	});
	if (!routeExist) {
		const savedRoute = await Route.createAndSave(data);
		return handleResponse(res, 201, savedRoute);
	}
	return handleResponse(res, 409, 'Route already exist');
};

export const editRoute = async (req, res) => {
	const { id } = req.params;
	const data = matchedData(req, {
		optional: false,
	});
	const routeEdited = await handeleditRoute(Route, id, data);
	if (!routeEdited) return handleResponse(res, 404, res.__('notFound'));
	return handleResponse(res, 200, routeEdited);
};

export const deleteRoute = async (req, res) => {
	const { id } = req.params;
	const routeDeleted = await handelDeleteRoute(Route, id);
	if (!routeDeleted) return handleResponse(res, 404, res.__('notFound'));

	return handleResponse(res, 200, res.__('route_deleted'));
};
