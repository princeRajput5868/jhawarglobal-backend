import express from "express";
import { adminLogin, adminSeed } from "../controllers/adminAuthController.js";

const router = express.Router();

router.post("/auth/login", adminLogin);
router.post("/auth/seed", adminSeed);

export default router;