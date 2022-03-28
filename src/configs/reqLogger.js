import logger from './winston.js';

export default (req, res, next) => {
	logger.info(`${req.method}  >> ${req.url}`);
	return next();
};
