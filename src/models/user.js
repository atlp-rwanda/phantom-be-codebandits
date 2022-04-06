import { BaseEntity, EntitySchema } from 'typeorm';

export class User extends BaseEntity {
	id;

	firstName;

	lastName;

	email;

	password;

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
		firstName: {
			type: 'varchar',
		},
		lastName: {
			type: 'varchar',
		},
		email: {
			type: 'varchar',
			unique: true,
		},
		password: {
			type: 'varchar',
		},
		role: {
			type: 'varchar',
			default: 'user',
		},
	},
});

export default User;
