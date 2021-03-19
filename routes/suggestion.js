import express from "express";
import controllers from "../controllers/index.js";

import { addSuggestion } from '../middleware/validations/suggestion/index.js';
import { isAuth } from '../middleware/auth/authentication.js';
import { isAdmin, isDeveloper, isModerator, isQA } from '../middleware/auth/authorization.js';

const router = express.Router();

router.get('/get/:suggestionId', isAuth, controllers.suggestion.get.getSuggestion);
router.post('/add', addSuggestion.schemaValidations, addSuggestion.handlingErrors, isAuth, controllers.suggestion.post.addSuggestion);
router.put('/updatestatus/:suggestionId', isAuth, controllers.suggestion.put.updateSuggestionStatus);
router.delete('/delete/:suggestionId', isAuth, controllers.suggestion.delete.removeSuggestion);

export default router;