/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

import { EventSubscriber } from 'typeorm';
import { v4 as uuid } from 'uuid';
import ResetToken from '../userApp/models.js';
import DecorateClass from '../utils/DecorateClass.js';
import EmailHandler from '../utils/EmailHandler.js';

class UserSubscriber {
	listenTo() {
		return ResetToken;
	}

	async beforeInsert({ entity }) {
		const refreshToken = entity;
		const time = new Date();
		refreshToken.token = uuid();
		refreshToken.expiration = new Date(
			time.setSeconds(time.getSeconds() + 86400)
		);
		return Promise.resolve(refreshToken);
	}

	async afterInsert({ connection, queryRunner, manager, entity }) {
		const link = `${process.env.RESET_URL}/${entity.token}`;
		await EmailHandler(
			'reset',
			{ link, email: entity.user.email, name: entity.user.firstName },
			{ title: 'Reset Password', subject: 'Password reset link' }
		);
		return Promise.resolve();
	}
}

export default DecorateClass(EventSubscriber(), UserSubscriber);
