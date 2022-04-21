import winston from 'winston';

const { createLogger, format, transports } = winston;
const logConfig = {
	transports: [
		new transports.Console({
			/* c8 ignore next 1 */
			level: process.env.LOG_LEVEL || 'info',
			format: format.cli(),
		}),
		new transports.File({
			format: format.combine(
				format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
				format.align(),
				format.printf(
					(info) => `${[info.timestamp]}: ${info.level}: ${info.message}`
				)
			),
			level: 'error',
			filename: 'logs/errors.log',
		}),
	],
};
const logger = createLogger(logConfig);

export default logger;
