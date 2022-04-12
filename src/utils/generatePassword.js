import bcrypt from 'bcrypt';

const passwordGenerator = async () => {
	const plainPassword = Math.random().toString(36).slice(-8);
	const hashedPassword = await bcrypt.hash(plainPassword, 10);
	return { plainPassword, hashedPassword };
};

export default passwordGenerator;
