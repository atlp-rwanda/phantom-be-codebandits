import { matchedData } from 'express-validator';
import {
	deleteUser,
	editUser,
	findSingleUser,
} from '../services/baseServices.js';
import handleResponse from './handleResponse.js';

export const handleGetSingle = async (Model, req, res) => {
	const { id } = req.params;
	const userExist = await findSingleUser(Model, id);
	if (!userExist) return handleResponse(res, 404, res.__('notFound'));
	return handleResponse(res, 200, userExist);
};

export const handleDelete = async (Model, responseMessage, req, res) => {
	const { id } = req.params;
	const userDeleted = await deleteUser(Model, id);
	if (!userDeleted) return handleResponse(res, 404, res.__('notFound'));
	return handleResponse(res, 200, res.__(responseMessage));
};

export const handleEdit = async (Model, responseMessage, req, res) => {
	const { id } = req.params;
	const data = matchedData(req, {
		optional: false,
	});
	const userEdited = await editUser(Model, id, data);
	if (!userEdited) return handleResponse(res, 404, res.__('notFound'));
	return handleResponse(res, 200, res.__(responseMessage));
};
