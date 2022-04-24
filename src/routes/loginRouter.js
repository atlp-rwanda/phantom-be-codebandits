import express from 'express';
import { AuthHandler } from '../controllers/auth.controller.js';
import loginValidation from '../middlewares/validations/auth.validation.js';
import asyncHandler from '../utils/asyncHandler.js';
import validate from '../utils/validateMiddleware.js';

const router = express.Router();

router.post('/', loginValidation(), validate, asyncHandler(AuthHandler));

export default router;
