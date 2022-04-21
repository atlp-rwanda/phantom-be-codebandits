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

	static async findByCode(code) {
		const query = await this.createQueryBuilder('route')
			.where('route.code = :code', { code })
			.getOne();
		return query;
	}
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
	relations: {
		buses: {
			target: 'Bus',
			type: 'one-to-many',
			onDelete: 'SET NULL',
			onUpdate: 'SET NULL',
			inverseSide: 'route',
		},
	},
});

export default Route;
