import path from 'path';
import 'reflect-metadata';
import { UserSchema } from './src/models/user.js';

export default {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB,
	synchronize: false,
	logging: false,
	entities: [UserSchema],
	migrations: [path.join(path.resolve(), 'src/migration/*.js')],
	subscribers: [],
	cli: {
		migrationsDir: path.join(path.resolve(), 'src/migration/'),
	},
};
