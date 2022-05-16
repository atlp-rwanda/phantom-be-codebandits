/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

import bcrypt from 'bcrypt';
import { EventSubscriber } from 'typeorm';
import User from '../models/user.js';
import DecorateClass from '../utils/DecorateClass.js';

class UserSubscriber {
	listenTo() {
		return User;
	}

	async beforeInsert({ entity }) {
		const user = entity;
		user.password = await bcrypt.hash(entity.password, 10);
		return Promise.resolve(user);
	}

	async beforeUpdate({ entity }) {
		const user = entity;
		if (user?.password) {
			user.password = await bcrypt.hash(user.password, 10);
		}
		return Promise.resolve(user);
	}

	/* afterUpdate?(event: UpdateEvent<Entity>): Promise<any>|void; */
}

export default DecorateClass(EventSubscriber(), UserSubscriber);
