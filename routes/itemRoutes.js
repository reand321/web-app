import express from 'express';
import { getAniListData } from '../controllers/itemController.js';

export const itemRouter = express.Router();

// Route to fetch anime data from AniList API
itemRouter.get('/', getAniListData);
