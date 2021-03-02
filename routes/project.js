import express from "express";
import controllers from "../controllers/index.js";

import { isAuth } from '../helpers/authentication.js';
import { isAdmin, isDeveloper, isModerator, isQA } from '../helpers/authorization.js';

const router = express.Router();

// PROJECT PATHS
router.get('/get', isAuth, controllers.project.get.getProject);
router.post('/add', isAuth, controllers.project.post.addProject);
router.delete('/delete', isAuth, controllers.project.delete.removeProject);

export default router;