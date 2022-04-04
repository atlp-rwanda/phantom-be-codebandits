import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { UserSchema } from './models/user.js';
import { ResetTokenSchema } from './userApp/models.js';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB,
	synchronize: true,

	logging: false,
	entities: [UserSchema, ResetTokenSchema],
	migrations: ['./migration/*.js'],
	subscribers: [],
	cli: {
		migrationsDir: './migration/',
	},
});

export default AppDataSource;
