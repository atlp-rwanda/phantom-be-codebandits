import { Router } from 'express';
import handleResponse from '../controllers/handleResponse.js';
import verifyToken from '../middlewares/authJwt.js';
import CheckPermissionAny, {
	CheckPermissionOwn,
} from '../middlewares/CheckPermission.js';

const genericViewFun = (req, res) =>
	handleResponse(res, 200, { message: 'You are authorized.' });
const resource = 'companies';
const companyRouter = Router();

companyRouter.get(
	'/',
	verifyToken,
	CheckPermissionAny(resource),
	genericViewFun
);
companyRouter.post(
	'/',
	verifyToken,
	CheckPermissionAny(resource),
	genericViewFun
);
companyRouter.put(
	'/',
	verifyToken,
	CheckPermissionAny(resource),
	genericViewFun
);
companyRouter.delete(
	'/',
	verifyToken,
	CheckPermissionAny(resource),
	genericViewFun
);
companyRouter.get(
	'/:id',
	verifyToken,
	CheckPermissionOwn(resource),
	genericViewFun
);
companyRouter.get(
	'/:id',
	verifyToken,
	CheckPermissionOwn(resource),
	genericViewFun
);
companyRouter.get(
	'/:id',
	verifyToken,
	CheckPermissionOwn(resource),
	genericViewFun
);
companyRouter.get(
	'/:id',
	verifyToken,
	CheckPermissionOwn(resource),
	genericViewFun
);

export default companyRouter;
