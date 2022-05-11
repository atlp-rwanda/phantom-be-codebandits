import { Entity, Schema } from 'redis-om';
import client from '../configs/redis.js';

class Bus extends Entity {}

const BusSchema = new Schema(Bus, {
	id: { type: 'number' },
	plate: { type: 'string' },
	location: { type: 'point' },
	locationUpdated: { type: 'date' },
	driverName: { type: 'string' },
	driverId: { type: 'number' },
	route: { type: 'string' },
	passengers: { type: 'number' },
	num: { type: 'number' },
	seats: { type: 'number' },
	type: { type: 'string' },
	origin: { type: 'string' },
	destination: { type: 'string' },
});

export const BusRepository = client.fetchRepository(BusSchema);

await BusRepository.createIndex();
