import express from "express";

import controllers from "../controllers/index.js";

import { registration, login } from "../middleware/validations/auth/index.js";
import { isAuth } from '../middleware/auth/authentication.js';
import { isAdmin, isDeveloper, isModerator, isQA } from '../middleware/auth/authorization.js';


const router = express.Router();

router.post('/registration', registration.schemaValidations, registration.handlingErrors, isAuth, controllers.auth.post.registration);
router.post('/login', login.schemaValidations, login.handlingErrors, controllers.auth.post.login);
router.post('/logout', isAuth, isAdmin, isDeveloper, isModerator, isQA, controllers.auth.post.logout);

export default router;

