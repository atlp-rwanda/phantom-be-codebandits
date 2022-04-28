import { saveInstance } from '../services/saveService.js';
import Bus from './models.js';

export const registerBus = async (reqBody) => {
	const newBus = await saveInstance(Bus, reqBody);
	return newBus;
};

export const findBusByPlate = async (plateNumber) => {
	const existingBus = await Bus.findByPlate(plateNumber);
	return existingBus;
};

export const findBusById = async (id) => {
	const bus = await Bus.findOneBy({ id });
	return bus;
};

export const findBuses = async (options = {}) => {
	const buses = await Bus.find(options);
	return buses;
};

export const updateBus = async (Model, busId, editInfo) => {
	const bus = await Model.findOneBy({ id: busId });
	if (!bus) return false;
	if (
		editInfo.plateNumber !== undefined &&
		bus.plateNumber !== editInfo.plateNumber
	) {
		const exist = await Model.findByPlate(editInfo.plateNumber);
		if (exist) return null;
	}
	await Model.updateById(bus.id, editInfo);
	return true;
};

export const deleteBus = async (bus) => {
	await bus.remove();
	return true;
};
