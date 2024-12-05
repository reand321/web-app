import express from 'express';
import multer from 'multer';
import { uploadRecommendation, getRecommendations } from '../controllers/recommendationController.js';

const upload = multer({ dest: 'uploads/' });

const recommendationRouter = express.Router();

recommendationRouter.get('/', getRecommendations);

recommendationRouter.post('/', upload.single('image'), uploadRecommendation);

export { recommendationRouter };
