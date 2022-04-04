import { Router } from 'express';
import { CreateUser, GetUsers } from '../userApp/controllers.js';
import resetPasswordRouter from '../userApp/routes.js';

const router = Router();

router.get('/', GetUsers);
router.post('/', CreateUser);
router.use('/reset', resetPasswordRouter);

export default router;
