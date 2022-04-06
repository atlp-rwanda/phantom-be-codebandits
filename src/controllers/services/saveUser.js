import User from '../../models/user.js';

const saveUser = async (user) => {
	const newUser = User.create(user);
	const savedUser = await newUser.save();
	return savedUser;
};

export default saveUser;
