import { BaseEntity, EntitySchema } from 'typeorm';

export class Driver extends BaseEntity {
	id;

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
	},
	relations: {
		user: {
			target: 'User',
			type: 'one-to-one',
			cascade: true,
			joinColumn: true,
			eager: true,
			onDelete: 'CASCADE',
		},
	},
});

export default Driver;
