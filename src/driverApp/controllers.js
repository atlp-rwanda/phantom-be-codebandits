import handleResponse from '../controllers/handleResponse.js';
import {
	createUser,
	deleteUser,
	findAllUsers,
	findSingleUser,
} from '../services/baseServices.js';
import { Driver } from './models.js';

export const createDriver = async (req, res) => {
	const newDriver = await createUser(Driver, req.body, 'driver');
	return handleResponse(res, 201, newDriver);
};

export const getDrivers = async (req, res) => {
	const drivers = await findAllUsers(Driver, res);
	return handleResponse(res, 200, drivers);
};

export const getSingleDriver = async (req, res) => {
	const { id } = req.params;
	const driverExist = await findSingleUser(Driver, id, res);
	return handleResponse(res, 200, driverExist);
};

export const deleteDriver = async (req, res) => {
	const { id } = req.params;
	await deleteUser(Driver, id, res);
	return handleResponse(res, 200, res.__('driver_deleted'));
};

// not done yet
export const editDriver = async (req, res) =>
	handleResponse(res, 200, res.__('driver_updated'));
