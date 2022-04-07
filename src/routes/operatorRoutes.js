import { Router } from 'express';
import handleResponse from '../controllers/handleResponse.js';
import verifyToken from '../middlewares/authJwt.js';
import CheckPermissionAny, {
	CheckPermissionOwn,
} from '../middlewares/CheckPermission.js';

const genericViewFun = (req, res) =>
	handleResponse(res, 200, { message: 'You are authorized.' });
const resource = 'operators';
const operatorRouter = Router();

operatorRouter.get(
	'/',
	verifyToken,
	CheckPermissionAny(resource),
	genericViewFun
);
operatorRouter.post(
	'/',
	verifyToken,
	CheckPermissionAny(resource),
	genericViewFun
);
operatorRouter.put(
	'/',
	verifyToken,
	CheckPermissionAny(resource),
	genericViewFun
);
operatorRouter.delete(
	'/',
	verifyToken,
	CheckPermissionAny(resource),
	genericViewFun
);
operatorRouter.get(
	'/:id',
	verifyToken,
	CheckPermissionOwn(resource),
	genericViewFun
);
operatorRouter.get(
	'/:id',
	verifyToken,
	CheckPermissionOwn(resource),
	genericViewFun
);
operatorRouter.get(
	'/:id',
	verifyToken,
	CheckPermissionOwn(resource),
	genericViewFun
);
operatorRouter.get(
	'/:id',
	verifyToken,
	CheckPermissionOwn(resource),
	genericViewFun
);

export default operatorRouter;
