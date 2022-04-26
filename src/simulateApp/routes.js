import { Router } from 'express';
import verifyToken from '../middlewares/authJwt.js';
import asyncHandler from '../utils/asyncHandler.js';
import validate from '../utils/validateMiddleware.js';
import {
	busControl,
	busListView,
	checkTripInProgress,
	getOptions,
} from './controllers.js';
import { validatePassengers } from './validation.js';

const router = Router();

router.post(
	'/',
	verifyToken,
	validatePassengers(),
	validate,
	asyncHandler(busControl)
);
router.get('/', asyncHandler(busListView));
router.get('/options', asyncHandler(getOptions));
router.get('/check/:plate', asyncHandler(checkTripInProgress));

export default router;
