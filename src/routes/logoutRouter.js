import express from 'express';
import { logout } from '../controllers/logout.controller.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = express.Router();

router.get('/', asyncHandler(logout));

export default router;
