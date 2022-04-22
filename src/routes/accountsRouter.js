import { Router } from 'express';
import { refresh } from '../controllers/refreshToken.controller.js';
import resetPasswordRouter from '../userApp/routes.js';
import asyncHandler from '../utils/asyncHandler.js';
import loginRouter from './loginRouter.js';
import logoutRouter from './logoutRouter.js';

const apiRouter = Router();

apiRouter.use('/login', loginRouter);
apiRouter.get('/refresh', asyncHandler(refresh));
apiRouter.use('/logout', logoutRouter);
apiRouter.use('/', resetPasswordRouter);

export default apiRouter;
