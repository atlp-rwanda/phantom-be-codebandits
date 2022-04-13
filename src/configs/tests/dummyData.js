import bcrypt from 'bcrypt';

const dataFn = async () => {
	const password = await bcrypt.hash('Andela@1234', 5);
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
			edit: {
				plateNumber: 'RAD558E',
				busType: 'Coaster',
				seats: '27',
			},
		},
	};

	return data;
};

export default dataFn;
