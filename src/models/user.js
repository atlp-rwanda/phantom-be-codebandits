import { BaseEntity, EntitySchema } from 'typeorm';

export class User extends BaseEntity {
	id;

	email;

	password;

	firstName;

	lastName;

	role;

	static async createAndSave(data) {
		const user = this.create(data);
		const saveUser = await user.save();
		return saveUser;
	}
}

export const UserSchema = new EntitySchema({
	name: 'User',
	tableName: 'User',
	target: User,
	columns: {
		id: {
			primary: true,
			generated: true,
			type: 'int',
		},
		email: {
			type: 'varchar',
			unique: true,
			required: true,
		},
		password: {
			type: 'varchar',
		},
		firstName: {
			type: 'varchar',
		},
		lastName: {
			type: 'varchar',
		},
		role: {
			type: 'varchar',
			default: 'user',
		},
		image: {
			type: 'varchar',
			required: false,
			default:
				'https://res.cloudinary.com/feyton/image/upload/v1643272521/user_nophzu.png',
		},
	},
});

export default User;
