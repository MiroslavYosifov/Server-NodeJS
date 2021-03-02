import express from "express";
import controllers from "../controllers/index.js";

import { isAuth } from '../helpers/authentication.js';
import { isAdmin, isDeveloper, isModerator, isQA } from '../helpers/authorization.js';

const router = express.Router();

router.get('/get', isAuth, controllers.issue.get.getIssue);
router.post('/add', isAuth, controllers.issue.post.addIssue);
router.delete('/delete', isAuth, controllers.issue.delete.removeIssue);

export default router;