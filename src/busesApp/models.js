import { BaseEntity, EntitySchema } from 'typeorm';

export class Bus extends BaseEntity {
	id;

	plateNumber;

	company;

	busType;

	seats;
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
		company: {
			type: 'varchar',
			default: 'KBS',
		},
		busType: {
			type: 'varchar',
		},
		seats: {
			type: 'int',
		},
	},
});

export default Bus;
