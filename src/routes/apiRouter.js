import { Router } from 'express';
import handleResponse from '../controllers/handleResponse.js';
import userRouter from './userRouter.js';

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.all('*', (req, res) =>
	handleResponse(res, 200, { message: res.__('welcomeAPI') })
);

export default apiRouter;
