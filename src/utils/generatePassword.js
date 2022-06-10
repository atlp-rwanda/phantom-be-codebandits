const passwordGenerator = () => {
	const plainPassword = Math.random().toString(36).slice(-8);
	return plainPassword;
};

export default passwordGenerator;
