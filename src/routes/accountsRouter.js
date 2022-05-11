import { Router } from 'express';
import { refresh } from '../controllers/refreshToken.controller.js';
import verifyToken from '../middlewares/authJwt.js';
import resetPasswordRouter from '../userApp/routes.js';
import asyncHandler from '../utils/asyncHandler.js';
import loginRouter from './loginRouter.js';
import logoutRouter from './logoutRouter.js';
import { profileView } from './profileView.js';

const apiRouter = Router();

apiRouter.use('/login', loginRouter);
apiRouter.get('/refresh', asyncHandler(refresh));
apiRouter.use('/logout', logoutRouter);
apiRouter.get('/profile', verifyToken, asyncHandler(profileView));
apiRouter.use('/', resetPasswordRouter);

export default apiRouter;
