import { Router } from 'express';
import handleResponse from '../controllers/handleResponse.js';

const router = Router();

router.get('/', (req, res) => {
	/* c8 ignore next 4 */
	if (req.accepts()[0] === 'text/html') {
		return res.redirect('/docs');
	}
	handleResponse(res, 200, res.__('welcome'));
});
router.all('/*', (req, res) => {
	/* c8 ignore next 4 */
	if (req.accepts()[0] === 'text/html') {
		return res.status(404).send(res.__('notFound'));
	}
	return handleResponse(res, 404, res.__('notFound'));
});
export default router;
