/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

import { EventSubscriber } from 'typeorm';
import Driver from '../driverApp/models.js';
import DecorateClass from '../utils/DecorateClass.js';
import EmailHandler from '../utils/EmailHandler.js';

class DriverSubscriber {
	listenTo() {
		return Driver;
	}

	async afterInsert({ connection, queryRunner, manager, entity }) {
		await EmailHandler(
			'register',
			{
				email: entity.user.email,
				name: entity.user.firstName,
				password: 'Andela#12',
			},
			{
				title: 'Account created from subscribers',
				subject: 'A new driver account for your email',
			}
		);
	}
}

export default DecorateClass(EventSubscriber(), DriverSubscriber);
