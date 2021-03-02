import express from "express";
import controllers from "../controllers/index.js";

import { addIssue } from '../middleware/validations/issue/index.js';
import { isAuth } from '../middleware/auth/authentication.js';
import { isAdmin, isDeveloper, isModerator, isQA } from '../middleware/auth/authorization.js';

const router = express.Router();

router.get('/get', isAuth, controllers.issue.get.getIssue);
router.post('/add', isAuth, addIssue.schemaValidations, addIssue.handlingErrors, controllers.issue.post.addIssue);
router.delete('/delete', isAuth, controllers.issue.delete.removeIssue);

export default router;