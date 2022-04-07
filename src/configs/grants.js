export default {
	user: {
		drivers: {
			'read:any': ['*', '!email', '!password', '!id', '!role'],
		},
	},
	driver: {
		drivers: {
			'read:own': ['*'],
			'update:own': ['*', '!email', '!password'],
		},
		buses: {
			'update:own': ['*'],
		},
		profiles: {
			'update:own': ['*', '!email', '!password'],
		},
	},

	operator: {
		routes: {
			'create:any': ['*'],
			'read:any': ['*'],
			'update:any': ['*'],
			'delete:any': ['*'],
		},
		drivers: {
			'create:any': ['*'],
			'read:any': ['*'],
			'update:any': ['*'],
			'delete:any': ['*'],
		},
		buses: {
			'create:any': ['*'],
			'read:any': ['*'],
			'update:any': ['*'],
			'delete:any': ['*'],
		},
	},
	admin: {
		companies: {
			'create:any': ['*'],
		},
	},
};
