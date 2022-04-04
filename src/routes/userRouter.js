import { Router } from 'express';
import {
	CreateUser,
	GetUsers,
	forgotPassword,
} from '../userApp/controllers.js';

const router = Router();

router.get('/', GetUsers);
router.post('/', CreateUser);
router.post('/forgot-password', forgotPassword);

export default router;
