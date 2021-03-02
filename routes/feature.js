import express from "express";
import controllers from "../controllers/index.js";

import { isAuth } from '../helpers/authentication.js';
import { isAdmin, isDeveloper, isModerator, isQA } from '../helpers/authorization.js';

const router = express.Router();

// FEATURE PATHS
router.post('/add', isAuth, controllers.feature.post.addFeature); // TO DO PROJECT ID IN URL /:id/feature/add

export default router;