/* eslint-disable */
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { BusSchema } from './busesApp/models.js';
import { DriverSchema } from './driverApp/models.js';
import { RefreshTokenSchema } from './models/refreshToken.js';
import { UserSchema } from './models/user.js';
import { OperatorSchema } from './operatorApp/models.js';
import { RouteSchema } from './routeApp/models.js';
import { ResetTokenSchema } from './userApp/models.js';

let options = {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB,
	synchronize: true,
	logging: false,
	entities: [
		UserSchema,
		DriverSchema,
		OperatorSchema,
		RefreshTokenSchema,
		ResetTokenSchema,
		BusSchema,
		RouteSchema,
	],
	migrations: ['./migration/*.js'],
	subscribers: [],
	cli: {
		migrationsDir: './migration/',
	},
};

/* c8 ignore start  */
if (process.env.NODE_ENV === 'production') {
	Object.assign(options, {
		extra: {
			ssl: {
				rejectUnauthorized: false,
			},
		},
		cache: {
			duration: 120000,
			type: 'redis',
			options: {
				host: process.env.REDIS_HEROKU_HOST,
				password: process.env.REDIS_HEROKU_PASS,
				port: process.env.REDIS_HEROKU_PORT,
			},
			ignoreErrors: true,
		},
	});
}
/* c8 ignore */
export const AppDataSource = new DataSource(options);

export default AppDataSource;
