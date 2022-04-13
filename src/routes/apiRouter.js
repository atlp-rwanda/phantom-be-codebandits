import { Router } from 'express';
import driverRouter from '../driverApp/router.js';
import operatorRouter from '../operatorApp/routes.js';
import busesRouter from '../busesApp/router.js';
import accountsRouter from './accountsRouter.js';
import companyRouter from './companiesRouter.js';
import userRouter from './userRouter.js';

const apiRouter = Router();

apiRouter.use('/operators', operatorRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/accounts', accountsRouter);
apiRouter.use('/operators', operatorRouter);
apiRouter.use('/companies', companyRouter);
apiRouter.use('/drivers', driverRouter);
apiRouter.use('/buses', busesRouter);

export default apiRouter;
