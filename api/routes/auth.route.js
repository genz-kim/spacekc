import express from "express";
import { login, logout, register, clerkLogin } from "../controllers/auth.controller.js";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/clerk-login", ClerkExpressWithAuth(), clerkLogin);

export default router;
