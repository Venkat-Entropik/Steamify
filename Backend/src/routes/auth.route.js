import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/api/auth/signup", signup);

router.post("/api/auth/logout", logout);

router.post("/api/auth/login", login);

export default router;
