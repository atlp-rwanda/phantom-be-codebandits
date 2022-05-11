import Driver from '../driverApp/models.js';
import Operator from '../operatorApp/models.js';
import { BusRepository } from '../simulateApp/models.js';

export const getTripByPlate = async (plate) => {
	const trip = await BusRepository.search()
		.where('plate')
		.equal(plate.toUpperCase())
		.return.first();
	return trip;
};

export const getDriverProfile = async (userId) => {
	const driver = await Driver.findOne({
		where: { userId },
		relations: ['bus', 'bus.route'],
	});
	if (driver?.bus) {
		const trip = await getTripByPlate(driver.bus.plateNumber);
		if (trip) {
			driver.inProgress = trip;
		}
	}
	return driver;
};

export const getOperatorProfile = async (userId) => {
	const operator = await Operator.findOne({ where: { userId } });
	return operator;
};
