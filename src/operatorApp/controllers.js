import handleResponse from '../controllers/handleResponse.js';
import {
	createUser,
	deleteUser,
	findAllUsers,
	findSingleUser,
} from '../services/baseServices.js';
import { Operator } from './models.js';

export const getOperators = async (req, res) => {
	const operators = await findAllUsers(Operator, res);
	return handleResponse(res, 200, operators);
};

export const getSingleOperator = async (req, res) => {
	const { id } = req.params;
	const operatorExist = await findSingleUser(Operator, id, res);
	return handleResponse(res, 200, operatorExist);
};

export const createOperator = async (req, res) => {
	const newOperator = await createUser(Operator, req.body, 'operator');
	return handleResponse(res, 201, newOperator);
};

export const deleteOperator = async (req, res) => {
	const { id } = req.params;
	await deleteUser(Operator, id, res);
	return handleResponse(res, 200, res.__('operator_deleted'));
};
