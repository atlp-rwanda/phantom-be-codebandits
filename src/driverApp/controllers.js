import handleResponse from '../controllers/handleResponse.js';
import {
	handleDelete,
	handleEdit,
	handleGetSingle,
} from '../controllers/baseControllers.js';
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
