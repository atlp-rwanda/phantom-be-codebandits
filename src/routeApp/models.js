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

	getStartCoor() {
		const coor = {};

		if (this.start_coor) {
			const parsed = this.start_coor.split(',');
			coor.start = { lat: parsed[0].trim(), lng: parsed[1].trim() };
		} else {
			coor.start = JSON.parse(this.stop_points[0]);
		}
		if (this.end_coor) {
			const parsed = this.end_coor.split(',');
			coor.end = { lat: parsed[0].trim(), lng: parsed[1].trim() };
		} else {
			coor.end = JSON.parse(this.stop_points.slice(-1));
		}
		coor.origin = this.origin;
		coor.destination = this.destination;
		coor.code = this.code;
		return coor;
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
			transformer: {
				from(value1) {
					if (value1?.x) {
						return `${value1.x}, ${value1.y}`;
					}
					return value1;
				},
				to(value1) {
					return value1;
				},
			},
		},
		end_coor: {
			type: 'point',
			nullable: true,
			transformer: {
				from(value1) {
					if (value1?.x) {
						return `${value1.x}, ${value1.y}`;
					}
					return value1;
				},
				to(value1) {
					return value1;
				},
			},
		},
		stop_points: {
			type: 'varchar',
			array: true,
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
