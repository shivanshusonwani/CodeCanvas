import express from "express";

import {
	signup,
	login,
	getMe,
	logOut,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// api/auth/signup
router.post("/signup", signup);

// api/auth/login
router.post("/login", login);

// api/auth/me
router.get("/me", authMiddleware, getMe);

// api/auth/logout
router.post("/logout", logOut);

export default router;
