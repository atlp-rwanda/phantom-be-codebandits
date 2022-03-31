import { Router } from 'express';
import handleResponse from '../controllers/handleResponse.js';

const apiRouter = Router();
apiRouter.all('*', (req, res) =>
	handleResponse(res, 200, { message: res.__('welcomeAPI') })
);

export default apiRouter;
