import express from "express";

import { signup, login } from "../controllers/auth.controller.js";

const router = express.Router();

// api/auth/signup
router.post("/signup", signup);

// api/auth/login
router.post("/login", login);

export default router;
