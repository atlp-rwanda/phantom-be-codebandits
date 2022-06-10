import { Router } from 'express';
import path from 'path';
import handleResponse from '../controllers/handleResponse.js';

const router = Router();

router.all('/*', (req, res) => {
	/* c8 ignore next 4 */
	if (req.accepts()[0] === 'text/html') {
		return res.sendFile(path.join(path.resolve(), 'dist/index.html'));
	}
	handleResponse(res, 200, res.__('welcome'));
});
export default router;
