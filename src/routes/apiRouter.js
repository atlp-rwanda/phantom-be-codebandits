import { Router } from 'express';
import busesRouter from '../busesApp/router.js';
import bustoroutesRouter from '../bustoRouteApp/routes.js';
import driverRouter from '../driverApp/router.js';
import operatorRouter from '../operatorApp/routes.js';
import routeRouter from '../routeApp/routes.js';
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
apiRouter.use('/routes', routeRouter);

apiRouter.use('/bus-to-routes', bustoroutesRouter);
export default apiRouter;
