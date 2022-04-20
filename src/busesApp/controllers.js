import { matchedData } from 'express-validator';
import handleResponse from '../controllers/handleResponse.js';
import { Bus } from './models.js';
import {
	deleteBus,
	findBusById,
	findBusByPlate,
	findBuses,
	registerBus,
	updateBus,
} from './services.js';

export const postBusHandler = async (req, res) => {
	const { plateNumber } = req.body;
	const existingBus = await findBusByPlate(plateNumber);
	if (existingBus) {
		return handleResponse(res, 409, { message: res.__('Bus already exists') });
	}
	const newBus = await registerBus(req.body);
	return handleResponse(res, 201, newBus);
};

export const getBusHandler = async (req, res) => {
	const buses = await findBuses();
	return handleResponse(res, 200, buses);
};

export const getSingleBusHandler = async (req, res) => {
	const { id } = req.params;
	const bus = await findBusById(id);
	if (!bus) {
		return handleResponse(res, 404, { message: res.__('Bus not found') });
	}
	return handleResponse(res, 200, bus);
};

export const putBusHandler = async (req, res) => {
	const { id } = req.params;
	const data = matchedData(req, {
		optional: false,
	});

	const bus = await updateBus(Bus, id, data);
	if (!bus)
		return handleResponse(res, 404, { message: res.__('Bus not found') });
	return handleResponse(res, 200, res.__('Bus updated'));
};

export const deleteBusHandler = async (req, res) => {
	const { id } = req.params;

	const bus = await findBusById(id);
	if (!bus) {
		return handleResponse(res, 404, { message: res.__('Bus not found') });
	}
	await deleteBus(bus);
	return handleResponse(res, 200, { message: res.__('Bus deleted') });
};
