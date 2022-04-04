import { Router } from 'express';
import handleResponse from '../controllers/handleResponse.js';
import verifyToken from '../middlewares/authJwt.js';
import CheckPermissionAny, {
	CheckPermissionOwn,
} from '../middlewares/CheckPermission.js';

const genericViewFun = (req, res) =>
	handleResponse(res, 200, { message: 'You are authorized.' });
const resource = 'drivers';
const driverRouter = Router();

driverRouter.get(
	'/',
	verifyToken,
	CheckPermissionAny(resource),
	genericViewFun
);
driverRouter.post(
	'/',
	verifyToken,
	CheckPermissionAny(resource),
	genericViewFun
);
driverRouter.put(
	'/',
	verifyToken,
	CheckPermissionAny(resource),
	genericViewFun
);
driverRouter.delete(
	'/',
	verifyToken,
	CheckPermissionAny(resource),
	genericViewFun
);
driverRouter.get(
	'/:id',
	verifyToken,
	CheckPermissionOwn(resource),
	genericViewFun
);
driverRouter.get(
	'/:id',
	verifyToken,
	CheckPermissionOwn(resource),
	genericViewFun
);
driverRouter.get(
	'/:id',
	verifyToken,
	CheckPermissionOwn(resource),
	genericViewFun
);
driverRouter.get(
	'/:id',
	verifyToken,
	CheckPermissionOwn(resource),
	genericViewFun
);

export default driverRouter;
