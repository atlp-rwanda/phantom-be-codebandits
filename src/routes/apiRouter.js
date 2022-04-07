import { Router } from 'express';
import handleResponse from '../controllers/handleResponse.js';
import accountsRouter from './accountsRouter.js';
import companyRouter from './companiesRouter.js';
import driverRouter from './driverRouter.js';
import operatorRouter from './operatorRoutes.js';
import userRouter from './userRouter.js';

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/accounts', accountsRouter);
apiRouter.use('/operators', operatorRouter);
apiRouter.use('/companies', companyRouter);
apiRouter.use('/drivers', driverRouter);

apiRouter.all('*', (req, res) =>
	handleResponse(res, 200, { message: res.__('welcomeAPI') })
);

export default apiRouter;
