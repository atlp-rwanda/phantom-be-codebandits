import { getTripByPlate } from '../routes/utils.js';
import { BusRepository } from './models.js';

export const InitializeTrip = async (driver, info) => {
	const point = {
		latitude: JSON.parse(driver.bus.route.stop_points[0]).lat,
		longitude: JSON.parse(driver.bus.route.stop_points[0]).lng,
	};
	const trip = await BusRepository.createAndSave({
		id: driver?.bus.id,
		plate: driver?.bus.plateNumber,
		location: point,
		driverName: driver.user.firstName,
		driverId: driver.id,
		locationUpdated: new Date(),
		route: driver?.bus.route.code,
		num: 0,
		passengers: parseInt(info?.passengers, 10) || 20,
		type: driver?.bus.busType,
		seats: driver?.bus.seats,
		origin: driver?.bus.route.origin,
		destination: driver?.bus.route.destination,
	});
	// Ensure that trip are removed after 2 hours of iddling
	await BusRepository.expire(trip.entityId, 7200);
	return trip;
};

export const handleDriverActions = async (driver, info) => {
	if (!driver?.bus || !driver?.bus?.route) return false;
	const redisRecord = await getTripByPlate(driver.bus?.plateNumber);
	if (redisRecord) {
		const coordinates = driver?.bus?.route.stop_points;
		const responseData = {
			coordinates,
			bus: redisRecord,
			inProgress: true,
		};
		return responseData;
	}
	const redisBus = await InitializeTrip(driver, info);
	const coordinates = driver?.bus.route.stop_points;
	const responseData = {
		coordinates,
		bus: redisBus,
		inProgress: false,
	};
	return responseData;
};
