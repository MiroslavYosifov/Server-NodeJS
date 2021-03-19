import express from "express";
import controllers from "../controllers/index.js";

import { isAuth } from '../middleware/auth/authentication.js';
import { isAdmin, isDeveloper, isModerator, isQA } from '../middleware/auth/authorization.js';

const router = express.Router();

// PROJECT PATHS
router.get('/list', isAuth, controllers.note.get.listNotes);
router.post('/add', isAuth, controllers.note.post.addNote);
router.delete('/delete/:noteId', isAuth, controllers.note.delete.removeNote);

export default router;