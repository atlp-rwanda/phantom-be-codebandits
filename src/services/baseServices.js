import handleResponse from '../controllers/handleResponse.js';
import User from '../models/user.js';
import passwordGenerator from '../utils/generatePassword.js';
import sendRegisterEmail from '../utils/sendRegisterEmail.js';

export const findAllUsers = async (Model, res) => {
	const drivers = await Model.find();
	if (drivers.length < 1) return handleResponse(res, 200, res.__('zero_users'));
	return drivers;
};

export const findSingleUser = async (Model, userId, res) => {
	const userExist = await Model.findOneBy({ id: userId });
	if (!userExist) return handleResponse(res, 404, res.__('notFound'));
	return userExist;
};

export const deleteUser = async (Model, userId, res) => {
	const userExist = await Model.findOneBy({ id: userId });
	if (!userExist) return handleResponse(res, 404, res.__('notFound'));
	const relatedUser = await User.findOneBy({ id: userExist.user.id });
	await relatedUser.remove();
	await userExist.remove();
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
		'https://phantom-codebandits-staging.herokuapp.com/login',
		newRelatedUser.lastName,
		newRelatedUser.email,
		passwords.plainPassword
	);
	return newUser;
};
