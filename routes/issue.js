import express from "express";
import controllers from "../controllers/index.js";

import { addIssue } from '../middleware/validations/issue/index.js';
import { isAuth } from '../middleware/auth/authentication.js';
import { isAdmin, isDeveloper, isModerator, isQA } from '../middleware/auth/authorization.js';

const router = express.Router();

router.get('/get/:issueId', controllers.issue.get.getIssue);
router.post('/add', isAuth, addIssue.schemaValidations, addIssue.handlingErrors, controllers.issue.post.addIssue);
router.put('/updatestatus/:issueId', isAuth, controllers.issue.put.updateIssueStatus);
router.delete('/delete/:issueId', isAuth, controllers.issue.delete.removeIssue);

export default router;