import express from "express";
import { getResources, addResource } from "../controllers/resourceController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getResources);             // Public
router.post("/", verifyToken, addResource); // NGO/Admin only

export default router;

