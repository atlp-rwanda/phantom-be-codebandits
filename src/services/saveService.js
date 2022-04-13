export const saveInstance = async (Model, prop) => {
	const newInstance = Model.create(prop);
	const savedInstance = await newInstance.save();
	return savedInstance;
};
