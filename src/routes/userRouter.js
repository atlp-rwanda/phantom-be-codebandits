import { Router } from 'express';
import { CreateUser, GetUsers } from '../controllers/user.js';

const router = Router();

router.get('/', GetUsers);
router.post('/', CreateUser);

export default router;
