import express from "express";
import controllers from "../controllers/index.js";

const router = express.Router();

router.post('/registration', controllers.auth.post.registration);
router.post('/login', controllers.auth.post.login);
router.post('/logout', controllers.auth.post.logout);

export default router;