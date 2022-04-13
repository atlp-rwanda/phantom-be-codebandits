import { BaseEntity, EntitySchema } from 'typeorm';

export class Bus extends BaseEntity {
	id;

	plateNumber;

	busType;

	seats;

	driver;

	route;
}

export const BusSchema = new EntitySchema({
	name: 'Bus',
	tableName: 'Bus',
	target: Bus,
	columns: {
		id: {
			primary: true,
			generated: true,
			type: 'int',
		},
		plateNumber: {
			type: 'varchar',
			unique: true,
		},
		busType: {
			type: 'varchar',
		},
		seats: {
			type: 'int',
		},
		driver: {
			type: 'varchar',
		},
		route: {
			type: 'varchar',
		},
	},
	relations: {
		user: {
			target: 'Driver',
			type: 'one-to-one',
			cascade: true,
			joinColumn: true,
			eager: true,
			onDelete: 'CASCADE',
		},
	},
});

export default Bus;
