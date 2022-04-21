import { EntitySchema } from 'typeorm';
import CustomBaseEntity from '../models/base.js';

export class Route extends CustomBaseEntity {
	distance;

	code;

	start_coor;

	end_coor;

	stop_points;

	origin;

	destination;
}

export const RouteSchema = new EntitySchema({
	name: 'Route',
	tableName: 'Route',
	target: Route,
	columns: {
		id: {
			primary: true,
			generated: true,
			type: 'int',
		},
		distance: {
			type: 'int',
			nullable: true,
		},
		code: {
			type: 'varchar',
			required: true,
			unique: true,
		},
		start_coor: {
			type: 'point',
			nullable: true,
		},
		end_coor: {
			type: 'point',
			nullable: true,
		},
		stop_points: {
			type: 'path',
			nullable: true,
		},
		origin: {
			type: 'varchar',
			required: true,
		},
		destination: {
			type: 'varchar',
			required: true,
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
	},
});

export default Route;
