import { EntitySchema } from 'typeorm';
import CustomBaseEntity from '../models/base.js';

export class Bus extends CustomBaseEntity {
	plateNumber;

	company;

	driverId;

	busType;

	seats;

	routeId;

	static async findByPlate(plateNumber) {
		const bus = await this.findOne({
			where: { plateNumber },
			relations: ['driver', 'route'],
		});
		return bus;
	}
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
			required: true,
		},
		company: {
			type: 'varchar',
			default: 'KBS',
		},
		busType: {
			type: 'varchar',
		},
		driverId: {
			type: 'int',
			nullable: true,
		},
		seats: {
			type: 'int',
		},

		createdAt: {
			name: 'created_at',
			type: 'timestamp with time zone',
			createDate: true,
		},
		updatedAt: {
			name: 'updated_at',
			type: 'timestamp with time zone',
			updateDate: true,
		},
		routeId: {
			type: 'int',
			nullable: true,
		},
	},
	relations: {
		route: {
			target: 'Route',
			type: 'many-to-one',
			onDelete: 'SET NULL',
			onUpdate: 'SET NULL',
			nullable: true,
			joinColumn: true,
			cascade: true,
		},
		driver: {
			target: 'Driver',
			type: 'one-to-one',
			onDelete: 'SET NULL',
			onUpdate: 'SET NULL',
			nullable: true,
			joinColumn: true,
		},
	},
});

export default Bus;
