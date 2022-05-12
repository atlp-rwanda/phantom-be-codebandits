/* c8 ignore start */

import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';
import multer from 'multer';
import streamifier from 'streamifier';
import handleResponse from '../controllers/handleResponse.js';

export const fileUpload = multer();

export const cloudinaryConfig = (req, res, next) => {
	cloudinary.config({
		url: process.env.CLOUDINARY_URL,
	});
	next();
};

const streamUpload = (req) =>
	new Promise((resolve, reject) => {
		const stream = cloudinary.uploader.upload_stream((error, result) => {
			if (result) {
				resolve(result);
			} else {
				reject(error);
			}
		});
		streamifier.createReadStream(req.file.buffer).pipe(stream);
	});

export const UploadMiddleware = async (req, res, next) => {
	const result = await streamUpload(req);
	if (result) {
		req.file.path = result.url;
		req.file.publicId = result.public_id;
		next();
	} else {
		return handleResponse(res, 500, res.__('Server error'));
	}
};

/* c8 ignore */
