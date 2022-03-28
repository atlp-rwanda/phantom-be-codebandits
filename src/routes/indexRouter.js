import { Router } from 'express';
import handleResponse from '../controllers/handleResponse.js';

const router = Router();

router.get('/', (req, res) => handleResponse(res, 200, res.__('welcome')));
router.all('/*', (req, res) => handleResponse(res, 404, res.__('notFound')));
export default router;
