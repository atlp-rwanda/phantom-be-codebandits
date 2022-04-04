import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { BaseEntity, EntitySchema } from 'typeorm';

const jwtRefreshExpiration = process.env.JWT_REFRESH_EXPIRATION;

export class RefreshToken extends BaseEntity {
	id;

	token;

	user;

	expiryDate;
}

export const RefreshTokenSchema = new EntitySchema({
	name: 'RefreshToken',
	tableName: 'RefreshToken',
	target: RefreshToken,
	columns: {
		id: {
			primary: true,
			generated: true,
			type: 'int',
		},
		token: {
			type: 'varchar',
		},
		expiryDate: {
			type: 'date',
		},
	},
	relations: {
		user: {
			target: 'User',
			type: 'one-to-one',
			joinColumn: true,
			eager: true,
			cascade: true,
			onDelete: 'CASCADE',
		},
	},
});

RefreshTokenSchema.createToken = async (user) => {
	const expiredAt = new Date();
	expiredAt.setSeconds(expiredAt.getSeconds() + jwtRefreshExpiration);
	const refrToken = jwt.sign(
		{
			id: user.id,
			role: user.role,
		},
		process.env.REFRESH_TOKEN_SECRET,
		{ expiresIn: jwtRefreshExpiration }
	);
	const object = RefreshToken.create({
		token: refrToken,
		expiryDate: new Date(expiredAt.getTime()),
	});

	object.user = user;
	const refreshToken = await object.save();
	return refreshToken.token;
};

RefreshTokenSchema.verifyExpiration = (token) =>
	token.expiryDate < new Date().getTime();

export default RefreshToken;
