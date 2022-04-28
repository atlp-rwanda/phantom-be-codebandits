import { BaseEntity } from 'typeorm';

class CustomBaseEntity extends BaseEntity {
	id;

	static async updateById(id, data) {
		const instance = await this.findOne({ where: { id } });
		await this.createQueryBuilder()
			.update(instance)
			.set(data)
			.where('id = :id', { id })
			.execute();
		const updatedInstance = await this.findOne({ where: { id } });
		return { updatedInstance };
	}

	static async createAndSave(data) {
		const createdInstance = this.create(data);
		const instance = await createdInstance.save();
		return instance;
	}
}

export default CustomBaseEntity;
