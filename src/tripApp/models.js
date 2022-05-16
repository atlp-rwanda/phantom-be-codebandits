import { EntitySchema } from 'typeorm';
import CustomBaseEntity from '../models/base.js';

export class Trip extends CustomBaseEntity {
	path;

	info;
}

export const TripSchema = new EntitySchema({
	name: 'trip',
	tableName: 'trip',
	target: Trip,
	columns: {
		id: {
			primary: true,
			generated: true,
			type: 'int',
		},
		path: {
			type: 'text',
			nullable: true,
		},
		info: {
			type: 'text',
			nullable: true,
		},
	},
});

export default Trip;
