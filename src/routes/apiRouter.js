import { Router } from 'express';
import handleResponse from '../controllers/handleResponse.js';

const apiRouter = Router();
apiRouter.all('*', (req, res) =>
	res
		.status(200)
		.json(handleResponse(200, { message: 'Welcome to phantom API' }))
);

export default apiRouter;
