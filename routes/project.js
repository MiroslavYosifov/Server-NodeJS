import express from "express";
import controllers from "../controllers/index.js";

import { addProject } from '../middleware/validations/project/index.js';
import { isAuth } from '../middleware/auth/authentication.js';
import { isAdmin, isDeveloper, isModerator, isQA } from '../middleware/auth/authorization.js';

const router = express.Router();

// PROJECT PATHS
router.get('/get', isAuth, controllers.project.get.getProject);
router.post('/add', addProject.schemaValidations, addProject.handlingErrors, isAuth, controllers.project.post.addProject);
router.delete('/delete', isAuth, controllers.project.delete.removeProject);

export default router;