const dataFn = () => {
	const password = 'Andela@1234';
	const data = {
		users: {
			admin: {
				email: 'admin@gmail.com',
				password,
				firstName: 'test',
				lastName: 'Andela',
				role: 'admin',
			},
			operator: {
				email: 'operator@gmail.com',
				password,
				firstName: 'test',
				lastName: 'Andela',
				role: 'operator',
			},
			driver: {
				email: 'driver@gmail.com',
				password,
				firstName: 'test',
				lastName: 'Andela',
				role: 'driver',
			},
			user: {
				email: 'user@gmail.com',
				password,
				firstName: 'test',
				lastName: 'Andela',
				role: 'user',
			},
			reset: {
				email: 'testreset@gmail.com',
				password,
				firstName: 'test',
				lastName: 'Andela',
				role: 'admin',
			},
			resetToken: {
				email: 'testtoken@gmail.com',
				password,
				firstName: 'test',
				lastName: 'Andela',
				role: 'admin',
			},
		},
		operators: {
			valid: {
				firstName: 'testName',
				lastName: 'testname2',
				email: 'tiktok@me.com',
				mobileNumber: '0788352746',
				company: 'Virunga express',
				address: 'Kabuga, Kigali',
				nationalID: '1199880081691164',
			},
			edit: {
				lastName: 'Samuel',
				firstName: 'Shyaka',
				wrongKey: 'nananana',
				email: 'yvesivad@gmail.com',
				role: 'admin',
				mobileNumber: '0788231378',
			},
			invalid: {
				firstName: 'testName',
				lastName: 'testname2',
				password: 'Password@123',
				mobileNumber: '0788352746',
				company: 'Virunga express',
				address: 'Kabuga, Kigali',
				nationalID: '1199880081691164',
			},
		},
		drivers: {
			valid: {
				firstName: 'testName',
				lastName: 'testname2',
				email: 'tiktok@me.com',
				mobileNumber: '0788352746',
				company: 'Kigali Bus Services',
				address: 'Kabuga, Kigali',
				nationalID: '1200080081691164',
				license: '1200080081691164',
			},
			edit: {
				lastName: 'Samuel',
				firstName: 'Shyaka',
				wrongKey: 'nananana',
				email: 'yvesivad@gmail.com',
				role: 'admin',
				mobileNumber: '0788231378',
			},
		},
		buses: {
			valid: {
				plateNumber: 'RAD555E',
				company: 'Kigali Bus Services',
				busType: 'Coaster',
				seats: '27',
			},
			valid2: {
				plateNumber: 'RAB123A',
				company: 'Kigali Bus Services',
				busType: 'Coaster',
				seats: '27',
			},
			edit: {
				plateNumber: 'RAD558E',
				busType: 'Coaster',
				seats: '27',
			},
		},
		routes: {
			valid: {
				origin: 'Nyanza',
				destination: 'Nyabugogo',
				distance: 146,
			},
			valid2: {
				origin: 'Nyanza',
				destination: 'Nyabugogo',
				distance: 146,
			},
			invalid: {
				origin: 'Nyanza',
				destination: '',
				distance: 146999999999999,
			},
			edit: {
				origin: 'Nyanza',
				destination: 'Remera',
				distance: 146,
			},
			withPoints: {
				origin: 'Nyabugogo',
				destination: 'Kabuga',
				distance: 146,
				code: 'RN4STYI',
				stop_points: [
					{ lat: -1.93667, lng: 30.05352 },
					{ lat: -1.93662, lng: 30.05353 },
					{ lat: -1.9363, lng: 30.05357 },
					{ lat: -1.93596, lng: 30.05361 },
				],
			},
		},
	};

	return data;
};

export default dataFn;
