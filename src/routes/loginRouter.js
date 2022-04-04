import express from 'express';
import { AuthHandler } from '../controllers/auth.controller.js';
import loginValidation from '../middlewares/validations/auth.validation.js';
import validate from '../utils/validate.js';

const router = express.Router();

router.post('/', loginValidation(), validate, AuthHandler);

export default router;
