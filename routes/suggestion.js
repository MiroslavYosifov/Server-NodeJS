import express from "express";
import controllers from "../controllers/index.js";

import { isAuth } from '../helpers/authentication.js';
import { isAdmin, isDeveloper, isModerator, isQA } from '../helpers/authorization.js';

const router = express.Router();

router.get('/get', isAuth, controllers.suggestion.get.getSuggestion);
router.post('/add', isAuth, controllers.suggestion.post.addSuggestion);
router.delete('/delete', isAuth, controllers.suggestion.delete.removeSuggestion);

export default router;