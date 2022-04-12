import { BaseEntity, EntitySchema } from 'typeorm';

export class User extends BaseEntity {
	id;

	email;

	password;

	firstName;

	lastName;

	role;
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
	},
});

export default User;
