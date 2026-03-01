import express from "express";
import { getMessagesByUserId, sendRoutes } from "../controllers/message.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protectedRoute);

router.get("/:id", getMessagesByUserId);

router.post("/send/:id", sendRoutes)

export default router;