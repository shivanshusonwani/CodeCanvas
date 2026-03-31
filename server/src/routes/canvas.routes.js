import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
	createCanvas,
	deleteCanvas,
	editCanvas,
	getAllCanvases,
	getCanvasById,
	getMyCanvases,
} from "../controllers/canvas.controller.js";

const router = express.Router();

// POST : /api/canvas/
router.post("/", authMiddleware, createCanvas);

// GET : /api/canvas/
router.get("/", getAllCanvases);

// GET : /api/:userId
router.get("/:userId", authMiddleware, getMyCanvases);

// GET : /api/:canvasId
router.get("/view/:canvasId", getCanvasById);

// PUT : /api/:canvasId
router.put("/:canvasId", authMiddleware, editCanvas);

// PUT : /api/:canvasId
router.delete("/:canvasId", authMiddleware, deleteCanvas);

export default router;
