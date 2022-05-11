import { AccessControl } from 'accesscontrol';
import { matchedData } from 'express-validator';
import User from '../models/user.js';
import {
	deleteUser,
	editUser,
	findSingleUser,
} from '../services/baseServices.js';
import { cleanModel } from '../utils/cleanModel.js';
import handleResponse from './handleResponse.js';

export const handleGetSingle = async (Model, req, res) => {
	const { id } = req.params;
	const userExist = await findSingleUser(Model, id);
	if (!userExist) return handleResponse(res, 404, res.__('notFound'));
	return handleResponse(
		res,
		200,
		AccessControl.filter(userExist, req.attributes)
	);
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

export const editByRelation = async (Model, userId, data, user) => {
	const instance = await Model.findOne({
		where: { userId },
	});
	if (!instance) return false;
	const cleanedUserInfo = cleanModel(User.create(data));
	const cleanedModelInfo = cleanModel(Model.create(data));
	if (cleanedUserInfo) {
		await User.update(user, cleanedUserInfo);
	}
	if (cleanedModelInfo) await Model.updateById(instance.id, cleanedModelInfo);
	return true;
};
