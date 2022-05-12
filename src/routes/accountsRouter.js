import { Router } from 'express';
import { refresh } from '../controllers/refreshToken.controller.js';
import verifyToken from '../middlewares/authJwt.js';
import { ProfileUpdateValidation } from '../userApp/profileUpdateValidation.js';
import resetPasswordRouter from '../userApp/routes.js';
import asyncHandler from '../utils/asyncHandler.js';
import {
	cloudinaryConfig,
	fileUpload,
	UploadMiddleware,
} from '../utils/uploadMiddleware.js';
import validate from '../utils/validateMiddleware.js';
import loginRouter from './loginRouter.js';
import logoutRouter from './logoutRouter.js';
import { handlePictureUpload, profileUpdate } from './profileUpdate.js';
import { profileView } from './profileView.js';

const apiRouter = Router();

apiRouter.use('/login', loginRouter);
apiRouter.get('/refresh', asyncHandler(refresh));
apiRouter.use('/logout', logoutRouter);
apiRouter.get('/profile', verifyToken, asyncHandler(profileView));
apiRouter.post(
	'/profile',
	verifyToken,
	ProfileUpdateValidation(),
	validate,
	asyncHandler(profileUpdate)
);
apiRouter.post(
	'/upload',
	verifyToken,
	fileUpload.single('image'),
	cloudinaryConfig,
	UploadMiddleware,
	asyncHandler(handlePictureUpload)
);
apiRouter.use('/', resetPasswordRouter);

export default apiRouter;
