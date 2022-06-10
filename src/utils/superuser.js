/* eslint-disable */
/* c8 ignore file */

import asyncjs from 'async';
import bcrypt from 'bcrypt';
import chalk from 'chalk';
import { createInterface } from 'readline';
import logger from '../configs/winston.js';
import AppDataSource from '../data-source.js';
import User from '../models/user.js';
var validRegex =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

async function main() {
	const loginLink = `${
		process.env.BASE_URL || 'http://localhost:5000'
	}/ap1/v1/accounts/login`;
	try {
		await AppDataSource.initialize().then(async () => {
			logger.info('Database connected');

			const rlPrompt = `\n
Welcome to the interface for creating admins\nStarting....`;
			var prompt = chalk.bold.magenta;
			console.log(chalk.bold.magenta('\nWelcome to the superuser dashboard'));
			console.log(chalk.bold.green('All field are required (*)'));

			console.log(chalk.bold.blueBright('\nStarting... \n'));
			let isStrong = true;

			const rl = createInterface({
				input: process.stdin,
				output: process.stdout,
			});

			var info = {};

			asyncjs.series(
				[
					(callback) => {
						rl.question(prompt('Admin email*: '), function (email) {
							info.email = email;
							if (!email.match(validRegex)) {
								console.log(chalk.bold.red('>> Invalid email'));
								process.exit(1);
							}
							callback();
						});
					},
					(callback) => {
						rl.question(prompt('Firstname*: '), function (firstName) {
							if (!firstName.match(/^[a-zA-Z_ ]{3,}$/)) {
								console.log(chalk.red('Too short or contain number'));
								process.exit(1);
							}
							info.firstName = firstName;
							callback();
						});
					},
					(callback) => {
						rl.question(prompt('Last name*: '), function (lastName) {
							if (!lastName.match(/^[a-zA-Z_ ]{3,}$/)) {
								console.log(chalk.red('Too short or contain number'));
								process.exit(1);
							}
							info.lastName = lastName;
							callback();
						});
					},
					(callback) => {
						rl.question(prompt('Password*: '), function (password) {
							info.password = password;
							if (!password.length > 3) {
								console.log(chalk.red('This is too short'));
								process.exit(1);
							} else if (
								!password.match(
									/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{6,}$/
								)
							) {
								isStrong = false;
							}
							callback();
						});
					},
					(callback) => {
						rl.question(prompt('Confirm password: '), function (password2) {
							if (!password2 === info.password) {
								prompt('Password do not match');
							}
							callback();
						});
					},
					(callback) => {
						if (!isStrong) {
							console.log('As an admin aspire for stromg password. ');
							rl.question(
								prompt('[Yes] to continue [No] to change password: '),
								function (ans) {
									if (ans.toLocaleLowerCase() === 'yes') {
										console.log(prompt('Continuing with a weak password...'));
										callback();
									} else {
										console.log(prompt('Use a strong password...'));
										rl.question(
											prompt('Confirm password: '),
											function (password2) {
												if (!password2 === info.password) {
													prompt('Password do not match');
												}
												callback();
											}
										);
									}
								}
							);
						} else {
							callback;
						}
					},
				],
				async () => {
					info.role = 'admin';
					const plainPassword = info.password;
					info.password = await bcrypt.hash(info.password, 10);
					rl.close();
					const user = User.create(info);
					try {
						chalk.bold.green('Creating the account......');
						const savedUser = await user.save();
						console.log(
							chalk.greenBright(
								'A new super user created. Login credentials has been sent to registed email: '
							)
						);
						console.log(prompt(savedUser.email));
						console.log(prompt('\nWelcome...\nQuittiiinnng...'));
						process.exit(0);
					} catch (error) {
						console.log(
							chalk.red(
								'Probably that user exists or something went teribly wrong.'
							)
						);
						console.log(error.message);
						process.exit(1);
					}
				}
			);

			rl.on('SIGINT', () => {
				console.log(chalk.bold.red('\nSo sorry to see you go sudden\n'));
				rl.close();
				process.exit(1);
			});
		});
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

main();
