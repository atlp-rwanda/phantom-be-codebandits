import { Bus } from '../busApp/models.js';
import {
	handleDelete,
	handleEdit,
	handleGetSingle,
} from '../controllers/baseControllers.js';
import handleResponse from '../controllers/handleResponse.js';
import { createUser, findAllUsers } from '../services/baseServices.js';
import { Driver } from './models.js';

export const getDrivers = async (req, res) => {
	const drivers = await findAllUsers(Driver);
	return handleResponse(res, 200, drivers);
};

export const getSingleDriver = async (req, res) => {
	handleGetSingle(Driver, req, res);
};

export const createDriver = async (req, res) => {
	const newDriver = await createUser(Driver, req.body, 'driver');
	return handleResponse(res, 201, newDriver);
};

export const deleteDriver = async (req, res) => {
	await handleDelete(Driver, 'driver_deleted', req, res);
};

export const editDriver = async (req, res) => {
	await handleEdit(Driver, 'driver_updated', req, res);
};

export const assignBus = async (req, res) => {
	const { driverId, plateNumber } = req.params;
	const driverExist = await Driver.findOneBy({ id: driverId });
	if (!driverExist) return handleResponse(res, 404, res.__('driver_not_found'));
	const busExist = await Bus.findOneBy({ plateNumber });
	if (!busExist) return handleResponse(res, 404, res.__('bus_not_found'));
	busExist.bus = busExist;
	return handleResponse(res, 404, res.__('driver_assigned_bus'));
};

export const checkDriverBusStatus = async (req, res) => {
	const { id } = req.body;
	const driverExist = await Driver.findBy({ id });
	if (!driverExist) return handleResponse(res, 404, 'notFound');
	if (!driverExist.bus)
		return handleResponse(res, 200, res.__('driver_no_bus'));
	return handleResponse(res, 200, res.__('driver_has_bus'));
};
