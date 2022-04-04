/* eslint-disable */

export const raiseError = async (req, res, next) => {
	throw new Error('Checking');
};

export default raiseError;
