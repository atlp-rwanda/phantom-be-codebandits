import User from '../models/user.js';
import { cleanModel } from '../utils/cleanModel.js';
import EmailHandler from '../utils/EmailHandler.js';
import passwordGenerator from '../utils/generatePassword.js';

export const findAllUsers = async (Model, options = {}) => {
	const drivers = await Model.find(options);
	return drivers;
};

export const findSingleUser = async (Model, userId) => {
	const userExist = await Model.findOneBy({ id: userId });
	if (!userExist) return null;
	return userExist;
};

export const deleteUser = async (Model, userId) => {
	const userExist = await Model.findOneBy({ id: userId });
	if (!userExist) return false;
	const relatedUser = await User.findOneBy({ id: userExist.user.id });
	await relatedUser.remove();
	await userExist.remove();
	return true;
};

export const createUser = async (Model, userInfo, userRole) => {
	const password = passwordGenerator();
	const newRelatedUser = User.create({
		email: userInfo.email,
		password,
		firstName: userInfo.firstName,
		lastName: userInfo.lastName,
		role: userRole,
	});
	const newUser = Model.create(userInfo);
	newUser.user = newRelatedUser;
	await newUser.save();
	await EmailHandler(
		'register',
		{
			email: newRelatedUser.email,
			name: newRelatedUser.firstName,
			password,
		},
		{ title: 'Account created', subject: 'A new driver account for your email' }
	);

	return newUser;
};

export const editUser = async (Model, userId, editInfo) => {
	const userExist = await Model.findOneBy({ id: userId });
	if (!userExist) return false;
	const relatedUser = await User.findOneBy({ id: userExist.user.id });
	const cleanUserInfo = cleanModel(Model.create(editInfo));
	const cleanRelatedUserInfo = cleanModel(User.create(editInfo));
	if (cleanRelatedUserInfo)
		await User.update(relatedUser, cleanRelatedUserInfo);
	if (cleanUserInfo) await Model.update(userExist, cleanUserInfo);
	return true;
};
