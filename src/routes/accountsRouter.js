import { Router } from 'express';
import loginRouter from './loginRouter.js';
import { refresh } from '../controllers/refreshToken.controller.js';

const apiRouter = Router();

apiRouter.use('/login', loginRouter);
apiRouter.get('/refresh', refresh);

export default apiRouter;
