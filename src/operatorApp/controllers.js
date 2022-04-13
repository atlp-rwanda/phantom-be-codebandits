import handleResponse from '../controllers/handleResponse.js';
import {
	handleDelete,
	handleEdit,
	handleGetSingle,
} from '../controllers/baseControllers.js';
import { createUser, findAllUsers } from '../services/baseServices.js';
import { Operator } from './models.js';

export const getOperators = async (req, res) => {
	const operators = await findAllUsers(Operator, res);
	return handleResponse(res, 200, operators);
};

export const getSingleOperator = async (req, res) => {
	await handleGetSingle(Operator, req, res);
};

export const createOperator = async (req, res) => {
	const newOperator = await createUser(Operator, req.body, 'operator');
	return handleResponse(res, 201, newOperator);
};

export const deleteOperator = async (req, res) => {
	await handleDelete(Operator, 'operator_deleted', req, res);
};

export const editOperator = async (req, res) => {
	await handleEdit(Operator, 'operator_updated', req, res);
};
