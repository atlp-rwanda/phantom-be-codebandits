import { BaseEntity } from 'typeorm';

class Permission extends BaseEntity {
	id;

	resource;

	action;

	attributes;
}

export default Permission;
