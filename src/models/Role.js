import { BaseEntity } from 'typeorm';

class Role extends BaseEntity {
	id;

	name;

	permissions;
}

export default Role;
