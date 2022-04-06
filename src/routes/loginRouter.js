import express from 'express';
import validate from '../middlewares/verifyAuthValidation.js';
import loginValidation from '../middlewares/validations/auth.validation.js';
import { AuthHandler } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/', loginValidation(), validate, AuthHandler);

export default router;
