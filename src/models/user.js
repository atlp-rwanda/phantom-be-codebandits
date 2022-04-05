import { BaseEntity, EntitySchema } from 'typeorm';

export class User extends BaseEntity {
	id;

	firstName;

	lastName;

	email;

	password;

	resentLink;
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
		resentLink: {
			type: String,
			default: '',
		},
	},
});

export default User;
