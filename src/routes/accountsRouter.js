import { Router } from 'express';
import loginRouter from './loginRouter.js';
import logoutRouter from './logoutRouter.js';
import { refresh } from '../controllers/refreshToken.controller.js';

const apiRouter = Router();

apiRouter.use('/login', loginRouter);
apiRouter.get('/refresh', refresh);
apiRouter.use('/logout', logoutRouter);

export default apiRouter;
