import { EntitySchema } from 'typeorm';
import CustomBaseEntity from '../models/base.js';

export class Driver extends CustomBaseEntity {
	mobileNumber;

	company;

	address;

	nationalID;

	license;
}

export const DriverSchema = new EntitySchema({
	name: 'Driver',
	tableName: 'Driver',
	target: Driver,
	columns: {
		id: {
			primary: true,
			generated: true,
			type: 'int',
		},
		mobileNumber: {
			type: 'varchar',
		},
		company: {
			type: 'varchar',
			default: 'KBS',
		},
		address: {
			type: 'varchar',
		},
		nationalID: {
			type: 'varchar',
			unique: true,
		},
		license: {
			type: 'varchar',
			unique: true,
		},
		userId: {
			nullable: true,
			type: 'int',
		},
		busId: {
			nullable: true,
			type: 'int',
		},
	},
	relations: {
		user: {
			target: 'User',
			type: 'one-to-one',
			joinColumn: true,
			cascade: true,
			eager: true,
			onDelete: 'CASCADE',
		},
		bus: {
			target: 'Bus',
			type: 'one-to-one',
			cascade: true,
			onDelete: 'SET NULL',
			onUpdate: 'SET NULL',
			nullable: true,
			inverseSide: 'driver',
		},
	},
});

export default Driver;
