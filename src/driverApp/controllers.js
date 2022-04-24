import { AccessControl } from 'accesscontrol';
import Bus from '../busesApp/models.js';
import {
	handleDelete,
	handleEdit,
	handleGetSingle,
} from '../controllers/baseControllers.js';
import handleResponse from '../controllers/handleResponse.js';
import { createUser, findAllUsers } from '../services/baseServices.js';
import sendAssignEmail from '../utils/sendAssignEmail.js';
import { Driver } from './models.js';

export const getDrivers = async (req, res) => {
	let options;
	// eslint-disable-next-line no-unused-expressions
	req.query?.relation ? (options = { relations: ['bus'] }) : (options = {});
	const drivers = await findAllUsers(Driver, options);
	return handleResponse(
		res,
		200,
		AccessControl.filter(drivers, req.attributes)
	);
};

export const getSingleDriver = async (req, res) => {
	await handleGetSingle(Driver, req, res);
};

export const createDriver = async (req, res) => {
	const newDriver = await createUser(Driver, req.body, 'driver');
	return handleResponse(
		res,
		201,
		AccessControl.filter(newDriver, req.attributes)
	);
};

export const deleteDriver = async (req, res) => {
	await handleDelete(Driver, 'driver_deleted', req, res);
};

export const editDriver = async (req, res) => {
	await handleEdit(Driver, 'driver_updated', req, res);
};

export const assignBus = async (req, res) => {
	const { id, plate } = req.params;
	const driverExist = await Driver.findOneBy({ id });
	if (!driverExist) return handleResponse(res, 404, res.__('driver_not_found'));
	const busExist = await Bus.findByPlate(plate);
	if (!busExist) return handleResponse(res, 404, res.__('Bus not found'));
	// ?
	const data = { driver: driverExist.id };
	const updatedBus = await Bus.updateById(busExist.id, data);
	busExist.driver = driverExist;
	await busExist.save();
	await sendAssignEmail(
		process.env.LOGIN_URL,
		driverExist.user.email,
		driverExist.user.lastName,
		busExist.plateNumber
	);
	return handleResponse(
		res,
		200,
		AccessControl.filter(updatedBus, req.attributes)
	);
};
