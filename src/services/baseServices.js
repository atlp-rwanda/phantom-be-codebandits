import User from '../models/user.js';
import { cleanModel } from '../utils/cleanModel.js';
import passwordGenerator from '../utils/generatePassword.js';
import sendRegisterEmail from '../utils/sendRegisterEmail.js';

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
	const passwords = await passwordGenerator();
	const newRelatedUser = User.create({
		email: userInfo.email,
		password: passwords.hashedPassword,
		firstName: userInfo.firstName,
		lastName: userInfo.lastName,
		role: userRole,
	});
	const newUser = Model.create(userInfo);
	newUser.user = newRelatedUser;
	await newUser.save();
	await sendRegisterEmail(
		process.env.LOGIN_URL,
		newRelatedUser.lastName,
		newRelatedUser.email,
		passwords.plainPassword
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
