// Use this file to specify the routes for the app
// remember to include this routes in the index
import { Router } from 'express';
import verifyToken from '../middlewares/authJwt.js';
import * as views from './views.js';

const router = Router();

router.get('/', verifyToken, views.getInfo);

export default router;
