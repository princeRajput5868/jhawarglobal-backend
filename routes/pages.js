import express from "express";
import { getPage, listPages } from "../controllers/pageController.js";

const router = express.Router();

router.get("/", listPages);
router.get("/:slug", getPage);

export default router;
