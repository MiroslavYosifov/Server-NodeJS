import express from "express";
import controllers from "../controllers/index.js";

import { addFeature } from '../middleware/validations/feature/index.js';
import { isAuth } from '../middleware/auth/authentication.js';
import { isAdmin, isDeveloper, isModerator, isQA } from '../middleware/auth/authorization.js';

const router = express.Router();

// FEATURE PATHSgetFeature
router.get('/get', isAuth, controllers.feature.get.getFeature); // TO DO PROJECT ID IN URL /:id/feature/add
router.post('/add', isAuth, addFeature.schemaValidations, addFeature.handlingErrors, controllers.feature.post.addFeature); // TO DO PROJECT ID IN URL /:id/feature/add\
router.delete('/delete', isAuth, controllers.feature.delete.removeFeature); // TO DO PROJECT ID IN URL /:id/feature/add

export default router;